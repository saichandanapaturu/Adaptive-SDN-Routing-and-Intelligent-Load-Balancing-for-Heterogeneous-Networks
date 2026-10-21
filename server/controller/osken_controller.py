#!/usr/bin/env python3
"""AIFE SDN control-plane foundation.

The controller handles switch discovery/lifecycle, the OpenFlow 1.3 table-miss
rule, real port-statistics collection with historical persistence, and
recommendation-only route selection. Prediction training and forwarding changes
are deferred.
"""

import atexit
import logging
import os
import sqlite3
from pathlib import Path
from typing import Dict

from os_ken.base import app_manager
from os_ken.controller import ofp_event
from os_ken.controller.handler import CONFIG_DISPATCHER, DEAD_DISPATCHER, MAIN_DISPATCHER
from os_ken.controller.handler import set_ev_cls
from os_ken.lib import hub
from os_ken.ofproto import ofproto_v1_3
from os_ken.topology import event as topology_event
from os_ken.topology import switches as topology_switches

try:
    from server.controller.statistics import OpenFlowStatisticsCollector
    from server.controller.telemetry_api import TelemetryApiState, TelemetryService
    from server.controller.telemetry_storage import (
        DEFAULT_DATABASE_PATH,
        HistoricalTelemetryStore,
        TelemetryHistoryWriter,
    )
    from server.controller.topology_discovery import TopologyDiscoveryState
    from server.controller.routing import (
        RouteDecisionEngine,
        RoutingConfig,
        load_trusted_model_signals,
    )
except ImportError:
    # Supports launching the file directly through osken-manager from its
    # controller directory, where that directory is placed on sys.path.
    from statistics import OpenFlowStatisticsCollector
    from telemetry_api import TelemetryApiState, TelemetryService
    from telemetry_storage import DEFAULT_DATABASE_PATH, HistoricalTelemetryStore, TelemetryHistoryWriter
    from topology_discovery import TopologyDiscoveryState
    from routing import RouteDecisionEngine, RoutingConfig, load_trusted_model_signals


LOG = logging.getLogger("aife.osken_controller")


