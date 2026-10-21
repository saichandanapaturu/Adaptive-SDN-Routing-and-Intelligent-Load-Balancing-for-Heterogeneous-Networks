"""SQLite persistence for historical OpenFlow port statistics."""

from __future__ import annotations

import logging
import os
import queue
import sqlite3
import threading
from contextlib import closing
from datetime import datetime, timedelta, timezone
from pathlib import Path
from time import monotonic
from typing import Iterable, Optional, Union

try:
    from server.controller.statistics import OFPP_LOCAL, PortStatistics
except ImportError:
    from statistics import OFPP_LOCAL, PortStatistics


LOG = logging.getLogger("aife.telemetry_storage")
DEFAULT_DATABASE_PATH = Path.home() / ".local" / "share" / "aife" / "telemetry.sqlite3"
_CLEANUP_INTERVAL_SECONDS = 3600
_MAX_HISTORY_LIMIT = 10000
_SQLITE_TIMEOUT_SECONDS = 5.0


def _utc_timestamp(value: Union[datetime, str]) -> str:
    if isinstance(value, str):
        parsed = datetime.fromisoformat(value)
    else:
        parsed = value
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc).isoformat()


class HistoricalTelemetryStore:
    """Append actual collector samples and query them in sample-time order."""

    def __init__(self, database_path: Union[str, Path]) -> None:
        self.database_path = Path(database_path).expanduser()
        self.database_path.parent.mkdir(parents=True, exist_ok=True)
        with closing(self._connect()) as connection:
            connection.execute("PRAGMA journal_mode=WAL")
            connection.executescript(
                """
                CREATE TABLE IF NOT EXISTS port_samples (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    sample_timestamp TEXT NOT NULL,
                    dpid INTEGER NOT NULL,
                    port_no INTEGER NOT NULL,
                    rx_bytes INTEGER NOT NULL,
                    tx_bytes INTEGER NOT NULL,
                    rx_packets INTEGER NOT NULL,
                    tx_packets INTEGER NOT NULL,
                    rx_byte_rate REAL NOT NULL,
                    tx_byte_rate REAL NOT NULL,
                    rx_packet_rate REAL NOT NULL,
                    tx_packet_rate REAL NOT NULL,
                    rx_errors INTEGER NOT NULL,
                    tx_errors INTEGER NOT NULL,
                    rx_dropped INTEGER NOT NULL,
                    tx_dropped INTEGER NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_port_samples_switch_port_time
                    ON port_samples (dpid, port_no, sample_timestamp);
                CREATE INDEX IF NOT EXISTS idx_port_samples_time
                    ON port_samples (sample_timestamp);
                """
            )

    def _connect(self) -> sqlite3.Connection:
        return sqlite3.connect(self.database_path, timeout=_SQLITE_TIMEOUT_SECONDS)

    def insert_samples(self, samples: Iterable[PortStatistics]) -> int:
        rows = [
            (
                _utc_timestamp(sample.timestamp),
                sample.dpid,
                sample.port_no,
                sample.rx_bytes,
                sample.tx_bytes,
                sample.rx_packets,
                sample.tx_packets,
                sample.rx_byte_rate,
                sample.tx_byte_rate,
                sample.rx_packet_rate,
                sample.tx_packet_rate,
                sample.rx_errors,
                sample.tx_errors,
                sample.rx_dropped,
                sample.tx_dropped,
            )
            for sample in samples
            if sample.port_no != OFPP_LOCAL
        ]
        if not rows:
            return 0

        with closing(self._connect()) as connection:
            with connection:
                connection.executemany(
                    """
                    INSERT INTO port_samples (
                        sample_timestamp, dpid, port_no, rx_bytes, tx_bytes,
                        rx_packets, tx_packets, rx_byte_rate, tx_byte_rate,
                        rx_packet_rate, tx_packet_rate, rx_errors, tx_errors,
                        rx_dropped, tx_dropped
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    rows,
                )
        return len(rows)

    def history(
        self,
        *,
        dpid: Optional[object] = None,
        port_no: Optional[object] = None,
        start: Optional[Union[datetime, str]] = None,
        end: Optional[Union[datetime, str]] = None,
        limit: int = 1000,
        offset: int = 0,
    ) -> list[dict[str, object]]:
        """Return matching rows chronologically; filters and pagination are SQL-bound."""
        safe_limit = max(1, min(_MAX_HISTORY_LIMIT, int(limit)))
        safe_offset = max(0, int(offset))
        conditions = []
        parameters: list[object] = []
        if dpid is not None:
            conditions.append("dpid = ?")
            parameters.append(dpid)
        if port_no is not None:
            conditions.append("port_no = ?")
            parameters.append(port_no)
        if start is not None:
            conditions.append("sample_timestamp >= ?")
            parameters.append(_utc_timestamp(start) if isinstance(start, datetime) else start)
        if end is not None:
            conditions.append("sample_timestamp <= ?")
            parameters.append(_utc_timestamp(end) if isinstance(end, datetime) else end)

        where_clause = f"WHERE {' AND '.join(conditions)}" if conditions else ""
        parameters.append(safe_limit)
        parameters.append(safe_offset)
        with closing(self._connect()) as connection:
            connection.row_factory = sqlite3.Row
            with connection:
                rows = connection.execute(
                    f"""
                    SELECT sample_timestamp, dpid, port_no, rx_bytes, tx_bytes,
                           rx_packets, tx_packets, rx_byte_rate, tx_byte_rate,
                           rx_packet_rate, tx_packet_rate, rx_errors, tx_errors,
                           rx_dropped, tx_dropped
                    FROM port_samples
                    {where_clause}
                    ORDER BY sample_timestamp ASC, id ASC
                    LIMIT ? OFFSET ?
                    """,
                    parameters,
                ).fetchall()
        return [dict(row) for row in rows]

    def history_count(self) -> int:
        """Return the number of retained port samples currently in the store."""
        with closing(self._connect()) as connection:
            with connection:
                row = connection.execute("SELECT COUNT(*) FROM port_samples").fetchone()
        return int(row[0])

    def cleanup_before(self, cutoff: Union[datetime, str]) -> int:
        """Delete samples older than the supplied UTC cutoff."""
        cutoff_timestamp = _utc_timestamp(cutoff) if isinstance(cutoff, datetime) else cutoff
        with closing(self._connect()) as connection:
            with connection:
                cursor = connection.execute(
                    "DELETE FROM port_samples WHERE sample_timestamp < ?",
                    (cutoff_timestamp,),
                )
        return cursor.rowcount

    def cleanup_retention(
        self,
        retention_days: int,
        *,
        now: Optional[datetime] = None,
    ) -> int:
        if retention_days < 1:
            raise ValueError("retention_days must be at least 1")
        current_time = now or datetime.now(timezone.utc)
        if current_time.tzinfo is None:
            current_time = current_time.replace(tzinfo=timezone.utc)
        cutoff = current_time.astimezone(timezone.utc) - timedelta(days=retention_days)
        return self.cleanup_before(cutoff)


class TelemetryHistoryWriter:
    """Bounded background writer so SQLite I/O stays out of the event handler."""

    def __init__(
        self,
        store: HistoricalTelemetryStore,
        retention_days: int,
        *,
        queue_capacity: int = 256,
    ) -> None:
        if retention_days < 1:
            raise ValueError("retention_days must be at least 1")
        self.store = store
        self.retention_days = retention_days
        self._queue: queue.Queue[tuple[PortStatistics, ...]] = queue.Queue(maxsize=queue_capacity)
        self._stopping = threading.Event()
        self._accepting_lock = threading.Lock()
        self._accepting = True
        self._thread = threading.Thread(
            target=self._run,
            name="aife-telemetry-history-writer",
            daemon=True,
        )
        self._thread.start()

    def submit(self, samples: Iterable[PortStatistics]) -> bool:
        batch = tuple(samples)
        if not batch:
            return True
        with self._accepting_lock:
            if not self._accepting:
                LOG.error("Historical telemetry writer is closed; sample batch was not persisted")
                return False
            try:
                self._queue.put_nowait(batch)
            except queue.Full:
                LOG.error(
                    "Historical telemetry queue is full; dropping batch of %d samples",
                    len(batch),
                )
                return False
        return True

    def _run(self) -> None:
        next_cleanup = 0.0
        while not self._stopping.is_set() or not self._queue.empty():
            try:
                batch = self._queue.get(timeout=0.2)
            except queue.Empty:
                batch = None
            if batch is not None:
                try:
                    self.store.insert_samples(batch)
                except (OSError, sqlite3.Error, ValueError, TypeError, OverflowError):
                    LOG.exception("Failed to persist OpenFlow telemetry batch")
                finally:
                    self._queue.task_done()

            if monotonic() >= next_cleanup:
                try:
                    self.store.cleanup_retention(self.retention_days)
                except (OSError, sqlite3.Error, ValueError, TypeError, OverflowError):
                    LOG.exception("Failed to apply telemetry history retention")
                next_cleanup = monotonic() + _CLEANUP_INTERVAL_SECONDS

    def close(self, timeout: float = 5.0) -> None:
        with self._accepting_lock:
            self._accepting = False
            self._stopping.set()
        self._thread.join(timeout=max(0.0, timeout))
        if self._thread.is_alive():
            LOG.error(
                "Historical telemetry writer did not stop before timeout; %d batches remain queued",
                self._queue.qsize(),
            )
