import { describe, expect, it } from 'vitest';
import { predictionCardMetrics } from './modelMetrics';
import type { TelemetryModelStatus } from './telemetryApi';

const trained = (lead: Partial<NonNullable<TelemetryModelStatus['lead_time']>> = {}): TelemetryModelStatus => ({
  model_type: 'random_forest',
  status: 'trained',
  reason: null,
  inference: 'ready',
  split: { test_rows: 412, train_rows: 900, test_start: '2026-10-19T08:00:00+00:00', test_end: '2026-10-19T08:10:00+00:00' },
  evaluation: { accuracy: 0.9134, balanced_accuracy: 0.88, precision: 0.8, recall: 0.75, f1: 0.77 },
  lead_time: {
    status: 'available',
    reason: null,
    statistic: 'median',
    unit: 'seconds',
    median_seconds: 4.25,
    mean_seconds: 5,
    events_evaluated: 6,
    events_warned: 5,
    ...lead,
  },
});

describe('prediction card metrics', () => {
  it('shows controller-reported held-out accuracy and median lead time', () => {
    const metrics = predictionCardMetrics('real-telemetry', trained());
    expect(metrics).toMatchObject({
      trained: true,
      modelName: 'Random Forest',
      accuracy: '91.3%',
      accuracyNote: 'held-out test · n=412',
      leadTime: '4.3s',
      leadTimeNote: 'median',
    });
    expect(metrics.accuracyBarPct).toBeCloseTo(91.34);
  });

  it('shows an unavailable lead time instead of a number when no onset was warned', () => {
    const metrics = predictionCardMetrics('real-telemetry', trained({ status: 'unavailable', reason: 'no_onset_was_warned', median_seconds: null, mean_seconds: null }));
    expect(metrics.accuracy).toBe('91.3%');
    expect(metrics.leadTime).toBe('—');
    expect(metrics.leadTimeNote).toBe('no warned onsets');
  });

  it('keeps the unavailable state when the model is missing or the API is down', () => {
    const missing: TelemetryModelStatus = { model_type: 'random_forest', status: 'unavailable', reason: 'model_missing' };
    for (const status of [missing, null]) {
      expect(predictionCardMetrics('real-telemetry', status)).toMatchObject({
        trained: false,
        modelName: 'Not deployed',
        accuracy: '—',
        leadTime: '—',
        accuracyBarPct: 0,
      });
    }
  });

  it('labels the simulated-traffic model as simulated in simulated views', () => {
    const live = trained();
    const simulated = { evaluation: live.evaluation!, lead_time: live.lead_time!, split: live.split! };
    expect(predictionCardMetrics('illustrative', null, simulated)).toMatchObject({
      trained: true,
      modelName: 'Random Forest',
      modelSubtext: 'trained on simulated traffic',
      accuracy: '91.3%',
      accuracyNote: 'simulated test · n=412',
      leadTime: '4.3s',
      leadTimeNote: 'median · simulated',
    });
    // Live controller mode never shows the simulated model's scores.
    expect(predictionCardMetrics('real-telemetry', null, simulated)).toMatchObject({ trained: false, accuracy: '—' });
  });

  it('never presents illustrative topologies as model results', () => {
    expect(predictionCardMetrics('illustrative', trained())).toMatchObject({
      trained: false,
      modelName: 'Illustrative',
      accuracy: 'N/A',
      leadTime: 'N/A',
    });
  });
});
