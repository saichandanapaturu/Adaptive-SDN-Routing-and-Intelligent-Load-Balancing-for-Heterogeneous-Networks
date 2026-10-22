/**
 * Rolling evaluation of the Random Forest's live predictions: each prediction
 * is scored once its horizon has been observed, and each congestion onset is
 * checked for an earlier warning. Mirrors congestion_model.LiveEvaluation, so
 * the policy matches the held-out test (labels over (t, t + horizon], lead
 * time = onset - first warning within one horizon after the last congestion).
 */
import type { NetworkLink } from '@/hooks/useLiveNetworkData';
import { networkEdgeKey } from './networkRouting';
import {
  CONGESTION_UTILIZATION,
  HORIZON_COVERAGE_TOLERANCE_SECONDS,
  HORIZON_SECONDS,
  MAX_SAMPLE_GAP_SECONDS,
  WARNING_PROBABILITY,
  type LinkCongestionRisk,
} from './simulatedCongestionModel';

export const LIVE_SCORE_WINDOW = 600;
export const LIVE_ONSET_WINDOW = 40;
export const MIN_LIVE_SCORED = 50;

interface Observation {
  ts: number;
  probability: number | null;
  congested: boolean;
  scored: boolean;
}

export interface LiveEvaluationState {
  ports: Map<string, Observation[]>;
  /** Scored predictions, oldest first: whether the warning matched the outcome. */
  scored: boolean[];
  /** Onsets, oldest first: lead time in seconds, or null when unwarned. */
  onsets: Array<number | null>;
}

/** Same shape as the controller's /api/telemetry/model live_evaluation. */
export interface LiveEvaluationSummary {
  window_predictions: number;
  scored: number;
  accuracy: number | null;
  events_evaluated: number;
  events_warned: number;
  median_lead_seconds: number | null;
}

export function createLiveEvaluation(): LiveEvaluationState {
  return { ports: new Map(), scored: [], onsets: [] };
}

export function observeLiveOutcome(
  state: LiveEvaluationState,
  key: string,
  ts: number,
  probability: number | null,
  congested: boolean,
): void {
  let history = state.ports.get(key) ?? [];
  const previous = history[history.length - 1];
  if (previous && !(ts - previous.ts > 0 && ts - previous.ts <= MAX_SAMPLE_GAP_SECONDS)) history = [];

  const last = history[history.length - 1];
  if (congested && last && !last.congested) {
    let firstWarning: number | null = null;
    let index = history.length - 1;
    for (; index >= 0; index -= 1) {
      const observation = history[index];
      if (observation.congested || observation.ts < ts - HORIZON_SECONDS) break;
      if (observation.probability !== null && observation.probability >= WARNING_PROBABILITY) firstWarning = observation.ts;
    }
    // Skip onsets whose warning window was not fully observed.
    const covered = index >= 0 || history[0].ts <= ts - HORIZON_SECONDS + HORIZON_COVERAGE_TOLERANCE_SECONDS;
    if (covered) {
      state.onsets.push(firstWarning === null ? null : ts - firstWarning);
      if (state.onsets.length > LIVE_ONSET_WINDOW) state.onsets.shift();
    }
  }

  history.push({ ts, probability, congested, scored: false });
  for (let index = 0; index < history.length; index += 1) {
    const observation = history[index];
    if (observation.scored || observation.probability === null) continue;
    if (ts < observation.ts + HORIZON_SECONDS - HORIZON_COVERAGE_TOLERANCE_SECONDS) break;
    let label = false;
    for (let ahead = index + 1; ahead < history.length && history[ahead].ts - observation.ts <= HORIZON_SECONDS; ahead += 1) {
      if (history[ahead].congested) {
        label = true;
        break;
      }
    }
    observation.scored = true;
    state.scored.push((observation.probability >= WARNING_PROBABILITY) === label);
  }
  if (state.scored.length > LIVE_SCORE_WINDOW) state.scored.splice(0, state.scored.length - LIVE_SCORE_WINDOW);
  state.ports.set(key, history.filter(observation => observation.ts >= ts - HORIZON_SECONDS - MAX_SAMPLE_GAP_SECONDS));
}

/** Score this tick's simulated link loads against the model's earlier predictions. */
export function updateLiveEvaluation(
  state: LiveEvaluationState,
  links: NetworkLink[],
  risks: LinkCongestionRisk[],
  ts: number,
): void {
  const probabilities = new Map(risks.map(risk => [networkEdgeKey(risk.source, risk.target), risk.probability]));
  const present = new Set<string>();
  for (const link of links) {
    const key = networkEdgeKey(link.source, link.target);
    if (link.status === 'failed') continue;
    present.add(key);
    observeLiveOutcome(state, key, ts, probabilities.get(key) ?? null, link.trafficLevel / 100 >= CONGESTION_UTILIZATION);
  }
  Array.from(state.ports.keys()).forEach(key => {
    if (!present.has(key)) state.ports.delete(key);
  });
}

export function summarizeLiveEvaluation(state: LiveEvaluationState): LiveEvaluationSummary {
  const correct = state.scored.filter(Boolean).length;
  const leads = state.onsets.filter((lead): lead is number => lead !== null).sort((a, b) => a - b);
  const middle = Math.floor(leads.length / 2);
  return {
    window_predictions: LIVE_SCORE_WINDOW,
    scored: state.scored.length,
    accuracy: state.scored.length >= MIN_LIVE_SCORED ? correct / state.scored.length : null,
    events_evaluated: state.onsets.length,
    events_warned: leads.length,
    median_lead_seconds: leads.length === 0
      ? null
      : leads.length % 2 ? leads[middle] : (leads[middle - 1] + leads[middle]) / 2,
  };
}
