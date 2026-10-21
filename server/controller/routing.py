"""Operational-link route selection shared by AIFE forwarding and tests."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Iterable, List, Optional, Tuple


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