"""Controller link-state tests; these do not emulate real OpenFlow forwarding."""

from types import SimpleNamespace
from unittest import TestCase, main

from os_ken.cfg import CONF
from server.controller import osken_controller
from server.controller.forwarding import AIFEForwarding, LearnedFlow
from server.controller.routing import SwitchLink


class ForwardingLinkStateTests(TestCase):
    def test_controller_enables_osken_link_observation(self) -> None:
        self.assertTrue(CONF.observe_links)
        self.assertIsNotNone(osken_controller.AIFEController)

    def setUp(self) -> None:
        self.datapaths = {
            dpid: SimpleNamespace(
                id=dpid,
                ofproto=SimpleNamespace(OFPPS_LINK_DOWN=1, OFPPC_PORT_DOWN=1),
            )
            for dpid in (1, 2)
        }
        self.forwarding = AIFEForwarding(self.datapaths)
        self.link = SimpleNamespace(
            src=SimpleNamespace(dpid=1, port_no=12),
            dst=SimpleNamespace(dpid=2, port_no=21),
        )

    @staticmethod
    def port(port_no: int, *, up: bool) -> SimpleNamespace:
        return SimpleNamespace(
            port_no=port_no,
            state=0 if up else 1,
            config=0,
            name=f"p{port_no}",
        )

    def test_link_failure_is_detected_once_and_endpoint_state_invalidated(self) -> None:
        self.forwarding.link_added(self.link)
        self.forwarding.port_descriptions(self.datapaths[1], [self.port(12, up=True)])
        self.forwarding.port_descriptions(self.datapaths[2], [self.port(21, up=True)])
        self.assertEqual(self.forwarding.links[(1, 2)].status, "operational")

        self.assertTrue(self.forwarding.link_deleted(self.link))
        self.assertFalse(self.forwarding.link_deleted(self.link))
        self.assertEqual(self.forwarding.links[(1, 2)].status, "failed")
        self.assertNotIn((1, 12), self.forwarding.port_states)
        self.assertNotIn((2, 21), self.forwarding.port_states)
        self.assertEqual([event["type"] for event in self.forwarding.events], ["link_failed"])

    def test_port_down_and_port_delete_mark_links_failed_once(self) -> None:
        self.forwarding.link_added(self.link)
        self.forwarding.port_descriptions(self.datapaths[1], [self.port(12, up=True)])
        self.forwarding.port_descriptions(self.datapaths[2], [self.port(21, up=True)])

        self.forwarding.port_status(self.datapaths[1], self.port(12, up=False))
        self.forwarding.port_status(self.datapaths[1], self.port(12, up=False))

        self.assertEqual(self.forwarding.links[(1, 2)].status, "failed")
        self.assertEqual([event["type"] for event in self.forwarding.events].count("link_failed"), 1)

    def test_unknown_destination_flood_uses_operational_spanning_tree_only(self) -> None:
        self.forwarding.links = {
            (1, 2): SwitchLink(1, 12, 2, 21, "failed", "test"),
            (1, 3): SwitchLink(1, 13, 3, 31, "operational", "test"),
            (3, 4): SwitchLink(3, 34, 4, 43, "operational", "test"),
            (2, 4): SwitchLink(2, 24, 4, 42, "operational", "test"),
        }
        self.forwarding.port_states.update({
            (1, 1): True,
            (2, 2): True,
            (3, 3): True,
            (4, 4): True,
        })

        from_root = self.forwarding._flood_outputs(1, 1, (1, 1))
        from_middle = self.forwarding._flood_outputs(3, 31, (1, 1))
        from_leaf = self.forwarding._flood_outputs(4, 43, (1, 1))
        from_last = self.forwarding._flood_outputs(2, 24, (1, 1))

        self.assertEqual(from_root, [13])
        self.assertEqual(from_middle, [34, 3])
        self.assertEqual(from_leaf, [42, 4])
        self.assertEqual(from_last, [2])
        self.assertNotIn(12, from_root)

    def test_recovery_requires_fresh_up_state_at_both_endpoints(self) -> None:
        self.forwarding.link_added(self.link)
        self.forwarding.port_descriptions(self.datapaths[1], [self.port(12, up=True)])
        self.forwarding.port_descriptions(self.datapaths[2], [self.port(21, up=True)])
        self.forwarding.link_deleted(self.link)
        self.forwarding.link_added(self.link)

        self.forwarding.port_descriptions(self.datapaths[1], [self.port(12, up=True)])
        self.assertEqual(self.forwarding.links[(1, 2)].status, "failed")
        self.assertEqual([event["type"] for event in self.forwarding.events].count("link_recovered"), 0)

        self.forwarding.port_descriptions(self.datapaths[2], [self.port(21, up=True)])
        self.assertEqual(self.forwarding.links[(1, 2)].status, "operational")
        self.assertEqual([event["type"] for event in self.forwarding.events].count("link_recovered"), 1)


