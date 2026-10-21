#!/usr/bin/env python3
"""Deterministic tests for the local telemetry API; these are not live SDN tests."""

from datetime import datetime, timedelta, timezone
from http.client import HTTPResponse
from types import SimpleNamespace
from typing import Any, Dict
from unittest import TestCase, main
from urllib.error import HTTPError
from urllib.request import urlopen

from server.controller.statistics import OFPP_LOCAL, OpenFlowStatisticsCollector
from server.controller.telemetry_api import TelemetryApiState, TelemetryService
from server.controller.topology_discovery import TopologyDiscoveryState


class TelemetryApiTests(TestCase):
    def setUp(self) -> None:
        self.collector = OpenFlowStatisticsCollector()
        self.switches = []
        self.now = datetime(2026, 10, 19, 8, 0, 10, tzinfo=timezone.utc)
        self.state = TelemetryApiState(
            self.collector,
            lambda: list(self.switches),
            stale_after_seconds=5,
            now=lambda: self.now,
        )
        self.service = TelemetryService(self.state, host="127.0.0.1", port=0)
        self.service.start()
        host, port = self.service.address
        self.base_url = f"http://{host}:{port}"

    def tearDown(self) -> None:
        self.service.shutdown()

    def get_json(self, path: str) -> tuple[int, Dict[str, Any]]:
        try:
            with urlopen(self.base_url + path, timeout=2) as response:
                return response.status, self._read(response)
        except HTTPError as error:
            return error.code, self._read(error)

    @staticmethod
    def _read(response: HTTPResponse) -> Dict[str, Any]:
        import json

        return json.loads(response.read().decode("utf-8"))

    def test_no_switches_and_no_statistics(self) -> None:
        status, health = self.get_json("/api/telemetry/health")
        self.assertEqual(status, 200)
        self.assertFalse(health["controller_connected"])
        self.assertFalse(health["statistics_received"])
        self.assertEqual(health["data_status"], "unavailable")

        status, body = self.get_json("/api/telemetry/ports")
        self.assertEqual(status, 503)
        self.assertEqual(body["error"], "statistics_unavailable")

    def test_connected_switch_without_statistics(self) -> None:
        self.switches.append({"dpid": 1, "status": "connected"})
        status, body = self.get_json("/api/telemetry/switches")
        self.assertEqual(status, 200)
        self.assertEqual(body["switches"], self.switches)
        status, health = self.get_json("/api/telemetry/health")
        self.assertEqual(status, 200)
        self.assertTrue(health["controller_connected"])
        self.assertFalse(health["statistics_received"])

    def test_valid_statistics_local_port_excluded_and_summary(self) -> None:
        self.switches.extend([
            {"dpid": 1, "status": "connected"},
            {"dpid": 2, "status": "connected"},
        ])
        first = SimpleNamespace(
            port_no=2, rx_packets=100, tx_packets=80, rx_bytes=1000, tx_bytes=800,
            rx_errors=1, tx_errors=2, rx_dropped=3, tx_dropped=4,
        )
        second = SimpleNamespace(
            port_no=2, rx_packets=160, tx_packets=120, rx_bytes=1600, tx_bytes=1200,
            rx_errors=1, tx_errors=2, rx_dropped=3, tx_dropped=4,
        )
        local = SimpleNamespace(
            port_no=OFPP_LOCAL, rx_packets=999, tx_packets=999, rx_bytes=999,
            tx_bytes=999, rx_errors=0, tx_errors=0, rx_dropped=0, tx_dropped=0,
        )
        sample_time = self.now - timedelta(seconds=2)
        self.collector.process_port_stats(1, [first, local], received_at=sample_time, received_monotonic=10)
        self.collector.process_port_stats(1, [second, local], received_at=self.now, received_monotonic=12)

        status, body = self.get_json("/api/telemetry/ports")
        self.assertEqual(status, 200)
        self.assertEqual(len(body["ports"]), 1)
        self.assertEqual(body["ports"][0]["port_no"], 2)
        self.assertEqual(body["ports"][0]["rx_byte_rate"], 300.0)
        self.assertEqual(body["ports"][0]["tx_packet_rate"], 20.0)

        status, summary = self.get_json("/api/telemetry/summary")
        self.assertEqual(status, 200)
        self.assertEqual(summary["switches_connected"], 2)
        self.assertEqual(summary["ports_with_statistics"], 1)
        self.assertEqual(summary["total_rx_byte_rate"], 300.0)
        self.assertEqual(summary["total_tx_byte_rate"], 200.0)
        self.assertEqual(summary["data_status"], "fresh")

    def test_stale_statistics_are_marked_stale(self) -> None:
        stat = SimpleNamespace(
            port_no=2, rx_packets=1, tx_packets=1, rx_bytes=10, tx_bytes=10,
            rx_errors=0, tx_errors=0, rx_dropped=0, tx_dropped=0,
        )
        self.collector.process_port_stats(1, [stat], received_at=self.now - timedelta(seconds=10), received_monotonic=1)
        status, health = self.get_json("/api/telemetry/health")
        self.assertEqual(status, 200)
        self.assertTrue(health["statistics_received"])
        self.assertEqual(health["data_status"], "stale")

    def test_topology_endpoint_serializes_discovery_snapshot(self) -> None:
        topology = TopologyDiscoveryState(
            discovery_enabled=True,
            now=lambda: self.now,
        )
        topology.switch_enter(1, [1, 2], observed_at=self.now)
        topology.switch_enter(2, [3], observed_at=self.now)
        topology.link_add(1, 2, 2, 3, observed_at=self.now)
        topology.host_add(
            1,
            1,
            "00:00:00:00:00:01",
            ipv4=["10.0.0.1"],
            observed_at=self.now,
        )
        self.state.topology_provider = topology.snapshot

        status, body = self.get_json("/api/telemetry/topology")
        self.assertEqual(status, 200)
        self.assertEqual(body["discovery_status"], "fresh")
        self.assertEqual(body["link_discovery_status"], "fresh")
        self.assertEqual(body["switches"][0]["ports"][1]["role"], "switch_link")
        self.assertEqual(body["hosts"][0]["ipv4"], ["10.0.0.1"])
        self.assertEqual(
            body["links"],
            [
                {
                    "src_dpid": 1,
                    "src_port_no": 2,
                    "dst_dpid": 2,
                    "dst_port_no": 3,
                    "observed_at": self.now.isoformat(),
                    "status": "fresh",
                }
            ],
        )

    def test_topology_endpoint_reports_unconfigured_discovery(self) -> None:
        status, body = self.get_json("/api/telemetry/topology")
        self.assertEqual(status, 200)
        self.assertEqual(body["discovery_status"], "unavailable")
        self.assertEqual(body["link_discovery_status"], "unavailable")
        self.assertEqual(body["links"], [])

    def test_route_endpoint_requires_endpoints_and_preserves_recommendation_shape(self) -> None:
        status, body = self.get_json("/api/telemetry/route?source=1")
        self.assertEqual(status, 400)
        self.assertEqual(body["error"], "invalid_route_request")

        self.state.route_provider = lambda source, destination: {
            "status": "unavailable",
            "source": source,
            "destination": destination,
            "candidate_paths": [],
            "selected_path": None,
            "signals_used": [],
            "unavailable_signals": {"topology": "fixture"},
            "decision_timestamp": self.now.isoformat(),
            "reason": "fixture recommendation only",
            "recommendation_only": True,
        }
        status, body = self.get_json("/api/telemetry/route?source=h1&destination=h3")
        self.assertEqual(status, 200)
        self.assertEqual(body["source"], "h1")
        self.assertEqual(body["destination"], "h3")
        self.assertTrue(body["recommendation_only"])


if __name__ == "__main__":
    main()
