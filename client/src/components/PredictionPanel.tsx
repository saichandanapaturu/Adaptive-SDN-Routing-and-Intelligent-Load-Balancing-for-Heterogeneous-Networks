import React from 'react';
import { PredictionData } from '@/hooks/useLiveNetworkData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface PredictionPanelProps {
  predictions: PredictionData[];
}

export const PredictionPanel: React.FC<PredictionPanelProps> = ({ predictions }) => {
  const latestPrediction = predictions[0];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="w-5 h-5 text-green-500" />;
      case 'stable':
        return <Minus className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTrendLabel = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'Increasing';
      case 'decreasing':
        return 'Decreasing';
      case 'stable':
        return 'Stable';
      default:
        return 'Unknown';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-red-500';
      case 'decreasing':
        return 'text-green-500';
      case 'stable':
        return 'text-blue-500';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Network Prediction</CardTitle>
        <CardDescription>AI-powered network forecasting</CardDescription>
      </CardHeader>
      <CardContent>
        {latestPrediction ? (
          <div className="space-y-6">
            {/* Congestion Prediction */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">Predicted Congestion</span>
                <span className="text-2xl font-bold text-slate-100">
                  {latestPrediction.predictedCongestion.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    latestPrediction.predictedCongestion > 70
                      ? 'bg-red-500'
                      : latestPrediction.predictedCongestion > 50
                      ? 'bg-amber-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${latestPrediction.predictedCongestion}%` }}
                />
              </div>
            </div>

            {/* Packet Loss Prediction */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">Predicted Packet Loss</span>
                <span className="text-2xl font-bold text-slate-100">
                  {latestPrediction.predictedPacketLoss.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    latestPrediction.predictedPacketLoss > 1
                      ? 'bg-red-500'
                      : latestPrediction.predictedPacketLoss > 0.5
                      ? 'bg-amber-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(100, latestPrediction.predictedPacketLoss * 50)}%` }}
                />
              </div>
            </div>

            {/* Trend Analysis */}
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-3">
                {getTrendIcon(latestPrediction.trend)}
                <div>
                  <div className="text-sm font-semibold text-slate-300">Network Trend</div>
                  <div className={`text-lg font-bold ${getTrendColor(latestPrediction.trend)}`}>
                    {getTrendLabel(latestPrediction.trend)}
                  </div>
                </div>
              </div>
            </div>

            {/* Prediction History */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-slate-300">Recent Predictions</div>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {predictions.slice(0, 10).map((pred, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2 rounded bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-slate-400">{pred.timestamp.toLocaleTimeString()}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-300">{pred.predictedCongestion.toFixed(0)}%</span>
                      <div className={getTrendColor(pred.trend)}>
                        {getTrendIcon(pred.trend)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-xs text-slate-500 text-center pt-2 border-t border-slate-700">
              Updated: {latestPrediction.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            Collecting prediction data...
          </div>
        )}
      </CardContent>
    </Card>
  );
};
