import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import type { NetworkLink } from '@/hooks/useLiveNetworkData';
import {
  isSimulatedCongestionModel,
  LinkSample,
  portFeatures,
  predictProbability,
  updateLinkRisks,
} from './simulatedCongestionModel';

const exported = JSON.parse(readFileSync(
  fileURLToPath(new URL('../../public/models/congestion_rf_simulated.json', import.meta.url)),
  'utf-8',
)) as Record<string, unknown> & {
  parity: Array<{ features: number[]; probability: number }>;
  feature_parity: Array<{ samples: LinkSample[]; features: number[] }>;
};

describe('simulated-traffic Random Forest in the browser', () => {
  it('is a valid exported model labelled as simulated traffic', () => {
    expect(isSimulatedCongestionModel(exported)).toBe(true);
    expect(exported.source).toBe('simulated_traffic');
    expect(exported.split).toMatchObject({ method: 'chronological' });
  });

  it('reproduces scikit-learn predict_proba exactly', () => {
    if (!isSimulatedCongestionModel(exported)) throw new Error('invalid model');
    expect(exported.parity.length).toBeGreaterThan(10);
    for (const row of exported.parity) {
      expect(Math.abs(predictProbability(exported, row.features) - row.probability)).toBeLessThan(1e-12);
    }
  });

  it('computes the same features as the Python pipeline', () => {
    expect(exported.feature_parity.length).toBeGreaterThan(0);
    for (const window of exported.feature_parity) {
      expect(portFeatures(window.samples)).toEqual(window.features);
    }
  });

  it('predicts only from complete, gap-free windows and forgets failed links', () => {
    if (!isSimulatedCongestionModel(exported)) throw new Error('invalid model');
    const link: NetworkLink = { source: 'switch-1', target: 'switch-2', bandwidth: 10, trafficLevel: 40, status: 'healthy' };
    const history = new Map<string, LinkSample[]>();
    for (let second = 0; second < 4; second += 1) {
      expect(updateLinkRisks(exported, history, [link], second)).toEqual([]);
    }
    const [risk] = updateLinkRisks(exported, history, [link], 4);
    expect(risk.probability).toBeGreaterThanOrEqual(0);
    expect(risk.probability).toBeLessThanOrEqual(1);
    expect(updateLinkRisks(exported, history, [link], 20)).toEqual([]);
    expect(updateLinkRisks(exported, history, [{ ...link, status: 'failed' }], 21)).toEqual([]);
    expect(history.size).toBe(0);
  });

  it('rejects models that are not labelled as simulated', () => {
    expect(isSimulatedCongestionModel({ ...exported, source: 'openflow' })).toBe(false);
    expect(isSimulatedCongestionModel({ ...exported, trees: [] })).toBe(false);
  });
});
