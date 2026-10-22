import type { NetworkLink, NetworkNode, PacketFlow } from '@/hooks/useLiveNetworkData';

export function networkEdgeKey(source: string, target: string): string {
  return source < target ? `${source}::${target}` : `${target}::${source}`;
}

export function pathContainsFailedLink(path: string[], links: NetworkLink[]): boolean {
  const failedEdges = new Set(
    links
      .filter(link => link.status === 'failed')
      .map(link => networkEdgeKey(link.source, link.target)),
  );
  return path.slice(0, -1).some((node, index) =>
    failedEdges.has(networkEdgeKey(node, path[index + 1])),
  );
}

/** Links the topology draws red (linkStrokeColor): failed or critically loaded. */
export function isAtRiskLink(link: Pick<NetworkLink, 'status'>): boolean {
  return link.status === 'failed' || link.status === 'critical';
}

export function canAnimatePacketFlow(flow: PacketFlow, links: NetworkLink[]): boolean {
  return flow.status !== 'blocked'
    && flow.path.length > 1
    && !pathContainsFailedLink(flow.path, links);
}

export function findAvailablePath(
  source: string,
  destination: string,
  links: NetworkLink[],
  avoidEdges: Set<string> = new Set(),
  predictionDriven = false,
): string[] {
  if (!source || !destination || source === destination) return [];

  const queue: Array<{ node: string; path: string[]; cost: number }> = [{ node: source, path: [source], cost: 0 }];
  const bestCost = new Map<string, number>([[source, 0]]);

  while (queue.length > 0) {
    queue.sort((left, right) => left.cost - right.cost);
    const current = queue.shift();
    if (!current) break;
    if (current.node === destination) return current.path;

    links.forEach(link => {
      const edge = networkEdgeKey(link.source, link.target);
      if (link.status === 'failed' || avoidEdges.has(edge)) return;
      if (link.source !== current.node && link.target !== current.node) return;

      const neighbor = link.source === current.node ? link.target : link.source;
      const isIntermediate = neighbor !== destination && neighbor !== source;
      const nodeTypeBonus = isIntermediate ? 0.3 : 0;
      const statusPenalty = link.status === 'critical' ? 300 : link.status === 'warning' ? 35 : 0;
      const forecastPenalty = predictionDriven && link.trafficLevel >= 50 ? 40 : 0;
      const linkCost = 1 + link.trafficLevel / 18 + statusPenalty + forecastPenalty - nodeTypeBonus;
      const nextCost = current.cost + Math.max(0.1, linkCost);
      if (nextCost < (bestCost.get(neighbor) ?? Number.POSITIVE_INFINITY)) {
        bestCost.set(neighbor, nextCost);
        queue.push({ node: neighbor, path: [...current.path, neighbor], cost: nextCost });
      }
    });
  }

  return [];
}

export const CONGESTED_TRAFFIC_LEVEL = 68;
export const FORECAST_PRESSURE_TRAFFIC_LEVEL = 52;

export interface CongestionReroute {
  path: string[];
  reason: 'Congestion Detected' | 'Load Balancing';
}

/**
 * Alternate route for a flow whose path crosses congested links, or null.
 *
 * Only the congested links are excluded, and only those the flow can route
 * around: a link every route needs (such as a host's single access link) stays
 * usable even when congested. The links the alternate uses instead must be
 * less loaded than the ones it replaces, so traffic is not moved onto an
 * equally congested route.
 */
