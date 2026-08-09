import React from 'react';
import { RerouteEvent } from '@/hooks/useLiveNetworkData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RerouteLogProps {
  events: RerouteEvent[];
}

export const RerouteLog: React.FC<RerouteLogProps> = ({ events }) => {
  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'Link Failure':
        return 'text-red-500';
      case 'Congestion Detected':
        return 'text-amber-500';
      case 'Maintenance Mode':
        return 'text-blue-500';
      case 'Load Balancing':
        return 'text-green-500';
      default:
        return 'text-slate-400';
    }
  };

  const getReasonIcon = (reason: string) => {
    if (reason === 'Link Failure') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <CheckCircle2 className="w-4 h-4" />;
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Re-routing Log</CardTitle>
        <CardDescription>Real-time network path changes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full rounded-md border border-slate-800">
          <div className="space-y-3 p-4">
            {events.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No rerouting events yet
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${getReasonColor(event.reason)}`}>
                      {getReasonIcon(event.reason)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="font-mono text-sm font-semibold text-slate-200">
                          {event.source} → {event.destination}
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className={`text-sm font-semibold mb-2 ${getReasonColor(event.reason)}`}>
                        {event.reason}
                      </div>
                      <div className="text-xs text-slate-400 space-y-1">
                        <div>
                          <span className="text-slate-500">Old Path:</span>{' '}
                          <span className="font-mono">{event.oldPath.join(' → ')}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">New Path:</span>{' '}
                          <span className="font-mono text-green-400">{event.newPath.join(' → ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
