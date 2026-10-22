import { describe, expect, it } from 'vitest';
import type { NetworkLink, NetworkNode, PacketFlow } from '@/hooks/useLiveNetworkData';
import {
  applyLoadShifts,
  routeTrafficShare,
  balanceAtRiskLinks,
  canAnimatePacketFlow,
  congestionReroutePath,
  findAvailablePath,
  isAtRiskLink,
  linkEndpointNames,
  linkFailureTransitions,
  pathContainsFailedLink,
  reconcilePacketFlowForFailures,
  snapshotLinkFailures,
} from './networkRouting';
import { linkStrokeColor } from '@/components/ImprovedNetworkTopology';

function link(source: string, target: string, status: NetworkLink['status'] = 'healthy'): NetworkLink {
  return { source, target, bandwidth: 10, trafficLevel: 0, status };
}

function flow(path: string[], status: PacketFlow['status'] = 'active'): PacketFlow {
  return {
    id: 'flow-1',
    source: 'a',
    destination: 'b',
    path,
    progress: 45,
    startTime: 1000,
    duration: 2000,
    status,
  };
}

describe('failed-link routing', () => {
  it('counts as at-risk exactly the links drawn red', () => {
    for (const status of ['healthy', 'warning', 'critical', 'failed'] as const) {
      expect(isAtRiskLink({ status })).toBe(linkStrokeColor(status, false) === linkStrokeColor('failed', false));
    }
  });

  it('keeps failed links red even when a flow route would otherwise highlight them', () => {
    expect(linkStrokeColor('failed', true)).toBe('#ef4444');
    expect(linkStrokeColor('critical', true)).toBe('#ef4444');
    expect(linkStrokeColor('healthy', true)).not.toBe('#ef4444');
  });

  it('routes around a failed link and excludes multiple failed links', () => {
    const links = [
      link('a', 'b', 'failed'),
      link('a', 'c'),
      link('c', 'b', 'failed'),
      link('a', 'd'),
      link('d', 'b'),
    ];

    const path = findAvailablePath('a', 'b', links);
    expect(path).toEqual(['a', 'd', 'b']);
    expect(pathContainsFailedLink(path, links)).toBe(false);
  });

  it('reroutes an active flow around a newly failed link', () => {
    const links = [link('a', 'b', 'failed'), link('a', 'c'), link('c', 'b')];
    const updated = reconcilePacketFlowForFailures(flow(['a', 'b']), links, 5000);

    expect(updated.status).toBe('active');
    expect(updated.path).toEqual(['a', 'c', 'b']);
    expect(updated.progress).toBe(0);
    expect(updated.startTime).toBe(5000);
    expect(pathContainsFailedLink(updated.path, links)).toBe(false);
  });

  it('blocks a flow when no alternative route exists', () => {
    const links = [link('a', 'b', 'failed')];
    const updated = reconcilePacketFlowForFailures(flow(['a', 'b']), links, 5000);

    expect(updated.status).toBe('blocked');
    expect(updated.blockedReason).toContain('No available route');
    expect(updated.progress).toBe(45);
    expect(canAnimatePacketFlow(updated, links)).toBe(false);
  });

  it('does not animate a stale route while a failed link is awaiting reconciliation', () => {
    const links = [link('a', 'b', 'failed')];
    expect(canAnimatePacketFlow(flow(['a', 'b']), links)).toBe(false);
    expect(canAnimatePacketFlow(flow(['a', 'b']), [link('a', 'b')])).toBe(true);
  });

  it('resumes a blocked flow when its link is restored', () => {
    const restoredLinks = [link('a', 'b')];
    const updated = reconcilePacketFlowForFailures(
      flow(['a', 'b'], 'blocked'),
      restoredLinks,
      7000,
    );

    expect(updated.status).toBe('active');
    expect(updated.path).toEqual(['a', 'b']);
    expect(updated.blockedReason).toBeUndefined();
    expect(pathContainsFailedLink(updated.path, restoredLinks)).toBe(false);
  });

  it.each(['custom', 'generated'])('uses the same failed-link routing for %s topologies', () => {
    const links = [link('a', 'b', 'failed'), link('a', 'c'), link('c', 'b')];
    expect(findAvailablePath('a', 'b', links)).toEqual(['a', 'c', 'b']);
  });
});