export function congestionReroutePath(
  flow: PacketFlow,
  links: NetworkLink[],
  predictionPressure = false,
): CongestionReroute | null {
  const linkByEdge = new Map(links.map(link => [networkEdgeKey(link.source, link.target), link]));
  const pathEdges = (path: string[]) => path.slice(0, -1).map((node, index) => networkEdgeKey(node, path[index + 1]));
  const isCongested = (link: NetworkLink) => link.status !== 'failed'
    && (link.trafficLevel >= CONGESTED_TRAFFIC_LEVEL || link.status === 'warning' || link.status === 'critical');
  const avoidable = (key: string) => findAvailablePath(flow.source, flow.destination, links, new Set([key])).length > 1;

  const currentEdges = pathEdges(flow.path);
  const avoid = new Set<string>();
  let congestionOnPath = false;
  currentEdges.forEach(key => {
    const link = linkByEdge.get(key);
    if (!link) return;
    if (isCongested(link)) {
      if (!avoidable(key)) return;
      congestionOnPath = true;
      avoid.add(key);
    } else if (predictionPressure && link.status !== 'failed' && link.trafficLevel >= FORECAST_PRESSURE_TRAFFIC_LEVEL && avoidable(key)) {
      avoid.add(key);
    }
  });
  if (avoid.size === 0) return null;

  const alternate = findAvailablePath(flow.source, flow.destination, links, avoid, true);
  if (alternate.length < 2) return null;
  if (alternate.length === flow.path.length && alternate.every((node, index) => node === flow.path[index])) return null;

  const alternateEdges = pathEdges(alternate);
  const busiest = (edges: string[]) => Math.max(0, ...edges.map(key => linkByEdge.get(key)?.trafficLevel ?? 0));
  const replaced = currentEdges.filter(key => !alternateEdges.includes(key));
  const added = alternateEdges.filter(key => !currentEdges.includes(key));
  if (busiest(added) >= busiest(replaced)) return null;
  return { path: alternate, reason: congestionOnPath ? 'Congestion Detected' : 'Load Balancing' };
}

/**
 * Share of route traffic carried by each link: every source-destination
 * pair's traffic is split evenly across the paths of its active flows, and a
 * link used by several pairs takes the largest of their shares. A pair whose
 * flows all use one path puts a share of 1 on each of its links.
 */
export function routeTrafficShare(flows: PacketFlow[]): Map<string, number> {
  const byPair = new Map<string, PacketFlow[]>();
  flows.forEach(flow => {
    const pair = `${flow.source}->${flow.destination}`;
    byPair.set(pair, [...(byPair.get(pair) ?? []), flow]);
  });
  const share = new Map<string, number>();
  byPair.forEach(pairFlows => {
    const pairShare = new Map<string, number>();
    pairFlows.forEach(flow => {
      flow.path.slice(0, -1).forEach((node, index) => {
        const edge = networkEdgeKey(node, flow.path[index + 1]);
        pairShare.set(edge, (pairShare.get(edge) ?? 0) + 1 / pairFlows.length);
      });
    });
    pairShare.forEach((value, edge) => share.set(edge, Math.max(share.get(edge) ?? 0, value)));
  });
  return share;
}

export const MIN_LOAD_SHIFT = 5;

export interface LoadBalancingShift {
  source: string;
  target: string;
  /** Alternate path from source to target that takes over part of the load. */
  path: string[];
  /** Traffic level moved off the link and onto every link of the path. */
  amount: number;
}

/**
 * Load balancing for at-risk links (critical, drawn red): part of each such
 * link's load moves onto the least-loaded alternate path between its
 * endpoints, until the link and that path's busiest link carry about the same
 * load. Links with no alternate (such as a host's only access link) and links
 * whose alternates are nearly as loaded cannot be balanced and are reported
 * in `unbalanced`; pinned links are skipped.
 */
