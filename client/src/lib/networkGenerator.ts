/* Style: Nexus Network Generator — dark NOC tooling, crisp topology structure, cyan generation signal, and compact technical controls. */
import type { NetworkLink, NetworkNode } from '@/hooks/useLiveNetworkData';

export type GeneratorStrategy = 'recommended' | 'custom';
export type CustomTopologyType = 'ring' | 'star' | 'mesh' | 'tree' | 'bus';

export interface GeneratorCounts {
  switches: number;
  routers: number;
  hubs: number;
  hosts: number;
}

const MAX_NODES_PER_TYPE = 24;

const clampCount = (value: number) => Math.max(0, Math.min(MAX_NODES_PER_TYPE, Math.floor(Number.isFinite(value) ? value : 0)));

function addLink(links: NetworkLink[], source: string, target: string, bandwidth: number) {
  if (source === target) return;
  const exists = links.some(link => (
    (link.source === source && link.target === target) ||
    (link.source === target && link.target === source)
  ));
  if (!exists) {
    links.push({ source, target, bandwidth, trafficLevel: 0, status: 'healthy' });
  }
}

function connectChain(links: NetworkLink[], nodes: NetworkNode[], bandwidth: number) {
  for (let index = 1; index < nodes.length; index += 1) {
    addLink(links, nodes[index - 1].id, nodes[index].id, bandwidth);
  }
}

function connectRing(links: NetworkLink[], nodes: NetworkNode[], bandwidth: number) {
  if (nodes.length < 2) return;
  for (let index = 0; index < nodes.length; index += 1) {
    addLink(links, nodes[index].id, nodes[(index + 1) % nodes.length].id, bandwidth);
  }
}

function createNodes(counts: GeneratorCounts): NetworkNode[] {
  const safeCounts = {
    switches: clampCount(counts.switches),
    routers: clampCount(counts.routers),
    hubs: clampCount(counts.hubs),
    hosts: clampCount(counts.hosts),
  };
  const nodes: NetworkNode[] = [];
  const layers: Array<{ type: NetworkNode['type']; label: string; count: number; y: number }> = [
    { type: 'router', label: 'Router', count: safeCounts.routers, y: 72 },
    { type: 'switch', label: 'Switch', count: safeCounts.switches, y: 178 },
    { type: 'hub', label: 'Hub', count: safeCounts.hubs, y: 284 },
    { type: 'host', label: 'Host', count: safeCounts.hosts, y: 390 },
  ];

  layers.forEach(({ type, label, count, y }) => {
    const spacing = 780 / Math.max(count + 1, 2);
    for (let index = 0; index < count; index += 1) {
      nodes.push({
        id: `generated-${type}-${index + 1}`,
        label: `${label}-${index + 1}`,
        type,
        status: 'healthy',
        x: 40 + spacing * (index + 1),
        y,
        trafficLevel: 0,
      });
    }
  });

  return nodes;
}

export function buildGeneratedNetwork(
  counts: GeneratorCounts,
  strategy: GeneratorStrategy,
  customTopologyType: CustomTopologyType = 'ring',
): { nodes: NetworkNode[]; links: NetworkLink[] } {
  const nodes = createNodes(counts);
  const links: NetworkLink[] = [];
  const routers = nodes.filter(node => node.type === 'router');
  const switches = nodes.filter(node => node.type === 'switch');
  const hubs = nodes.filter(node => node.type === 'hub');
  const hosts = nodes.filter(node => node.type === 'host');
  const backbone = switches.length > 0 ? switches : routers.length > 0 ? routers : hubs.length > 0 ? hubs : hosts;

  if (strategy === 'recommended') {
    connectChain(links, routers, 16);
    connectChain(links, switches, 12);
    routers.forEach((router, index) => {
      if (switches.length > 0) addLink(links, router.id, switches[index % switches.length].id, 18);
    });
    hubs.forEach((hub, index) => {
      if (backbone.length > 0) addLink(links, hub.id, backbone[index % backbone.length].id, 8);
    });
    hosts.forEach((host, index) => {
      const attachment = hubs[index % hubs.length] ?? switches[index % switches.length] ?? routers[index % routers.length] ?? backbone[index % backbone.length];
      if (attachment) addLink(links, host.id, attachment.id, 4);
    });
  } else {
    switch (customTopologyType) {
      case 'ring':
        connectRing(links, backbone, 14);
        connectRing(links, routers, 18);
        connectRing(links, hubs, 9);
        break;
      case 'star': {
        const center = backbone[0] ?? nodes[0];
        if (center) {
          nodes.forEach(node => {
            if (node.id !== center.id) addLink(links, center.id, node.id, node.type === 'host' ? 4 : 12);
          });
        }
        break;
      }
      case 'mesh':
        nodes.forEach((sourceNode, sourceIndex) => {
          nodes.forEach((targetNode, targetIndex) => {
            if (sourceIndex < targetIndex) {
              const distance = Math.hypot(sourceNode.x - targetNode.x, sourceNode.y - targetNode.y);
              if (distance < 380 || nodes.length <= 6) {
                addLink(links, sourceNode.id, targetNode.id, 10);
              }
            }
          });
        });
        break;
      case 'tree': {
        const root = routers[0] ?? switches[0] ?? nodes[0];
        if (root) {
          routers.slice(1).forEach(router => addLink(links, root.id, router.id, 16));
          switches.forEach((sw, index) => {
            const parent = routers[index % routers.length] ?? root;
            addLink(links, parent.id, sw.id, 12);
          });
          hubs.forEach((hub, index) => {
            const parent = switches[index % switches.length] ?? root;
            addLink(links, parent.id, hub.id, 8);
          });
          hosts.forEach((host, index) => {
            const parent = hubs[index % hubs.length] ?? switches[index % switches.length] ?? root;
            addLink(links, parent.id, host.id, 4);
          });
        }
        break;
      }
      case 'bus':
      default:
        connectChain(links, nodes, 10);
        break;
    }

    if (strategy === 'custom' && customTopologyType !== 'bus') {
      hosts.forEach((host, index) => {
        const attachment = hubs[index % hubs.length] ?? switches[index % switches.length] ?? routers[index % routers.length] ?? backbone[index % backbone.length];
        if (attachment) addLink(links, host.id, attachment.id, 5);
      });
    }
  }

  if (links.length === 0 && nodes.length > 1) connectChain(links, nodes, 10);

  const connected = new Set(links.flatMap(link => [link.source, link.target]));
  const anchor = backbone[0] ?? nodes[0];
  nodes.forEach(node => {
    if (anchor && node.id !== anchor.id && !connected.has(node.id)) {
      addLink(links, anchor.id, node.id, node.type === 'host' ? 4 : 8);
    }
  });

  return { nodes, links };
}

export const GENERATOR_LIMITS = {
  min: 0,
  max: MAX_NODES_PER_TYPE,
};
