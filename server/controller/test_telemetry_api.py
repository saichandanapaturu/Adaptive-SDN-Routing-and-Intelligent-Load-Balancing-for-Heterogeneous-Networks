#!/usr/bin/env python3
"""Deterministic tests for the local telemetry API; these are not live SDN tests."""

from datetime import datetime, timedelta, timezone
from http.client import HTTPResponse
from types import SimpleNamespace
from typing import Any, Dict
from unittest import TestCase, main
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from server.controller.statistics import OFPP_LOCAL, OpenFlowStatisticsCollector
from server.controller.telemetry_api import TelemetryApiState, TelemetryService


class TelemetryApiTests(TestCase):
    def setUp(self) -> None:
        self.collector = OpenFlowStatisticsCollector()
        self.switches = []
        self.now = datetime(2026, 10, 19, 8, 0, 10, tzinfo=timezone.utc)
        self.state = TelemetryApiState(
            self.collector,
            lambda: list(self.switches),
            lambda: {"nodes": [{"id": "switch-1"}], "links": []},
            lambda: [{"id": "controller-1", "type": "link_failed"}],
            lambda: [{"source_mac": "00:00:00:00:00:01", "status": "blocked"}],
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

    def test_topology_events_and_forwarding_endpoints_expose_controller_state(self) -> None:
        self.assertEqual(self.get_json("/api/telemetry/topology"), (200, {"nodes": [{"id": "switch-1"}], "links": []}))
        self.assertEqual(self.get_json("/api/telemetry/events"), (200, {"events": [{"id": "controller-1", "type": "link_failed"}]}))
        self.assertEqual(self.get_json("/api/telemetry/forwarding"), (200, {"flows": [{"source_mac": "00:00:00:00:00:01", "status": "blocked"}]}))

    def test_browser_cors_is_limited_to_loopback_origins(self) -> None:
        local_request = Request(
            self.base_url + "/api/telemetry/topology",
            headers={"Origin": "http://localhost:5173"},
        )
        with urlopen(local_request, timeout=2) as response:
            self.assertEqual(response.headers.get("Access-Control-Allow-Origin"), "http://localhost:5173")

        remote_request = Request(
            self.base_url + "/api/telemetry/topology",
            headers={"Origin": "https://example.invalid"},
        )
        with urlopen(remote_request, timeout=2) as response:
            self.assertIsNone(response.headers.get("Access-Control-Allow-Origin"))

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


if __name__ == "__main__":
    main()
