import type { LiveEvaluationSummary } from './liveModelEvaluation';
import type { SimulatedCongestionModel } from './simulatedCongestionModel';
import type { TelemetryLeadTime, TelemetryModelStatus } from './telemetryApi';

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
 * Accuracy and lead time of a trained model: the rolling score of its live
 * predictions once enough have been scored, otherwise its held-out test score.
 */
function scoredCards(
  testAccuracy: number,
  testNote: string,
  testLead: TelemetryLeadTime,
  testLeadLabel: string,
  live: LiveEvaluationSummary | null | undefined,
  liveLabel: string,
): Pick<PredictionCardMetrics, 'accuracy' | 'accuracyNote' | 'accuracyBarPct' | 'leadTime' | 'leadTimeNote'> {
  const liveAccuracy = live?.accuracy ?? null;
  const accuracyPct = (liveAccuracy ?? testAccuracy) * 100;
  const liveLead = live?.median_lead_seconds ?? null;
  const testLeadAvailable = testLead.status === 'available' && testLead.median_seconds !== null;
  let leadTime = '—';
  let leadTimeNote = LEAD_TIME_REASONS[testLead.reason ?? ''] ?? 'unavailable';
  if (liveLead !== null && live) {
    leadTime = `${liveLead.toFixed(1)}s`;
    leadTimeNote = `median · ${liveLabel} ${live.events_warned}/${live.events_evaluated} warned`;
  } else if (testLeadAvailable) {
    leadTime = `${testLead.median_seconds!.toFixed(1)}s`;
    leadTimeNote = testLeadLabel;
  }
  return {
    accuracy: `${accuracyPct.toFixed(1)}%`,
    accuracyNote: liveAccuracy !== null && live ? `${liveLabel} · last n=${live.scored}` : testNote,
    accuracyBarPct: accuracyPct,
    leadTime,
    leadTimeNote,
  };
}

/**
 * Card values for the Congestion Predictor: scores of the controller's model
 * in live mode, or of the simulated-traffic model in simulated views.
 */
export function predictionCardMetrics(
  dataMode: 'real-telemetry' | 'illustrative',
  modelStatus: TelemetryModelStatus | null | undefined,
  simulatedModel?: Pick<SimulatedCongestionModel, 'evaluation' | 'lead_time' | 'split'> | null,
  simulatedLiveEvaluation?: LiveEvaluationSummary | null,
): PredictionCardMetrics {
  if (dataMode !== 'real-telemetry' && simulatedModel) {
    return {
      trained: true,
      modelName: 'Random Forest',
      modelSubtext: 'trained on simulated traffic',
      ...scoredCards(
        simulatedModel.evaluation.accuracy,
        `simulated test · n=${simulatedModel.split.test_rows}`,
        simulatedModel.lead_time,
        'median · simulated test',
        simulatedLiveEvaluation,
        'live simulated',
      ),
    };
  }

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

  return {
    trained: true,
    modelName: 'Random Forest',
    modelSubtext: modelStatus.inference === 'ready' ? 'inference ready' : 'inference unavailable',
    ...scoredCards(
      modelStatus.evaluation.accuracy,
      `held-out test · n=${modelStatus.split?.test_rows ?? 0}`,
      modelStatus.lead_time,
      'median',
      modelStatus.live_evaluation,
      'live',
    ),
  };
}
