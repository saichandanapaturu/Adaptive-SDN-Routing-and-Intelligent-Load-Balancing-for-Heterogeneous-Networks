import React from 'react';
import { PortStat } from '@/hooks/useLiveNetworkData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PortStatisticsProps {
  stats: PortStat[];
}

export const PortStatistics: React.FC<PortStatisticsProps> = ({ stats }) => {
  const getCongestionColor = (congestion: number) => {
    if (congestion > 70) return 'text-red-500';
    if (congestion > 50) return 'text-amber-500';
    return 'text-green-500';
  };

  const getCongestionBg = (congestion: number) => {
    if (congestion > 70) return 'bg-red-500/10';
    if (congestion > 50) return 'bg-amber-500/10';
    return 'bg-green-500/10';
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Port Statistics</CardTitle>
        <CardDescription>Real-time network port metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full rounded-md border border-slate-800">
          <div className="w-full">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-950 border-b border-slate-800">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-slate-300">Node</th>
                  <th className="text-left px-4 py-2 font-semibold text-slate-300">Port</th>
                  <th className="text-right px-4 py-2 font-semibold text-slate-300">RX Rate</th>
                  <th className="text-right px-4 py-2 font-semibold text-slate-300">TX Rate</th>
                  <th className="text-right px-4 py-2 font-semibold text-slate-300">Total Rate</th>
                  <th className="text-right px-4 py-2 font-semibold text-slate-300">Packets RX</th>
                  <th className="text-right px-4 py-2 font-semibold text-slate-300">Packets TX</th>
                  <th className="text-right px-4 py-2 font-semibold text-slate-300">Errors</th>
                  <th className="text-right px-4 py-2 font-semibold text-slate-300">Congestion</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, idx) => (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-2 font-mono text-slate-300">{stat.node}</td>
                    <td className="px-4 py-2 font-mono text-slate-400">{stat.port}</td>
                    <td className="text-right px-4 py-2 font-mono text-slate-300">
                      {stat.rxRate.toFixed(2)} MB/s
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-300">
                      {stat.txRate.toFixed(2)} MB/s
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-300">
                      {(stat.rxRate + stat.txRate).toFixed(2)} MB/s
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-400">
                      {stat.packetsRx.toLocaleString()}
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-400">
                      {stat.packetsTx.toLocaleString()}
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-400">
                      {stat.errors}
                    </td>
                    <td className={`text-right px-4 py-2 font-mono font-semibold ${getCongestionColor(stat.congestion)}`}>
                      <span className={`px-2 py-1 rounded ${getCongestionBg(stat.congestion)}`}>
                        {stat.congestion.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
