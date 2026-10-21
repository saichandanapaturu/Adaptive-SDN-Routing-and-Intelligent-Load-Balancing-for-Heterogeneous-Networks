"""Deterministic fixture-only tests for the experimental congestion model."""

import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest import TestCase

from server.controller.congestion_model import (
    TrainingConfig,
    chronological_split,
    load_trusted_artifact,
    prepare_dataset,
    predict_latest,
    train_from_store,
)
from server.controller.statistics import PortStatistics
from server.controller.telemetry_storage import HistoricalTelemetryStore


class FixtureStore:
    def __init__(self, rows):
        self.rows = rows

    def history_count(self):
        return len(self.rows)

    def history(self, *, limit=1000, offset=0, **_filters):
        return self.rows[offset:offset + limit]


def observation(
    index: int,
    rx_rate: float,
    tx_rate: float = 0.0,
    *,
    dpid: int = 1,
    port_no: int = 2,
    timestamp_offset: int = 0,
):
    timestamp = datetime(2026, 10, 19, tzinfo=timezone.utc) + timedelta(seconds=index + timestamp_offset)
    return {
        "sample_timestamp": timestamp.isoformat(),
        "dpid": dpid,
        "port_no": port_no,
        "rx_bytes": index * 1000,
        "tx_bytes": index * 800,
        "rx_packets": index * 10,
        "tx_packets": index * 8,
        "rx_byte_rate": rx_rate,
        "tx_byte_rate": tx_rate,
        "rx_packet_rate": rx_rate / 100,
        "tx_packet_rate": tx_rate / 100,
    }


def cyclic_fixture(count: int = 360):
    return [
        observation(
            index,
            150.0 if index % 60 in range(20, 34) else 10.0,
            5.0,
        )
        for index in range(count)
    ]


def stored_fixture(row):
    return PortStatistics(
        dpid=row["dpid"],
        port_no=row["port_no"],
        timestamp=row["sample_timestamp"],
        rx_packets=row["rx_packets"],
        tx_packets=row["tx_packets"],
        rx_bytes=row["rx_bytes"],
        tx_bytes=row["tx_bytes"],
        rx_errors=0,
        tx_errors=0,
        rx_dropped=0,
        tx_dropped=0,
        rx_packet_rate=row["rx_packet_rate"],
        tx_packet_rate=row["tx_packet_rate"],
        rx_byte_rate=row["rx_byte_rate"],
        tx_byte_rate=row["tx_byte_rate"],
    )


