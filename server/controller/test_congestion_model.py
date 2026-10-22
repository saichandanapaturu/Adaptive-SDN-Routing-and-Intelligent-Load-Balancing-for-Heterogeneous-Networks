"""Deterministic tests for congestion labeling, evaluation, and lead time.

The sample histories below are test fixtures that exercise the pipeline's
arithmetic. Scores computed from them are not model performance claims.
"""

from datetime import datetime, timezone
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import TestCase, main

from server.controller import congestion_model as cm
from server.controller.statistics import OpenFlowStatisticsCollector
from server.controller.telemetry_store import TelemetryStore

START = datetime(2026, 10, 19, 8, 0, 0, tzinfo=timezone.utc).timestamp()


def sample(ts: float, utilization: float, *, dpid: int = 1, port_no: int = 2) -> dict:
    byte_rate = utilization * cm.LINK_CAPACITY_BPS / 8
    return {
        "dpid": dpid, "port_no": port_no, "ts": ts,
        "timestamp": datetime.fromtimestamp(ts, timezone.utc).isoformat(),
        "rx_packets": 0, "tx_packets": 0, "rx_bytes": 0, "tx_bytes": 0,
        "rx_errors": 0, "tx_errors": 0, "rx_dropped": 0, "tx_dropped": 0,
        "rx_packet_rate": 0.0, "tx_packet_rate": byte_rate / 1000,
        "rx_byte_rate": byte_rate / 2, "tx_byte_rate": byte_rate,
    }


def cyclic_history(cycles: int, *, ports: int = 2) -> list:
    """Idle, 8 s ramp, 5 s congested, repeated, one sample per second."""
    profile = [0.05] * 12 + [0.1 + 0.1 * step for step in range(8)] + [0.92] * 5
    history = []
    for port in range(ports):
        for index, utilization in enumerate(profile * cycles):
            history.append(sample(START + index, utilization, port_no=port + 1))
    return history


class LabelingTests(TestCase):
    def test_first_sample_after_a_gap_is_unmeasured_and_windows_do_not_span_gaps(self) -> None:
        history = [sample(START + t, 0.1) for t in range(6)] + [sample(START + 20 + t, 0.1) for t in range(6)]
        segments = cm.measured_segments(history)[(1, 2)]
        self.assertEqual([len(segment) for segment in segments], [5, 5])
        self.assertEqual(segments[1][0]["ts"], START + 21)
        self.assertIsNone(cm.port_features(segments[0][-4:] + segments[1][:1]))
        self.assertIsNotNone(cm.port_features(segments[0]))

    def test_label_uses_only_the_horizon_and_needs_an_observed_future(self) -> None:
        utilization = [0.1] * 16 + [0.9] + [0.1] * 4
        segments = cm.measured_segments([sample(START + t, u) for t, u in enumerate(utilization)])
        rows = cm.build_dataset(segments)
        labels = {round(row.ts - START): row.label for row in rows}
        # Congestion at t=16 is more than one horizon after t=5 but within it for t>=6.
        self.assertEqual(labels[5], 0)
        self.assertEqual([labels[t] for t in range(6, 12)], [1] * 6)
        # The last sample is t=20, so rows after t=11 lack a full future window.
        self.assertEqual(max(labels), 11)

    def test_chronological_split_purges_training_label_windows(self) -> None:
        rows = cm.build_dataset(cm.measured_segments(cyclic_history(30)))
        train, test, cutoff = cm.chronological_split(rows)
        self.assertLess(max(row.ts for row in train) + cm.HORIZON_SECONDS, cutoff)
        self.assertGreaterEqual(min(row.ts for row in test), cutoff)


