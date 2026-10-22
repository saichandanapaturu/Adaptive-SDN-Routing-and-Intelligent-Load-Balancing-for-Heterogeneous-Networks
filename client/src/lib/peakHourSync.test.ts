import { describe, expect, it } from 'vitest';
import type { NetworkLink } from '@/hooks/useLiveNetworkData';
import { buildGeneratedNetwork } from './networkGenerator';
import { congestionReroutePath, networkEdgeKey } from './networkRouting';
import {
  activePeakHourAt,
  addPeakHour,
  applyTrafficOverlay,
  PeakHourPeriod,
  removePeakHour,
  SimulatedTrafficOverlay,
  simulatedLinkTraffic,
  updatePeakHour,
} from './peakHours';

const link = (source: string, target: string, trafficLevel = 20, status: NetworkLink['status'] = 'healthy'): NetworkLink => ({
  source, target, bandwidth: 10, trafficLevel, status,
});
const base = [link('h1', 's1'), link('s1', 's2', 30), link('s2', 'h2'), link('s1', 's3', 10), link('s3', 's2', 10)];
const morning: PeakHourPeriod = { id: 'morning', name: 'Morning', startTime: '08:00', endTime: '10:00', intensity: 72, enabled: true };
const NINE = 9 * 60;
const NOON = 12 * 60;
const levels = (links: NetworkLink[]) => links.map(item => item.trafficLevel);
const surge = (source: string, target: string, trafficLevel: number): SimulatedTrafficOverlay => ({ edge: networkEdgeKey(source, target), trafficLevel });

