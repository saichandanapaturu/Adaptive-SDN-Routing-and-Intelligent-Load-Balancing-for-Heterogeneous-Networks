/* Style: Nexus port telemetry table — instrument card shell, mono uppercase headers, bordered congestion chips matching the NOC status palette. */
import React from 'react';
import { PortStat } from '@/hooks/useLiveNetworkData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Gauge } from 'lucide-react';

interface PortStatisticsProps {
  stats: PortStat[];
}

export const PortStatistics: React.FC<PortStatisticsProps> = ({ stats }) => {
  const getCongestionColor = (congestion: number) => {
    if (congestion > 70) return 'text-red-400';
    if (congestion > 50) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getCongestionChip = (congestion: number) => {
    if (congestion > 70) return 'border-red-500/40 bg-red-500/10';
    if (congestion > 50) return 'border-amber-500/40 bg-amber-500/10';
    return 'border-emerald-500/40 bg-emerald-500/10';
  };

  return (
    <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Gauge className="h-4 w-4 text-cyan-400" /> Port Statistics
        </CardTitle>
        <CardDescription>Real-time network port metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full rounded-xl border border-white/10 bg-slate-950/20 backdrop-blur-md">
          <div className="w-full">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
                <tr className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                  <th className="text-left px-4 py-2.5">Node</th>
                  <th className="text-left px-4 py-2.5">Port</th>
                  <th className="text-right px-4 py-2.5">RX Rate</th>
                  <th className="text-right px-4 py-2.5">TX Rate</th>
                  <th className="text-right px-4 py-2.5">Total Rate</th>
                  <th className="text-right px-4 py-2.5">Packets RX</th>
                  <th className="text-right px-4 py-2.5">Packets TX</th>
                  <th className="text-right px-4 py-2.5">Errors</th>
                  <th className="text-right px-4 py-2.5">Congestion</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, idx) => (
                  <tr key={idx} className={`border-b border-slate-800/70 transition-colors hover:bg-cyan-400/[0.04] ${idx % 2 === 1 ? 'bg-slate-900/30' : ''}`}>
                    <td className="px-4 py-2 font-mono text-slate-300">{stat.node}</td>
                    <td className="px-4 py-2 font-mono text-slate-500">{stat.port}</td>
                    <td className="text-right px-4 py-2 font-mono text-slate-300">
                      {stat.rxRate.toFixed(2)} MB/s
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-300">
                      {stat.txRate.toFixed(2)} MB/s
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-300">
                      {(stat.rxRate + stat.txRate).toFixed(2)} MB/s
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-500">
                      {stat.packetsRx.toLocaleString()}
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-500">
                      {stat.packetsTx.toLocaleString()}
                    </td>
                    <td className="text-right px-4 py-2 font-mono text-slate-500">
                      {stat.errors}
                    </td>
                    <td className="text-right px-4 py-2">
                      <span className={`inline-block rounded-full border px-2 py-0.5 font-mono font-semibold ${getCongestionChip(stat.congestion)} ${getCongestionColor(stat.congestion)}`}>
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