class LeadTimeTests(TestCase):
    def test_lead_time_is_onset_minus_first_qualifying_warning(self) -> None:
        utilization = [0.1] * 20 + [0.9, 0.9] + [0.1] * 5
        history = [sample(START + t, u) for t, u in enumerate(utilization)]
        segments = cm.measured_segments(history)
        port = (1, 2)
        probabilities = {
            (port, START + 8): 0.9,   # more than one horizon before onset: ignored
            (port, START + 13): 0.4,  # below the warning threshold
            (port, START + 14): 0.7,  # first qualifying warning
            (port, START + 17): 0.8,
            (port, START + 20): 0.9,  # at onset, not before it
        }
        result = cm.lead_time_backtest(segments, probabilities, test_start=START)
        self.assertEqual(result["status"], "available")
        self.assertEqual(result["events_evaluated"], 1)
        self.assertEqual(result["events_warned"], 1)
        self.assertEqual(result["median_seconds"], 6.0)
        self.assertEqual(result["mean_seconds"], 6.0)

    def test_events_whose_warning_window_precedes_the_test_period_are_excluded(self) -> None:
        utilization = [0.1] * 20 + [0.9] + [0.1] * 3
        segments = cm.measured_segments([sample(START + t, u) for t, u in enumerate(utilization)])
        result = cm.lead_time_backtest(segments, {}, test_start=START + 15)
        self.assertEqual(result["events_evaluated"], 0)
        self.assertEqual(result["status"], "unavailable")
        self.assertEqual(result["reason"], "no_congestion_onsets_in_test_period")

    def test_unwarned_events_report_unavailable_instead_of_zero(self) -> None:
        utilization = [0.1] * 20 + [0.9] + [0.1] * 3
        segments = cm.measured_segments([sample(START + t, u) for t, u in enumerate(utilization)])
        result = cm.lead_time_backtest(segments, {}, test_start=START)
        self.assertEqual(result["events_evaluated"], 1)
        self.assertEqual(result["reason"], "no_onset_was_warned")
        self.assertIsNone(result["median_seconds"])


class TrainingTests(TestCase):
    def test_accuracy_is_computed_on_the_held_out_test_split(self) -> None:
        _model, metrics = cm.train_and_evaluate(cyclic_history(30))
        evaluation = metrics["evaluation"]
        (tn, fp), (fn, tp) = evaluation["confusion_matrix"]["rows_actual_columns_predicted"]
        self.assertEqual(tn + fp + fn + tp, metrics["split"]["test_rows"])
        self.assertAlmostEqual(evaluation["accuracy"], (tn + tp) / (tn + fp + fn + tp))
        self.assertEqual(metrics["split"]["method"], "chronological")
        self.assertEqual(metrics["policy"]["horizon_seconds"], 10.0)
        lead = metrics["lead_time"]
        self.assertGreater(lead["events_evaluated"], 0)
        if lead["status"] == "available":
            self.assertGreater(lead["median_seconds"], 0)
            self.assertLessEqual(lead["median_seconds"], cm.HORIZON_SECONDS)

    def test_insufficient_samples_are_rejected(self) -> None:
        with self.assertRaises(cm.TrainingError) as raised:
            cm.train_and_evaluate(cyclic_history(2))
        self.assertEqual(raised.exception.reason, "insufficient_samples")

    def test_single_class_history_is_rejected(self) -> None:
        idle = [sample(START + t, 0.1, port_no=port) for port in (1, 2) for t in range(400)]
        with self.assertRaises(cm.TrainingError) as raised:
            cm.train_and_evaluate(idle)
        self.assertEqual(raised.exception.reason, "training_split_missing_a_class")


class PredictorTests(TestCase):
    def test_missing_model_reports_unavailable_and_predicts_nothing(self) -> None:
        with TemporaryDirectory() as directory:
            predictor = cm.CongestionPredictor(Path(directory))
            self.assertEqual(predictor.status()["status"], "unavailable")
            self.assertEqual(predictor.status()["reason"], "model_missing")
            self.assertIsNone(predictor.probability(1, 2))

    def test_trained_model_predicts_only_from_fresh_complete_windows(self) -> None:
        model, metrics = cm.train_and_evaluate(cyclic_history(30))
        with TemporaryDirectory() as directory:
            cm.save_artifacts(model, metrics, Path(directory))
            clock = [START + 5]
            predictor = cm.CongestionPredictor(Path(directory), now=lambda: clock[0])
            self.assertEqual(predictor.status()["status"], "trained")
            self.assertEqual(predictor.status()["inference"], "ready")

            collector = OpenFlowStatisticsCollector()
            for second in range(6):
                counters = type("Counters", (), {
                    "port_no": 2, "rx_packets": second * 10, "tx_packets": second * 10,
                    "rx_bytes": second * 500_000, "tx_bytes": second * 1_100_000,
                    "rx_errors": 0, "tx_errors": 0, "rx_dropped": 0, "tx_dropped": 0,
                })()
                predictor.observe(collector.process_port_stats(
                    1, [counters],
                    received_at=datetime.fromtimestamp(START + second, timezone.utc),
                    received_monotonic=float(second),
                ))
            probability = predictor.probability(1, 2)
            self.assertIsNotNone(probability)
            self.assertGreaterEqual(probability, 0.0)
            self.assertLessEqual(probability, 1.0)
            self.assertIsNone(predictor.probability(1, 3))

            clock[0] = START + 5 + cm.PREDICTION_STALE_SECONDS + 1
            self.assertIsNone(predictor.probability(1, 2))


