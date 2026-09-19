"""OpenFlow port-statistics collection for the AIFE controller.

This module contains no synthetic traffic generation, prediction, routing, or
ML logic. It converts cumulative OpenFlow counters into interval rates using
actual elapsed time between replies.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from time import monotonic
from typing import Any, Dict, Iterable, List, Optional, Tuple


# OpenFlow 1.3 OFPP_LOCAL. It is the switch's internal port and is not a
# physical/data-plane port for normal congestion analysis.
OFPP_LOCAL = 0xFFFFFFFE


@dataclass(frozen=True)
class PortStatistics:
    """One processed OpenFlow port-statistics sample."""

    dpid: int
    port_no: int
    timestamp: str
    rx_packets: int
    tx_packets: int
    rx_bytes: int
    tx_bytes: int
    rx_errors: int
    tx_errors: int
    rx_dropped: int
    tx_dropped: int
    rx_packet_rate: float
    tx_packet_rate: float
    rx_byte_rate: float
    tx_byte_rate: float

    def as_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class _CounterSample:
    timestamp_monotonic: float
    rx_packets: int
    tx_packets: int
    rx_bytes: int
    tx_bytes: int


class OpenFlowStatisticsCollector:
    """Maintain latest raw counters and derived rates per switch port."""

    def __init__(self) -> None:
        self._previous: Dict[Tuple[int, int], _CounterSample] = {}
        self._latest: Dict[Tuple[int, int], PortStatistics] = {}

    @staticmethod
    def _counter(stat: Any, name: str) -> int:
        """Read an OpenFlow counter defensively as a non-negative integer."""
        value = getattr(stat, name, 0)
        try:
            return max(0, int(value))
        except (TypeError, ValueError):
            return 0

    @staticmethod
    def _rate(current: int, previous: int, elapsed: float) -> float:
        """Convert a cumulative-counter delta to a per-second rate."""
        if elapsed <= 0 or current < previous:
            # A counter reset/restart is not negative traffic.
            return 0.0
        return (current - previous) / elapsed

    def process_port_stats(
        self,
        dpid: int,
        stats: Iterable[Any],
        *,
        received_at: Optional[datetime] = None,
        received_monotonic: Optional[float] = None,
    ) -> List[PortStatistics]:
        """Process one OpenFlow port-statistics reply.

        The OpenFlow reply contains cumulative counters. Previous counters are
        keyed by (DPID, port number), and rates use the actual elapsed monotonic
        time between samples. OFPP_LOCAL is skipped entirely.
        """
        now_monotonic = monotonic() if received_monotonic is None else received_monotonic
        timestamp = (received_at or datetime.now(timezone.utc)).isoformat()
        processed: List[PortStatistics] = []

        for stat in stats:
            port_no = self._counter(stat, "port_no")
            if port_no == OFPP_LOCAL:
                continue

            rx_packets = self._counter(stat, "rx_packets")
            tx_packets = self._counter(stat, "tx_packets")
            rx_bytes = self._counter(stat, "rx_bytes")
            # Keep RX and TX byte mappings explicit for future feature work.
            tx_bytes = self._counter(stat, "tx_bytes")
            previous = self._previous.get((dpid, port_no))
            elapsed = now_monotonic - previous.timestamp_monotonic if previous else 0.0

            sample = PortStatistics(
                dpid=dpid,
                port_no=port_no,
                timestamp=timestamp,
                rx_packets=rx_packets,
                tx_packets=tx_packets,
                rx_bytes=rx_bytes,
                tx_bytes=tx_bytes,
                rx_errors=self._counter(stat, "rx_errors"),
                tx_errors=self._counter(stat, "tx_errors"),
                rx_dropped=self._counter(stat, "rx_dropped"),
                tx_dropped=self._counter(stat, "tx_dropped"),
                rx_packet_rate=self._rate(rx_packets, previous.rx_packets, elapsed) if previous else 0.0,
                tx_packet_rate=self._rate(tx_packets, previous.tx_packets, elapsed) if previous else 0.0,
                rx_byte_rate=self._rate(rx_bytes, previous.rx_bytes, elapsed) if previous else 0.0,
                tx_byte_rate=self._rate(tx_bytes, previous.tx_bytes, elapsed) if previous else 0.0,
            )
            self._previous[(dpid, port_no)] = _CounterSample(
                timestamp_monotonic=now_monotonic,
                rx_packets=rx_packets,
                tx_packets=tx_packets,
                rx_bytes=rx_bytes,
                tx_bytes=tx_bytes,
            )
            self._latest[(dpid, port_no)] = sample
            processed.append(sample)

        return processed

    def latest(self) -> List[PortStatistics]:
        """Return the latest processed sample for each non-local port."""
        return list(self._latest.values())

    def latest_as_dicts(self) -> List[Dict[str, Any]]:
        """Return latest samples in a JSON/feature-engineering-friendly form."""
        return [sample.as_dict() for sample in self.latest()]
