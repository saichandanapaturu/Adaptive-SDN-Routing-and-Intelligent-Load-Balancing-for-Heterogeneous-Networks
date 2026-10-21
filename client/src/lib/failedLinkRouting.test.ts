import { describe, expect, it } from 'vitest';
import type { NetworkLink, PacketFlow } from '@/hooks/useLiveNetworkData';
import { edgeKey, FAILED_LINK_COLOR, failureTransitions, findAvailablePath, linkVisualState, pathUsesFailedLink, resolveFlowAgainstFailedLinks } from './failedLinkRouting';

const link = (source: string, target: string, status: NetworkLink['status'] = 'healthy'): NetworkLink => ({
  source,
  target,
  status,
  bandwidth: 10,
  trafficLevel: 0,
});

const flow: PacketFlow = {
  id: 'packet-test',
  source: 'a',
  destination: 'd',
  path: ['a', 'b', 'd'],
  progress: 42,
  startTime: 100,
  duration: 1800,
};

describe('failed-link routing behavior', () => {
  it('renders a failed link with red visual priority', () => {
    const visual = linkVisualState(link('a', 'b', 'critical'), true);
    expect(visual).toMatchObject({ color: FAILED_LINK_COLOR, label: 'FAILED', priority: 'failed', dashed: true });
  });

  it('never includes a failed link in a new route', () => {
    const links = [link('a', 'b', 'critical'), link('b', 'd'), link('a', 'c'), link('c', 'd')];
    const path = findAvailablePath('a', 'd', links);
    expect(path).toEqual(['a', 'c', 'd']);
    expect(pathUsesFailedLink(path, links)).toBe(false);
  });

  it('reroutes an existing flow across a healthy alternative', () => {
    const links = [link('a', 'b', 'critical'), link('b', 'd'), link('a', 'c'), link('c', 'd')];
    const result = resolveFlowAgainstFailedLinks(flow, links, 500);
    expect(result.rerouted).toBe(true);
    expect(result.blocked).toBe(false);
    expect(result.flow?.path).toEqual(['a', 'c', 'd']);
    expect(result.flow?.startTime).toBe(500);
  });

  it('blocks an existing flow when no healthy alternative exists', () => {
    const links = [link('a', 'b', 'critical'), link('b', 'd', 'critical')];
    const result = resolveFlowAgainstFailedLinks(flow, links);
    expect(result.rerouted).toBe(false);
    expect(result.blocked).toBe(true);
    expect(result.flow).toBeUndefined();
  });

  it('excludes multiple failed links and allows recovered links again', () => {
    const links = [link('a', 'b', 'critical'), link('b', 'c', 'critical'), link('a', 'c')];
    expect(findAvailablePath('a', 'c', links)).toEqual(['a', 'c']);
    const recovered = links.map(item => item.source === 'a' && item.target === 'b' ? { ...item, status: 'healthy' as const } : item);
    expect(findAvailablePath('a', 'c', recovered)).toEqual(['a', 'c']);
    expect(edgeKey('a', 'b')).toBe(edgeKey('b', 'a'));
  });

  it('reports only new failures and meaningful recoveries', () => {
    const failed = new Set([edgeKey('a', 'b')]);
    expect(failureTransitions(new Set(), failed)).toEqual({ failed: [edgeKey('a', 'b')], restored: [] });
    expect(failureTransitions(failed, failed)).toEqual({ failed: [], restored: [] });
    expect(failureTransitions(failed, new Set())).toEqual({ failed: [], restored: [edgeKey('a', 'b')] });
  });
});