class FakeParser:
    next_xid = 1

    @staticmethod
    def OFPMatch(**values):
        return SimpleNamespace(**values)

    @staticmethod
    def OFPActionOutput(port_no):
        return SimpleNamespace(port_no=port_no)

    @staticmethod
    def OFPInstructionActions(_instruction_type, actions):
        return SimpleNamespace(actions=actions)

    @staticmethod
    def OFPFlowMod(**values):
        return SimpleNamespace(**values)

    @classmethod
    def OFPBarrierRequest(cls, _datapath):
        request = SimpleNamespace(xid=cls.next_xid)
        cls.next_xid += 1
        return request


class ForwardingRuleTests(TestCase):
    def setUp(self) -> None:
        protocol = SimpleNamespace(
            OFPPS_LINK_DOWN=1,
            OFPPC_PORT_DOWN=1,
            OFPIT_APPLY_ACTIONS=4,
            OFPFC_DELETE=3,
            OFPP_ANY=0xFFFFFFFF,
            OFPG_ANY=0xFFFFFFFF,
        )
        self.datapaths = {
            dpid: SimpleNamespace(id=dpid, ofproto=protocol, ofproto_parser=FakeParser(), sent=[])
            for dpid in (1, 2, 3, 4)
        }
        for datapath in self.datapaths.values():
            datapath.send_msg = lambda msg, target=datapath: target.sent.append(msg)
        self.forwarding = AIFEForwarding(self.datapaths)
        self.forwarding._barrier = lambda _datapaths: True
        self.forwarding.links = {
            (1, 2): self._link(1, 12, 2, 21, "failed"),
            (1, 3): self._link(1, 13, 3, 31),
            (3, 4): self._link(3, 34, 4, 43),
            (2, 4): self._link(2, 24, 4, 42),
        }
        self.forwarding.port_states.update({(1, 1): True, (4, 4): True})

    @staticmethod
    def _link(source, source_port, target, target_port, status="operational"):
        from server.controller.routing import SwitchLink

        return SwitchLink(source, source_port, target, target_port, status, "test")

    def _flow(self):
        return LearnedFlow("00:00:00:00:00:01", "00:00:00:00:00:04", 1, 1, 4, 4, [1, 2, 4], "active")

    def test_rerouted_flow_installs_only_operational_output_ports(self) -> None:
        flow = self._flow()
        self.forwarding.flows[(flow.source_mac, flow.destination_mac)] = flow
        self.forwarding._delete_dynamic_rules = lambda *_args: True

        self.forwarding._reroute_known_flows("link_failure", "s1–s2")

        self.assertEqual(flow.status, "active")
        self.assertEqual(flow.path, [1, 3, 4])
        actions = [
            instruction.actions[0].port_no
            for datapath in self.datapaths.values()
            for message in datapath.sent
            for instruction in message.instructions
        ]
        self.assertEqual(sorted(actions), [4, 13, 34])
        self.assertNotIn(12, actions)
        self.assertNotIn(21, actions)
        reroute = next(event for event in self.forwarding.events if event["type"] == "flow_rerouted")
        self.assertEqual(reroute["failed_link"], "s1–s2")

    def test_flow_is_blocked_when_no_operational_path_remains(self) -> None:
        self.forwarding.links[(1, 3)].status = "failed"
        self.forwarding.links[(2, 4)].status = "failed"
        flow = self._flow()
        self.forwarding.flows[(flow.source_mac, flow.destination_mac)] = flow
        self.forwarding._delete_dynamic_rules = lambda *_args: True

        self.forwarding._reroute_known_flows("link_failure", "s1–s3, s2–s4")

        self.assertEqual(flow.status, "blocked")
        self.assertEqual(flow.path, [])
        self.assertEqual(flow.blocked_reason, "no_operational_route")
        self.assertEqual([event["type"] for event in self.forwarding.events].count("flow_blocked"), 1)
        self.forwarding._install_flow(flow)
        self.assertEqual([event["type"] for event in self.forwarding.events].count("flow_blocked"), 1)

    def test_verified_recovery_retries_blocked_flow_without_touching_active_flows(self) -> None:
        self.forwarding.links[(1, 2)].status = "operational"
        self.forwarding.port_states[(1, 12)] = True
        self.forwarding.port_states[(2, 21)] = True
        blocked = self._flow()
        blocked.path = []
        blocked.status = "blocked"
        blocked.blocked_reason = "no_operational_route"
        active = LearnedFlow("00:00:00:00:00:02", "00:00:00:00:00:03", 1, 1, 3, 3, [1, 3], "active")
        self.forwarding.port_states[(1, 1)] = True
        self.forwarding.port_states[(3, 3)] = True
        self.forwarding.flows[(blocked.source_mac, blocked.destination_mac)] = blocked
        self.forwarding.flows[(active.source_mac, active.destination_mac)] = active
        before_active_path = list(active.path)

        self.forwarding._retry_blocked_flows()

        self.assertEqual(blocked.status, "active")
        self.assertEqual(blocked.path, [1, 2, 4])
        self.assertEqual(active.path, before_active_path)


if __name__ == "__main__":
    main()