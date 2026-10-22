import { describe, expect, it } from 'vitest';
import type { NetworkLink } from '@/hooks/useLiveNetworkData';
import {
  createLiveEvaluation,
  MIN_LIVE_SCORED,
  observeLiveOutcome,
  summarizeLiveEvaluation,
  updateLiveEvaluation,
} from './liveModelEvaluation';

describe('live model evaluation', () => {
  it('scores a prediction only after its horizon has been observed', () => {
    const state = createLiveEvaluation();
    // Warning at t=0, congestion at t=6 -> correct; idle prediction at t=1 -> wrong.
    observeLiveOutcome(state, 'a', 0, 0.9, false);
    observeLiveOutcome(state, 'a', 1, 0.1, false);
    for (let t = 2; t <= 8; t += 1) observeLiveOutcome(state, 'a', t, null, t === 6);
    expect(state.scored).toEqual([]);
    observeLiveOutcome(state, 'a', 9, null, false);
    expect(state.scored).toEqual([true]);
    observeLiveOutcome(state, 'a', 10, null, false);
    expect(state.scored).toEqual([true, false]);
  });

  it('measures lead time from the first warning after the last congestion', () => {
    const state = createLiveEvaluation();
    const probabilities: Record<number, number> = { 2: 0.9, 13: 0.4, 14: 0.7, 17: 0.8 };
    for (let t = 0; t <= 20; t += 1) observeLiveOutcome(state, 'a', t, probabilities[t] ?? 0.1, t === 3 || t === 20);
    // t=3 is not counted (its warning window starts before observation began);
    // the onset at t=20 was first warned at t=14.
    expect(state.onsets).toEqual([6]);
    expect(summarizeLiveEvaluation(state)).toMatchObject({ events_evaluated: 1, events_warned: 1, median_lead_seconds: 6 });
  });

  it('restarts a link after a sample gap and reports no accuracy until enough is scored', () => {
    const state = createLiveEvaluation();
    observeLiveOutcome(state, 'a', 0, 0.9, false);
    observeLiveOutcome(state, 'a', 10, null, true);
    expect(state.scored).toEqual([]);
    expect(state.onsets).toEqual([]);
    expect(summarizeLiveEvaluation(state).accuracy).toBeNull();
  });

  it('changes as new simulated ticks are scored', () => {
    const state = createLiveEvaluation();
    const link = (trafficLevel: number): NetworkLink[] => [
      { source: 's1', target: 's2', trafficLevel, status: 'healthy' } as NetworkLink,
    ];
    let accuracies: Array<number | null> = [];
    for (let t = 0; t < MIN_LIVE_SCORED + 40; t += 1) {
      const congested = t % 15 >= 12;
      updateLiveEvaluation(state, link(congested ? 90 : 20), [{ source: 's1', target: 's2', probability: t % 15 >= 6 ? 0.8 : 0.2 }], t);
      accuracies.push(summarizeLiveEvaluation(state).accuracy);
    }
    accuracies = accuracies.filter(value => value !== null);
    expect(accuracies.length).toBeGreaterThan(0);
    expect(new Set(accuracies).size).toBeGreaterThan(1);
    // A failed link drops its pending predictions.
    updateLiveEvaluation(state, [{ source: 's1', target: 's2', trafficLevel: 0, status: 'failed' } as NetworkLink], [], 200);
    expect(state.ports.size).toBe(0);
  });
});
