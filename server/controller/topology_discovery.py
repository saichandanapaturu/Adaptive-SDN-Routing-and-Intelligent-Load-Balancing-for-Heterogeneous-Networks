"""State and serialization for OS-Ken-discovered switch topology."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from functools import wraps
from threading import RLock
from typing import Callable, Iterable, Optional


OFPP_MAX = 0xFFFFFF00


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _as_utc(value: datetime) -> datetime:
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def _timestamp(value: datetime) -> str:
    return _as_utc(value).isoformat()


def _valid_dpid(value: object) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and 0 <= value < 2**64


def _valid_port(value: object) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and 0 < value < OFPP_MAX


def _locked(method):
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        with self._lock:
            return method(self, *args, **kwargs)

    return wrapper


@dataclass
class _SwitchRecord:
    ports: dict[int, datetime] = field(default_factory=dict)
    observed_at: datetime = field(default_factory=_utc_now)


@dataclass
class _LinkRecord:
    src_dpid: int
    src_port: int
    dst_dpid: int
    dst_port: int
    observed_at: datetime

    @property
    def key(self) -> tuple[int, int, int, int]:
        return self.src_dpid, self.src_port, self.dst_dpid, self.dst_port


@dataclass
class _HostRecord:
    host_id: str
    dpid: int
    port_no: int
    ipv4: tuple[str, ...]
    ipv6: tuple[str, ...]
    observed_at: datetime


class TopologyDiscoveryState:
    """Track directed LLDP links and observed host-facing ports."""

    def __init__(
        self,
        *,
        discovery_enabled: bool,
        stale_after_seconds: float = 15.0,
        now: Optional[Callable[[], datetime]] = None,
    ) -> None:
        self.discovery_enabled = discovery_enabled
        self.stale_after_seconds = max(0.1, stale_after_seconds)
        self._now = now or _utc_now
        self._lock = RLock()
        self._switches: dict[int, _SwitchRecord] = {}
        self._links: dict[tuple[int, int, int, int], _LinkRecord] = {}
        self._host_ports: dict[tuple[int, int], datetime] = {}
        self._hosts: dict[str, _HostRecord] = {}
        self._last_observed_at: Optional[datetime] = None
        self._last_error: Optional[str] = None
        self._rejected_links = 0

    def _observe(self, timestamp: datetime) -> None:
        self._last_observed_at = _as_utc(timestamp)
        self._last_error = None

    @_locked
    def switch_enter(
        self,
        dpid: object,
        ports: Iterable[object],
        *,
        observed_at: Optional[datetime] = None,
        reconnected: bool = False,
    ) -> bool:
        if not _valid_dpid(dpid):
            return False
        timestamp = _as_utc(observed_at or self._now())
        valid_ports = {port for port in ports if _valid_port(port)}
        previous = self._switches.get(dpid)
        if previous is None or reconnected:
            self._switches[dpid] = _SwitchRecord(
                ports={port: timestamp for port in valid_ports},
                observed_at=timestamp,
            )
            if reconnected:
                self._remove_incident_links(dpid)
                self._remove_host_ports(dpid)
        else:
            previous.ports = {port: timestamp for port in valid_ports}
            previous.observed_at = timestamp
            for key in list(self._links):
                if (
                    (key[0] == dpid and key[1] not in valid_ports)
                    or (key[2] == dpid and key[3] not in valid_ports)
                ):
                    del self._links[key]
            for key in list(self._host_ports):
                if key[0] == dpid and key[1] not in valid_ports:
                    del self._host_ports[key]
            self._remove_hosts_missing_ports(dpid, valid_ports)
        self._observe(timestamp)
        return True

    @_locked
    def switch_leave(self, dpid: object, *, observed_at: Optional[datetime] = None) -> bool:
        if not _valid_dpid(dpid):
            return False
        removed = self._switches.pop(dpid, None) is not None
        self._remove_incident_links(dpid)
        self._remove_host_ports(dpid)
        self._remove_hosts_on_switch(dpid)
        if removed:
            self._observe(observed_at or self._now())
        return removed

    @_locked
    def port_add(
        self,
        dpid: object,
        port_no: object,
        *,
        observed_at: Optional[datetime] = None,
    ) -> bool:
        if not _valid_dpid(dpid) or not _valid_port(port_no) or dpid not in self._switches:
            return False
        timestamp = _as_utc(observed_at or self._now())
        switch = self._switches[dpid]
        switch.ports[port_no] = timestamp
        switch.observed_at = timestamp
        self._observe(timestamp)
        return True

    @_locked
    def port_delete(
        self,
        dpid: object,
        port_no: object,
        *,
        observed_at: Optional[datetime] = None,
    ) -> bool:
        if not _valid_dpid(dpid) or not _valid_port(port_no):
            return False
        switch = self._switches.get(dpid)
        removed = switch.ports.pop(port_no, None) is not None if switch else False
        for key in list(self._links):
            if (key[0] == dpid and key[1] == port_no) or (key[2] == dpid and key[3] == port_no):
                del self._links[key]
                removed = True
        removed = self._host_ports.pop((dpid, port_no), None) is not None or removed
        for host_id, host in list(self._hosts.items()):
            if host.dpid == dpid and host.port_no == port_no:
                del self._hosts[host_id]
                removed = True
        if removed:
            self._observe(observed_at or self._now())
        return removed

    @_locked
    def host_add(
        self,
        dpid: object,
        port_no: object,
        host_id: Optional[object] = None,
        *,
        ipv4: Iterable[object] = (),
        ipv6: Iterable[object] = (),
        observed_at: Optional[datetime] = None,
    ) -> bool:
        if not _valid_dpid(dpid) or not _valid_port(port_no):
            return False
        switch = self._switches.get(dpid)
        if switch is None or port_no not in switch.ports:
            return False
        timestamp = _as_utc(observed_at or self._now())
        self._host_ports[(dpid, port_no)] = timestamp
        if isinstance(host_id, str) and host_id:
            self._hosts[host_id] = _HostRecord(
                host_id=host_id,
                dpid=dpid,
                port_no=port_no,
                ipv4=tuple(sorted({value for value in ipv4 if isinstance(value, str) and value})),
                ipv6=tuple(sorted({value for value in ipv6 if isinstance(value, str) and value})),
                observed_at=timestamp,
            )
        self._observe(timestamp)
        return True

    @_locked
    def host_delete(self, host_id: object, *, observed_at: Optional[datetime] = None) -> bool:
        if not isinstance(host_id, str):
            return False
        host = self._hosts.pop(host_id, None)
        if host is None:
            return False
        if not any(
            item.dpid == host.dpid and item.port_no == host.port_no
            for item in self._hosts.values()
        ):
            self._host_ports.pop((host.dpid, host.port_no), None)
        self._observe(observed_at or self._now())
        return True

    @_locked
    def host_move(
        self,
        host_id: object,
        dpid: object,
        port_no: object,
        *,
        ipv4: Iterable[object] = (),
        ipv6: Iterable[object] = (),
        observed_at: Optional[datetime] = None,
    ) -> bool:
        if isinstance(host_id, str):
            self.host_delete(host_id, observed_at=observed_at)
        return self.host_add(
            dpid,
            port_no,
            host_id,
            ipv4=ipv4,
            ipv6=ipv6,
            observed_at=observed_at,
        )

    @_locked
    def link_add(
        self,
        src_dpid: object,
        src_port: object,
        dst_dpid: object,
        dst_port: object,
        *,
        observed_at: Optional[datetime] = None,
    ) -> bool:
        if (
            not _valid_dpid(src_dpid)
            or not _valid_dpid(dst_dpid)
            or not _valid_port(src_port)
            or not _valid_port(dst_port)
            or src_dpid == dst_dpid
            or src_dpid not in self._switches
            or dst_dpid not in self._switches
            or src_port not in self._switches[src_dpid].ports
            or dst_port not in self._switches[dst_dpid].ports
        ):
            self._rejected_links += 1
            return False
        timestamp = _as_utc(observed_at or self._now())
        record = _LinkRecord(src_dpid, src_port, dst_dpid, dst_port, timestamp)
        self._links[record.key] = record
        self._host_ports.pop((src_dpid, src_port), None)
        self._host_ports.pop((dst_dpid, dst_port), None)
        self._remove_hosts_on_port(src_dpid, src_port)
        self._remove_hosts_on_port(dst_dpid, dst_port)
        self._observe(timestamp)
        return True

    @_locked
    def link_delete(
        self,
        src_dpid: object,
        src_port: object,
        dst_dpid: object,
        dst_port: object,
        *,
        observed_at: Optional[datetime] = None,
    ) -> bool:
        if (
            not _valid_dpid(src_dpid)
            or not _valid_dpid(dst_dpid)
            or not _valid_port(src_port)
            or not _valid_port(dst_port)
            or src_dpid == dst_dpid
        ):
            return False
        key = (src_dpid, src_port, dst_dpid, dst_port)
        removed = self._links.pop(key, None) is not None
        if removed:
            self._observe(observed_at or self._now())
        return removed

    @_locked
    def replace_snapshot(
        self,
        switches: Iterable[tuple[object, Iterable[object]]],
        links: Iterable[tuple[object, object, object, object]],
        hosts: Iterable[tuple[object, object, object, Iterable[object], Iterable[object]]],
        *,
        observed_at: Optional[datetime] = None,
    ) -> None:
        """Replace state using one successful snapshot from OS-Ken's topology app."""
        timestamp = _as_utc(observed_at or self._now())
        next_switches: dict[int, _SwitchRecord] = {}
        for dpid, ports in switches:
            if _valid_dpid(dpid):
                next_switches[dpid] = _SwitchRecord(
                    ports={port: timestamp for port in ports if _valid_port(port)},
                    observed_at=timestamp,
                )

        self._switches = next_switches
        self._links = {}
        self._host_ports = {}
        self._hosts = {}
        for host_id, dpid, port_no, ipv4, ipv6 in hosts:
            if (
                _valid_dpid(dpid)
                and _valid_port(port_no)
                and isinstance(host_id, str)
                and host_id
                and dpid in self._switches
                and port_no in self._switches[dpid].ports
            ):
                self._host_ports[(dpid, port_no)] = timestamp
                self._hosts[host_id] = _HostRecord(
                    host_id=host_id,
                    dpid=dpid,
                    port_no=port_no,
                    ipv4=tuple(sorted({value for value in ipv4 if isinstance(value, str) and value})),
                    ipv6=tuple(sorted({value for value in ipv6 if isinstance(value, str) and value})),
                    observed_at=timestamp,
                )
        self._rejected_links = 0
        for src_dpid, src_port, dst_dpid, dst_port in links:
            self.link_add(
                src_dpid,
                src_port,
                dst_dpid,
                dst_port,
                observed_at=timestamp,
            )
        self._switches = next_switches
        self._observe(timestamp)

    @_locked
    def mark_query_failure(self, error: str) -> None:
        self._last_error = error

    def _remove_incident_links(self, dpid: int) -> None:
        for key in list(self._links):
            if key[0] == dpid or key[2] == dpid:
                del self._links[key]

    def _remove_host_ports(self, dpid: int) -> None:
        for key in list(self._host_ports):
            if key[0] == dpid:
                del self._host_ports[key]

    def _remove_hosts_on_switch(self, dpid: int) -> None:
        for host_id, host in list(self._hosts.items()):
            if host.dpid == dpid:
                del self._hosts[host_id]

    def _remove_hosts_on_port(self, dpid: int, port_no: int) -> None:
        for host_id, host in list(self._hosts.items()):
            if host.dpid == dpid and host.port_no == port_no:
                del self._hosts[host_id]

    def _remove_hosts_missing_ports(self, dpid: int, valid_ports: set[int]) -> None:
        for host_id, host in list(self._hosts.items()):
            if host.dpid == dpid and host.port_no not in valid_ports:
                del self._hosts[host_id]

    @_locked
    def snapshot(self, *, now: Optional[datetime] = None) -> dict[str, object]:
        current = _as_utc(now or self._now())
        age = (
            (current - self._last_observed_at).total_seconds()
            if self._last_observed_at is not None
            else None
        )
        if not self.discovery_enabled:
            status = "disabled"
        elif self._last_observed_at is None:
            status = "unavailable" if self._last_error else "awaiting_discovery"
        elif age is not None and age > self.stale_after_seconds:
            status = "stale"
        else:
            status = "fresh"

        peer_map: dict[tuple[int, int], list[dict[str, int]]] = {}
        stale_peer_map: dict[tuple[int, int], list[dict[str, int]]] = {}
        fresh_links = []
        stale_links = []
        for link in sorted(self._links.values(), key=lambda item: item.key):
            is_stale = (current - link.observed_at).total_seconds() > self.stale_after_seconds
            peers = stale_peer_map if is_stale else peer_map
            peers.setdefault((link.src_dpid, link.src_port), []).append(
                {"dpid": link.dst_dpid, "port_no": link.dst_port}
            )
            serialized = {
                "src_dpid": link.src_dpid,
                "src_port_no": link.src_port,
                "dst_dpid": link.dst_dpid,
                "dst_port_no": link.dst_port,
                "observed_at": _timestamp(link.observed_at),
                "status": "stale" if is_stale else "fresh",
            }
            (stale_links if is_stale else fresh_links).append(serialized)

        if not self.discovery_enabled:
            link_status = "disabled"
        elif status == "unavailable":
            link_status = "unavailable"
        elif fresh_links:
            link_status = "fresh"
        elif stale_links:
            link_status = "stale"
        else:
            link_status = "awaiting_links"

        switches = []
        for dpid, switch in sorted(self._switches.items()):
            ports = []
            for port_no, port_observed_at in sorted(switch.ports.items()):
                peers = sorted(
                    peer_map.get((dpid, port_no), []),
                    key=lambda item: (item["dpid"], item["port_no"]),
                )
                stale_peers = sorted(
                    stale_peer_map.get((dpid, port_no), []),
                    key=lambda item: (item["dpid"], item["port_no"]),
                )
                host_observed_at = self._host_ports.get((dpid, port_no))
                if peers:
                    role = "switch_link"
                elif stale_peers:
                    role = "stale_switch_link"
                elif host_observed_at:
                    role = "host_facing"
                else:
                    role = "unknown"
                ports.append(
                    {
                        "port_no": port_no,
                        "role": role,
                        "observed_at": _timestamp(host_observed_at or port_observed_at),
                        "peers": peers,
                        "stale_peers": stale_peers,
                    }
                )
            switches.append(
                {
                    "dpid": dpid,
                    "status": "connected",
                    "observed_at": _timestamp(switch.observed_at),
                    "ports": ports,
                }
            )

        hosts = [
            {
                "host_id": host.host_id,
                "dpid": host.dpid,
                "port_no": host.port_no,
                "ipv4": list(host.ipv4),
                "ipv6": list(host.ipv6),
                "observed_at": _timestamp(host.observed_at),
            }
            for host in sorted(self._hosts.values(), key=lambda item: item.host_id)
        ]

        return {
            "discovery_enabled": self.discovery_enabled,
            "discovery_status": status,
            "link_discovery_status": link_status,
            "observed_at": (
                _timestamp(self._last_observed_at)
                if self._last_observed_at
                else None
            ),
            "stale_after_seconds": self.stale_after_seconds,
            "last_error": self._last_error,
            "switches": switches,
            "hosts": hosts,
            "links": fresh_links,
            "stale_links": stale_links,
            "rejected_link_events": self._rejected_links,
        }