describe('peak-hour simulator and topology share one traffic model', () => {
  it('selecting an active period changes the traffic the topology shows', () => {
    expect(levels(simulatedLinkTraffic(base, [], NINE, null, true))).toEqual([20, 30, 20, 10, 10]);
    expect(levels(simulatedLinkTraffic(base, [morning], NINE, null, true))).toEqual([72, 72, 72, 72, 72]);
  });

  it('changing intensity or times takes effect on the next evaluation', () => {
    let periods = [morning];
    periods = updatePeakHour(periods, 'morning', { intensity: 40 });
    expect(levels(simulatedLinkTraffic(base, periods, NINE, null, true))).toEqual([40, 40, 40, 40, 40]);
    periods = updatePeakHour(periods, 'morning', { startTime: '11:00', endTime: '13:00' });
    expect(levels(simulatedLinkTraffic(base, periods, NINE, null, true))).toEqual(levels(base));
    expect(levels(simulatedLinkTraffic(base, periods, NOON, null, true))).toEqual([40, 40, 40, 40, 40]);
  });

  it('enabling, disabling, adding, and deleting periods add and remove their load', () => {
    const disabled = updatePeakHour([morning], 'morning', { enabled: false });
    expect(levels(simulatedLinkTraffic(base, disabled, NINE, null, true))).toEqual(levels(base));
    const enabled = updatePeakHour(disabled, 'morning', { enabled: true });
    expect(levels(simulatedLinkTraffic(base, enabled, NINE, null, true))).toEqual([72, 72, 72, 72, 72]);
    const added = addPeakHour([], morning);
    expect(levels(simulatedLinkTraffic(base, added, NINE, null, true))).toEqual([72, 72, 72, 72, 72]);
    expect(levels(simulatedLinkTraffic(base, removePeakHour(added, 'morning'), NINE, null, true))).toEqual(levels(base));
  });

  it('entering and leaving the window follows the shared simulated clock', () => {
    const at = (minute: number) => levels(simulatedLinkTraffic(base, [morning], minute, null, true));
    expect(at(8 * 60 - 1)).toEqual(levels(base));
    expect(at(8 * 60)).toEqual([72, 72, 72, 72, 72]);
    expect(at(10 * 60 - 1)).toEqual([72, 72, 72, 72, 72]);
    expect(at(10 * 60)).toEqual(levels(base));
  });

  it('a running surge loads only its stressed link and stopping removes it', () => {
    const running = simulatedLinkTraffic(base, [], NOON, surge('s1', 's2', 94), true);
    expect(levels(running)).toEqual([20, 94, 20, 10, 10]);
    expect(levels(simulatedLinkTraffic(base, [], NOON, null, true))).toEqual(levels(base));
  });

  it('the surge composes with an active period on the same clock', () => {
    expect(levels(simulatedLinkTraffic(base, [morning], NINE, surge('s1', 's2', 90), true))).toEqual([72, 90, 72, 72, 72]);
  });

  it('switching scenarios or targets leaves no stale load on the previous link', () => {
    const first = simulatedLinkTraffic(base, [], NOON, surge('s1', 's2', 94), true);
    const second = simulatedLinkTraffic(base, [], NOON, surge('s1', 's3', 80), true);
    expect(levels(first)).toEqual([20, 94, 20, 10, 10]);
    expect(levels(second)).toEqual([20, 30, 20, 80, 10]);
  });

  it('overlapping periods resolve deterministically to the highest intensity', () => {
    const overlapping = [morning, { ...morning, id: 'launch', name: 'Launch', intensity: 88 }];
    expect(activePeakHourAt(overlapping, NINE)?.id).toBe('launch');
    expect(levels(simulatedLinkTraffic(base, overlapping, NINE, null, true))).toEqual([88, 88, 88, 88, 88]);
    expect(levels(simulatedLinkTraffic(base, [...overlapping].reverse(), NINE, null, true))).toEqual([88, 88, 88, 88, 88]);
  });

  it('works for generated and custom topologies and lets congestion drive reroutes', () => {
    const generated = buildGeneratedNetwork({ switches: 4, hubs: 0, hosts: 2 }, 'custom', 'ring');
    const ringEdge = generated.links.find(item => item.source.includes('switch') && item.target.includes('switch'))!;
    const loaded = simulatedLinkTraffic(generated.links, [], NOON, surge(ringEdge.source, ringEdge.target, 95), true);
    expect(loaded.find(item => item === ringEdge)).toBeUndefined();
    expect(loaded.filter(item => item.trafficLevel === 95)).toHaveLength(1);

    const custom = simulatedLinkTraffic(base, [], NOON, surge('s1', 's2', 95), true);
    const flow = { id: 'f', source: 'h1', destination: 'h2', path: ['h1', 's1', 's2', 'h2'], progress: 0, startTime: 0, duration: 1000 };
    expect(congestionReroutePath(flow, custom)?.path).toEqual(['h1', 's1', 's3', 's2', 'h2']);
  });

  it('never alters live controller telemetry', () => {
    const live = [link('switch-1', 'switch-2', 0)];
    const result = simulatedLinkTraffic(live, [morning], NINE, surge('switch-1', 'switch-2', 99), false);
    expect(result).toBe(live);
    expect(live[0].trafficLevel).toBe(0);
  });

  it('does not revive a failed link or mutate the base topology', () => {
    const withFailure = [...base.slice(0, 1), link('s1', 's2', 0, 'failed'), ...base.slice(2)];
    const result = simulatedLinkTraffic(withFailure, [], NOON, surge('s1', 's2', 95), true);
    expect(result[1]).toMatchObject({ status: 'failed', trafficLevel: 0 });
    expect(base[1].trafficLevel).toBe(30);
  });

  it('the simulator view and the topology stay identical across repeated updates', () => {
    let periods = [morning];
    for (let step = 0; step < 40; step += 1) {
      const minute = (7 * 60 + step * 15) % 1440;
      if (step % 7 === 0) periods = updatePeakHour(periods, 'morning', { intensity: 30 + (step % 60) });
      if (step % 11 === 0) periods = updatePeakHour(periods, 'morning', { enabled: !periods[0].enabled });
      const overlay = step % 5 === 4 ? null : surge(step % 2 ? 's1' : 's3', 's2', 50 + step);
      const topology = simulatedLinkTraffic(base, periods, minute, overlay, true);
      // The simulator receives the topology's links and re-applies the same surge.
      const simulatorView = applyTrafficOverlay(topology, overlay);
      expect(simulatorView).toEqual(topology);
      const congested = topology.filter(item => item.trafficLevel >= 68).length;
      expect(simulatorView.filter(item => item.trafficLevel >= 68)).toHaveLength(congested);
    }
  });
});
