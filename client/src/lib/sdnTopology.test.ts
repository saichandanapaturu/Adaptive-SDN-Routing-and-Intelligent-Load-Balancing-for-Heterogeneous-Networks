import { describe, expect, it } from 'vitest';
import type { NetworkLink } from '@/hooks/useLiveNetworkData';
import { buildGeneratedNetwork, CustomTopologyType } from './networkGenerator';
import { findAvailablePath } from './networkRouting';
import { toSdnNodes } from './sdnTopology';

const counts = { switches: 4, hubs: 1, hosts: 6 };

describe('router-free SDN topology', () => {
  it.each<['recommended' | 'custom', CustomTopologyType]>([
    ['recommended', 'ring'],
    ['custom', 'ring'],
    ['custom', 'star'],
    ['custom', 'mesh'],
    ['custom', 'tree'],
    ['custom', 'bus'],
  ])('generates no routers and keeps every host pair reachable (%s %s)', (strategy, type) => {
    const { nodes, links } = buildGeneratedNetwork(counts, strategy, type);
    expect(nodes.some(node => (node.type as string) === 'router')).toBe(false);
    expect(nodes.filter(node => node.type === 'switch')).toHaveLength(4);
    const hosts = nodes.filter(node => node.type === 'host');
    hosts.forEach((source, index) => {
      hosts.slice(index + 1).forEach(destination => {
        expect(findAvailablePath(source.id, destination.id, links).length).toBeGreaterThan(1);
      });
    });
  });

  it('converts legacy saved routers to switches without changing their links', () => {
    const legacy = [
      { id: 'node-1', label: 'Router-1', type: 'router', status: 'healthy', x: 0, y: 0, trafficLevel: 0 },
      { id: 'node-2', label: 'Host-1', type: 'host', status: 'healthy', x: 0, y: 0, trafficLevel: 0 },
      { id: 'node-3', label: 'Host-2', type: 'host', status: 'healthy', x: 0, y: 0, trafficLevel: 0 },
    ];
    const links: NetworkLink[] = [
      { source: 'node-2', target: 'node-1', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
      { source: 'node-1', target: 'node-3', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
    ];
    const nodes = toSdnNodes(legacy);
    expect(nodes.map(node => node.type)).toEqual(['switch', 'host', 'host']);
    expect(nodes[0]).toMatchObject({ id: 'node-1', label: 'Router-1' });
    expect(findAvailablePath('node-2', 'node-3', links)).toEqual(['node-2', 'node-1', 'node-3']);
  });

  it('treats a non-array import as an empty topology', () => {
    expect(toSdnNodes({ nodes: [] })).toEqual([]);
  });
});
