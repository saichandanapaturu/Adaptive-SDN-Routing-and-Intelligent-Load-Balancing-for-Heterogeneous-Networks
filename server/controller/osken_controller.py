#!/usr/bin/env python3
"""AIFE OpenFlow 1.3 controller, topology discovery, forwarding, and telemetry."""

import logging
import sqlite3
import threading
from typing import Dict

from os_ken.base import app_manager
from os_ken.controller import ofp_event
from os_ken.controller.handler import CONFIG_DISPATCHER, DEAD_DISPATCHER, MAIN_DISPATCHER
from os_ken.controller.handler import set_ev_cls
from os_ken.cfg import CONF
from os_ken.lib import hub
from os_ken.ofproto import ofproto_v1_3
from os_ken.topology import event as topology_event
from os_ken.topology import switches as topology_switches

CONF.set_default("observe_links", True)

try:
    from server.controller.forwarding import AIFEForwarding
except ImportError:
    from forwarding import AIFEForwarding

try:
    from server.controller.congestion_model import CongestionPredictor
    from server.controller.statistics import OpenFlowStatisticsCollector
    from server.controller.telemetry_api import TelemetryApiState, TelemetryService
    from server.controller.telemetry_store import TelemetryStore
except ImportError:
    # Supports loading the app by file path (as osken-manager did) from its
    # controller directory, where that directory is placed on sys.path.
    from congestion_model import CongestionPredictor
    from statistics import OpenFlowStatisticsCollector
    from telemetry_api import TelemetryApiState, TelemetryService
    from telemetry_store import TelemetryStore


LOG = logging.getLogger("aife.osken_controller")
MAX_PENDING_PACKET_INS = 64


def _spawn(func, *args, **kwargs):
    """hub.spawn that logs exceptions.

    In OS-Ken 4's native hub, TaskExit is Exception, so HubThread swallows
    every exception in a spawned function without logging it.
    """
    def run():
        try:
            return func(*args, **kwargs)
        except Exception:  # noqa: BLE001 - surfaced in the log, then the thread ends
            LOG.exception("Controller task %s failed", getattr(func, "__qualname__", func))
            return None

    return hub.spawn(run)