describe('failed-link notifications', () => {
  const nodes: NetworkNode[] = [
    { id: 'a', label: 's1', type: 'switch', status: 'healthy', x: 0, y: 0, trafficLevel: 0 },
    { id: 'b', label: 's2', type: 'switch', status: 'healthy', x: 1, y: 0, trafficLevel: 0 },
  ];

  it('reports endpoint names once per failure transition and reports recovery', () => {
    const failed = link('a', 'b', 'failed');
    const first = linkFailureTransitions(snapshotLinkFailures([]), [failed]);
    expect(first.failed).toEqual([failed]);
    expect(linkEndpointNames(first.failed[0], nodes)).toBe('s1 ↔ s2');

    const repeated = linkFailureTransitions(first.snapshot, [failed]);
    expect(repeated.failed).toEqual([]);
    expect(repeated.restored).toEqual([]);

    const recovered = linkFailureTransitions(repeated.snapshot, [link('a', 'b')]);
    expect(recovered.failed).toEqual([]);
    expect(recovered.restored.map(item => linkEndpointNames(item, nodes))).toEqual(['s1 ↔ s2']);
  });

  it('reports multiple newly failed links separately', () => {
    const failedLinks = [link('a', 'b', 'failed'), link('b', 'c', 'failed')];
    const transitions = linkFailureTransitions(snapshotLinkFailures([]), failedLinks);
    expect(transitions.failed).toHaveLength(2);
  });
});

