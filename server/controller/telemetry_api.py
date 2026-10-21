"""Local telemetry HTTP API backed by the OS-Ken statistics collector.

The service is intentionally small and dependency-free. It is started in the
same Python process as OS-Ken, binds to loopback by default, and never creates
or fabricates telemetry values.
"""

from __future__ import annotations

import json
import logging
import os
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from typing import Any, Callable, Dict, List, Optional
from urllib.parse import urlparse

try:
    from server.controller.statistics import OpenFlowStatisticsCollector
except ImportError:
    from statistics import OpenFlowStatisticsCollector


LOG = logging.getLogger("aife.telemetry_api")
DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 8765
DEFAULT_STALE_SECONDS = 5.0


class TelemetryApiState:
    """Read-only API view over one controller-owned collector and switch map."""

    def __init__(
        self,
        collector: OpenFlowStatisticsCollector,
        switch_provider: Callable[[], List[Dict[str, Any]]],
        topology_provider: Optional[Callable[[], Dict[str, Any]]] = None,
        events_provider: Optional[Callable[[], List[Dict[str, Any]]]] = None,
        forwarding_provider: Optional[Callable[[], List[Dict[str, Any]]]] = None,
        model_provider: Optional[Callable[[], Dict[str, Any]]] = None,
        *,
        stale_after_seconds: float = DEFAULT_STALE_SECONDS,
        now: Optional[Callable[[], datetime]] = None,
    ) -> None:
        self.collector = collector
        self.switch_provider = switch_provider
        self.topology_provider = topology_provider or (lambda: {"nodes": [], "links": []})
        self.events_provider = events_provider or (lambda: [])
        self.forwarding_provider = forwarding_provider or (lambda: [])
        self.model_provider = model_provider or (
            lambda: {"model_type": "random_forest", "status": "unavailable", "reason": "predictor_not_configured"}
        )
        self.stale_after_seconds = max(0.1, stale_after_seconds)
        self._now = now or (lambda: datetime.now(timezone.utc))

    def switches(self) -> List[Dict[str, Any]]:
        return list(self.switch_provider())

    def ports(self) -> List[Dict[str, Any]]:
        return self.collector.latest_as_dicts()

    def _last_update(self) -> Optional[datetime]:
        samples = self.collector.latest()
        if not samples:
            return None
        timestamps = []
        for sample in samples:
            try:
                timestamps.append(datetime.fromisoformat(sample.timestamp))
            except ValueError:
                continue
        return max(timestamps) if timestamps else None

    def _data_status(self) -> str:
        last_update = self._last_update()
        if last_update is None:
            return "unavailable"
        age = (self._now() - last_update).total_seconds()
        return "stale" if age > self.stale_after_seconds else "fresh"

    def health(self) -> Dict[str, Any]:
        switches = self.switches()
        data_status = self._data_status()
        return {
            "api_running": True,
            "controller_connected": bool(switches),
            "switches_connected": len(switches),
            "statistics_received": bool(self.collector.latest()),
            "data_status": data_status,
            "stale_after_seconds": self.stale_after_seconds,
        }

    def summary(self) -> Dict[str, Any]:
        samples = self.collector.latest()
        last_update = self._last_update()
        return {
            "switches_connected": len(self.switches()),
            "ports_with_statistics": len(samples),
            "total_rx_byte_rate": sum(sample.rx_byte_rate for sample in samples),
            "total_tx_byte_rate": sum(sample.tx_byte_rate for sample in samples),
            "total_rx_packet_rate": sum(sample.rx_packet_rate for sample in samples),
            "total_tx_packet_rate": sum(sample.tx_packet_rate for sample in samples),
            "last_statistics_update": last_update.isoformat() if last_update else None,
            "data_status": self._data_status(),
        }


class _TelemetryRequestHandler(BaseHTTPRequestHandler):
    """HTTP handler for the three read-only telemetry endpoints."""

    server: "TelemetryHTTPServer"

    def log_message(self, format: str, *args: Any) -> None:
        LOG.info("telemetry %s - %s", self.address_string(), format % args)

    def _send_json(self, payload: Dict[str, Any], status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, separators=(",", ":"), sort_keys=True).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        origin = self.headers.get("Origin")
        parsed_origin = urlparse(origin) if origin else None
        if parsed_origin and parsed_origin.scheme in {"http", "https"} and parsed_origin.hostname in {"localhost", "127.0.0.1", "::1"}:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802 - required by BaseHTTPRequestHandler
        path = urlparse(self.path).path.rstrip("/") or "/"
        state = self.server.state

        if path == "/api/telemetry/health":
            self._send_json(state.health())
            return
        if path == "/api/telemetry/switches":
            self._send_json({"switches": state.switches()})
            return
        if path == "/api/telemetry/topology":
            self._send_json(state.topology_provider())
            return
        if path == "/api/telemetry/events":
            self._send_json({"events": state.events_provider()})
            return
        if path == "/api/telemetry/forwarding":
            self._send_json({"flows": state.forwarding_provider()})
            return
        if path == "/api/telemetry/model":
            self._send_json(state.model_provider())
            return
        if path == "/api/telemetry/ports":
            health = state.health()
            if not health["statistics_received"]:
                self._send_json(
                    {"error": "statistics_unavailable", "message": "No OpenFlow statistics have been received yet."},
                    HTTPStatus.SERVICE_UNAVAILABLE,
                )
                return
            self._send_json({"data_status": health["data_status"], "ports": state.ports()})
            return
        if path == "/api/telemetry/summary":
            health = state.health()
            if not health["statistics_received"]:
                self._send_json(
                    {"error": "statistics_unavailable", "message": "No OpenFlow statistics have been received yet."},
                    HTTPStatus.SERVICE_UNAVAILABLE,
                )
                return
            self._send_json(state.summary())
            return

        self._send_json(
            {"error": "not_found", "message": "Unknown telemetry endpoint."},
            HTTPStatus.NOT_FOUND,
        )


class TelemetryHTTPServer(ThreadingHTTPServer):
    allow_reuse_address = True

    def __init__(self, server_address: tuple[str, int], state: TelemetryApiState) -> None:
        self.state = state
        super().__init__(server_address, _TelemetryRequestHandler)


class TelemetryService:
    """Lifecycle wrapper for the controller-side localhost HTTP service."""

    def __init__(
        self,
        state: TelemetryApiState,
        *,
        host: Optional[str] = None,
        port: Optional[int] = None,
    ) -> None:
        configured_host = host or os.getenv("AIFE_TELEMETRY_HOST", DEFAULT_HOST)
        configured_port = port if port is not None else int(os.getenv("AIFE_TELEMETRY_PORT", DEFAULT_PORT))
        if configured_host not in {"127.0.0.1", "::1", "localhost"}:
            raise ValueError("Telemetry API must bind to loopback; refusing a public interface")
        self.server = TelemetryHTTPServer((configured_host, configured_port), state)
        self.thread: Optional[Thread] = None

    @property
    def address(self) -> tuple[str, int]:
        host, port = self.server.server_address[:2]
        return host, port

    def start(self) -> None:
        if self.thread and self.thread.is_alive():
            return
        self.thread = Thread(target=self.server.serve_forever, name="aife-telemetry-api", daemon=True)
        self.thread.start()
        LOG.info("Telemetry API listening on http://%s:%s", *self.address)

    def shutdown(self) -> None:
        self.server.shutdown()
        self.server.server_close()
        if self.thread:
            self.thread.join(timeout=2)
            self.thread = None
