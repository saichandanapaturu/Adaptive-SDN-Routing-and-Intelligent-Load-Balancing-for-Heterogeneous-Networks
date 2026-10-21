import React, { useState } from 'react';
import { Activity, AlertTriangle, BrainCircuit, CirclePause, Play, Plus, RotateCcw, Route, Sparkles, TimerReset, Trash2, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { NetworkLink, NetworkNode } from '@/hooks/useLiveNetworkData';
import { useTrafficSurgeSimulator, type TrafficState } from '@/hooks/useTrafficSurgeSimulator';
import { useTopologyContext } from '@/contexts/TopologyContext';
import { addPeakHour, isValidPeakHourPeriod, peakHourDurationMinutes, removePeakHour, updatePeakHour } from '@/lib/peakHours';

interface TrafficSurgeSimulatorProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

const edgeKey = (source: string, target: string) => [source, target].sort().join('::');
const formatSimulatedTime = (minute: number) => {
  const normalized = ((minute % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, '0')}:${String(normalized % 60).padStart(2, '0')}`;
};
const stateColor: Record<TrafficState, string> = {
  NORMAL: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  MODERATE: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  RAMPING_UP: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  PEAK: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
  'SUDDEN SURGE': 'text-orange-300 border-orange-500/40 bg-orange-500/10',
  'FLASH CROWD': 'text-red-300 border-red-500/40 bg-red-500/10',
  RANDOM_SURGE: 'text-orange-300 border-orange-500/40 bg-orange-500/10',
  RAMPING_DOWN: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
  RECOVERY: 'text-violet-300 border-violet-500/30 bg-violet-500/10',
};

function pathLabel(path: string[], nodes: NetworkNode[]) {
  const labels = new Map(nodes.map(node => [node.id, node.label]));
  return path.length ? path.map(node => labels.get(node) ?? node).join(' → ') : 'No connected path';
}

export function TrafficSurgeSimulator({ nodes, links }: TrafficSurgeSimulatorProps) {
  const simulator = useTrafficSurgeSimulator(nodes, links);
  const { peakHours, setPeakHours } = useTopologyContext();
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const maxHistory = Math.max(100, ...simulator.history.map(point => point.intensity));
  const affectedEdge = simulator.affectedLink ? edgeKey(simulator.affectedLink.source, simulator.affectedLink.target) : '';
  const recommendedEdges = new Set(simulator.routing.recommendedPath.slice(0, -1).map((node, index) => edgeKey(node, simulator.routing.recommendedPath[index + 1])));
  const editPeakHour = (id: string, changes: Parameters<typeof updatePeakHour>[2]) => {
    const current = peakHours.find(period => period.id === id);
    if (!current || !isValidPeakHourPeriod({ ...current, ...changes })) {
      setScheduleError('Each period needs a name, valid times, different start and end times, and an intensity from 0 to 100.');
      return;
    }
    setScheduleError(null);
    setPeakHours(previous => {
      const latest = previous.find(period => period.id === id);
      if (!latest || !isValidPeakHourPeriod({ ...latest, ...changes })) return previous;
      return updatePeakHour(previous, id, changes);
    });
  };
  const addPeakPeriod = () => {
    const id = crypto.randomUUID();
    setScheduleError(null);
    setPeakHours(previous => addPeakHour(previous, {
      id,
      name: `Peak period ${previous.length + 1}`,
      startTime: '09:00',
      endTime: '10:00',
      intensity: 75,
      enabled: true,
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="glass rounded-2xl border-cyan-500/20 bg-slate-900/30 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-mono text-lg uppercase tracking-wide text-white"><Sparkles className="h-4 w-4 text-cyan-300" /> Dynamic Traffic Surge Simulator</CardTitle>
              <CardDescription className="mt-1 max-w-2xl">A controlled stochastic scenario layer for demonstrating unpredictable demand, predictive congestion analysis, and path decisions. It is simulation data and does not replace the existing Nexus telemetry.</CardDescription>
            </div>
            <div className={`w-fit rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${simulator.running ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-slate-700 bg-slate-950/40 text-slate-400'}`}>
              {simulator.running ? (simulator.paused ? 'PAUSED' : 'SIMULATION LIVE') : 'READY'}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.5fr_1fr_auto_auto_auto]">
            <label className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">Scenario</span>
              <select value={simulator.scenario} onChange={event => simulator.setScenario(event.target.value as typeof simulator.scenario)} className="h-10 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400/60">
                {simulator.scenarioOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <label className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">Simulation Speed</span>
              <select value={simulator.speed} onChange={event => simulator.setSpeed(Number(event.target.value) as 1 | 2 | 5)} className="h-10 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400/60">
                <option value="1">1x</option><option value="2">2x</option><option value="5">5x</option>
              </select>
            </label>
            <button type="button" onClick={simulator.running ? simulator.pause : simulator.start} className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-3 font-mono text-xs font-semibold uppercase tracking-wide text-cyan-200 transition hover:bg-cyan-400/20">
              {simulator.running && !simulator.paused ? <CirclePause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{simulator.running && !simulator.paused ? 'Pause' : simulator.paused ? 'Resume' : 'Start'}
            </button>
            <button type="button" onClick={simulator.reset} className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-slate-950/40 px-3 font-mono text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-slate-600 hover:text-white"><RotateCcw className="h-4 w-4" /> Reset</button>
            <button type="button" onClick={simulator.triggerSurge} className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-orange-400/40 bg-orange-400/10 px-3 font-mono text-xs font-semibold uppercase tracking-wide text-orange-200 transition hover:bg-orange-400/20"><Zap className="h-4 w-4" /> Trigger Surge</button>
          </div>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.05] px-3 py-2 font-mono text-[11px] text-amber-100"><TimerReset className="h-3.5 w-3.5 text-amber-300" /> Scenario surges are stochastic per run; configured Peak Hours below use fixed daily clock times.</div>
        </CardContent>
      </Card>

      <Card className="glass rounded-2xl border-amber-500/20 bg-slate-900/30 backdrop-blur-xl">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="font-mono text-sm uppercase tracking-wide text-white">Peak Hours Schedule</CardTitle>
              <CardDescription className="mt-1">Daily simulated periods use the shared accelerated clock. Overnight periods are supported; start and end must differ. Overlaps apply the highest enabled intensity.</CardDescription>
            </div>
            <button type="button" onClick={addPeakPeriod} className="inline-flex h-9 items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/[0.08] px-3 font-mono text-[11px] font-semibold uppercase tracking-wide text-amber-200 transition hover:bg-amber-400/[0.16]">
              <Plus className="h-3.5 w-3.5" /> Add peak period
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {peakHours.length === 0 ? (
            <p className="rounded-lg border border-white/10 bg-slate-950/30 p-3 font-mono text-xs text-slate-500">No peak periods configured. Simulated traffic will follow its baseline pattern.</p>
          ) : peakHours.map(period => (
            <div key={period.id} className="grid gap-3 rounded-xl border border-white/10 bg-slate-950/30 p-3 md:grid-cols-[minmax(140px,1.3fr)_minmax(110px,0.8fr)_minmax(110px,0.8fr)_minmax(150px,1.2fr)_auto_auto] md:items-end">
              <label className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Period name</span>
                <input aria-label={`${period.name} period name`} value={period.name} onChange={event => editPeakHour(period.id, { name: event.target.value })} className="h-9 w-full rounded-lg border border-white/10 bg-slate-900/70 px-2 text-sm text-slate-200 outline-none focus:border-amber-400/50" />
              </label>
              <label className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Start</span>
                <input aria-label={`${period.name} start time`} type="time" value={period.startTime} onChange={event => editPeakHour(period.id, { startTime: event.target.value })} className="h-9 w-full rounded-lg border border-white/10 bg-slate-900/70 px-2 text-sm text-slate-200 outline-none focus:border-amber-400/50" />
              </label>
              <label className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">End</span>
                <input aria-label={`${period.name} end time`} type="time" value={period.endTime} onChange={event => editPeakHour(period.id, { endTime: event.target.value })} className="h-9 w-full rounded-lg border border-white/10 bg-slate-900/70 px-2 text-sm text-slate-200 outline-none focus:border-amber-400/50" />
              </label>
              <label className="space-y-1">
                <span className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-slate-500"><span>Traffic intensity</span><span>{period.intensity}%</span></span>
                <input aria-label={`${period.name} traffic intensity`} type="range" min="0" max="100" step="1" value={period.intensity} onChange={event => editPeakHour(period.id, { intensity: Number(event.target.value) })} className="h-9 w-full accent-amber-400" />
              </label>
              <label className="flex h-9 items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                <input aria-label={`${period.name} enabled`} type="checkbox" checked={period.enabled} onChange={event => editPeakHour(period.id, { enabled: event.target.checked })} className="accent-amber-400" />
                Enabled
              </label>
              <div className="flex h-9 items-center justify-between gap-3">
                <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-wide text-slate-500">{Math.floor(peakHourDurationMinutes(period) / 60)}h {peakHourDurationMinutes(period) % 60}m</span>
                <button type="button" onClick={() => setPeakHours(previous => removePeakHour(previous, period.id))} aria-label={`Remove ${period.name}`} title={`Remove ${period.name}`} className="rounded-lg border border-red-500/20 bg-red-500/[0.06] p-2 text-red-300 transition hover:bg-red-500/15">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {simulator.activePeakHour && <p className="font-mono text-[10px] uppercase tracking-wider text-amber-200">{simulator.activePeakHour.name} is active at {simulator.activePeakHour.intensity}% for simulated time {simulator.simulatedTime}.</p>}
          {scheduleError && <p role="alert" className="font-mono text-[10px] text-red-300">{scheduleError}</p>}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wide"><TimerReset className="h-4 w-4 text-cyan-300" /> Traffic Timeline</CardTitle><CardDescription>Simulated 24-hour demand model with normal, ramp-up, peak, and recovery periods.</CardDescription></CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            <MiniMetric label="Simulated Time" value={simulator.simulatedTime} />
            <MiniMetric label="Traffic State" value={simulator.trafficState} />
            <MiniMetric label="Traffic Demand" value={`${Math.round(simulator.intensity)}%`} />
          </CardContent>
        </Card>
        <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wide"><Zap className="h-4 w-4 text-amber-300" /> Event Information</CardTitle><CardDescription>Known event timing is visible; unexpected events appear only after detection.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {simulator.activePeakHour ? <div className="rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-3"><div className="flex items-center justify-between gap-3"><span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-200">{simulator.activePeakHour.name}</span><span className="rounded border border-amber-400/30 px-2 py-1 font-mono text-[10px] text-amber-200">{simulator.activePeakHour.intensity}% LOAD</span></div><p className="mt-2 font-mono text-[11px] text-slate-400">Scheduled {simulator.activePeakHour.startTime}–{simulator.activePeakHour.endTime} · Active at {simulator.simulatedTime}</p></div> : simulator.currentEvent ? <div className="rounded-xl border border-orange-400/25 bg-orange-400/[0.06] p-3"><div className="flex items-center justify-between gap-3"><span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-200">{simulator.currentEvent.name}</span><span className="rounded border border-orange-400/30 px-2 py-1 font-mono text-[10px] text-orange-200">{simulator.currentEvent.impact} IMPACT</span></div><p className="mt-2 font-mono text-[11px] text-slate-400">Detected {formatSimulatedTime(simulator.currentEvent.detectedMinute ?? simulator.simulatedMinute)} · Duration {simulator.currentEvent.durationMinutes ?? 0} min</p></div> : <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] p-3"><div className="flex items-center justify-between gap-3"><span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-200">{simulator.nextScheduledEvent.name}</span><span className="rounded border border-cyan-400/30 px-2 py-1 font-mono text-[10px] text-cyan-200">{formatSimulatedTime(simulator.nextScheduledEvent.scheduledMinute)} SCHEDULED</span></div><p className="mt-2 font-mono text-[11px] text-slate-400">{simulator.nextScheduledEvent.timeUntilMinutes} min until start · {simulator.nextScheduledEvent.impact} impact</p></div>}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        <Metric label="Traffic State" value={simulator.trafficState} className={stateColor[simulator.trafficState]} />
        <Metric label="Intensity" value={`${Math.round(simulator.intensity)}%`} className={simulator.intensity >= 75 ? 'text-orange-300 border-orange-500/30 bg-orange-500/10' : 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10'} />
        <Metric label="Congestion Probability" value={`${Math.round(simulator.congestionProbability)}%`} className={simulator.congestionProbability >= 65 ? 'text-red-300 border-red-500/30 bg-red-500/10' : 'text-amber-300 border-amber-500/30 bg-amber-500/10'} />
        <Metric label="Traffic Trend" value={simulator.trend} className="text-violet-300 border-violet-500/30 bg-violet-500/10" />
        <Metric label="Affected Link" value={simulator.affectedLink ? `${simulator.affectedLink.source} → ${simulator.affectedLink.target}` : 'Selecting…'} className="text-emerald-300 border-emerald-500/30 bg-emerald-500/10" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wide"><Activity className="h-4 w-4 text-cyan-300" /> Traffic Trend</CardTitle><CardDescription>One underlying intensity signal drives the scenario, prediction, and routing decision.</CardDescription></CardHeader>
          <CardContent>
            <div className="relative h-56 overflow-hidden rounded-xl border border-white/10 bg-[#07101c]/80 p-3">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(51,65,85,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,.35) 1px, transparent 1px)', backgroundSize: '10% 25%' }} />
              {simulator.history.length > 1 ? <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] overflow-visible"><polyline fill="none" stroke="#67e8f9" strokeWidth="1.8" vectorEffect="non-scaling-stroke" points={simulator.history.map((point, index) => `${(index / Math.max(1, simulator.history.length - 1)) * 100},${92 - (point.intensity / maxHistory) * 78}`).join(' ')} /></svg> : <div className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-slate-600">Start a scenario to plot traffic</div>}
              <div className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-slate-600">time →</div><div className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-widest text-slate-600">intensity ↑</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">{(['NORMAL', 'MODERATE', 'RAMPING_UP', 'PEAK', 'SUDDEN SURGE', 'FLASH CROWD', 'RANDOM_SURGE', 'RAMPING_DOWN', 'RECOVERY'] as TrafficState[])
.map(state => <span key={state} className={`rounded border px-2 py-1 font-mono text-[9px] uppercase tracking-wider ${stateColor[state]}`}>{state}</span>)}</div>
          </CardContent>
        </Card>

        <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wide"><BrainCircuit className="h-4 w-4 text-amber-300" /> AIFE Prediction</CardTitle><CardDescription>Forecasting the next interval from intensity growth and recent variance.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Expected condition</p><p className="mt-1 font-mono text-xl font-semibold text-amber-200">{simulator.congestionProbability >= 65 ? 'CONGESTION LIKELY' : 'MONITORING'}</p></div>
            <div className="grid grid-cols-2 gap-3"><MiniMetric label="Probability" value={`${Math.round(simulator.congestionProbability)}%`} /><MiniMetric label="Trend" value={simulator.trend} /></div>
            <p className="font-mono text-xs leading-relaxed text-slate-400">{simulator.routing.reason}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.85fr]">
        <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wide"><Route className="h-4 w-4 text-emerald-300" /> AI Routing Decision</CardTitle><CardDescription>Candidate paths are scored against the same affected-link state.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2"><PathCard title="Current Path" path={pathLabel(simulator.routing.currentPath, nodes)} cost={simulator.routing.currentCost} tone="red" /><PathCard title="Recommended Path" path={pathLabel(simulator.routing.recommendedPath, nodes)} cost={simulator.routing.recommendedCost} tone="emerald" /></div>
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] p-3 font-mono text-xs"><span className="rounded border border-cyan-400/30 px-2 py-1 text-cyan-200">ACTION · {simulator.routing.action}</span><span className="text-slate-400">{simulator.routing.reason}</span></div>
          </CardContent>
        </Card>

        <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
          <CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 font-mono text-sm uppercase tracking-wide"><AlertTriangle className="h-4 w-4 text-orange-300" /> Event Log</CardTitle><CardDescription>Simulation, forecast, reroute, and recovery milestones.</CardDescription></CardHeader>
          <CardContent><div className="max-h-64 space-y-2 overflow-y-auto pr-1">{simulator.events.length ? simulator.events.map(event => <div key={event.id} className="flex gap-3 rounded-lg border border-white/[0.06] bg-slate-950/30 p-2.5"><span className="font-mono text-[10px] text-slate-600">{event.time}</span><span className={`font-mono text-xs ${event.tone === 'critical' ? 'text-red-300' : event.tone === 'warning' ? 'text-amber-200' : event.tone === 'success' ? 'text-emerald-300' : 'text-slate-300'}`}>{event.message}</span></div>) : <div className="py-10 text-center font-mono text-xs uppercase tracking-widest text-slate-600">No simulation events yet</div>}</div></CardContent>
        </Card>
      </div>

      <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
        <CardHeader className="pb-3"><CardTitle className="font-mono text-sm uppercase tracking-wide">Scenario Topology Overlay</CardTitle><CardDescription>Simulation-only overlay using the active Nexus topology; the existing Monitor canvas remains unchanged.</CardDescription></CardHeader>
        <CardContent><svg viewBox="0 0 900 360" className="h-auto min-h-[260px] w-full rounded-xl border border-white/10 bg-[#07101c] p-2"><g opacity="0.8">{links.map((link, index) => { const source = nodes.find(node => node.id === link.source); const target = nodes.find(node => node.id === link.target); if (!source || !target) return null; const edge = edgeKey(link.source, link.target); const active = edge === affectedEdge; const recommended = recommendedEdges.has(edge); return <line key={`${edge}-${index}`} x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke={active ? '#fb923c' : recommended ? '#34d399' : '#334155'} strokeWidth={active ? 4 : recommended ? 3 : 1.5} strokeDasharray={active ? '7 5' : undefined} />; })}</g>{nodes.map(node => <g key={node.id}><circle cx={node.x} cy={node.y} r="14" fill="#0f172a" stroke={node.type === 'host' ? '#67e8f9' : node.type === 'router' ? '#a78bfa' : '#34d399'} strokeWidth="2" /><text x={node.x} y={node.y + 28} textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">{node.label}</text></g>)}</svg><div className="mt-3 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-wider text-slate-500"><span className="flex items-center gap-2"><i className="h-2 w-6 rounded bg-orange-400" /> affected link</span><span className="flex items-center gap-2"><i className="h-2 w-6 rounded bg-emerald-400" /> recommended path</span></div></CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value, className }: { label: string; value: string; className: string }) {
  return <div className={`rounded-xl border p-3 ${className}`}><p className="font-mono text-[10px] uppercase tracking-widest opacity-70">{label}</p><p className="mt-1 truncate font-mono text-sm font-semibold">{value}</p></div>;
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-white/10 bg-slate-950/30 p-3"><p className="font-mono text-[9px] uppercase tracking-widest text-slate-600">{label}</p><p className="mt-1 truncate font-mono text-sm text-slate-200">{value}</p></div>;
}

function PathCard({ title, path, cost, tone }: { title: string; path: string; cost: number; tone: 'red' | 'emerald' }) {
  return <div className={`rounded-xl border p-3 ${tone === 'red' ? 'border-red-500/20 bg-red-500/[0.05]' : 'border-emerald-500/20 bg-emerald-500/[0.05]'}`}><p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{title}</p><p className="mt-2 break-words font-mono text-xs leading-relaxed text-slate-200">{path}</p><p className={`mt-3 font-mono text-xs ${tone === 'red' ? 'text-red-300' : 'text-emerald-300'}`}>dynamic cost · {Number.isFinite(cost) ? cost.toFixed(2) : '—'}</p></div>;
}
