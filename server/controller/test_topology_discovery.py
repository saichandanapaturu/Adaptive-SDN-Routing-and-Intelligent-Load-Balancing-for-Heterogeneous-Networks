"""Deterministic topology-state tests; fixtures are not live SDN observations."""

from datetime import datetime, timedelta, timezone
from unittest import TestCase, main

from server.controller.topology_discovery import TopologyDiscoveryState


class TopologyDiscoveryStateTests(TestCase):
    def setUp(self) -> None:
        self.now = datetime(2026, 10, 19, 8, 0, 0, tzinfo=timezone.utc)
        self.state = TopologyDiscoveryState(
            discovery_enabled=True,
            stale_after_seconds=10,
            now=lambda: self.now,
        )
        self.state.switch_enter(1, [1, 2])
        self.state.switch_enter(2, [3, 4])

    def test_duplicate_and_directed_link_events_are_idempotent(self) -> None:
        self.assertTrue(self.state.link_add(1, 2, 2, 3))
        self.assertTrue(
            self.state.link_add(
                1,
                2,
                2,
                3,
                observed_at=self.now + timedelta(seconds=1),
            )
        )
        self.assertTrue(self.state.link_add(2, 3, 1, 2))

        topology = self.state.snapshot()
        self.assertEqual(len(topology["links"]), 2)
        self.assertEqual(topology["links"][0]["src_dpid"], 1)
        self.assertEqual(topology["links"][0]["dst_dpid"], 2)
        self.assertEqual(
            topology["links"][0]["observed_at"],
            (self.now + timedelta(seconds=1)).isoformat(),
        )
        self.assertEqual(topology["switches"][0]["ports"][1]["role"], "switch_link")

    def test_link_removal_and_switch_disconnection_prune_incident_links(self) -> None:
        self.state.link_add(1, 2, 2, 3)
        self.state.link_add(2, 3, 1, 2)
        self.assertTrue(self.state.link_delete(1, 2, 2, 3))
        self.assertFalse(self.state.link_delete(1, 2, 2, 3))
        self.assertEqual(len(self.state.snapshot()["links"]), 1)

        self.assertTrue(self.state.switch_leave(2))
        topology = self.state.snapshot()
        self.assertEqual([switch["dpid"] for switch in topology["switches"]], [1])
        self.assertEqual(topology["links"], [])

    def test_invalid_link_endpoints_are_rejected(self) -> None:
        self.assertFalse(self.state.link_add(1, 99, 2, 3))
        self.assertFalse(self.state.link_add(1, 2, 9, 3))
        self.assertFalse(self.state.link_add(1, 2, 1, 1))
        self.assertFalse(self.state.link_add(1, 0xFFFFFFFE, 2, 3))
        self.assertFalse(self.state.link_delete([], 2, 2, 3))
        self.assertEqual(self.state.snapshot()["rejected_link_events"], 4)

    def test_reconnect_discards_old_links_until_redetected(self) -> None:
        self.state.link_add(1, 2, 2, 3)
        self.state.switch_enter(1, [1, 2], reconnected=True)
        self.assertEqual(self.state.snapshot()["links"], [])

    def test_host_ports_are_only_reported_when_discovered(self) -> None:
        self.assertTrue(self.state.host_add(1, 1))
        self.assertEqual(self.state.snapshot()["switches"][0]["ports"][0]["role"], "host_facing")
        self.assertFalse(self.state.host_add(1, 99))

    def test_host_identity_and_attachment_moves_are_observed(self) -> None:
        self.state.host_add(
            1,
            1,
            "00:00:00:00:00:01",
            ipv4=["10.0.0.1"],
        )
        self.state.host_move(
            "00:00:00:00:00:01",
            2,
            4,
            ipv4=["10.0.0.1"],
        )
        topology = self.state.snapshot()
        self.assertEqual(
            topology["hosts"],
            [
                {
                    "host_id": "00:00:00:00:00:01",
                    "dpid": 2,
                    "port_no": 4,
                    "ipv4": ["10.0.0.1"],
                    "ipv6": [],
                    "observed_at": self.now.isoformat(),
                }
            ],
        )
        self.assertTrue(self.state.host_delete("00:00:00:00:00:01"))
        self.assertEqual(self.state.snapshot()["hosts"], [])

    def test_port_add_and_removal_update_mapping_and_prune_links(self) -> None:
        self.assertTrue(self.state.port_add(1, 5))
        self.assertTrue(self.state.link_add(1, 2, 2, 3))
        self.assertTrue(self.state.port_delete(1, 2))

        topology = self.state.snapshot()
        self.assertEqual(topology["links"], [])
        ports = {port["port_no"]: port for port in topology["switches"][0]["ports"]}
        self.assertNotIn(2, ports)
        self.assertEqual(ports[5]["role"], "unknown")

    def test_stale_links_are_not_returned_as_active(self) -> None:
        self.state.link_add(1, 2, 2, 3)
        topology = self.state.snapshot(now=self.now + timedelta(seconds=11))
        self.assertEqual(topology["discovery_status"], "stale")
        self.assertEqual(topology["links"], [])
        self.assertEqual(topology["stale_links"][0]["status"], "stale")
        self.assertEqual(topology["switches"][0]["ports"][1]["role"], "stale_switch_link")

    def test_successful_empty_snapshot_clears_removed_links(self) -> None:
        self.state.link_add(1, 2, 2, 3)
        self.state.replace_snapshot(
            [(1, [1, 2]), (2, [3, 4])],
            [],
            [],
            observed_at=self.now + timedelta(seconds=1),
        )
        topology = self.state.snapshot()
        self.assertEqual(topology["discovery_status"], "fresh")
        self.assertEqual(topology["link_discovery_status"], "awaiting_links")
        self.assertEqual(topology["links"], [])
        self.assertEqual(topology["stale_links"], [])

    def test_unavailable_and_disabled_statuses_are_explicit(self) -> None:
        empty = TopologyDiscoveryState(discovery_enabled=True, now=lambda: self.now)
        self.assertEqual(empty.snapshot()["discovery_status"], "awaiting_discovery")
        empty.mark_query_failure("test query failure")
        self.assertEqual(empty.snapshot()["discovery_status"], "unavailable")
        self.assertEqual(empty.snapshot()["last_error"], "test query failure")

        disabled = TopologyDiscoveryState(discovery_enabled=False, now=lambda: self.now)
        self.assertEqual(disabled.snapshot()["discovery_status"], "disabled")


if __name__ == "__main__":
    main()