export function balanceAtRiskLinks(
  links: NetworkLink[],
  pinnedEdges: ReadonlySet<string> = new Set(),
): { shifts: LoadBalancingShift[]; unbalanced: Array<{ source: string; target: string }> } {
  const levels = new Map(links.map(link => [networkEdgeKey(link.source, link.target), link.trafficLevel]));
  const pathEdges = (path: string[]) => path.slice(0, -1).map((node, index) => networkEdgeKey(node, path[index + 1]));
  const atRisk = links
    .filter(link => link.status === 'critical' && !pinnedEdges.has(networkEdgeKey(link.source, link.target)))
    .sort((left, right) => right.trafficLevel - left.trafficLevel);

  const shifts: LoadBalancingShift[] = [];
  const unbalanced: Array<{ source: string; target: string }> = [];
  for (const link of atRisk) {
    const key = networkEdgeKey(link.source, link.target);
    const current = levels.get(key) ?? 0;
    const working = links.map(item => ({ ...item, trafficLevel: levels.get(networkEdgeKey(item.source, item.target)) ?? 0 }));
    const path = findAvailablePath(link.source, link.target, working, new Set([key]), true);
    const edges = pathEdges(path);
    const busiest = Math.max(0, ...edges.map(edge => levels.get(edge) ?? 0));
    const amount = (current - busiest) / 2;
    if (path.length < 2 || amount < MIN_LOAD_SHIFT) {
      unbalanced.push({ source: link.source, target: link.target });
      continue;
    }
    levels.set(key, current - amount);
    edges.forEach(edge => levels.set(edge, Math.min(100, (levels.get(edge) ?? 0) + amount)));
    shifts.push({ source: link.source, target: link.target, path, amount });
  }
  return { shifts, unbalanced };
}

/** Apply load-balancing shifts to link traffic levels. */
export function applyLoadShifts<T extends { source: string; target: string; trafficLevel: number }>(
  links: T[],
  shifts: LoadBalancingShift[],
): T[] {
  if (shifts.length === 0) return links;
  const delta = new Map<string, number>();
  const add = (edge: string, amount: number) => delta.set(edge, (delta.get(edge) ?? 0) + amount);
  shifts.forEach(shift => {
    add(networkEdgeKey(shift.source, shift.target), -shift.amount);
    shift.path.slice(0, -1).forEach((node, index) => add(networkEdgeKey(node, shift.path[index + 1]), shift.amount));
  });
  return links.map(link => {
    const change = delta.get(networkEdgeKey(link.source, link.target));
    return change === undefined ? link : { ...link, trafficLevel: Math.max(0, Math.min(100, link.trafficLevel + change)) };
  });
}

export function reconcilePacketFlowForFailures(
  flow: PacketFlow,
  links: NetworkLink[],
  now: number,
): PacketFlow {
  if (flow.status !== 'blocked' && !pathContainsFailedLink(flow.path, links)) return flow;

  const path = findAvailablePath(flow.source, flow.destination, links);
  if (path.length < 2) {
    return {
      ...flow,
      status: 'blocked',
      blockedReason: 'No available route while a link is failed.',
    };
  }

  return {
    ...flow,
    path,
    progress: 0,
    startTime: now,
    status: 'active',
    blockedReason: undefined,
  };
}

export type LinkFailureSnapshot = Map<string, boolean>;

export function snapshotLinkFailures(links: NetworkLink[]): LinkFailureSnapshot {
  return new Map(links.map(link => [
    networkEdgeKey(link.source, link.target),
    link.status === 'failed',
  ]));
}

export function linkFailureTransitions(
  previous: LinkFailureSnapshot,
  links: NetworkLink[],
): { failed: NetworkLink[]; restored: NetworkLink[]; snapshot: LinkFailureSnapshot } {
  const failed: NetworkLink[] = [];
  const restored: NetworkLink[] = [];
  const reportedFailed = new Set<string>();
  const reportedRestored = new Set<string>();
  const snapshot = snapshotLinkFailures(links);

  links.forEach(link => {
    const key = networkEdgeKey(link.source, link.target);
    const wasFailed = previous.get(key);
    const isFailed = link.status === 'failed';
    if (isFailed && wasFailed !== true && !reportedFailed.has(key)) {
      failed.push(link);
      reportedFailed.add(key);
    }
    if (!isFailed && wasFailed === true && !reportedRestored.has(key)) {
      restored.push(link);
      reportedRestored.add(key);
    }
  });

  return { failed, restored, snapshot };
}

export function linkEndpointNames(link: NetworkLink, nodes: NetworkNode[]): string {
  const labels = new Map(nodes.map(node => [node.id, node.label]));
  return `${labels.get(link.source) ?? link.source} ↔ ${labels.get(link.target) ?? link.target}`;
}
