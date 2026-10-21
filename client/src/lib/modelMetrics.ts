import type { TelemetryModelStatus } from './telemetryApi';

export interface PredictionCardMetrics {
  trained: boolean;
  modelName: string;
  modelSubtext: string;
  accuracy: string;
  accuracyNote: string;
  accuracyBarPct: number;
  leadTime: string;
  leadTimeNote: string;
}

const LEAD_TIME_REASONS: Record<string, string> = {
  no_congestion_onsets_in_test_period: 'no onsets in test',
  no_onset_was_warned: 'no warned onsets',
};

/**
 * Card values for the Congestion Predictor. Only controller-reported
 * held-out evaluation is displayed; nothing is derived in the browser.
 */
export function predictionCardMetrics(
  dataMode: 'real-telemetry' | 'illustrative',
  modelStatus: TelemetryModelStatus | null | undefined,
): PredictionCardMetrics {
  if (dataMode !== 'real-telemetry') {
    return {
      trained: false,
      modelName: 'Illustrative',
      modelSubtext: 'Synthetic dashboard mode',
      accuracy: 'N/A',
      accuracyNote: 'not a trained model',
      accuracyBarPct: 0,
      leadTime: 'N/A',
      leadTimeNote: 'median',
    };
  }

  if (modelStatus?.status !== 'trained' || !modelStatus.evaluation || !modelStatus.lead_time) {
    return {
      trained: false,
      modelName: 'Not deployed',
      modelSubtext: 'Random Forest pending',
      accuracy: '—',
      accuracyNote: 'awaiting model',
      accuracyBarPct: 0,
      leadTime: '—',
      leadTimeNote: 'median',
    };
  }

  const accuracyPct = modelStatus.evaluation.accuracy * 100;
  const lead = modelStatus.lead_time;
  const leadAvailable = lead.status === 'available' && lead.median_seconds !== null;
  return {
    trained: true,
    modelName: 'Random Forest',
    modelSubtext: modelStatus.inference === 'ready' ? 'inference ready' : 'inference unavailable',
    accuracy: `${accuracyPct.toFixed(1)}%`,
    accuracyNote: `held-out test · n=${modelStatus.split?.test_rows ?? 0}`,
    accuracyBarPct: accuracyPct,
    leadTime: leadAvailable ? `${lead.median_seconds!.toFixed(1)}s` : '—',
    leadTimeNote: leadAvailable ? 'median' : LEAD_TIME_REASONS[lead.reason ?? ''] ?? 'unavailable',
  };
}
