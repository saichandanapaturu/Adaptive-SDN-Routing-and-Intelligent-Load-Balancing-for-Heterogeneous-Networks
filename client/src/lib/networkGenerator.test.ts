import { describe, expect, it } from 'vitest';
import type { NetworkLink, PacketFlow } from '@/hooks/useLiveNetworkData';
import { buildGeneratedNetwork } from './networkGenerator';
import { congestionReroutePath, findAvailablePath } from './networkRouting';

const DEFAULT_COUNTS = { switches: 4, hubs: 1, hosts: 8 };

describe('recommended generated topology', () => {
  it('routes host traffic across the switch core', () => {
    const { nodes, links } = buildGeneratedNetwork(DEFAULT_COUNTS, 'recommended');
    const hosts = nodes.filter(node => node.type === 'host');
    const throughSwitch = hosts.flatMap(source => hosts.map(destination => findAvailablePath(source.id, destination.id, links)))
      .filter(path => path.some(id => id.includes('switch')));
    expect(throughSwitch.length).toBeGreaterThan(0);
    expect(links.filter(link => link.source.includes('switch') && link.target.includes('switch'))).toHaveLength(4);
  });

  it('keeps every host pair connected when any non-access link is lost', () => {
    const { nodes, links } = buildGeneratedNetwork(DEFAULT_COUNTS, 'recommended');
    const hosts = nodes.filter(node => node.type === 'host');
    const isAccess = (link: NetworkLink) => link.source.includes('host') || link.target.includes('host');
    links.filter(link => !isAccess(link)).forEach(lost => {
      const remaining = links.map(link => (link === lost ? { ...link, status: 'failed' as const } : link));
      hosts.forEach(source => hosts.forEach(destination => {
        if (source.id !== destination.id) expect(findAvailablePath(source.id, destination.id, remaining).length).toBeGreaterThan(1);
      }));
    });
  });

  it('lets congestion on a core link be rerouted', () => {
    const { nodes, links } = buildGeneratedNetwork(DEFAULT_COUNTS, 'recommended');
    const hosts = nodes.filter(node => node.type === 'host');
    let rerouted = 0;
    hosts.forEach(source => hosts.forEach(destination => {
      const path = findAvailablePath(source.id, destination.id, links);
      const core = path.slice(0, -1).findIndex((id, index) => id.includes('switch') && path[index + 1].includes('switch'));
      if (core < 0) return;
      const loaded = links.map(link => (
        [link.source, link.target].includes(path[core]) && [link.source, link.target].includes(path[core + 1])
          ? { ...link, trafficLevel: 95, status: 'critical' as const }
          : link
      ));
      const flow = { id: 'f', source: source.id, destination: destination.id, path, progress: 0, startTime: 0, duration: 2000, status: 'active' } as PacketFlow;
      if (congestionReroutePath(flow, loaded)?.reason === 'Congestion Detected') rerouted += 1;
    }));
    expect(rerouted).toBeGreaterThan(0);
  });
});
