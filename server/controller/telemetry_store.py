"""SQLite history of processed OpenFlow port samples.

Only samples produced by ``OpenFlowStatisticsCollector`` from real OpenFlow
replies are written here. The store is the training source for the Random
Forest congestion model; it never generates or back-fills samples.
"""

from __future__ import annotations

import os
import sqlite3
from datetime import datetime
from pathlib import Path
from threading import Lock
from typing import Any, Dict, Iterable, List

DEFAULT_DB_PATH = Path(__file__).resolve().parents[1] / "data" / "telemetry.sqlite3"

_COLUMNS = (
    "dpid", "port_no", "ts", "timestamp",
    "rx_packets", "tx_packets", "rx_bytes", "tx_bytes",
    "rx_errors", "tx_errors", "rx_dropped", "tx_dropped",
    "rx_packet_rate", "tx_packet_rate", "rx_byte_rate", "tx_byte_rate",
)


def configured_db_path() -> Path:
    return Path(os.getenv("AIFE_TELEMETRY_DB", str(DEFAULT_DB_PATH)))


class TelemetryStore:
    """Append-only port-sample history keyed by (DPID, port, time)."""

    def __init__(self, path: Path | str | None = None) -> None:
        self.path = Path(path) if path is not None else configured_db_path()
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._lock = Lock()
        self._connection = sqlite3.connect(str(self.path), check_same_thread=False)
        self._connection.execute(
            """
            CREATE TABLE IF NOT EXISTS port_samples (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                dpid INTEGER NOT NULL,
                port_no INTEGER NOT NULL,
                ts REAL NOT NULL,
                timestamp TEXT NOT NULL,
                rx_packets INTEGER NOT NULL,
                tx_packets INTEGER NOT NULL,
                rx_bytes INTEGER NOT NULL,
                tx_bytes INTEGER NOT NULL,
                rx_errors INTEGER NOT NULL,
                tx_errors INTEGER NOT NULL,
                rx_dropped INTEGER NOT NULL,
                tx_dropped INTEGER NOT NULL,
                rx_packet_rate REAL NOT NULL,
                tx_packet_rate REAL NOT NULL,
                rx_byte_rate REAL NOT NULL,
                tx_byte_rate REAL NOT NULL
            )
            """
        )
        self._connection.execute(
            "CREATE INDEX IF NOT EXISTS port_samples_port_time ON port_samples (dpid, port_no, ts)"
        )
        self._connection.commit()

    def record(self, samples: Iterable[Any]) -> int:
        """Persist processed ``PortStatistics`` samples; returns rows written.

        The first sample of a port has no previous counter, so its rates are
        not measured. It is still stored; feature extraction skips it.
        """
        rows = []
        for sample in samples:
            values = sample.as_dict()
            values["ts"] = datetime.fromisoformat(values["timestamp"]).timestamp()
            rows.append(tuple(values[column] for column in _COLUMNS))
        if not rows:
            return 0
        placeholders = ", ".join("?" for _ in _COLUMNS)
        with self._lock:
            self._connection.executemany(
                f"INSERT INTO port_samples ({', '.join(_COLUMNS)}) VALUES ({placeholders})",
                rows,
            )
            self._connection.commit()
        return len(rows)

    def load(self) -> List[Dict[str, Any]]:
        """Return every stored sample ordered by port and time."""
        with self._lock:
            cursor = self._connection.execute(
                f"SELECT {', '.join(_COLUMNS)} FROM port_samples ORDER BY dpid, port_no, ts"
            )
            return [dict(zip(_COLUMNS, row)) for row in cursor.fetchall()]

    def close(self) -> None:
        with self._lock:
            self._connection.close()
