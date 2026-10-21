"""Deterministic route-selection tests using synthetic fixtures only."""

from copy import deepcopy
from datetime import datetime, timedelta, timezone
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import TestCase, main

import joblib

from server.controller.congestion_model import (
    ARTIFACT_SCHEMA_VERSION,
    ARTIFACT_TYPE,
    feature_names_for_lags,
)
from server.controller.routing import (
    RouteDecisionEngine,
    RoutingConfig,
    load_trusted_model_signals,
)
from server.controller.statistics import PortStatistics
from server.controller.telemetry_storage import HistoricalTelemetryStore


class _SyntheticTrustedClassifier:
    """Picklable deterministic classifier fixture, not a trained model."""

    classes_ = (0, 1)

    def predict_proba(self, feature_rows):
        return [[0.4, 0.6] for _ in feature_rows]


class RouteSelectionTests(TestCase):
    def setUp(self) -> None:
        self.now = datetime(2026, 10, 19, 8, 0, 10, tzinfo=timezone.utc)
        self.topology = {
            "discovery_status": "fresh",
            "link_discovery_status": "fresh",
            "observed_at": self.now.isoformat(),
            "switches": [
                {"dpid": 1, "status": "connected", "ports": [{"port_no": port} for port in (1, 12, 13)]},
                {"dpid": 2, "status": "connected", "ports": [{"port_no": port} for port in (21, 24)]},
                {"dpid": 3, "status": "connected", "ports": [{"port_no": port} for port in (31, 34)]},
                {"dpid": 4, "status": "connected", "ports": [{"port_no": port} for port in (41, 42)]},
            ],
            "hosts": [
                {
                    "host_id": "00:00:00:00:00:01",
                    "dpid": 1,
                    "port_no": 1,
                    "ipv4": ["10.0.0.1"],
                    "ipv6": [],
                    "observed_at": self.now.isoformat(),
                },
                {
                    "host_id": "00:00:00:00:00:03",
                    "dpid": 4,
                    "port_no": 41,
                    "ipv4": ["10.0.0.3"],
                    "ipv6": [],
                    "observed_at": self.now.isoformat(),
                },
            ],
            "links": [
                self._link(1, 12, 2, 21),
                self._link(2, 24, 4, 42),
                self._link(1, 13, 3, 31),
                self._link(3, 34, 4, 41),
            ],
            "stale_links": [],
        }
        self.engine = RouteDecisionEngine(now=lambda: self.now)

    def _link(self, src: int, src_port: int, dst: int, dst_port: int, **extra):
        return {
            "src_dpid": src,
            "src_port_no": src_port,
            "dst_dpid": dst,
            "dst_port_no": dst_port,
            "observed_at": self.now.isoformat(),
            "status": "fresh",
            **extra,
        }

    def _telemetry(self, rates: dict[tuple[int, int], float], *, at=None):
        timestamp = (at or self.now).isoformat()
        return [
            {
                "dpid": dpid,
                "port_no": port,
                "timestamp": timestamp,
                "rx_byte_rate": rate,
                "tx_byte_rate": 0.0,
            }
            for (dpid, port), rate in rates.items()
        ]

    def test_redundant_paths_choose_lower_measured_rate_and_keep_ports(self) -> None:
        result = self.engine.recommend(
            self.topology,
            self._telemetry({(1, 12): 100, (2, 24): 100, (1, 13): 1000, (3, 34): 1000}),
            "10.0.0.1",
            "10.0.0.3",
        )

        self.assertEqual(result["status"], "selected")
        self.assertTrue(result["recommendation_only"])
        self.assertEqual(result["selected_path"]["switches"], [1, 2, 4])
        self.assertNotIn("_signature", result["selected_path"])
        self.assertEqual(
            [
                (link["src_dpid"], link["src_port_no"], link["dst_dpid"], link["dst_port_no"])
                for link in result["selected_path"]["directed_links"]
            ],
            [(1, 12, 2, 21), (2, 24, 4, 42)],
        )
        self.assertEqual(
            result["selected_path"]["cost_breakdown"]["signals_used"],
            ["measured_byte_rate", "hop_count"],
        )

    def test_switch_route_works_but_host_route_requires_observed_attachments(self) -> None:
        switch_result = self.engine.recommend(self.topology, [], 1, 4)
        self.assertEqual(switch_result["status"], "selected")
        self.assertEqual(switch_result["selected_path"]["switches"], [1, 2, 4])

        unknown_host = self.engine.recommend(self.topology, [], "h1", "h3")
        self.assertEqual(unknown_host["status"], "unavailable")
        self.assertIn("Host attachment is absent", unknown_host["reason"])

        undiscovered_hosts = deepcopy(self.topology)
        undiscovered_hosts["hosts"] = []
        undiscovered_hosts["links"] = []
        undiscovered_hosts["link_discovery_status"] = "awaiting_links"
        missing_hosts = self.engine.recommend(
            undiscovered_hosts,
            [],
            "00:00:00:00:00:01",
            "00:00:00:00:00:03",
        )
        self.assertEqual(missing_hosts["status"], "unavailable")
        self.assertIn("Host attachment is absent", missing_hosts["reason"])

    def test_disconnected_or_stale_topology_is_unavailable(self) -> None:
        stale_snapshot = deepcopy(self.topology)
        stale_snapshot["discovery_status"] = "stale"
        stale_result = self.engine.recommend(stale_snapshot, [], 1, 4)
        self.assertEqual(stale_result["status"], "unavailable")

        stale_links = deepcopy(self.topology)
        stale_links["links"][0]["status"] = "stale"
        stale_links["links"][1]["status"] = "stale"
        stale_links["links"][2]["status"] = "stale"
        stale_links["links"][3]["status"] = "stale"
        stale_links["link_discovery_status"] = "stale"
        self.assertEqual(self.engine.recommend(stale_links, [], 1, 4)["status"], "no_path")

    def test_malformed_ports_are_excluded_and_reported(self) -> None:
        malformed = deepcopy(self.topology)
        malformed["links"] = [self._link(1, 0xFFFFFFFE, 2, 21)]
        result = self.engine.recommend(malformed, [], 1, 2)
        self.assertEqual(result["status"], "no_path")
        self.assertIn("malformed", result["unavailable_signals"]["topology"])

    def test_loops_and_duplicate_links_do_not_create_duplicate_candidates(self) -> None:
        graph = deepcopy(self.topology)
        graph["links"] = [
            self._link(1, 12, 2, 21),
            self._link(1, 12, 2, 21),
            self._link(2, 21, 1, 12),
            self._link(2, 24, 4, 42),
        ]
        result = self.engine.recommend(graph, [], 1, 4)
        self.assertEqual(len(result["candidate_paths"]), 1)
        path = result["candidate_paths"][0]["switches"]
        self.assertEqual(path, [1, 2, 4])
        self.assertEqual(len(path), len(set(path)))

    def test_parallel_directed_links_keep_distinct_port_candidates(self) -> None:
        graph = deepcopy(self.topology)
        graph["switches"][1]["ports"].append({"port_no": 22})
        graph["links"] = [
            self._link(1, 12, 2, 21),
            self._link(1, 13, 2, 22),
        ]
        result = self.engine.recommend(graph, [], 1, 2)
        self.assertEqual(len(result["candidate_paths"]), 2)
        self.assertEqual(
            [
                path["directed_links"][0]["src_port_no"]
                for path in result["candidate_paths"]
            ],
            [12, 13],
        )

    def test_no_path_is_explicit_for_disconnected_switches(self) -> None:
        disconnected = deepcopy(self.topology)
        disconnected["links"] = []
        disconnected["link_discovery_status"] = "awaiting_links"
        result = self.engine.recommend(disconnected, [], 1, 4)
        self.assertEqual(result["status"], "no_path")
        self.assertIsNone(result["selected_path"])
        self.assertTrue(result["recommendation_only"])

    def test_missing_or_stale_telemetry_is_omitted_not_fabricated(self) -> None:
        missing = self.engine.recommend(self.topology, [], 1, 4)
        self.assertEqual(missing["selected_path"]["cost_breakdown"]["signals_used"], ["hop_count"])
        self.assertIn("measured_byte_rate", missing["unavailable_signals"])

        stale_samples = self._telemetry(
            {(1, 12): 1, (2, 24): 1, (1, 13): 100, (3, 34): 100},
            at=self.now - timedelta(seconds=30),
        )
        stale = self.engine.recommend(self.topology, stale_samples, 1, 4)
        self.assertIn("measured_byte_rate", stale["unavailable_signals"])

    def test_unavailable_and_incompatible_models_fall_back_to_measurements(self) -> None:
        unavailable = load_trusted_model_signals(None)
        self.assertEqual(unavailable["status"], "unavailable")

        signals = self._telemetry({(1, 12): 10, (2, 24): 10, (1, 13): 20, (3, 34): 20})
        no_model = self.engine.recommend(self.topology, signals, 1, 4)
        self.assertIn("future_congestion_prediction", no_model["unavailable_signals"])
        self.assertIn("measured_byte_rate", no_model["signals_used"])

        incompatible = {
            "status": "available",
            "artifact_type": ARTIFACT_TYPE,
            "artifact_schema_version": ARTIFACT_SCHEMA_VERSION,
            "feature_schema": ["unexpected_feature"],
            "training_timestamp": self.now.isoformat(),
            "target": {
                "name": "future_port_congestion",
                "physical_capacity_known": False,
                "threshold_bytes_per_second": 1000,
                "horizon_seconds": 10,
            },
            "predictions": [],
        }
        invalid_model = self.engine.recommend(
            self.topology,
            signals,
            1,
            4,
            model_signals=incompatible,
        )
        self.assertIn("future_congestion_prediction", invalid_model["unavailable_signals"])
        self.assertIn("measured_byte_rate", invalid_model["signals_used"])

    def test_stale_model_or_prediction_is_not_used(self) -> None:
        model = {
            "status": "available",
            "artifact_type": ARTIFACT_TYPE,
            "artifact_schema_version": ARTIFACT_SCHEMA_VERSION,
            "feature_schema": feature_names_for_lags(3),
            "training_timestamp": (self.now - timedelta(days=40)).isoformat(),
            "target": {
                "name": "future_port_congestion",
                "physical_capacity_known": False,
                "threshold_bytes_per_second": 1000,
                "horizon_seconds": 10,
            },
            "predictions": [{
                "dpid": 1,
                "port_no": 12,
                "sample_timestamp": self.now.isoformat(),
                "congestion_probability": 0.99,
            }],
        }
        stale_model = self.engine.recommend(self.topology, [], 1, 4, model_signals=model)
        self.assertIn("future_congestion_prediction", stale_model["unavailable_signals"])
        self.assertNotIn(
            "future_congestion_probability",
            stale_model["selected_path"]["cost_breakdown"]["signals_used"],
        )

        model["training_timestamp"] = self.now.isoformat()
        model["predictions"][0]["sample_timestamp"] = (
            self.now - timedelta(seconds=30)
        ).isoformat()
        stale_prediction = self.engine.recommend(self.topology, [], 1, 4, model_signals=model)
        self.assertIn("future_congestion_prediction", stale_prediction["unavailable_signals"])

    def test_trusted_local_model_uses_step_two_schema_and_recent_store_features(self) -> None:
        with TemporaryDirectory() as directory:
            store = HistoricalTelemetryStore(Path(directory) / "telemetry.sqlite3")
            samples = []
            for seconds_ago in (3, 2, 1, 0):
                timestamp = (self.now - timedelta(seconds=seconds_ago)).isoformat()
                samples.append(
                    PortStatistics(
                        dpid=1,
                        port_no=12,
                        timestamp=timestamp,
                        rx_packets=100 + seconds_ago,
                        tx_packets=100 + seconds_ago,
                        rx_bytes=1000 + seconds_ago,
                        tx_bytes=1000 + seconds_ago,
                        rx_errors=0,
                        tx_errors=0,
                        rx_dropped=0,
                        tx_dropped=0,
                        rx_packet_rate=1,
                        tx_packet_rate=1,
                        rx_byte_rate=10,
                        tx_byte_rate=10,
                    )
                )
            store.insert_samples(samples)

            schema = feature_names_for_lags(3)
            metadata = {
                "artifact_type": ARTIFACT_TYPE,
                "artifact_schema_version": ARTIFACT_SCHEMA_VERSION,
                "feature_schema": schema,
                "training_timestamp": (self.now - timedelta(days=1)).isoformat(),
                "target": {
                    "name": "future_port_congestion",
                    "threshold_bytes_per_second": 1000,
                    "horizon_seconds": 10,
                    "physical_capacity_known": False,
                },
            }
            artifact = {
                "artifact_type": ARTIFACT_TYPE,
                "artifact_schema_version": ARTIFACT_SCHEMA_VERSION,
                "feature_names": schema,
                "metadata": metadata,
                "model": _SyntheticTrustedClassifier(),
            }
            model_path = Path(directory) / "trusted-model.joblib"
            joblib.dump(artifact, model_path)

            signals = load_trusted_model_signals(
                store,
                model_path,
                now=self.now,
            )

        self.assertEqual(signals["status"], "available")
        self.assertEqual(signals["predictions"][0]["dpid"], 1)
        self.assertEqual(signals["predictions"][0]["port_no"], 12)
        self.assertEqual(signals["predictions"][0]["congestion_probability"], 0.6)

    def test_compatible_fresh_model_predictions_can_change_route_score(self) -> None:
        feature_schema = feature_names_for_lags(3)
        predictions = [
            {
                "dpid": dpid,
                "port_no": port,
                "sample_timestamp": self.now.isoformat(),
                "congestion_probability": probability,
            }
            for dpid, port, probability in (
                (1, 12, 0.9),
                (2, 24, 0.9),
                (1, 13, 0.1),
                (3, 34, 0.1),
            )
        ]
        model = {
            "status": "available",
            "artifact_type": ARTIFACT_TYPE,
            "artifact_schema_version": ARTIFACT_SCHEMA_VERSION,
            "feature_schema": feature_schema,
            "training_timestamp": self.now.isoformat(),
            "target": {
                "name": "future_port_congestion",
                "physical_capacity_known": False,
                "threshold_bytes_per_second": 1000,
                "horizon_seconds": 10,
            },
            "predictions": predictions,
        }
        result = self.engine.recommend(self.topology, [], 1, 4, model_signals=model)
        self.assertEqual(result["selected_path"]["switches"], [1, 3, 4])
        self.assertIn("future_congestion_probability", result["signals_used"])

    def test_ties_are_deterministic_and_hysteresis_observes_cooldown(self) -> None:
        tie = self.engine.recommend(self.topology, [], 1, 4)
        self.assertEqual(tie["selected_path"]["switches"], [1, 2, 4])
        repeated_tie = self.engine.recommend(self.topology, [], 1, 4)
        self.assertEqual(
            [path["total_cost"] for path in repeated_tie["candidate_paths"]],
            [path["total_cost"] for path in tie["candidate_paths"]],
        )
        self.assertEqual(
            [path["switches"] for path in repeated_tie["candidate_paths"]],
            [path["switches"] for path in tie["candidate_paths"]],
        )

        clock = {"now": self.now}
        cooldown_engine = RouteDecisionEngine(
            RoutingConfig(minimum_improvement=0, cooldown_seconds=20),
            now=lambda: clock["now"],
        )
        before = self._telemetry({(1, 12): 10, (2, 24): 10, (1, 13): 100, (3, 34): 100})
        initial = cooldown_engine.recommend(self.topology, before, 1, 4)
        self.assertEqual(initial["selected_path"]["switches"], [1, 2, 4])
        after = self._telemetry({(1, 12): 100, (2, 24): 100, (1, 13): 10, (3, 34): 10})
        during_cooldown = cooldown_engine.recommend(self.topology, after, 1, 4)
        self.assertEqual(during_cooldown["selected_path"]["switches"], [1, 2, 4])
        self.assertIn("Cooldown", during_cooldown["reason"])

        clock["now"] = self.now + timedelta(seconds=21)
        refreshed_topology = deepcopy(self.topology)
        refreshed_topology["observed_at"] = clock["now"].isoformat()
        for link in refreshed_topology["links"]:
            link["observed_at"] = clock["now"].isoformat()
        after_cooldown = cooldown_engine.recommend(
            refreshed_topology,
            self._telemetry(
                {(1, 12): 100, (2, 24): 100, (1, 13): 10, (3, 34): 10},
                at=clock["now"],
            ),
            1,
            4,
        )
        self.assertEqual(after_cooldown["selected_path"]["switches"], [1, 3, 4])
        self.assertIn("clears cooldown", after_cooldown["reason"])

    def test_minimum_improvement_margin_retains_incumbent(self) -> None:
        engine = RouteDecisionEngine(
            RoutingConfig(
                telemetry_weight=1,
                prediction_weight=0,
                hop_weight=0,
                minimum_improvement=0.6,
                cooldown_seconds=0,
            ),
            now=lambda: self.now,
        )
        first = self._telemetry({(1, 12): 100, (2, 24): 100, (1, 13): 200, (3, 34): 200})
        self.assertEqual(engine.recommend(self.topology, first, 1, 4)["selected_path"]["switches"], [1, 2, 4])
        reverse = self._telemetry({(1, 12): 200, (2, 24): 200, (1, 13): 100, (3, 34): 100})
        retained = engine.recommend(self.topology, reverse, 1, 4)
        self.assertEqual(retained["selected_path"]["switches"], [1, 2, 4])
        self.assertIn("below", retained["reason"])


if __name__ == "__main__":
    main()
