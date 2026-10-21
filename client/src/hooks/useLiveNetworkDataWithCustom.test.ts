import { describe, expect, it } from 'vitest';
import type { PacketFlow } from './useLiveNetworkData';
import { findAvailablePath, congestionReroutePath, networkEdgeKey } from '@/lib/networkRouting';
import { simulatedLinkTraffic } from '@/lib/peakHours';
import { displayedTopologyMode, packetFlowProgress, REFERENCE_LINKS, REFERENCE_NODES } from './useLiveNetworkDataWithCustom';

describe('dashboard packet flow animation', () => {
  it('advances a selected flow smoothly and completes it at its duration', () => {
    const flow: PacketFlow = {
      id: 'flow-1',
      source: 'host-1',
      destination: 'host-3',
      path: ['host-1', 'switch-1', 'switch-3', 'host-3'],
      progress: 0,
      startTime: 10_000,
      duration: 2_000,
    };

    expect(packetFlowProgress(flow, 10_000)).toBe(0);
    expect(packetFlowProgress(flow, 10_500)).toBe(25);
    expect(packetFlowProgress(flow, 12_000)).toBe(100);
    expect(packetFlowProgress({ ...flow, duration: 0 }, 10_000)).toBe(100);
  });
});

describe('default live view without a controller', () => {
  it('shows the simulated reference topology until a controller topology exists', () => {
    expect(displayedTopologyMode('default', false)).toBe('reference');
    expect(displayedTopologyMode('default', true)).toBe('default');
    expect(displayedTopologyMode('custom', false)).toBe('custom');
    expect(displayedTopologyMode('generated', true)).toBe('generated');
  });

  it('mirrors the Mininet topology: four switches, three hosts, two h1-to-h3 paths', () => {
    expect(REFERENCE_NODES.filter(node => node.type === 'switch').map(node => node.label)).toEqual(['s1', 's2', 's3', 's4']);
    expect(REFERENCE_NODES.filter(node => node.type === 'host').map(node => node.label)).toEqual(['h1', 'h2', 'h3']);
    expect(REFERENCE_LINKS.every(link => link.origin === 'simulated')).toBe(true);
    expect(findAvailablePath('host-1', 'host-3', REFERENCE_LINKS)).toHaveLength(5);
  });

  it('applies peak-hour load and surges from the simulator, and reroutes around them', () => {
    const peak = { id: 'p', name: 'Peak', startTime: '17:45', endTime: '18:45', intensity: 50, enabled: true };
    const surge = { edge: networkEdgeKey('switch-1', 'switch-2'), trafficLevel: 95 };
    const links = simulatedLinkTraffic(REFERENCE_LINKS, [peak], 18 * 60, surge, true);
    expect(links.find(link => link.target === 'switch-2' && link.source === 'switch-1')?.trafficLevel).toBe(95);
    expect(links.filter(link => link.trafficLevel === 50)).toHaveLength(REFERENCE_LINKS.length - 1);
    const flow: PacketFlow = { id: 'f', source: 'host-1', destination: 'host-3', path: ['host-1', 'switch-1', 'switch-2', 'switch-4', 'host-3'], progress: 0, startTime: 0, duration: 1000 };
    expect(congestionReroutePath(flow, links)?.path).toEqual(['host-1', 'switch-1', 'switch-3', 'switch-4', 'host-3']);
  });
});