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
