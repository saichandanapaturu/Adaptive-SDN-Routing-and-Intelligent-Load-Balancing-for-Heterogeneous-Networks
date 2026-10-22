#!/usr/bin/env python3
"""Drive training traffic through the AIFE Mininet topology.

Run as root while the OS-Ken controller is running; the controller records
every OpenFlow port sample to SQLite. Traffic alternates idle periods with
UDP iperf loads on host pairs:

- ramps that step up toward and past the 8 Mbit/s congestion threshold,
- abrupt bursts above it, and
- loads that stay below it (busy but not congested).

All rates are offered loads on 10 Mbit/s links (topology.LINK_BW_MBPS); the
congestion labels come from the switch counters the controller measures,
not from this script.
"""

import argparse
import random
import time

from mininet.link import TCLink
from mininet.log import info, setLogLevel
from mininet.net import Mininet
from mininet.node import OVSSwitch, RemoteController

from topology import AIFETopo, LINK_BW_MBPS

HOST_PAIRS = [("h1", "h3"), ("h1", "h2"), ("h2", "h3")]


def offered_load(net, source, destination, mbps, seconds):
    """Send UDP at ``mbps`` from source to destination for ``seconds`` (blocking)."""
    server_ip = net[destination].IP()
    net[source].cmd(f"iperf -c {server_ip} -u -b {mbps:.2f}M -t {seconds:.0f} >/dev/null 2>&1")


def run(minutes, seed):
    rng = random.Random(seed)
    net = Mininet(
        topo=AIFETopo(),
        controller=None,
        switch=OVSSwitch,
        link=TCLink,
        autoSetMacs=True,
        autoStaticArp=True,
    )
    net.addController("c0", controller=RemoteController, ip="127.0.0.1", port=6633)
    net.start()
    try:
        info("*** Waiting for LLDP link discovery and port verification\n")
        time.sleep(10)
        # Teaches the controller every host so it installs forwarding rules.
        net.pingAll()
        for host in net.hosts:
            host.cmd("iperf -s -u -D >/dev/null 2>&1")

        deadline = time.time() + minutes * 60
        bursts = 0
        while time.time() < deadline:
            time.sleep(rng.uniform(8, 25))
            source, destination = rng.choice(HOST_PAIRS)
            kind = rng.choices(["ramp", "burst", "below"], weights=[0.45, 0.25, 0.30])[0]
            peak = rng.uniform(8.6, 9.8) if kind != "below" else rng.uniform(2.0, 6.5)
            info(f"*** {kind}: {source} -> {destination} up to {peak:.1f} of {LINK_BW_MBPS} Mbit/s\n")
            if kind == "ramp":
                steps = rng.randint(3, 5)
                for step in range(1, steps + 1):
                    offered_load(net, source, destination, peak * step / steps, rng.uniform(2, 4))
                offered_load(net, source, destination, peak, rng.uniform(5, 12))
            else:
                offered_load(net, source, destination, peak, rng.uniform(6, 18))
            bursts += 1
        info(f"*** Generated {bursts} traffic periods over {minutes} minutes\n")
    finally:
        for host in net.hosts:
            host.cmd("pkill -f 'iperf -s' >/dev/null 2>&1")
        net.stop()


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--minutes", type=float, default=20)
    parser.add_argument("--seed", type=int, default=1)
    args = parser.parse_args()
    setLogLevel("info")
    run(args.minutes, args.seed)


if __name__ == "__main__":
    main()