class LiveEvaluationTests(TestCase):
    def test_prediction_is_scored_only_after_its_horizon_is_observed(self) -> None:
        live = cm.LiveEvaluation()
        live.observe((1, 2), 0, 0.9, False)
        live.observe((1, 2), 1, 0.1, False)
        for t in range(2, 9):
            live.observe((1, 2), t, None, t == 6)
        self.assertEqual(live.summary()["scored"], 0)
        live.observe((1, 2), 9, None, False)
        live.observe((1, 2), 10, None, False)
        self.assertEqual(list(live._scored), [True, False])

    def test_lead_time_matches_the_backtest_policy(self) -> None:
        live = cm.LiveEvaluation()
        probabilities = {2: 0.9, 13: 0.4, 14: 0.7, 17: 0.8}
        for t in range(21):
            live.observe((1, 2), t, probabilities.get(t, 0.1), t in (3, 20))
        summary = live.summary()
        self.assertEqual((summary["events_evaluated"], summary["events_warned"]), (1, 1))
        self.assertEqual(summary["median_lead_seconds"], 6)
        self.assertIsNone(summary["accuracy"])

    def test_predictor_reports_a_rolling_score_that_updates_with_new_samples(self) -> None:
        model, metrics = cm.train_and_evaluate(cyclic_history(30))
        profile = [0.05] * 12 + [0.1 + 0.1 * step for step in range(8)] + [0.92] * 5
        with TemporaryDirectory() as directory:
            cm.save_artifacts(model, metrics, Path(directory))
            predictor = cm.CongestionPredictor(Path(directory))
            collector = OpenFlowStatisticsCollector()
            tx_bytes = 0.0
            summaries = []
            for second, utilization in enumerate(profile * 6):
                tx_bytes += utilization * cm.LINK_CAPACITY_BPS / 8
                counters = type("Counters", (), {
                    "port_no": 2, "rx_packets": second, "tx_packets": second,
                    "rx_bytes": int(tx_bytes / 2), "tx_bytes": int(tx_bytes),
                    "rx_errors": 0, "tx_errors": 0, "rx_dropped": 0, "tx_dropped": 0,
                })()
                predictor.observe(collector.process_port_stats(
                    1, [counters],
                    received_at=datetime.fromtimestamp(START + second, timezone.utc),
                    received_monotonic=float(second),
                ))
                summaries.append(predictor.status()["live_evaluation"])
        final = summaries[-1]
        self.assertGreaterEqual(final["scored"], cm.MIN_LIVE_SCORED)
        self.assertIsNotNone(final["accuracy"])
        self.assertGreater(final["events_evaluated"], 0)
        self.assertGreater(len({summary["scored"] for summary in summaries}), 1)


class TelemetryStoreTests(TestCase):
    def test_store_round_trips_collector_samples(self) -> None:
        collector = OpenFlowStatisticsCollector()
        counters = type("Counters", (), {
            "port_no": 3, "rx_packets": 1, "tx_packets": 2, "rx_bytes": 3, "tx_bytes": 4,
            "rx_errors": 0, "tx_errors": 0, "rx_dropped": 0, "tx_dropped": 0,
        })()
        samples = collector.process_port_stats(7, [counters], received_at=datetime.fromtimestamp(START, timezone.utc))
        with TemporaryDirectory() as directory:
            store = TelemetryStore(Path(directory) / "history.sqlite3")
            self.assertEqual(store.record(samples), 1)
            rows = store.load()
            store.close()
        self.assertEqual(len(rows), 1)
        self.assertEqual((rows[0]["dpid"], rows[0]["port_no"], rows[0]["tx_bytes"]), (7, 3, 4))
        self.assertEqual(rows[0]["ts"], START)

    def test_background_writer_persists_every_queued_sample(self) -> None:
        collector = OpenFlowStatisticsCollector()
        with TemporaryDirectory() as directory:
            store = TelemetryStore(Path(directory) / "history.sqlite3")
            for second in range(20):
                counters = type("Counters", (), {
                    "port_no": 1, "rx_packets": second, "tx_packets": second, "rx_bytes": second, "tx_bytes": second,
                    "rx_errors": 0, "tx_errors": 0, "rx_dropped": 0, "tx_dropped": 0,
                })()
                store.record_async(collector.process_port_stats(
                    1, [counters], received_at=datetime.fromtimestamp(START + second, timezone.utc),
                    received_monotonic=float(second),
                ))
            store.flush()
            self.assertEqual(len(store.load()), 20)
            store.close()


if __name__ == "__main__":
    main()
