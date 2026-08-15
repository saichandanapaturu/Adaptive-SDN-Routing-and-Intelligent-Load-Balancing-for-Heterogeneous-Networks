/* Style: Nexus reroute log — instrument card shell, left-accent event rows, icon chips matching the NOC status palette. */
import React from 'react';
import { RerouteEvent } from '@/hooks/useLiveNetworkData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, CheckCircle2, GitCommitHorizontal, ScrollText } from 'lucide-react';

interface RerouteLogProps {
  events: RerouteEvent[];
}

const REASON_STYLES: Record<string, { text: string; border: string; bg: string; accent: string }> = {
  'Link Failure': { text: 'text-red-400', border: 'border-red-500/40', bg: 'bg-red-500/10', accent: 'bg-red-500' },
  'Congestion Detected': { text: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-500/10', accent: 'bg-amber-500' },
  'Maintenance Mode': { text: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', accent: 'bg-cyan-500' },
  'Load Balancing': { text: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', accent: 'bg-emerald-500' },
};
const DEFAULT_REASON_STYLE = { text: 'text-slate-400', border: 'border-slate-700', bg: 'bg-slate-800/40', accent: 'bg-slate-500' };

export const RerouteLog: React.FC<RerouteLogProps> = ({ events }) => {
  const getReasonStyle = (reason: string) => REASON_STYLES[reason] ?? DEFAULT_REASON_STYLE;

  const getReasonIcon = (reason: string) => {
    if (reason === 'Link Failure') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <CheckCircle2 className="w-4 h-4" />;
  };

  return (
    <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <GitCommitHorizontal className="h-4 w-4 text-cyan-400" /> Re-routing Log
        </CardTitle>
        <CardDescription>Real-time network path changes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full rounded-xl border border-white/10 bg-slate-950/20 backdrop-blur-md">
          <div className="space-y-2.5 p-4">
            {events.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-slate-600">
                <ScrollText className="h-6 w-6" />
                <span className="font-mono text-xs uppercase tracking-[0.14em]">No rerouting events yet</span>
              </div>
            ) : (
              events.map((event) => {
                const style = getReasonStyle(event.reason);
                return (
                  <div
                    key={event.id}
                    className={`glass relative overflow-hidden rounded-lg border border-white/10 bg-slate-900/30 pl-4 pr-3 py-3 backdrop-blur-md transition-colors hover:border-white/20`}
                  >
                    <span className={`absolute inset-y-0 left-0 w-1 ${style.accent}`} aria-hidden="true" />
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${style.border} ${style.bg} ${style.text}`}>
                        {getReasonIcon(event.reason)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="font-mono text-sm font-semibold text-slate-200">
                            {event.source} → {event.destination}
                          </div>
                          <span className="font-mono text-[10px] text-slate-500 whitespace-nowrap">
                            {event.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className={`font-mono text-[11px] font-semibold uppercase tracking-[0.1em] mb-2 ${style.text}`}>
                          {event.reason}
                        </div>
                        <div className="text-xs text-slate-400 space-y-1">
                          <div>
                            <span className="text-slate-500">Old Path:</span>{' '}
                            <span className="font-mono">{event.oldPath.join(' → ')}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">New Path:</span>{' '}
                            <span className="font-mono text-emerald-400">{event.newPath.join(' → ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
