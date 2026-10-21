"""Unit tests for operational-link selection and OpenFlow output mapping."""

from unittest import TestCase, main

from server.controller.routing import SwitchLink, find_switch_path, route_output_ports


class RoutingTests(TestCase):
    def setUp(self) -> None:
        self.links = [
            SwitchLink(1, 12, 2, 21, "failed", "link_down"),
            SwitchLink(1, 13, 3, 31, "operational", "detected"),
            SwitchLink(3, 34, 4, 43, "operational", "detected"),
            SwitchLink(2, 24, 4, 42, "operational", "detected"),
        ]

    def test_failed_links_are_excluded_and_ports_follow_alternative(self) -> None:
        path = find_switch_path(1, 4, self.links)
        self.assertEqual(path, [1, 3, 4])
        self.assertEqual(route_output_ports(path, self.links, 1, 4), [(1, 13), (3, 34), (4, 4)])

    def test_multiple_failures_produce_unreachable(self) -> None:
        self.links[1].status = "failed"
        self.links[3].status = "failed"
        self.assertEqual(find_switch_path(1, 4, self.links), [])
        self.assertEqual(route_output_ports([], self.links, 1, 4), [])

    def test_recovery_is_eligible_only_when_explicitly_operational(self) -> None:
        links = [SwitchLink(1, 12, 2, 21, "pending")]
        self.assertEqual(find_switch_path(1, 2, links), [])
        links[0].status = "operational"
        self.assertEqual(find_switch_path(1, 2, links), [1, 2])

    def test_output_mapping_rejects_missing_or_repeated_hops(self) -> None:
        self.assertEqual(route_output_ports([1, 4], self.links, 1, 4), [])
        self.assertEqual(route_output_ports([1, 2, 1], self.links, 1, 4), [])


if __name__ == "__main__":
    main()