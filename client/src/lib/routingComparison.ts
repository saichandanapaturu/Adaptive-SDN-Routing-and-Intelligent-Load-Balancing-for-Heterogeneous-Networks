/**
 * Traditional vs SDN routing of the same simulated demand on the same
 * topology and link loads. Traditional routing sends each host pair along its
 * fixed hop-count shortest path (no view of load); SDN routing places the
 * demand with a global view of link loads, splitting it across the
 * least-loaded paths. Loads are percentages of link capacity and may exceed
 * 100 (overload), which becomes packet loss.
 */
import type { NetworkLink, NetworkNode } from '@/hooks/useLiveNetworkData';
import { findAvailablePath, networkEdgeKey } from './networkRouting';

export const CONGESTED_LOAD = 68;
export const AT_RISK_LOAD = 86;
export const MAX_COMPARISON_PAIRS = 6;
/** SDN splits each pair's demand into this many parts and places each one. */
export const SDN_SPLITS = 2;
const HOP_LATENCY_MS = 1;

export interface ComparisonFlow {
  source: string;
  destination: string;
  path: string[];
  demand: number;
  /** Share of this flow's packets dropped by overloaded links on its path. */
  loss: number;
  latencyMs: number;
}

export interface RoutingPlan {
  flows: ComparisonFlow[];
  loads: Map<string, number>;
  maxLoad: number;
  congestedLinks: number;
  /** Demand-weighted packet loss, 0 to 1. */
  packetLoss: number;
  /** Demand-weighted mean path latency. */
  latencyMs: number;
}

const pathEdges = (path: string[]) => path.slice(0, -1).map((node, index) => networkEdgeKey(node, path[index + 1]));

/** Host pairs that carry the compared demand (all pairs, up to six). */
export function comparisonPairs(nodes: NetworkNode[]): Array<[string, string]> {
  const hosts = nodes.filter(node => node.type === 'host').map(node => node.id).sort();
  const pairs: Array<[string, string]> = [];
  for (let first = 0; first < hosts.length; first += 1) {
    for (let second = first + 1; second < hosts.length; second += 1) {
      if (pairs.length < MAX_COMPARISON_PAIRS) pairs.push([hosts[first], hosts[second]]);
    }
  }
  return pairs;
}

function backgroundLoads(links: NetworkLink[]): Map<string, number> {
  return new Map(links
    .filter(link => link.status !== 'failed')
    .map(link => [networkEdgeKey(link.source, link.target), link.trafficLevel]));
}

/** Latency of one hop grows with queueing as utilization approaches capacity. */
function hopLatency(load: number): number {
  return HOP_LATENCY_MS / (1 - Math.min(load, 95) / 100);
}

function finishPlan(flows: Array<Omit<ComparisonFlow, 'loss' | 'latencyMs'>>, loads: Map<string, number>): RoutingPlan {
  const measured = flows.map(flow => {
    const edgeLoads = pathEdges(flow.path).map(edge => loads.get(edge) ?? 0);
    const peak = Math.max(0, ...edgeLoads);
    return {
      ...flow,
      loss: peak > 100 ? 1 - 100 / peak : 0,
      latencyMs: edgeLoads.reduce((sum, load) => sum + hopLatency(load), 0),
    };
  });
  const totalDemand = measured.reduce((sum, flow) => sum + flow.demand, 0);
  const weighted = (value: (flow: ComparisonFlow) => number) => (totalDemand > 0
    ? measured.reduce((sum, flow) => sum + value(flow) * flow.demand, 0) / totalDemand
    : 0);
  const values = Array.from(loads.values());
  return {
    flows: measured,
    loads,
    maxLoad: Math.max(0, ...values),
    congestedLinks: values.filter(load => load >= CONGESTED_LOAD).length,
    packetLoss: weighted(flow => flow.loss),
    latencyMs: weighted(flow => flow.latencyMs),
  };
}

/**
 * Link the compared surge loads. A host's access link carries all of that
 * host's traffic under any routing, so a surge there is placed on the core
 * link (between non-host nodes) that traditional routing loads most;
 * otherwise the simulator's affected link is used.
 */
export function comparisonSurgeEdge(
  nodes: NetworkNode[],
  links: NetworkLink[],
  affected: { source: string; target: string } | undefined,
  demandPerPair: number,
): string {
  const hosts = new Set(nodes.filter(node => node.type === 'host').map(node => node.id));
  const isCore = (source: string, target: string) => !hosts.has(source) && !hosts.has(target);
  if (affected && isCore(affected.source, affected.target)) return networkEdgeKey(affected.source, affected.target);
  if (!affected) return '';
  const idle = links.map(link => ({ ...link, trafficLevel: 0 }));
  const loads = traditionalPlan(nodes, idle, Math.max(demandPerPair, 1)).loads;
  let best = '';
  let bestLoad = 0;
  links.forEach(link => {
    const edge = networkEdgeKey(link.source, link.target);
    const load = loads.get(edge) ?? 0;
    if (link.status !== 'failed' && isCore(link.source, link.target) && load > bestLoad) {
      best = edge;
      bestLoad = load;
    }
  });
  return best || networkEdgeKey(affected.source, affected.target);
}

/** Static hop-count shortest paths; only failed links are avoided. */
export function traditionalPlan(nodes: NetworkNode[], links: NetworkLink[], demandPerPair: number): RoutingPlan {
  const loads = backgroundLoads(links);
  const unweighted = links.map(link => ({ ...link, trafficLevel: 0, status: link.status === 'failed' ? 'failed' as const : 'healthy' as const }));
  const flows = comparisonPairs(nodes)
    .map(([source, destination]) => ({ source, destination, path: findAvailablePath(source, destination, unweighted), demand: demandPerPair }))
    .filter(flow => flow.path.length > 1);
  flows.forEach(flow => pathEdges(flow.path).forEach(edge => loads.set(edge, (loads.get(edge) ?? 0) + flow.demand)));
  return finishPlan(flows, loads);
}

/** Load-aware placement with a global view: each demand part takes the least-loaded path. */
export function sdnPlan(nodes: NetworkNode[], links: NetworkLink[], demandPerPair: number): RoutingPlan {
  const loads = backgroundLoads(links);
  const working = () => links.map(link => {
    if (link.status === 'failed') return link;
    const load = loads.get(networkEdgeKey(link.source, link.target)) ?? 0;
    const status: NetworkLink['status'] = load >= AT_RISK_LOAD ? 'critical' : load >= CONGESTED_LOAD ? 'warning' : 'healthy';
    return { ...link, trafficLevel: Math.min(100, load), status };
  });
  const flows: Array<Omit<ComparisonFlow, 'loss' | 'latencyMs'>> = [];
  comparisonPairs(nodes).forEach(([source, destination]) => {
    for (let part = 0; part < SDN_SPLITS; part += 1) {
      const path = findAvailablePath(source, destination, working(), new Set(), true);
      if (path.length < 2) return;
      const demand = demandPerPair / SDN_SPLITS;
      pathEdges(path).forEach(edge => loads.set(edge, (loads.get(edge) ?? 0) + demand));
      const same = flows.find(flow => flow.source === source && flow.destination === destination && flow.path.join('>') === path.join('>'));
      if (same) same.demand += demand;
      else flows.push({ source, destination, path, demand });
    }
  });
  return finishPlan(flows, loads);
}
