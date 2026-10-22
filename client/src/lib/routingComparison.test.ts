import { describe, expect, it } from 'vitest';
import type { NetworkLink, NetworkNode } from '@/hooks/useLiveNetworkData';
import { REFERENCE_LINKS, REFERENCE_NODES } from '@/hooks/useLiveNetworkDataWithCustom';
import { comparisonPairs, comparisonSurgeEdge, sdnPlan, traditionalPlan } from './routingComparison';
import { networkEdgeKey } from './networkRouting';

const withLoad = (loads: Record<string, number>): NetworkLink[] => REFERENCE_LINKS.map(link => ({
  ...link,
  trafficLevel: loads[networkEdgeKey(link.source, link.target)] ?? 10,
}));

describe('traditional vs SDN routing', () => {
  it('routes every host pair of the active topology', () => {
    expect(comparisonPairs(REFERENCE_NODES)).toEqual([['host-1', 'host-2'], ['host-1', 'host-3'], ['host-2', 'host-3']]);
  });

  it('keeps traditional routes on hop-count shortest paths regardless of load', () => {
    const idle = traditionalPlan(REFERENCE_NODES, withLoad({}), 20);
    const loaded = traditionalPlan(REFERENCE_NODES, withLoad({ 'switch-1::switch-3': 95 }), 20);
    expect(loaded.flows.map(flow => flow.path)).toEqual(idle.flows.map(flow => flow.path));
    const h1h2 = loaded.flows.find(flow => flow.destination === 'host-2')!;
    expect(h1h2.path).toEqual(['host-1', 'switch-1', 'switch-3', 'host-2']);
    // 95% background + 20% demand overloads the link and drops packets.
    expect(h1h2.loss).toBeGreaterThan(0);
  });

  it('steers SDN traffic around a congested link and drops less', () => {
    const links = withLoad({ 'switch-1::switch-3': 95 });
    const traditional = traditionalPlan(REFERENCE_NODES, links, 20);
    const sdn = sdnPlan(REFERENCE_NODES, links, 20);
    expect(sdn.loads.get('switch-1::switch-3')).toBe(95);
    expect(sdn.packetLoss).toBe(0);
    expect(traditional.packetLoss).toBeGreaterThan(0);
    expect(sdn.maxLoad).toBeLessThan(traditional.maxLoad);
  });

  it('splits SDN demand across paths when one path alone would congest', () => {
    const twoHosts = REFERENCE_NODES.filter(node => node.id !== 'host-2');
    const sdn = sdnPlan(twoHosts, withLoad({}), 60);
    expect(sdn.flows.map(flow => flow.path)).toEqual([
      ['host-1', 'switch-1', 'switch-2', 'switch-4', 'host-3'],
      ['host-1', 'switch-1', 'switch-3', 'switch-4', 'host-3'],
    ]);
    expect(sdn.flows.map(flow => flow.demand)).toEqual([30, 30]);
    // Host access links carry the full demand either way; the switch core does not.
    const coreMax = (loads: Map<string, number>) => Math.max(...Array.from(loads).filter(([edge]) => !edge.includes('host')).map(([, load]) => load));
    expect(coreMax(sdn.loads)).toBe(40);
    expect(coreMax(traditionalPlan(twoHosts, withLoad({}), 60).loads)).toBe(70);
  });

  it('never routes over failed links in either mode', () => {
    const links = withLoad({}).map(link => (networkEdgeKey(link.source, link.target) === 'switch-1::switch-3' ? { ...link, status: 'failed' as const } : link));
    for (const plan of [traditionalPlan(REFERENCE_NODES, links, 20), sdnPlan(REFERENCE_NODES, links, 20)]) {
      plan.flows.forEach(flow => expect(flow.path.join('>')).not.toContain('switch-1>switch-3'));
      plan.flows.forEach(flow => expect(flow.path.join('>')).not.toContain('switch-3>switch-1'));
      expect(plan.loads.has('switch-1::switch-3')).toBe(false);
    }
  });

  it('moves a surge on a host access link onto the core link traditional routing loads most', () => {
    const links = withLoad({});
    expect(comparisonSurgeEdge(REFERENCE_NODES, links, { source: 'switch-1', target: 'switch-2' }, 20)).toBe('switch-1::switch-2');
    const fromAccess = comparisonSurgeEdge(REFERENCE_NODES, links, { source: 'host-2', target: 'switch-3' }, 20);
    expect(fromAccess.includes('host')).toBe(false);
    expect(fromAccess).not.toBe('');
    expect(comparisonSurgeEdge(REFERENCE_NODES, links, undefined, 20)).toBe('');
  });

  it('has no flows without at least two hosts', () => {
    const switches: NetworkNode[] = REFERENCE_NODES.filter(node => node.type === 'switch');
    expect(sdnPlan(switches, withLoad({}), 20).flows).toEqual([]);
    expect(traditionalPlan(switches, withLoad({}), 20).packetLoss).toBe(0);
  });
});
