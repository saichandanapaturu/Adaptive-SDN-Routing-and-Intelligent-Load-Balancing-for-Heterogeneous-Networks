"""Controller-owned topology state and barrier-gated OpenFlow forwarding."""

from __future__ import annotations

import logging
import uuid
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from typing import Any, Dict, Iterable, List, Optional, Tuple

from os_ken.lib import hub
from os_ken.lib.packet import ethernet, ether_types, packet

try:
    from server.controller.routing import SwitchLink, find_switch_path, route_output_ports
except ImportError:
    from routing import SwitchLink, find_switch_path, route_output_ports


LOG = logging.getLogger("aife.forwarding")
OFP_VERSION_1_3 = 4
ETH_TYPE_LLDP = 0x88CC
AIFE_FLOW_COOKIE = 0xA1FE000000000001


@dataclass
class HostAttachment:
    mac: str
    dpid: int
    port_no: int
    ip: Optional[str] = None


@dataclass
class LearnedFlow:
    source_mac: str
    destination_mac: str
    source_dpid: int
    source_port: int
    destination_dpid: int
    destination_port: int
    path: List[int]
    status: str
    blocked_reason: Optional[str] = None
    failed_link: Optional[str] = None


class AIFEForwarding:
    """Maintain detected links and install only verified OpenFlow routes."""

    def __init__(self, datapaths: Dict[int, Any]) -> None:
        self.datapaths = datapaths
        self.links: Dict[Tuple[int, int], SwitchLink] = {}
        self.port_states: Dict[Tuple[int, int], bool] = {}
        self.port_names: Dict[Tuple[int, int], str] = {}
        self.hosts: Dict[str, HostAttachment] = {}
        self.flows: Dict[Tuple[str, str], LearnedFlow] = {}
        self.events: List[Dict[str, Any]] = []
        self._event_sequence = 0
        self._instance_id = uuid.uuid4().hex
        self._barriers: Dict[Tuple[int, int], Any] = {}
        self._flow_errors: Dict[int, int] = {}
        self._state_lock = hub.Semaphore(1)

    @staticmethod
    def _link_from_event(link: Any, *, status: str, reason: str) -> SwitchLink:
        return SwitchLink(
            source=int(link.src.dpid),
            source_port=int(link.src.port_no),
            target=int(link.dst.dpid),
            target_port=int(link.dst.port_no),
            status=status,
            reason=reason,
        )

    def _record_event(self, event_type: str, **details: Any) -> Dict[str, Any]:
        if event_type == "flow_blocked" and self.events:
            previous = self.events[0]
            if previous.get("type") == event_type and all(
                previous.get(key) == details.get(key)
                for key in ("source", "destination", "reason")
            ):
                return previous
        self._event_sequence += 1
        item = {
            "id": f"controller-{self._instance_id}-{self._event_sequence}",
            "type": event_type,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            **details,
        }
        self.events.insert(0, item)
        del self.events[100:]
        return item

    def link_added(self, link: Any) -> bool:
        with self._state_lock:
            return self._link_added(link)

    def _link_added(self, link: Any) -> bool:
        observed = self._link_from_event(link, status="pending", reason="awaiting_port_verification")
        previous = self.links.get(observed.key)
        if previous and previous.status == "failed":
            observed.status = "failed"
            observed.reason = previous.reason
        self.links[observed.key] = observed
        self._refresh_link(observed)
        current = self.links[observed.key]
        changed = previous is None or previous.status != current.status
        if changed and previous and previous.status == "failed" and current.status == "operational":
            self._record_event(
                "link_recovered",
                source=f"s{current.source}",
                target=f"s{current.target}",
                origin="detected",
            )
            self._retry_blocked_flows()
        return changed

    def link_deleted(self, link: Any) -> bool:
        with self._state_lock:
            return self._link_deleted(link)

    def _link_deleted(self, link: Any) -> bool:
        observed = self._link_from_event(link, status="failed", reason="link_removed")
        current = self.links.get(observed.key)
        if current and current.status == "failed":
            return False
        self.port_states.pop((observed.source, observed.source_port), None)
        self.port_states.pop((observed.target, observed.target_port), None)
        self.links[observed.key] = observed
        self._record_event(
            "link_failed",
            source=f"s{observed.source}",
            target=f"s{observed.target}",
            origin="detected",
            reason=observed.reason,
        )
        self._reroute_known_flows("link_failure", f"s{observed.source}–s{observed.target}")
        return True

    def switch_disconnected(self, dpid: int) -> None:
        with self._state_lock:
            self._switch_disconnected(dpid)

    def _switch_disconnected(self, dpid: int) -> None:
        for link in self.links.values():
            if dpid in (link.source, link.target):
                self.port_states.pop((link.source, link.source_port), None)
                self.port_states.pop((link.target, link.target_port), None)
                if link.status != "failed":
                    link.status = "failed"
                    link.reason = "switch_disconnected"
                    self._record_event(
                        "link_failed",
                        source=f"s{link.source}",
                        target=f"s{link.target}",
                        origin="detected",
                        reason=link.reason,
                    )
        removed_hosts = [mac for mac, host in self.hosts.items() if host.dpid == dpid]
        for mac in removed_hosts:
            del self.hosts[mac]
        if removed_hosts:
            self._reroute_known_flows("switch_disconnected")
        elif any(dpid in (link.source, link.target) for link in self.links.values()):
            self._reroute_known_flows("switch_disconnected")

    def clear_datapath_rules(self, datapath: Any) -> bool:
        with self._state_lock:
            if not self._delete_dynamic_rules((datapath,)):
                LOG.error("Could not clear stale AIFE forwarding rules on reconnected switch %016x", datapath.id)
                return False
            return True

    def port_status(self, datapath: Any, desc: Any, *, deleted: bool = False) -> None:
        with self._state_lock:
            self._set_port_state(datapath.id, desc, forced_down=deleted)

    def port_descriptions(self, datapath: Any, descriptions: Iterable[Any]) -> None:
        with self._state_lock:
            for desc in descriptions:
                self._set_port_state(datapath.id, desc)

    def _set_port_state(self, dpid: int, desc: Any, *, forced_down: bool = False) -> None:
        ofproto = self.datapaths[dpid].ofproto
        port_no = int(desc.port_no)
        is_up = not forced_down and not (int(desc.state) & ofproto.OFPPS_LINK_DOWN) and not (
            int(desc.config) & ofproto.OFPPC_PORT_DOWN
        )
        key = (dpid, port_no)
        previous_port_state = self.port_states.get(key)
        self.port_states[key] = is_up
        self.port_names[key] = getattr(desc, "name", str(port_no)).strip("\x00")
        if not is_up:
            for link in self.links.values():
                if key == (link.source, link.source_port):
                    self.port_states.pop((link.target, link.target_port), None)
                elif key == (link.target, link.target_port):
                    self.port_states.pop((link.source, link.source_port), None)
        changed_links = []
        for link in self.links.values():
            if key in ((link.source, link.source_port), (link.target, link.target_port)):
                previous_status = link.status
                self._refresh_link(link)
                if previous_status != link.status:
                    changed_links.append((link, previous_status))
        for link, previous_status in changed_links:
            if link.status == "failed":
                self._record_event(
                    "link_failed",
                    source=f"s{link.source}",
                    target=f"s{link.target}",
                    origin="detected",
                    reason=link.reason,
                )
            elif previous_status == "failed" and link.status == "operational":
                self._record_event(
                    "link_recovered",
                    source=f"s{link.source}",
                    target=f"s{link.target}",
                    origin="detected",
                )
        newly_failed = [link for link, _ in changed_links if link.status == "failed"]
        affected_endpoint = any(
            (flow.source_dpid, flow.source_port) == key
            or (flow.destination_dpid, flow.destination_port) == key
            for flow in self.flows.values()
        )
        blocked_endpoint_recovery = is_up and any(
            flow.status == "blocked"
            and ((flow.source_dpid, flow.source_port) == key
                 or (flow.destination_dpid, flow.destination_port) == key)
            for flow in self.flows.values()
        )
        if newly_failed:
            failed_names = ", ".join(f"s{link.source}–s{link.target}" for link in newly_failed)
            self._reroute_known_flows("port_state_change", failed_names)
        elif any(previous_status == "failed" and link.status == "operational" for link, previous_status in changed_links):
            self._retry_blocked_flows()
        elif affected_endpoint and previous_port_state != is_up and (not is_up or blocked_endpoint_recovery):
            self._reroute_known_flows("host_port_state_change")

    def _refresh_link(self, link: SwitchLink) -> None:
        source_state = self.port_states.get((link.source, link.source_port))
        target_state = self.port_states.get((link.target, link.target_port))
        if source_state is False or target_state is False:
            link.status = "failed"
            link.reason = "port_down"
        elif source_state is True and target_state is True:
            link.status = "operational"
            link.reason = "detected"
        elif link.status != "failed":
            link.status = "pending"
            link.reason = "awaiting_port_verification"

    def packet_in(self, ev: Any) -> None:
        with self._state_lock:
            self._packet_in(ev)

    def _packet_in(self, ev: Any) -> None:
        msg = ev.msg
        datapath = msg.datapath
        in_port = int(msg.match.get("in_port", 0))
        parsed = packet.Packet(msg.data)
        eth = parsed.get_protocol(ethernet.ethernet)
        if eth is None or eth.ethertype == ETH_TYPE_LLDP or eth.ethertype == ether_types.ETH_TYPE_LLDP:
            return

        src_mac = eth.src.lower()
        dst_mac = eth.dst.lower()
        if not self._is_multicast(src_mac) and not self._is_inter_switch_port(datapath.id, in_port):
            self.hosts[src_mac] = HostAttachment(src_mac, datapath.id, in_port)

        if self._is_multicast(dst_mac):
            self._flood_to_host_ports(msg, datapath.id, in_port)
            return

        source = self.hosts.get(src_mac)
        destination = self.hosts.get(dst_mac)
        if source is None:
            return
        if destination is None:
            self._flood_to_host_ports(msg, datapath.id, in_port)
            return

        flow = LearnedFlow(
            source_mac=src_mac,
            destination_mac=dst_mac,
            source_dpid=source.dpid,
            source_port=source.port_no,
            destination_dpid=destination.dpid,
            destination_port=destination.port_no,
            path=[],
            status="pending",
        )
        self.flows[(src_mac, dst_mac)] = flow
        if self._install_flow(flow):
            if datapath.id == source.dpid:
                self._packet_out(datapath, msg, self._first_output(flow))
        elif flow.status != "blocked":
            self._block_flow(flow, "forwarding_rules_not_installed")

    @staticmethod
    def _is_multicast(mac: str) -> bool:
        try:
            return bool(int(mac.split(":", 1)[0], 16) & 1)
        except (ValueError, IndexError):
            return True

    def _is_inter_switch_port(self, dpid: int, port_no: int) -> bool:
        return any(
            (dpid, port_no) in (
                (link.source, link.source_port),
                (link.target, link.target_port),
            )
            for link in self.links.values()
        )

    def _flood_to_host_ports(self, msg: Any, source_dpid: int, source_port: int) -> None:
        source_eth = packet.Packet(msg.data).get_protocol(ethernet.ethernet)
        source_host = self.hosts.get(source_eth.src.lower()) if source_eth else None
        output_ports = self._flood_outputs(
            source_dpid,
            source_port,
            (source_host.dpid, source_host.port_no) if source_host else None,
        )
        datapath = self.datapaths.get(source_dpid)
        if datapath:
            for port_no in output_ports:
                self._packet_out(datapath, msg, port_no)

    def _flood_outputs(
        self,
        source_dpid: int,
        source_port: int,
        source_host_port: Optional[Tuple[int, int]],
    ) -> List[int]:
        root_dpid = source_host_port[0] if source_host_port else source_dpid
        parent: Dict[int, Tuple[int, SwitchLink]] = {}
        visited = {root_dpid}
        queue = [root_dpid]
        while queue:
            dpid = queue.pop(0)
            neighbors = sorted(
                (link.target if link.source == dpid else link.source, link)
                for link in self.links.values()
                if link.status == "operational" and dpid in (link.source, link.target)
            )
            for neighbor, link in neighbors:
                if neighbor in visited:
                    continue
                visited.add(neighbor)
                queue.append(neighbor)
                parent[neighbor] = (dpid, link)

        output_ports: List[int] = []
        if source_dpid in parent:
            parent_dpid, parent_link = parent[source_dpid]
            parent_port = parent_link.port_at(source_dpid)
            if parent_port is not None and parent_port != source_port:
                output_ports.append(parent_port)
        for parent_dpid, link in parent.values():
            if parent_dpid != source_dpid:
                continue
            child_port = link.port_at(source_dpid)
            if child_port is not None and child_port != source_port:
                output_ports.append(child_port)
        for (dpid, port_no), is_up in tuple(self.port_states.items()):
            if dpid != source_dpid or not is_up or (dpid, port_no) == (source_dpid, source_port):
                continue
            if self._is_inter_switch_port(dpid, port_no):
                continue
            if source_host_port == (dpid, port_no):
                continue
            output_ports.append(port_no)
        return output_ports

    @staticmethod
    def _packet_out(datapath: Any, msg: Any, port_no: int) -> None:
        parser = datapath.ofproto_parser
        actions = [parser.OFPActionOutput(port_no)]
        packet_out = parser.OFPPacketOut(
            datapath=datapath,
            buffer_id=datapath.ofproto.OFP_NO_BUFFER,
            in_port=datapath.ofproto.OFPP_CONTROLLER,
            actions=actions,
            data=msg.data,
        )
        datapath.send_msg(packet_out)

    def _path_and_outputs(self, flow: LearnedFlow) -> Tuple[List[int], List[Tuple[int, int]]]:
        source_up = self.port_states.get((flow.source_dpid, flow.source_port))
        destination_up = self.port_states.get((flow.destination_dpid, flow.destination_port))
        if source_up is not True or destination_up is not True:
            return [], []
        path = find_switch_path(flow.source_dpid, flow.destination_dpid, self.links.values())
        outputs = route_output_ports(path, self.links.values(), flow.source_port, flow.destination_port)
        return path, outputs

    def _install_flow(self, flow: LearnedFlow) -> bool:
        path, outputs = self._path_and_outputs(flow)
        if not path or not outputs:
            flow.path = []
            flow.status = "blocked"
            flow.blocked_reason = "no_operational_route"
            self._record_event(
                "flow_blocked",
                source=flow.source_mac,
                destination=flow.destination_mac,
                reason=flow.blocked_reason,
                path=[],
            )
            return False

        datapaths: Dict[int, Any] = {}
        for index, (dpid, out_port) in enumerate(outputs):
            datapath = self.datapaths.get(dpid)
            if datapath is None:
                if datapaths:
                    self._fail_all_flows("switch_unavailable_during_install")
                return False
            parser = datapath.ofproto_parser
            if index == 0:
                in_port = flow.source_port
            else:
                previous_link = self.links.get(tuple(sorted((path[index - 1], dpid))))
                in_port = previous_link.port_at(dpid) if previous_link else None
            if in_port is None:
                if datapaths:
                    self._fail_all_flows("invalid_route_port_mapping")
                return False
            match = parser.OFPMatch(in_port=in_port, eth_dst=flow.destination_mac)
            actions = [parser.OFPActionOutput(out_port)]
            instructions = [parser.OFPInstructionActions(datapath.ofproto.OFPIT_APPLY_ACTIONS, actions)]
            mod = parser.OFPFlowMod(
                datapath=datapath,
                cookie=AIFE_FLOW_COOKIE,
                priority=100,
                idle_timeout=300,
                match=match,
                instructions=instructions,
            )
            datapath.send_msg(mod)
            datapaths[dpid] = datapath

        if not self._barrier(datapaths.values()):
            flow.path = []
            flow.status = "blocked"
            flow.blocked_reason = "openflow_rule_install_failed"
            LOG.error("OpenFlow rule installation failed for %s -> %s", flow.source_mac, flow.destination_mac)
            self._fail_all_flows("openflow_rule_install_failed")
            return False

        old_path = flow.path
        flow.path = path
        flow.status = "active"
        flow.blocked_reason = None
        if old_path and old_path != path:
            self._record_event(
                "flow_rerouted",
                source=flow.source_mac,
                destination=flow.destination_mac,
                old_path=[f"s{dpid}" for dpid in old_path],
                new_path=[f"s{dpid}" for dpid in path],
                reason="link_failure",
                failed_link=flow.failed_link,
            )
        return True

    def _first_output(self, flow: LearnedFlow) -> int:
        path, outputs = self._path_and_outputs(flow)
        if not path or not outputs:
            raise RuntimeError("AIFE route disappeared after successful rule installation")
        return outputs[0][1]

    def _delete_dynamic_rules(self, datapaths: Optional[Iterable[Any]] = None) -> bool:
        datapaths = tuple(self.datapaths.values()) if datapaths is None else tuple(datapaths)
        for datapath in datapaths:
            parser = datapath.ofproto_parser
            mod = parser.OFPFlowMod(
                datapath=datapath,
                command=datapath.ofproto.OFPFC_DELETE,
                cookie=AIFE_FLOW_COOKIE,
                cookie_mask=0xFFFFFFFFFFFFFFFF,
                out_port=datapath.ofproto.OFPP_ANY,
                out_group=datapath.ofproto.OFPG_ANY,
                match=parser.OFPMatch(),
            )
            datapath.send_msg(mod)
        return self._barrier(datapaths)

    def _reroute_known_flows(self, reason: str, failed_link: Optional[str] = None) -> None:
        if not self.flows:
            return
        if not self._delete_dynamic_rules():
            LOG.error("Could not confirm removal of stale forwarding rules after %s", reason)
            for flow in self.flows.values():
                self._block_flow(flow, "stale_rules_not_cleared")
            return
        for flow in self.flows.values():
            flow.failed_link = failed_link
            if not self._install_flow(flow):
                if flow.status != "blocked":
                    self._block_flow(flow, "forwarding_rules_not_installed")
                if any(candidate.status == "blocked" for candidate in self.flows.values()):
                    return

    def _fail_all_flows(self, reason: str) -> None:
        if not self._delete_dynamic_rules():
            LOG.error("Could not confirm cleanup of partially installed AIFE forwarding rules")
        for flow in self.flows.values():
            self._block_flow(flow, reason)

    def _retry_blocked_flows(self) -> None:
        for flow in self.flows.values():
            if flow.status == "blocked":
                self._install_flow(flow)

    def _block_flow(self, flow: LearnedFlow, reason: str) -> None:
        flow.status = "blocked"
        flow.path = []
        flow.blocked_reason = reason
        self._record_event(
            "flow_blocked",
            source=flow.source_mac,
            destination=flow.destination_mac,
            reason=reason,
            path=[],
        )

    def _barrier(self, datapaths: Iterable[Any]) -> bool:
        pending: List[Tuple[Any, Any, int]] = []
        error_counts = {datapath.id: self._flow_errors.get(datapath.id, 0) for datapath in datapaths}
        for datapath in datapaths:
            request = datapath.ofproto_parser.OFPBarrierRequest(datapath)
            event = hub.Event()
            self._barriers[(datapath.id, request.xid)] = event
            pending.append((datapath, request.xid))
            datapath.send_msg(request)
        success = True
        for datapath, xid in pending:
            event = self._barriers.pop((datapath.id, xid))
            if not event.wait(timeout=2.0):
                LOG.error("Timed out waiting for OpenFlow barrier: dpid=%016x xid=%s", datapath.id, xid)
                success = False
            if self._flow_errors.get(datapath.id, 0) != error_counts[datapath.id]:
                success = False
        return success

    def barrier_reply(self, ev: Any) -> None:
        key = (ev.msg.datapath.id, ev.msg.xid)
        event = self._barriers.get(key)
        if event:
            event.set()

    def openflow_error(self, ev: Any) -> None:
        datapath = ev.msg.datapath
        self._flow_errors[datapath.id] = self._flow_errors.get(datapath.id, 0) + 1
        LOG.error(
            "OpenFlow error: dpid=%016x type=%s code=%s xid=%s",
            datapath.id,
            ev.msg.type,
            ev.msg.code,
            ev.msg.xid,
        )

    def topology_snapshot(self) -> Dict[str, List[Dict[str, Any]]]:
        switch_ids = sorted(set(self.datapaths) | {
            dpid for link in self.links.values() for dpid in (link.source, link.target)
        })
        nodes: List[Dict[str, Any]] = []
        for index, dpid in enumerate(switch_ids):
            nodes.append({
                "id": f"switch-{dpid}",
                "label": f"s{dpid}",
                "type": "switch",
                "status": "healthy" if dpid in self.datapaths else "warning",
                "x": 120 + index * 180,
                "y": 160,
                "trafficLevel": 0,
            })
        hosts = sorted(self.hosts.values(), key=lambda host: host.mac)
        for index, host in enumerate(hosts):
            nodes.append({
                "id": f"host-{host.mac.replace(':', '')}",
                "label": host.ip or host.mac,
                "type": "host",
                "status": "healthy" if self.port_states.get((host.dpid, host.port_no)) is True else "warning",
                "x": 120 + switch_ids.index(host.dpid) * 180 if host.dpid in switch_ids else 120,
                "y": 300 + index * 70,
                "trafficLevel": 0,
            })

        links: List[Dict[str, Any]] = []
        for link in self.links.values():
            links.append({
                "source": f"switch-{link.source}",
                "target": f"switch-{link.target}",
                "source_port": link.source_port,
                "target_port": link.target_port,
                "bandwidth": 0,
                "trafficLevel": 0,
                "status": "healthy" if link.status == "operational" else "failed" if link.status == "failed" else "warning",
                "reason": link.reason,
                "origin": "detected",
            })
        for host in hosts:
            port_up = self.port_states.get((host.dpid, host.port_no)) is True
            links.append({
                "source": f"switch-{host.dpid}",
                "target": f"host-{host.mac.replace(':', '')}",
                "source_port": host.port_no,
                "bandwidth": 0,
                "trafficLevel": 0,
                "status": "healthy" if port_up else "failed",
                "reason": "host_port_state",
                "origin": "detected",
            })
        return {"nodes": nodes, "links": links}

    def forwarding_snapshot(self) -> List[Dict[str, Any]]:
        return [asdict(flow) for flow in self.flows.values()]

    def events_snapshot(self) -> List[Dict[str, Any]]:
        return list(self.events)