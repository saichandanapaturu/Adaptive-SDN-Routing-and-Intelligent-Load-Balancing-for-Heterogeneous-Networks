import { describe, expect, it } from 'vitest';
import type { NetworkLink, NetworkNode, PacketFlow } from '@/hooks/useLiveNetworkData';
import {
  canAnimatePacketFlow,
  findAvailablePath,
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