class AIFEController(app_manager.OSKenApp):
    """Minimal OS-Ken application for the AIFE OpenFlow control plane."""

    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]
    _CONTEXTS = {"switches": topology_switches.Switches}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.connected_switches: Dict[int, object] = {}
        self.statistics = OpenFlowStatisticsCollector()
        self.route_engine = RouteDecisionEngine(RoutingConfig.from_environment())
        self.topology = TopologyDiscoveryState(
            discovery_enabled=bool(self.CONF.observe_links),
        )
        if not self.topology.discovery_enabled:
            LOG.warning(
                "OS-Ken LLDP link discovery is disabled; start with --observe-links "
                "to discover switch-to-switch links"
            )
        self.telemetry_history_writer = None
        self.history_store = None
        database_path = os.getenv("AIFE_TELEMETRY_DB_PATH", str(DEFAULT_DATABASE_PATH))
        try:
            retention_days = int(os.getenv("AIFE_TELEMETRY_RETENTION_DAYS", "30"))
            if retention_days < 1:
                raise ValueError("AIFE_TELEMETRY_RETENTION_DAYS must be at least 1")
            history_store = HistoricalTelemetryStore(database_path)
            self.telemetry_history_writer = TelemetryHistoryWriter(history_store, retention_days)
            self.history_store = history_store
            atexit.register(self.telemetry_history_writer.close)
            LOG.info(
                "Historical telemetry enabled: database=%s retention_days=%d",
                database_path,
                retention_days,
            )
        except (OSError, sqlite3.Error, ValueError):
            LOG.exception(
                "Could not initialize historical telemetry storage at %s; "
                "continuing with in-memory statistics only",
                database_path,
            )
        self.telemetry_service = TelemetryService(
            TelemetryApiState(
                self.statistics,
                self._switch_snapshot,
                topology_provider=self.topology.snapshot,
                route_provider=self._route_recommendation,
            )
        )
        self.telemetry_service.start()
        self._stats_thread = hub.spawn(self._poll_port_statistics)
        self._topology_thread = hub.spawn(self._poll_topology)
        LOG.info("AIFE OS-Ken controller initialized for OpenFlow 1.3")

    def _switch_snapshot(self):
        """Return API-safe connection metadata without exposing datapath objects."""
        return [
            {"dpid": dpid, "status": "connected"}
            for dpid in sorted(self.connected_switches)
        ]

    @staticmethod
    def _route_endpoint(value):
        """Interpret explicit numeric identifiers as DPIDs; other values are host IDs."""
        if value.isdecimal():
            return int(value, 10)
        if value.lower().startswith("0x"):
            try:
                return int(value, 16)
            except ValueError:
                return value
        return value

    def _route_recommendation(self, source, destination):
        model_path = Path(
            os.getenv(
                "AIFE_ML_MODEL_PATH",
                str(Path.home() / ".local" / "share" / "aife" / "models" / "port-congestion.joblib"),
            )
        )
        model_signals = load_trusted_model_signals(
            self.history_store,
            model_path,
            max_model_age_seconds=self.route_engine.config.model_max_age_seconds,
            max_sample_age_seconds=self.route_engine.config.telemetry_max_age_seconds,
        )
        return self.route_engine.recommend(
            self.topology.snapshot(),
            self.statistics.latest_as_dicts(),
            self._route_endpoint(source),
            self._route_endpoint(destination),
            model_signals=model_signals,
        )

    def _poll_port_statistics(self):
        """Request port counters from every connected switch once per second."""
        while True:
            for datapath in tuple(self.connected_switches.values()):
                self._request_port_statistics(datapath)
            hub.sleep(1.0)

    def _poll_topology(self):
        """Refresh observed switches, LLDP links, and host attachments from OS-Ken."""
        while True:
            try:
                switch_reply = self.send_request(topology_event.EventSwitchRequest())
                link_reply = self.send_request(topology_event.EventLinkRequest())
                host_reply = self.send_request(topology_event.EventHostRequest())
                switches = [
                    (switch.dp.id, (port.port_no for port in switch.ports))
                    for switch in switch_reply.switches
                ]
                links = [
                    (
                        link.src.dpid,
                        link.src.port_no,
                        link.dst.dpid,
                        link.dst.port_no,
                    )
                    for link in link_reply.links
                ]
                host_ports = [
                    (
                        host.mac,
                        host.port.dpid,
                        host.port.port_no,
                        tuple(host.ipv4),
                        tuple(host.ipv6),
                    )
                    for host in host_reply.hosts
                ]
                self.topology.replace_snapshot(switches, links, host_ports)
            except Exception as error:
                self.topology.mark_query_failure(str(error))
                LOG.exception("Could not refresh topology from OS-Ken")
            hub.sleep(2.0)

    @staticmethod
    def _request_port_statistics(datapath):
        """Send an OpenFlow 1.3 request for all switch port counters."""
        parser = datapath.ofproto_parser
        request = parser.OFPPortStatsRequest(
            datapath,
            0,
            datapath.ofproto.OFPP_ANY,
        )
        datapath.send_msg(request)

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures, CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
        """Install the table-miss rule when a switch completes negotiation."""
        datapath = ev.msg.datapath
        dpid = datapath.id
        self.connected_switches[dpid] = datapath
        LOG.info("Switch connected: dpid=%016x", dpid)
        self._install_table_miss(datapath)

    @set_ev_cls(topology_event.EventSwitchEnter)
    def topology_switch_enter_handler(self, ev):
        switch = ev.switch
        self.topology.switch_enter(
            switch.dp.id,
            (port.port_no for port in switch.ports),
        )

    @set_ev_cls(topology_event.EventSwitchReconnected)
    def topology_switch_reconnected_handler(self, ev):
        switch = ev.switch
        self.topology.switch_enter(
            switch.dp.id,
            (port.port_no for port in switch.ports),
            reconnected=True,
        )

    @set_ev_cls(topology_event.EventSwitchLeave)
    def topology_switch_leave_handler(self, ev):
        self.topology.switch_leave(ev.switch.dp.id)

    @set_ev_cls(topology_event.EventPortAdd)
    @set_ev_cls(topology_event.EventPortModify)
    def topology_port_add_or_modify_handler(self, ev):
        self.topology.port_add(ev.port.dpid, ev.port.port_no)

    @set_ev_cls(topology_event.EventPortDelete)
    def topology_port_delete_handler(self, ev):
        self.topology.port_delete(ev.port.dpid, ev.port.port_no)

    @set_ev_cls(topology_event.EventLinkAdd)
    def topology_link_add_handler(self, ev):
        link = ev.link
        self.topology.link_add(
            link.src.dpid,
            link.src.port_no,
            link.dst.dpid,
            link.dst.port_no,
        )

    @set_ev_cls(topology_event.EventLinkDelete)
    def topology_link_delete_handler(self, ev):
        link = ev.link
        self.topology.link_delete(
            link.src.dpid,
            link.src.port_no,
            link.dst.dpid,
            link.dst.port_no,
        )

    @set_ev_cls(topology_event.EventHostAdd)
    def topology_host_add_handler(self, ev):
        host = ev.host
        self.topology.host_add(
            host.port.dpid,
            host.port.port_no,
            host.mac,
            ipv4=host.ipv4,
            ipv6=host.ipv6,
        )

    @set_ev_cls(topology_event.EventHostMove)
    def topology_host_move_handler(self, ev):
        host = ev.dst
        self.topology.host_move(
            host.mac,
            host.port.dpid,
            host.port.port_no,
            ipv4=host.ipv4,
            ipv6=host.ipv6,
        )

    @set_ev_cls(topology_event.EventHostDelete)
    def topology_host_delete_handler(self, ev):
        self.topology.host_delete(ev.host.mac)

    @set_ev_cls(ofp_event.EventOFPStateChange, [MAIN_DISPATCHER, DEAD_DISPATCHER])
    def switch_state_change_handler(self, ev):
        """Track switch connection and disconnection lifecycle events."""
        datapath = ev.datapath
        dpid = datapath.id

        if ev.state == MAIN_DISPATCHER:
            if self.connected_switches.get(dpid) is not datapath:
                self.connected_switches[dpid] = datapath
                LOG.info("Switch entered main dispatcher: dpid=%016x", dpid)
        elif ev.state == DEAD_DISPATCHER:
            if self.connected_switches.pop(dpid, None) is not None:
                LOG.info("Switch disconnected: dpid=%016x", dpid)

    def _install_table_miss(self, datapath):
        """Send unmatched packets to the controller without buffering them."""
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser
        actions = [
            parser.OFPActionOutput(
                ofproto.OFPP_CONTROLLER,
                ofproto.OFPCML_NO_BUFFER,
            )
        ]
        instruction = parser.OFPInstructionActions(
            ofproto.OFPIT_APPLY_ACTIONS,
            actions,
        )
        flow_mod = parser.OFPFlowMod(
            datapath=datapath,
            priority=0,
            match=parser.OFPMatch(),
            instructions=[instruction],
        )
        datapath.send_msg(flow_mod)
        LOG.info("Installed table-miss rule: dpid=%016x", datapath.id)

    @set_ev_cls(ofp_event.EventOFPPortStatsReply, MAIN_DISPATCHER)
    def port_stats_reply_handler(self, ev):
        """Process counters from a real OpenFlow port-statistics reply."""
        datapath = ev.msg.datapath
        samples = self.statistics.process_port_stats(datapath.id, ev.msg.body)
        if self.telemetry_history_writer is not None:
            self.telemetry_history_writer.submit(samples)
        for sample in samples:
            LOG.info(
                "[STATS] DPID=%s PORT=%s RX_BYTES=%s TX_BYTES=%s "
                "RX_RATE=%.2f TX_RATE=%.2f RX_PKTS=%s TX_PKTS=%s "
                "RX_ERR=%s TX_ERR=%s RX_DROP=%s TX_DROP=%s",
                sample.dpid,
                sample.port_no,
                sample.rx_bytes,
                sample.tx_bytes,
                sample.rx_byte_rate,
                sample.tx_byte_rate,
                sample.rx_packets,
                sample.tx_packets,
                sample.rx_errors,
                sample.tx_errors,
                sample.rx_dropped,
                sample.tx_dropped,
            )


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    from os_ken.cmd import manager

    manager.main()