class CongestionModelTests(TestCase):
    def setUp(self) -> None:
        self.config = TrainingConfig(
            congestion_threshold_bytes_per_second=100.0,
            horizon_seconds=3,
            lag_count=2,
            test_fraction=0.25,
            minimum_samples=30,
            maximum_history_samples=1000,
            estimator_count=20,
        )

    def test_features_use_only_current_and_past_samples(self) -> None:
        rows = [observation(index, 10.0 + index, 2.0) for index in range(12)]
        original = prepare_dataset(rows, self.config)
        changed = list(rows)
        for index in range(6, len(changed)):
            changed[index] = observation(index, 10000.0, 9000.0)
        revised = prepare_dataset(changed, self.config)

        timestamp = datetime(2026, 10, 19, tzinfo=timezone.utc) + timedelta(seconds=5)
        original_row = next(row for row in original.rows if row.timestamp == timestamp)
        revised_row = next(row for row in revised.rows if row.timestamp == timestamp)

        self.assertEqual(original_row.features, revised_row.features)
        self.assertNotEqual(original.feature_names, [])
        self.assertEqual(original_row.features[0], 15.0)

    def test_future_label_uses_strictly_later_samples_within_horizon(self) -> None:
        rows = [
            observation(index, 80.0 if index in {7, 8} else 10.0, 40.0 if index in {7, 8} else 30.0)
            for index in range(14)
        ]
        dataset = prepare_dataset(rows, self.config)

        row_at_five = next(
            row for row in dataset.rows
            if row.timestamp == datetime(2026, 10, 19, tzinfo=timezone.utc) + timedelta(seconds=5)
        )
        row_at_ten = next(
            row for row in dataset.rows
            if row.timestamp == datetime(2026, 10, 19, tzinfo=timezone.utc) + timedelta(seconds=10)
        )
        row_at_eight = next(
            row for row in dataset.rows
            if row.timestamp == datetime(2026, 10, 19, tzinfo=timezone.utc) + timedelta(seconds=8)
        )

        self.assertEqual(row_at_five.label, 1)
        self.assertEqual(row_at_ten.label, 0)
        self.assertEqual(row_at_eight.label, 0)

    def test_missing_duplicate_and_out_of_order_rows_are_reported(self) -> None:
        rows = cyclic_fixture(30)
        malformed = dict(rows[0])
        malformed["rx_byte_rate"] = None
        duplicate = dict(rows[5])
        out_of_order = dict(rows[3])
        out_of_order["sample_timestamp"] = (
            datetime(2026, 10, 19, tzinfo=timezone.utc) + timedelta(seconds=3, microseconds=500_000)
        ).isoformat()
        dataset = prepare_dataset(
            [*rows[:6], duplicate, out_of_order, malformed, *rows[6:]],
            self.config,
        )

        self.assertEqual(dataset.diagnostics["missing_or_invalid_rows"], 1)
        self.assertEqual(dataset.diagnostics["duplicate_observations"], 1)
        self.assertEqual(dataset.diagnostics["out_of_order_observations"], 1)

    def test_gap_without_future_observation_is_not_labeled_negative(self) -> None:
        rows = [
            observation(index, 5.0, 5.0)
            for index in range(4)
        ] + [observation(100, 5.0, 5.0)]
        dataset = prepare_dataset(rows, self.config)
        gap_time = datetime(2026, 10, 19, tzinfo=timezone.utc) + timedelta(seconds=3)

        self.assertNotIn(gap_time, {row.timestamp for row in dataset.rows})
        self.assertGreaterEqual(dataset.diagnostics["rows_without_future_observations"], 1)

    def test_chronological_split_purges_overlapping_future_windows(self) -> None:
        dataset = prepare_dataset(cyclic_fixture(), self.config)
        train, test, test_start = chronological_split(
            dataset.rows,
            self.config.test_fraction,
            self.config.horizon_seconds,
        )

        self.assertTrue(train)
        self.assertTrue(test)
        self.assertTrue(all(row.timestamp >= test_start for row in test))
        self.assertTrue(
            all(
                row.timestamp + timedelta(seconds=self.config.horizon_seconds) < test_start
                for row in train
            )
        )

    def test_insufficient_history_returns_unavailable_without_model(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            model_path = Path(temporary_directory) / "model.joblib"
            result = train_from_store(FixtureStore(cyclic_fixture(12)), model_path, self.config)

            self.assertEqual(result["status"], "insufficient_data")
            self.assertFalse(model_path.exists())
            self.assertIn("diagnostics", result)

    def test_one_class_training_data_returns_unavailable(self) -> None:
        rows = [observation(index, 1.0, 1.0) for index in range(360)]
        with tempfile.TemporaryDirectory() as temporary_directory:
            model_path = Path(temporary_directory) / "model.joblib"
            result = train_from_store(FixtureStore(rows), model_path, self.config)

            self.assertEqual(result["status"], "insufficient_data")
            self.assertIn("only one class", result["reason"])
            self.assertFalse(model_path.exists())

    def test_training_evaluation_baseline_and_artifact_metadata(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            store = HistoricalTelemetryStore(Path(temporary_directory) / "telemetry.sqlite3")
            fixtures = cyclic_fixture()
            store.insert_samples(stored_fixture(row) for row in fixtures)
            model_path = Path(temporary_directory) / "trusted-model.joblib"
            result = train_from_store(store, model_path, self.config)

            self.assertEqual(result["status"], "trained")
            metadata = result["metadata"]
            metrics = metadata["evaluation"]
            self.assertEqual(
                sum(metrics["random_forest"]["confusion_matrix_labels_0_1"][0])
                + sum(metrics["random_forest"]["confusion_matrix_labels_0_1"][1]),
                metadata["training_data"]["test_rows"],
            )
            self.assertIn("precision_congested", metrics["random_forest"])
            self.assertIn("balanced_accuracy", metrics["random_forest"])
            self.assertIn("f1_congested", metrics["majority_class_baseline"])
            self.assertEqual(
                metadata["target"]["threshold_bytes_per_second"],
                self.config.congestion_threshold_bytes_per_second,
            )
            self.assertEqual(metadata["target"]["horizon_seconds"], self.config.horizon_seconds)

            artifact = load_trusted_artifact(model_path)
            self.assertEqual(artifact["metadata"], metadata)
            self.assertEqual(artifact["feature_names"], metadata["feature_schema"])
            self.assertTrue(metadata["training_timestamp"].endswith("+00:00"))
            self.assertEqual(metadata["training_data"]["historical_rows_available"], len(fixtures))

    def test_prediction_uses_local_artifact_and_latest_past_features(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            model_path = Path(temporary_directory) / "trusted-model.joblib"
            store = FixtureStore(cyclic_fixture())
            result = train_from_store(store, model_path, self.config)
            self.assertEqual(result["status"], "trained")

            prediction = predict_latest(store, model_path)

            self.assertEqual(prediction["status"], "available")
            self.assertEqual(len(prediction["predictions"]), 1)
            self.assertIn("predicted_congested", prediction["predictions"][0])
            self.assertIn("congestion_probability", prediction["predictions"][0])


if __name__ == "__main__":
    import unittest

    unittest.main()