app_manager.require_app(topology_switches.__name__)
class AIFEController(app_manager.OSKenApp):
    """Minimal OS-Ken application for the AIFE OpenFlow control plane."""

    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.connected_switches: Dict[int, object] = {}
        self._packet_in_slots = threading.BoundedSemaphore(MAX_PENDING_PACKET_INS)
        self.predictor = CongestionPredictor()
        LOG.info("Random Forest congestion predictor: %s", self.predictor.inference_status)
        self.forwarding = AIFEForwarding(self.connected_switches, self.predictor)
        self.statistics = OpenFlowStatisticsCollector()
        try:
            self.telemetry_store = TelemetryStore()
            LOG.info("Recording port statistics to %s", self.telemetry_store.path)
        except (OSError, sqlite3.Error):
            LOG.exception("Telemetry history disabled: could not open the SQLite store")
            self.telemetry_store = None
        self.telemetry_service = TelemetryService(
            TelemetryApiState(
                self.statistics,
                self._switch_snapshot,
                self.forwarding.topology_snapshot,
                self.forwarding.events_snapshot,
                self.forwarding.forwarding_snapshot,
                self.predictor.status,
            )
        )
        self.telemetry_service.start()
        self._stats_thread = _spawn(self._poll_port_statistics)
        LOG.info("AIFE OS-Ken controller initialized for OpenFlow 1.3")

    def _switch_snapshot(self):
        """Return API-safe connection metadata without exposing datapath objects."""
        return [
            {"dpid": dpid, "status": "connected"}
            for dpid in sorted(self.connected_switches)
        ]

    def _poll_port_statistics(self):
        """Request port counters from every connected switch once per second."""
        while True:
            for datapath in tuple(self.connected_switches.values()):
                self._request_port_statistics(datapath)
            hub.sleep(1.0)

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
        # Rule cleanup and port discovery start once the handshake reaches
        # MAIN_DISPATCHER (switch_state_change_handler); during CONFIG their
        # replies would not reach MAIN_DISPATCHER handlers.

    @set_ev_cls(ofp_event.EventOFPStateChange, [MAIN_DISPATCHER, DEAD_DISPATCHER])
    def switch_state_change_handler(self, ev):
        """Track switch connection and disconnection lifecycle events."""
        datapath = ev.datapath
        dpid = datapath.id

        if ev.state == MAIN_DISPATCHER:
            if self.connected_switches.get(dpid) is not datapath:
                self.connected_switches[dpid] = datapath
            LOG.info("Switch entered main dispatcher: dpid=%016x", dpid)
            _spawn(self._refresh_switch_state, datapath)
        elif ev.state == DEAD_DISPATCHER:
            if self.connected_switches.pop(dpid, None) is not None:
                LOG.info("Switch disconnected: dpid=%016x", dpid)
                _spawn(self.forwarding.switch_disconnected, dpid)

    @staticmethod
    def _request_port_descriptions(datapath):
        request = datapath.ofproto_parser.OFPPortDescStatsRequest(datapath, 0)
        datapath.send_msg(request)

    def _refresh_switch_state(self, datapath):
        if self.forwarding.clear_datapath_rules(datapath):
            self._request_port_descriptions(datapath)

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
        self.predictor.observe(samples)
        if self.telemetry_store is not None:
            # Written by the store's background thread so slow disk I/O never
            # delays this event thread (which also delivers barrier replies).
            self.telemetry_store.record_async(samples)
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

    @set_ev_cls(topology_event.EventLinkAdd)
    def link_add_handler(self, ev):
        _spawn(self.forwarding.link_added, ev.link)

    @set_ev_cls(topology_event.EventLinkDelete)
    def link_delete_handler(self, ev):
        _spawn(self.forwarding.link_deleted, ev.link)

    @set_ev_cls(ofp_event.EventOFPPortStatus, MAIN_DISPATCHER)
    def port_status_handler(self, ev):
        deleted = ev.msg.reason == ev.msg.datapath.ofproto.OFPPR_DELETE
        _spawn(self.forwarding.port_status, ev.msg.datapath, ev.msg.desc, deleted=deleted)

    @set_ev_cls(ofp_event.EventOFPPortDescStatsReply, [CONFIG_DISPATCHER, MAIN_DISPATCHER])
    def port_description_reply_handler(self, ev):
        _spawn(self.forwarding.port_descriptions, ev.msg.datapath, ev.msg.body)

    @set_ev_cls(ofp_event.EventOFPPacketIn, MAIN_DISPATCHER)
    def packet_in_handler(self, ev):
        # Handlers run outside the event thread because installing a route
        # waits for barrier replies delivered by that thread. Cap them: a
        # packet-in flood (for example before routes exist) would otherwise
        # start one blocked thread per packet. Dropped packet-ins are only
        # unforwarded first packets; senders retry or the next one is handled.
        if not self._packet_in_slots.acquire(blocking=False):
            return
        _spawn(self._handle_packet_in, ev)

    def _handle_packet_in(self, ev):
        try:
            self.forwarding.packet_in(ev)
        finally:
            self._packet_in_slots.release()

    @set_ev_cls(ofp_event.EventOFPBarrierReply, [CONFIG_DISPATCHER, MAIN_DISPATCHER])
    def barrier_reply_handler(self, ev):
        self.forwarding.barrier_reply(ev)

    @set_ev_cls(ofp_event.EventOFPErrorMsg, [CONFIG_DISPATCHER, MAIN_DISPATCHER])
    def openflow_error_handler(self, ev):
        self.forwarding.openflow_error(ev)


if __name__ == "__main__":
    # OS-Ken 4 removed os_ken.cmd.manager; run_controller launches this app.
    raise SystemExit("Start the controller with: PYTHONPATH=. python3 -m server.controller.run_controller")
