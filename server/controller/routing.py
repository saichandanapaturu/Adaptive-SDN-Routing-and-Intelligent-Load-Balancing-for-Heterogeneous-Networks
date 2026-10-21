"""Operational-link route selection shared by AIFE forwarding and tests."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Callable, Dict, Iterable, List, Optional, Tuple

# Returns P(congestion within the horizon) for a switch egress port, or None
# when no valid prediction exists.
PortRisk = Callable[[int, int], Optional[float]]
MAX_CANDIDATE_PATHS = 32


@dataclass
class SwitchLink:
    source: int
    source_port: int
    target: int
    target_port: int
    status: str = "pending"
    reason: str = "awaiting_port_verification"

    @property
    def key(self) -> Tuple[int, int]:
        return tuple(sorted((self.source, self.target)))

    def port_at(self, dpid: int) -> Optional[int]:
        if dpid == self.source:
            return self.source_port
        if dpid == self.target:
            return self.target_port
        return None


def find_switch_path(
    source: int,
    destination: int,
    links: Iterable[SwitchLink],
) -> List[int]:
    """Return the shortest simple path using operational links only."""
    if source == destination:
        return [source]

    adjacency: Dict[int, List[int]] = {}
    for link in links:
        if link.status != "operational":
            continue
        adjacency.setdefault(link.source, []).append(link.target)
        adjacency.setdefault(link.target, []).append(link.source)

    queue: List[List[int]] = [[source]]
    visited = {source}
    while queue:
        path = queue.pop(0)
        for neighbor in sorted(adjacency.get(path[-1], [])):
            if neighbor in visited:
                continue
            next_path = [*path, neighbor]
            if neighbor == destination:
                return next_path
            visited.add(neighbor)
            queue.append(next_path)
    return []


def shortest_switch_paths(
    source: int,
    destination: int,
    links: Iterable[SwitchLink],
    limit: int = MAX_CANDIDATE_PATHS,
) -> List[List[int]]:
    """All equal-hop shortest operational paths, in lexicographic order.

    The first path equals ``find_switch_path``'s result.
    """
    if source == destination:
        return [[source]]
    adjacency: Dict[int, List[int]] = {}
    for link in links:
        if link.status != "operational":
            continue
        adjacency.setdefault(link.source, []).append(link.target)
        adjacency.setdefault(link.target, []).append(link.source)

    distance = {destination: 0}
    frontier = [destination]
    while frontier and source not in distance:
        next_frontier = []
        for dpid in frontier:
            for neighbor in adjacency.get(dpid, []):
                if neighbor not in distance:
                    distance[neighbor] = distance[dpid] + 1
                    next_frontier.append(neighbor)
        frontier = next_frontier
    if source not in distance:
        return []

    paths: List[List[int]] = []

    def extend(path: List[int]) -> None:
        if len(paths) >= limit:
            return
        if path[-1] == destination:
            paths.append(path)
            return
        for neighbor in sorted(adjacency.get(path[-1], [])):
            if distance.get(neighbor) == distance[path[-1]] - 1:
                extend([*path, neighbor])

    extend([source])
    return paths


def select_switch_path(
    source: int,
    destination: int,
    links: Iterable[SwitchLink],
    port_risk: Optional[PortRisk] = None,
) -> Tuple[List[int], str, Optional[float]]:
    """Choose a route and report how it was chosen.

    The routing policy remains shortest operational hop count. When every
    egress port on every equal-hop candidate has a valid congestion
    prediction, candidates are ranked by their highest port risk, then total
    risk. Otherwise the deterministic shortest path is used unchanged.
    Failed or unverified links are never candidates, whatever their risk.
    """
    links = list(links)
    candidates = shortest_switch_paths(source, destination, links)
    if not candidates:
        return [], "no_operational_route", None
    if len(candidates[0]) == 1:
        return candidates[0], "single_switch", None
    if port_risk is None:
        return candidates[0], "shortest_path_fallback", None

    link_by_edge = {link.key: link for link in links if link.status == "operational"}
    scored = []
    for order, path in enumerate(candidates):
        risks = []
        for dpid, next_dpid in zip(path, path[1:]):
            port_no = link_by_edge[tuple(sorted((dpid, next_dpid)))].port_at(dpid)
            risk = port_risk(dpid, port_no) if port_no is not None else None
            if risk is None:
                return candidates[0], "shortest_path_fallback", None
            risks.append(risk)
        scored.append((max(risks), sum(risks), order, path))
    highest, _total, _order, path = min(scored)
    return path, "ml_ranked", highest


def route_output_ports(
    path: List[int],
    links: Iterable[SwitchLink],
    source_port: int,
    destination_port: int,
) -> List[Tuple[int, int]]:
    """Map each switch on a simple path to its one valid next-hop port."""
    if not path or len(set(path)) != len(path):
        return []
    link_by_edge = {link.key: link for link in links if link.status == "operational"}
    outputs: List[Tuple[int, int]] = []
    for index, dpid in enumerate(path):
        if index == len(path) - 1:
            output_port = destination_port
        else:
            link = link_by_edge.get(tuple(sorted((dpid, path[index + 1]))))
            if link is None:
                return []
            output_port = link.port_at(dpid)
            if output_port is None:
                return []
        outputs.append((dpid, output_port))
    if source_port < 0 or destination_port < 0:
        return []
    return outputs