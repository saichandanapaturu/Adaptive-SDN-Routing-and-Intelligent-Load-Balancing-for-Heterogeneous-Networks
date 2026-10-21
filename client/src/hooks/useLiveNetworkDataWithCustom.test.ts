import { describe, expect, it } from 'vitest';
import type { PacketFlow } from './useLiveNetworkData';
import { packetFlowProgress } from './useLiveNetworkDataWithCustom';

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
