"""Unit tests for operational-link selection and OpenFlow output mapping."""

from unittest import TestCase, main

from server.controller.routing import (
    SwitchLink,
    find_switch_path,
    route_output_ports,
    select_switch_path,
    shortest_switch_paths,
)


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


class RiskAwareSelectionTests(TestCase):
    """The two equal-hop h1-to-h3 paths of mininet/topology.py."""

    def setUp(self) -> None:
        self.links = [
            SwitchLink(1, 12, 2, 21, "operational", "detected"),
            SwitchLink(1, 13, 3, 31, "operational", "detected"),
            SwitchLink(3, 34, 4, 43, "operational", "detected"),
            SwitchLink(2, 24, 4, 42, "operational", "detected"),
        ]

    def test_candidates_are_all_equal_hop_paths_led_by_the_existing_choice(self) -> None:
        candidates = shortest_switch_paths(1, 4, self.links)
        self.assertEqual(candidates, [[1, 2, 4], [1, 3, 4]])
        self.assertEqual(candidates[0], find_switch_path(1, 4, self.links))

    def test_predicted_congestion_ranks_equal_hop_paths(self) -> None:
        risk = {(1, 12): 0.9, (2, 24): 0.2, (1, 13): 0.1, (3, 34): 0.3}
        path, selection, highest = select_switch_path(1, 4, self.links, lambda d, p: risk[(d, p)])
        self.assertEqual(path, [1, 3, 4])
        self.assertEqual(selection, "ml_ranked")
        self.assertEqual(highest, 0.3)

    def test_missing_prediction_falls_back_to_deterministic_shortest_path(self) -> None:
        risk = {(1, 12): 0.9, (2, 24): 0.2, (1, 13): 0.1}
        path, selection, highest = select_switch_path(1, 4, self.links, lambda d, p: risk.get((d, p)))
        self.assertEqual(path, [1, 2, 4])
        self.assertEqual(selection, "shortest_path_fallback")
        self.assertIsNone(highest)

        self.assertEqual(select_switch_path(1, 4, self.links)[1], "shortest_path_fallback")

    def test_failed_link_is_never_selected_even_with_lowest_risk(self) -> None:
        self.links[1].status = "failed"
        path, _selection, _highest = select_switch_path(1, 4, self.links, lambda _d, port: 0.0 if port == 13 else 0.99)
        self.assertEqual(path, [1, 2, 4])

    def test_longer_low_risk_path_does_not_override_hop_count_policy(self) -> None:
        self.links.append(SwitchLink(1, 15, 4, 51, "operational", "detected"))
        path, _selection, _highest = select_switch_path(1, 4, self.links, lambda _d, port: 0.99 if port == 15 else 0.0)
        self.assertEqual(path, [1, 4])

    def test_unreachable_destination_reports_no_route(self) -> None:
        for link in self.links:
            link.status = "failed"
        self.assertEqual(select_switch_path(1, 4, self.links, lambda _d, _p: 0.0), ([], "no_operational_route", None))


if __name__ == "__main__":
    main()