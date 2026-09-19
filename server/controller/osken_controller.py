#!/usr/bin/env python3
"""AIFE SDN control-plane foundation.

This step intentionally handles only switch discovery/lifecycle and the
OpenFlow 1.3 table-miss rule. Statistics, prediction, traffic generation, and
routing intelligence are intentionally deferred to later steps.
"""

import logging
from typing import Dict

from os_ken.base import app_manager
from os_ken.controller import ofp_event
from os_ken.controller.handler import CONFIG_DISPATCHER, DEAD_DISPATCHER, MAIN_DISPATCHER
from os_ken.controller.handler import set_ev_cls
from os_ken.lib import hub
from os_ken.ofproto import ofproto_v1_3

try:
    from server.controller.statistics import OpenFlowStatisticsCollector
except ImportError:
    # Supports launching the file directly through osken-manager from its
    # controller directory, where that directory is placed on sys.path.
    from statistics import OpenFlowStatisticsCollector


LOG = logging.getLogger("aife.osken_controller")


class AIFEController(app_manager.OSKenApp):
    """Minimal OS-Ken application for the AIFE OpenFlow control plane."""

    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.connected_switches: Dict[int, object] = {}
        self.statistics = OpenFlowStatisticsCollector()
        self._stats_thread = hub.spawn(self._poll_port_statistics)
        LOG.info("AIFE OS-Ken controller initialized for OpenFlow 1.3")

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
