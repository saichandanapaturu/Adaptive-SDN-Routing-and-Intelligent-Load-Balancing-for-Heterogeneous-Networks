#!/usr/bin/env python3
r"""AIFE Mininet topology for the SDN foundation step.

Topology:
    h1--s1--s2--s4--h3
         \  |       /
          \ s3 ----/
           \--h2

The two h1-to-h3 paths are:
    h1 -> s1 -> s2 -> s4 -> h3
    h1 -> s1 -> s3 -> s4 -> h3
"""

from mininet.cli import CLI
from mininet.link import TCLink
from mininet.net import Mininet
from mininet.node import OVSSwitch, RemoteController
from mininet.topo import Topo


class AIFETopo(Topo):
    """Four OVS switches and three hosts with two paths between h1 and h3."""

    def build(self):
        hosts = {
            "h1": self.addHost("h1"),
            "h2": self.addHost("h2"),
            "h3": self.addHost("h3"),
        }

        switches = {
            name: self.addSwitch(
                name,
                dpid=f"{index:016x}",
                protocols="OpenFlow13",
            )
            for index, name in enumerate(("s1", "s2", "s3", "s4"), start=1)
        }

        # Host attachments required by the AIFE topology.
        self.addLink(hosts["h1"], switches["s1"], cls=TCLink)
        self.addLink(hosts["h2"], switches["s3"], cls=TCLink)
        self.addLink(hosts["h3"], switches["s4"], cls=TCLink)

        # Switch fabric: this creates two distinct h1-to-h3 paths.
        self.addLink(switches["s1"], switches["s2"], cls=TCLink)
        self.addLink(switches["s1"], switches["s3"], cls=TCLink)
        self.addLink(switches["s2"], switches["s4"], cls=TCLink)
        self.addLink(switches["s3"], switches["s4"], cls=TCLink)


def run():
    """Start the topology against the OS-Ken controller and open the CLI."""
    net = Mininet(
        topo=AIFETopo(),
        controller=None,
        switch=OVSSwitch,
        link=TCLink,
        autoSetMacs=True,
        autoStaticArp=True,
    )
    net.addController(
        "c0",
        controller=RemoteController,
        ip="127.0.0.1",
        port=6633,
    )

    try:
        net.start()
        print("AIFE Mininet topology started with OpenFlow 1.3 switches.")
        print("Expected switch DPIDs: s1=1, s2=2, s3=3, s4=4")
        print("Run 'pingall' in the Mininet CLI to verify host reachability.")
        CLI(net)
    finally:
        net.stop()


if __name__ == "__main__":
    run()
