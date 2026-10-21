import type { NetworkLink, PacketFlow } from '@/hooks/useLiveNetworkData';

export const edgeKey = (source: string, target: string) => [source, target].sort().join('::');
export const FAILED_LINK_COLOR = '#ef4444';

export function linkVisualState(link: NetworkLink, routeEdge: boolean) {
  if (isFailedLink(link)) {
    return { color: FAILED_LINK_COLOR, label: 'FAILED', priority: 'failed' as const, dashed: true };
  }
  return { color: routeEdge ? '#22d3ee' : '#10b981', label: `${link.trafficLevel.toFixed(0)}%`, priority: routeEdge ? 'route' as const : 'normal' as const, dashed: link.status === 'warning' };
}

export function failureTransitions(previous: Set<string>, current: Set<string>) {
  return {
    failed: Array.from(current).filter(edge => !previous.has(edge)),
    restored: Array.from(previous).filter(edge => !current.has(edge)),
  };
}

export function isFailedLink(link: NetworkLink): boolean {
  // The existing dashboard status contract uses critical for failed links.
  return link.status === 'critical';
}

export function pathUsesFailedLink(path: string[], links: NetworkLink[]): boolean {
  const failed = new Set(links.filter(isFailedLink).map(link => edgeKey(link.source, link.target)));
  return path.slice(0, -1).some((node, index) => failed.has(edgeKey(node, path[index + 1])));
}

export function findAvailablePath(
  source: string,
  destination: string,
  links: NetworkLink[],
  avoidEdges: Set<string> = new Set(),
): string[] {
  if (!source || !destination || source === destination) return source === destination && source ? [source] : [];

  const queue: Array<{ node: string; path: string[] }> = [{ node: source, path: [source] }];
  const visited = new Set([source]);
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    if (current.node === destination) return current.path;

    links
      .filter(link => !isFailedLink(link) && !avoidEdges.has(edgeKey(link.source, link.target)))
      .filter(link => link.source === current.node || link.target === current.node)
      .forEach(link => {
        const next = link.source === current.node ? link.target : link.source;
        if (visited.has(next)) return;
        visited.add(next);
        queue.push({ node: next, path: [...current.path, next] });
      });
  }
  return [];
}

export interface FlowFailureResolution {
  flow?: PacketFlow;
  rerouted: boolean;
  blocked: boolean;
  alternatePath: string[];
}

export function resolveFlowAgainstFailedLinks(flow: PacketFlow, links: NetworkLink[], now = Date.now()): FlowFailureResolution {
  if (!pathUsesFailedLink(flow.path, links)) {
    return { flow, rerouted: false, blocked: false, alternatePath: flow.path };
  }

  const alternatePath = findAvailablePath(flow.source, flow.destination, links);
  if (alternatePath.length < 2) {
    return { rerouted: false, blocked: true, alternatePath: [] };
  }

  return {
    flow: { ...flow, path: alternatePath, progress: 0, startTime: now },
    rerouted: true,
    blocked: false,
    alternatePath,
  };
}
