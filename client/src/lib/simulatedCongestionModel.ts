/**
 * In-browser inference for the Random Forest trained on the dashboard's
 * simulated traffic (server/controller/simulated_training.py). It predicts
 * congestion of simulated topology links only; its scores describe held-out
 * simulated traffic, never a real network.
 *
 * The policy, sample mapping, and features mirror congestion_model.py; the
 * parity data exported with the model is checked in tests.
 */
import type { NetworkLink } from '@/hooks/useLiveNetworkData';
import { networkEdgeKey } from './networkRouting';
import type { TelemetryLeadTime } from './telemetryApi';

export const LINK_CAPACITY_BPS = 10_000_000;
export const CONGESTION_UTILIZATION = 0.8;
export const HORIZON_SECONDS = 10;
export const HORIZON_COVERAGE_TOLERANCE_SECONDS = 1;
export const WARNING_PROBABILITY = 0.5;
export const FEATURE_WINDOW = 5;
export const MAX_SAMPLE_GAP_SECONDS = 3;
export const SIMULATED_MODEL_URL = '/models/congestion_rf_simulated.json';

export interface LinkSample {
  ts: number;
  tx_byte_rate: number;
  rx_byte_rate: number;
  tx_packet_rate: number;
  rx_packet_rate: number;
  tx_dropped: number;
  rx_dropped: number;
}

interface ExportedTree {
  left: number[];
  right: number[];
  feature: number[];
  threshold: number[];
  p1: number[];
}

export interface SimulatedCongestionModel {
  model_type: 'random_forest';
  source: 'simulated_traffic';
  trained_at: string;
  policy: { horizon_seconds: number; congestion_utilization: number; warning_probability: number };
  split: { test_rows: number; train_rows: number };
  evaluation: { accuracy: number; balanced_accuracy: number; precision: number; recall: number; f1: number };
  lead_time: TelemetryLeadTime;
  trees: ExportedTree[];
}

export interface LinkCongestionRisk {
  source: string;
  target: string;
  probability: number;
}

/** Port-sample view of a displayed link load; mirrors simulated_training.link_sample. */
export function linkSample(ts: number, trafficLevel: number): LinkSample {
  const byteRate = trafficLevel / 100 * LINK_CAPACITY_BPS / 8;
  return {
    ts,
    tx_byte_rate: byteRate,
    rx_byte_rate: byteRate,
    tx_packet_rate: byteRate / 1000,
    rx_packet_rate: byteRate / 1000,
    tx_dropped: 0,
    rx_dropped: 0,
  };
}

/** Mirrors congestion_model.port_features; null for incomplete or gapped windows. */
export function portFeatures(samples: LinkSample[]): number[] | null {
  if (samples.length < FEATURE_WINDOW) return null;
  const window = samples.slice(-FEATURE_WINDOW);
  for (let index = 1; index < window.length; index += 1) {
    const gap = window[index].ts - window[index - 1].ts;
    if (!(gap > 0 && gap <= MAX_SAMPLE_GAP_SECONDS)) return null;
  }
  const utilization = window.map(sample => sample.tx_byte_rate * 8 / LINK_CAPACITY_BPS);
  const last = window[window.length - 1];
  const previous = window[window.length - 2];
  const first = window[0];
  const dropped = (sample: LinkSample) => sample.tx_dropped + sample.rx_dropped;
  let total = 0;
  for (const value of utilization) total += value;
  return [
    utilization[utilization.length - 1],
    last.rx_byte_rate * 8 / LINK_CAPACITY_BPS,
    total / utilization.length,
    Math.max(...utilization),
    utilization[utilization.length - 1] - utilization[utilization.length - 2],
    (utilization[utilization.length - 1] - utilization[0]) / (last.ts - first.ts),
    Math.max(0, dropped(last) - dropped(previous)),
    last.tx_packet_rate,
    last.rx_packet_rate,
  ];
}

/** Random Forest predict_proba for class 1: the mean of per-tree leaf probabilities. */
export function predictProbability(model: Pick<SimulatedCongestionModel, 'trees'>, features: number[]): number {
  // scikit-learn compares float32-cast features against float32 thresholds.
  const cast = features.map(value => Math.fround(value));
  let sum = 0;
  for (const tree of model.trees) {
    let node = 0;
    while (tree.left[node] !== -1) {
      node = cast[tree.feature[node]] <= tree.threshold[node] ? tree.left[node] : tree.right[node];
    }
    sum += tree.p1[node];
  }
  return sum / model.trees.length;
}

/**
 * Append this tick's link loads to each link's window and predict congestion
 * risk. Failed links are not predicted and lose their history.
 */
export function updateLinkRisks(
  model: Pick<SimulatedCongestionModel, 'trees'>,
  history: Map<string, LinkSample[]>,
  links: NetworkLink[],
  ts: number,
): LinkCongestionRisk[] {
  const risks: LinkCongestionRisk[] = [];
  const present = new Set<string>();
  for (const link of links) {
    const key = networkEdgeKey(link.source, link.target);
    present.add(key);
    if (link.status === 'failed') {
      history.delete(key);
      continue;
    }
    const window = [...(history.get(key) ?? []), linkSample(ts, link.trafficLevel)].slice(-FEATURE_WINDOW);
    history.set(key, window);
    const features = portFeatures(window);
    if (features) risks.push({ source: link.source, target: link.target, probability: predictProbability(model, features) });
  }
  Array.from(history.keys()).forEach(key => {
    if (!present.has(key)) history.delete(key);
  });
  return risks;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isSimulatedCongestionModel(value: unknown): value is SimulatedCongestionModel {
  if (!isRecord(value) || value.model_type !== 'random_forest' || value.source !== 'simulated_traffic') return false;
  const evaluation = value.evaluation;
  if (!isRecord(evaluation) || typeof evaluation.accuracy !== 'number' || evaluation.accuracy < 0 || evaluation.accuracy > 1) return false;
  if (!isRecord(value.lead_time) || !isRecord(value.split) || !Array.isArray(value.trees) || value.trees.length === 0) return false;
  return value.trees.every(tree => isRecord(tree)
    && Array.isArray(tree.left) && Array.isArray(tree.right) && Array.isArray(tree.feature)
    && Array.isArray(tree.threshold) && Array.isArray(tree.p1)
    && tree.left.length === tree.p1.length);
}

let modelRequest: Promise<SimulatedCongestionModel | null> | null = null;

/** Fetch the exported model once; resolves null when it is missing or malformed. */
export function loadSimulatedCongestionModel(): Promise<SimulatedCongestionModel | null> {
  modelRequest ??= fetch(SIMULATED_MODEL_URL, { headers: { Accept: 'application/json' } })
    .then(response => (response.ok ? response.json() : null))
    .then(body => (isSimulatedCongestionModel(body) ? body : null))
    .catch(() => null);
  return modelRequest;
}
