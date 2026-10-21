"""Deterministic tests for SQLite-backed OpenFlow telemetry history."""

import logging
import sqlite3
import tempfile
from contextlib import closing
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest import TestCase

from server.controller.statistics import OFPP_LOCAL, OpenFlowStatisticsCollector, PortStatistics
from server.controller.telemetry_storage import HistoricalTelemetryStore, TelemetryHistoryWriter


class HistoricalTelemetryStoreTests(TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.database_path = Path(self.temporary_directory.name) / "history.sqlite3"
        self.store = HistoricalTelemetryStore(self.database_path)

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    @staticmethod
    def sample(
        timestamp: str = "2026-10-19T08:00:00+00:00",
        *,
        dpid: int = 1,
        port_no: int = 2,
        rx_bytes: int = 1000,
        tx_bytes: int = 900,
    ) -> PortStatistics:
        return PortStatistics(
            dpid=dpid,
            port_no=port_no,
            timestamp=timestamp,
            rx_packets=100,
            tx_packets=90,
            rx_bytes=rx_bytes,
            tx_bytes=tx_bytes,
            rx_errors=1,
            tx_errors=2,
            rx_dropped=3,
            tx_dropped=4,
            rx_packet_rate=10.0,
            tx_packet_rate=9.0,
            rx_byte_rate=100.0,
            tx_byte_rate=90.0,
        )

    def test_creates_schema_and_query_indexes(self) -> None:
        with closing(sqlite3.connect(self.database_path)) as connection:
            columns = {
                row[1]
                for row in connection.execute("PRAGMA table_info(port_samples)")
            }
            indexes = {
                row[1]
                for row in connection.execute("PRAGMA index_list(port_samples)")
            }

        self.assertTrue(
            {
                "sample_timestamp",
                "dpid",
                "port_no",
                "rx_bytes",
                "tx_bytes",
                "rx_packets",
                "tx_packets",
                "rx_byte_rate",
                "tx_byte_rate",
                "rx_packet_rate",
                "tx_packet_rate",
            }.issubset(columns)
        )
        self.assertIn("idx_port_samples_switch_port_time", indexes)
        self.assertIn("idx_port_samples_time", indexes)

    def test_samples_persist_across_store_instances(self) -> None:
        sample = self.sample()
        self.assertEqual(self.store.insert_samples([sample]), 1)

        reopened_store = HistoricalTelemetryStore(self.database_path)
        rows = reopened_store.history(dpid=1, port_no=2)

        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]["rx_bytes"], sample.rx_bytes)
        self.assertEqual(rows[0]["tx_packets"], sample.tx_packets)
        self.assertEqual(rows[0]["rx_byte_rate"], sample.rx_byte_rate)

    def test_history_offset_pages_in_stable_chronological_order(self) -> None:
        self.store.insert_samples(
            [
                self.sample("2026-10-19T08:00:00+00:00", rx_bytes=1),
                self.sample("2026-10-19T08:00:01+00:00", rx_bytes=2),
                self.sample("2026-10-19T08:00:02+00:00", rx_bytes=3),
            ]
        )

        self.assertEqual(self.store.history_count(), 3)
        self.assertEqual([row["rx_bytes"] for row in self.store.history(limit=1, offset=1)], [2])

    def test_history_is_returned_in_chronological_utc_order(self) -> None:
        self.store.insert_samples(
            [
                self.sample("2026-10-19T10:15:00+02:00", rx_bytes=2000),
                self.sample("2026-10-19T08:30:00+00:00", rx_bytes=3000),
                self.sample("2026-10-19T08:00:00+00:00", rx_bytes=1000),
            ]
        )

        rows = self.store.history()

        self.assertEqual([row["rx_bytes"] for row in rows], [1000, 2000, 3000])
        self.assertEqual(
            [row["sample_timestamp"] for row in rows],
            [
                "2026-10-19T08:00:00+00:00",
                "2026-10-19T08:15:00+00:00",
                "2026-10-19T08:30:00+00:00",
            ],
        )

    def test_filter_values_are_bound_as_parameters(self) -> None:
        self.store.insert_samples(
            [
                self.sample(dpid=1),
                self.sample(dpid=2, port_no=3),
            ]
        )

        self.assertEqual(self.store.history(dpid="1 OR 1=1"), [])
        self.assertEqual(
            self.store.history(start="9999' OR 1=1 --"),
            [],
        )
        self.assertEqual(len(self.store.history()), 2)

    def test_retention_deletes_only_samples_older_than_cutoff(self) -> None:
        now = datetime(2026, 10, 19, 8, tzinfo=timezone.utc)
        cutoff = now - timedelta(days=30)
        self.store.insert_samples(
            [
                self.sample((cutoff - timedelta(seconds=1)).isoformat(), rx_bytes=1),
                self.sample(cutoff.isoformat(), rx_bytes=2),
                self.sample(now.isoformat(), rx_bytes=3),
            ]
        )

        deleted = self.store.cleanup_retention(30, now=now)

        self.assertEqual(deleted, 1)
        self.assertEqual([row["rx_bytes"] for row in self.store.history()], [2, 3])

    def test_local_port_is_excluded_by_collector_and_storage(self) -> None:
        local_sample = self.sample(port_no=OFPP_LOCAL)
        collector = OpenFlowStatisticsCollector()
        local_stat = type(
            "OpenFlowStat",
            (),
            {
                "port_no": OFPP_LOCAL,
                "rx_packets": 1,
                "tx_packets": 1,
                "rx_bytes": 10,
                "tx_bytes": 10,
            },
        )()

        self.assertEqual(collector.process_port_stats(1, [local_stat]), [])
        self.assertEqual(self.store.insert_samples([local_sample]), 0)
        self.assertEqual(self.store.history(), [])

    def test_background_writer_persists_samples_and_stops_cleanly(self) -> None:
        writer = TelemetryHistoryWriter(self.store, retention_days=30)
        self.assertTrue(writer.submit([self.sample()]))
        writer.close()

        self.assertFalse(writer._thread.is_alive())
        self.assertEqual(len(self.store.history()), 1)

    def test_background_writer_logs_database_errors_without_terminating(self) -> None:
        class FailingOnceStore(HistoricalTelemetryStore):
            failed = False

            def insert_samples(self, samples):
                if not self.failed:
                    self.failed = True
                    raise sqlite3.OperationalError("database is locked")
                return super().insert_samples(samples)

        writer = TelemetryHistoryWriter(FailingOnceStore(self.database_path), retention_days=30)
        with self.assertLogs("aife.telemetry_storage", level=logging.ERROR) as captured:
            writer.submit([self.sample(rx_bytes=1000)])
            writer._queue.join()
            self.assertTrue(writer._thread.is_alive())
            writer.submit([self.sample(rx_bytes=2000)])
            writer._queue.join()
        writer.close()

        self.assertTrue(any("Failed to persist" in message for message in captured.output))
        self.assertFalse(writer._thread.is_alive())
        self.assertEqual([row["rx_bytes"] for row in self.store.history()], [2000])


if __name__ == "__main__":
    import unittest

    unittest.main()