describe('congestion rerouting', () => {
  const loaded = (source: string, target: string, trafficLevel: number): NetworkLink => ({
    source,
    target,
    bandwidth: 10,
    trafficLevel,
    status: trafficLevel >= 86 ? 'critical' : trafficLevel >= 68 ? 'warning' : 'healthy',
  });
  const hostFlow = (path: string[]): PacketFlow => ({ ...flow(path), source: 'h1', destination: 'h2' });
  // h1 and h2 each have a single access link, as hosts do in every topology mode.
  const diamond = (s1s2: number, s1s3 = 10, s3s4 = 10) => [
    loaded('h1', 's1', 20), loaded('s1', 's2', s1s2), loaded('s2', 's4', 15),
    loaded('s1', 's3', s1s3), loaded('s3', 's4', s3s4), loaded('s4', 'h2', 20),
  ];

  it('reroutes around a congested link while keeping single host access links', () => {
    const reroute = congestionReroutePath(hostFlow(['h1', 's1', 's2', 's4', 'h2']), diamond(95));
    expect(reroute).toEqual({ path: ['h1', 's1', 's3', 's4', 'h2'], reason: 'Congestion Detected' });
  });

  it('does not reroute an uncongested path', () => {
    expect(congestionReroutePath(hostFlow(['h1', 's1', 's2', 's4', 'h2']), diamond(30))).toBeNull();
  });

  it('does not move traffic onto an equally congested alternate', () => {
    expect(congestionReroutePath(hostFlow(['h1', 's1', 's2', 's4', 'h2']), diamond(90, 95))).toBeNull();
  });

  it('reports no reroute when the congested link is the only way out', () => {
    const links = diamond(10).map(item => (item.source === 'h1' ? loaded('h1', 's1', 97) : item));
    expect(congestionReroutePath(hostFlow(['h1', 's1', 's2', 's4', 'h2']), links)).toBeNull();
  });

  it('uses forecast pressure to pre-emptively balance a busy but uncongested link', () => {
    const reroute = congestionReroutePath(hostFlow(['h1', 's1', 's2', 's4', 'h2']), diamond(60), true);
    expect(reroute).toEqual({ path: ['h1', 's1', 's3', 's4', 'h2'], reason: 'Load Balancing' });
  });

  it('reroutes when the host access links are congested along with the core link', () => {
    // The simulator loads every link of an active route, access links included.
    const links = diamond(95).map(item => (item.source === 'h1' || item.target === 'h2' ? loaded(item.source, item.target, 92) : item));
    expect(congestionReroutePath(hostFlow(['h1', 's1', 's2', 's4', 'h2']), links)).toEqual({
      path: ['h1', 's1', 's3', 's4', 'h2'],
      reason: 'Congestion Detected',
    });
  });

  it('load-balances off a busy core link even when the shared access link is busier', () => {
    const links = diamond(60).map(item => (item.source === 'h1' ? loaded('h1', 's1', 75) : item));
    expect(congestionReroutePath(hostFlow(['h1', 's1', 's2', 's4', 'h2']), links, true)).toEqual({
      path: ['h1', 's1', 's3', 's4', 'h2'],
      reason: 'Load Balancing',
    });
  });

  it('never routes through a failed link', () => {
    const links = diamond(95).map(item => (item.source === 's1' && item.target === 's3' ? { ...item, status: 'failed' as const } : item));
    expect(congestionReroutePath(hostFlow(['h1', 's1', 's2', 's4', 'h2']), links)).toBeNull();
  });
});
describe('at-risk link load balancing', () => {
  const loaded = (source: string, target: string, trafficLevel: number): NetworkLink => ({
    source,
    target,
    bandwidth: 10,
    trafficLevel,
    status: trafficLevel >= 86 ? 'critical' : trafficLevel >= 68 ? 'warning' : 'healthy',
  });
  const square = (s1s2: number) => [
    loaded('h1', 's1', 30), loaded('s1', 's2', s1s2), loaded('s2', 's4', 20),
    loaded('s1', 's3', 10), loaded('s3', 's4', 30), loaded('s4', 'h2', 25),
  ];

  it('moves load off an at-risk link onto its least-loaded alternate until they match', () => {
    const links = square(94);
    const { shifts, unbalanced } = balanceAtRiskLinks(links);
    expect(unbalanced).toEqual([]);
    expect(shifts).toEqual([{ source: 's1', target: 's2', path: ['s1', 's3', 's4', 's2'], amount: 32 }]);
    const balanced = applyLoadShifts(links, shifts);
    const level = (a: string, b: string) => balanced.find(link => link.source === a && link.target === b)!.trafficLevel;
    expect(level('s1', 's2')).toBe(62);
    expect([level('s1', 's3'), level('s3', 's4'), level('s2', 's4')]).toEqual([42, 62, 52]);
    expect(level('h1', 's1')).toBe(30);
  });

  it('balances only at-risk links', () => {
    expect(balanceAtRiskLinks(square(80))).toEqual({ shifts: [], unbalanced: [] });
  });

  it('reports at-risk links with no alternate or only busy alternates, and skips pinned links', () => {
    const access = square(10).map(link => (link.source === 'h1' ? loaded('h1', 's1', 97) : link));
    expect(balanceAtRiskLinks(access)).toEqual({ shifts: [], unbalanced: [{ source: 'h1', target: 's1' }] });
    expect(balanceAtRiskLinks(square(94), new Set(['s1::s2']))).toEqual({ shifts: [], unbalanced: [] });
    const busy = square(94).map(link => (link.source === 's3' ? loaded('s3', 's4', 88) : link));
    expect(balanceAtRiskLinks(busy).shifts).toEqual([]);
    expect(balanceAtRiskLinks(busy).unbalanced).toContainEqual({ source: 's1', target: 's2' });
  });

  it('never uses a failed link as the alternate', () => {
    const links = square(94).map(link => (link.source === 's1' && link.target === 's3' ? { ...link, status: 'failed' as const } : link));
    expect(balanceAtRiskLinks(links).shifts).toEqual([]);
  });

  it('splits the route traffic of a pair across the paths its flows use', () => {
    const pairFlow = (id: string, path: string[]): PacketFlow => ({ ...flow(path), id, source: 'h1', destination: 'h2' });
    const one = routeTrafficShare([pairFlow('a', ['h1', 's1', 's2', 'h2']), pairFlow('b', ['h1', 's1', 's2', 'h2'])]);
    expect(one.get('s1::s2')).toBe(1);
    const split = routeTrafficShare([pairFlow('a', ['h1', 's1', 's2', 'h2']), pairFlow('b', ['h1', 's1', 's3', 's2', 'h2'])]);
    expect([split.get('h1::s1'), split.get('s1::s2'), split.get('s1::s3'), split.get('s2::s3')]).toEqual([1, 0.5, 0.5, 0.5]);
  });
});
