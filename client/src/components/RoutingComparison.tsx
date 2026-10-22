import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { NetworkLink, NetworkNode } from '@/hooks/useLiveNetworkData';
import { networkEdgeKey } from '@/lib/networkRouting';
import { AT_RISK_LOAD, comparisonSurgeEdge, CONGESTED_LOAD, RoutingPlan, sdnPlan, traditionalPlan } from '@/lib/routingComparison';

interface RoutingComparisonProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  running: boolean;
  paused: boolean;
  /** Simulator traffic intensity, 0 to 100; drives the compared demand. */
  intensity: number;
  /** Link the simulator's surge targets (its Affected Link). */
  surgeLink?: NetworkLink;
  runId: number;
}

interface Packet {
  id: number;
  /** Path at the time the packet was sent; later routing changes apply to new packets. */
  path: string[];
  hop: number;
  dropAt: number | null;
  droppedAt?: number;
}

interface PanelCounters {
  delivered: number;
  dropped: number;
}

const DEMAND_PER_PAIR_SHARE = 0.45;
/** Other traffic on every link, as a share of the simulator's intensity. */
const BACKGROUND_SHARE = 0.25;
/** The surge raises its link to intensity + 12, as the simulator's overlay does. */
const SURGE_EXTRA = 12;
const BASE_HOP_MS = 650;
const MAX_PACKETS = 90;

const loadColor = (load: number) => (load >= AT_RISK_LOAD ? '#ef4444' : load >= CONGESTED_LOAD ? '#f59e0b' : '#34d399');

function usePacketAnimation(plan: RoutingPlan, active: boolean, resetKey: string) {
  const packetsRef = useRef<Packet[]>([]);
  const budgetRef = useRef<number[]>([]);
  const countersRef = useRef<PanelCounters>({ delivered: 0, dropped: 0 });
  const planRef = useRef(plan);
  const nextIdRef = useRef(0);
  const [, setFrame] = useState(0);
  planRef.current = plan;

  useEffect(() => {
    packetsRef.current = [];
    budgetRef.current = [];
    countersRef.current = { delivered: 0, dropped: 0 };
    setFrame(frame => frame + 1);
  }, [resetKey]);

  useEffect(() => {
    if (!active) return;
    let handle = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      const current = planRef.current;
      const loadOf = (path: string[], hop: number) => {
        const index = Math.min(path.length - 2, Math.max(0, Math.floor(hop)));
        return current.loads.get(networkEdgeKey(path[index], path[index + 1])) ?? 0;
      };
      // Spawn packets in proportion to each flow's demand.
      current.flows.forEach((flow, index) => {
        budgetRef.current[index] = (budgetRef.current[index] ?? 0) + dt * flow.demand / 12000;
        while (budgetRef.current[index] >= 1 && packetsRef.current.length < MAX_PACKETS) {
          budgetRef.current[index] -= 1;
          const overloaded = flow.path.slice(0, -1).findIndex((node, hop) => (current.loads.get(networkEdgeKey(node, flow.path[hop + 1])) ?? 0) > 100);
          const dropAt = overloaded >= 0 && Math.random() < flow.loss ? overloaded + 0.5 : null;
          packetsRef.current.push({ id: nextIdRef.current += 1, path: flow.path, hop: 0, dropAt });
        }
        budgetRef.current[index] = Math.min(budgetRef.current[index], 1);
      });
      packetsRef.current = packetsRef.current.filter(packet => {
        if (packet.droppedAt !== undefined) return now - packet.droppedAt < 450;
        // Queueing slows packets on busy links.
        const load = Math.min(95, loadOf(packet.path, packet.hop));
        packet.hop += dt / (BASE_HOP_MS / (1 - load / 100) ** 0.5);
        if (packet.dropAt !== null && packet.hop >= packet.dropAt) {
          packet.hop = packet.dropAt;
          packet.droppedAt = now;
          countersRef.current.dropped += 1;
          return true;
        }
        if (packet.hop >= packet.path.length - 1) {
          countersRef.current.delivered += 1;
          return false;
        }
        return true;
      });
      setFrame(frame => (frame + 1) % 1_000_000);
      handle = requestAnimationFrame(step);
    };
    handle = requestAnimationFrame(step);
    return () => cancelAnimationFrame(handle);
  }, [active]);

  return { packets: packetsRef.current, counters: countersRef.current };
}

function TopologyPanel({
  title,
  subtitle,
  tone,
  nodes,
  links,
  plan,
  active,
  started,
  resetKey,
  surgeEdge,
}: {
  title: string;
  subtitle: string;
  tone: 'amber' | 'cyan';
  nodes: NetworkNode[];
  links: NetworkLink[];
  plan: RoutingPlan;
  active: boolean;
  started: boolean;
  resetKey: string;
  surgeEdge: string;
}) {
  const { packets, counters } = usePacketAnimation(plan, active, resetKey);
  const byId = new Map(nodes.map(node => [node.id, node]));
  const xs = nodes.map(node => node.x);
  const ys = nodes.map(node => node.y);
  const minX = Math.min(...xs, 0) - 40;
  const minY = Math.min(...ys, 0) - 40;
  const width = Math.max(...xs, 200) - minX + 40;
  const height = Math.max(...ys, 150) - minY + 50;
  const routedEdges = new Set(plan.flows.flatMap(flow => flow.path.slice(0, -1).map((node, index) => networkEdgeKey(node, flow.path[index + 1]))));
  const packetColor = tone === 'amber' ? '#fbbf24' : '#22d3ee';
  const position = (path: string[], hop: number) => {
    const index = Math.min(path.length - 2, Math.max(0, Math.floor(hop)));
    const from = byId.get(path[index]);
    const to = byId.get(path[index + 1]);
    if (!from || !to) return null;
    const t = Math.min(1, hop - index);
    return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
  };
  const toneBorder = tone === 'amber' ? 'border-amber-500/25' : 'border-cyan-500/25';
  const toneText = tone === 'amber' ? 'text-amber-200' : 'text-cyan-200';

  return (
    <div className={`rounded-xl border ${toneBorder} bg-slate-950/30 p-3`}>
      <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${toneText}`}>{title}</p>
      <p className="mt-1 min-h-[2.5rem] text-xs text-slate-400">{subtitle}</p>
      <div className="relative mt-2">
        <svg viewBox={`${minX} ${minY} ${width} ${height}`} className="h-auto min-h-[220px] w-full rounded-lg border border-white/10 bg-[#07101c]">
          {links.map((link, index) => {
            const source = byId.get(link.source);
            const target = byId.get(link.target);
            if (!source || !target) return null;
            const edge = networkEdgeKey(link.source, link.target);
            const failed = link.status === 'failed';
            const load = plan.loads.get(edge) ?? 0;
            const routed = started && routedEdges.has(edge);
            return (
              <g key={`${edge}-${index}`}>
                {started && !failed && edge === surgeEdge && (
                  <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="#fb923c" strokeOpacity={0.5} strokeWidth={10} strokeDasharray="8 6" />
                )}
                <line
                  x1={source.x} y1={source.y} x2={target.x} y2={target.y}
                  stroke={failed ? '#7f1d1d' : started ? loadColor(load) : '#334155'}
                  strokeOpacity={failed ? 0.8 : routed ? 0.95 : 0.35}
                  strokeWidth={routed ? 4 : 1.5}
                  strokeDasharray={failed ? '6 5' : undefined}
                />
                {started && !failed && (
                  <text x={(source.x + target.x) / 2} y={(source.y + target.y) / 2 - 6} textAnchor="middle" fill={loadColor(load)} fontSize="10" fontFamily="monospace">
                    {Math.round(load)}%
                  </text>
                )}
              </g>
            );
          })}
          {started && packets.map(packet => {
            const point = position(packet.path, packet.hop);
            if (!point) return null;
            const dropped = packet.droppedAt !== undefined;
            return <circle key={packet.id} cx={point.x} cy={point.y} r={dropped ? 6 : 4} fill={dropped ? '#ef4444' : packetColor} opacity={dropped ? 0.7 : 0.95} />;
          })}
          {nodes.map(node => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="14" fill="#0f172a" stroke={node.type === 'host' ? '#67e8f9' : '#34d399'} strokeWidth="2" />
              <text x={node.x} y={node.y + 28} textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">{node.label}</text>
            </g>
          ))}
        </svg>
        {!started && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-950/50 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
            Start the traffic simulation to route packets
          </div>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <PanelMetric label="Max link load" value={started ? `${Math.round(plan.maxLoad)}%` : '—'} alert={started && plan.maxLoad >= AT_RISK_LOAD} />
        <PanelMetric label="Congested links" value={started ? String(plan.congestedLinks) : '—'} alert={started && plan.congestedLinks > 0} />
        <PanelMetric label="Packet loss" value={started ? `${(plan.packetLoss * 100).toFixed(1)}%` : '—'} alert={started && plan.packetLoss > 0} />
        <PanelMetric label="Avg latency" value={started ? `${plan.latencyMs.toFixed(1)} ms` : '—'} alert={false} />
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
        Packets delivered {counters.delivered} · dropped {counters.dropped}
      </p>
      <div className="mt-2 flex flex-wrap gap-3 font-mono text-[9px] uppercase tracking-wider text-slate-500">
        <span className="flex items-center gap-1.5"><i className="h-1.5 w-5 rounded bg-emerald-400" /> &lt;{CONGESTED_LOAD}%</span>
        <span className="flex items-center gap-1.5"><i className="h-1.5 w-5 rounded bg-amber-400" /> congested</span>
        <span className="flex items-center gap-1.5"><i className="h-1.5 w-5 rounded bg-red-500" /> at-risk / overloaded</span>
        <span className="flex items-center gap-1.5"><i className="h-1.5 w-5 rounded border border-dashed border-orange-400" /> surge link</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-red-500" /> dropped packet</span>
      </div>
    </div>
  );
}

function PanelMetric({ label, value, alert }: { label: string; value: string; alert: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/30 p-2">
      <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{label}</p>
      <p className={`mt-1 font-mono text-sm ${alert ? 'text-red-300' : 'text-slate-200'}`}>{value}</p>
    </div>
  );
}

/**
 * Side-by-side traditional and SDN routing of the same simulated demand on
 * the dashboard's active topology and live link loads.
 */
export function RoutingComparison({ nodes, links, running, paused, intensity, surgeLink, runId }: RoutingComparisonProps) {
  const demandPerPair = intensity * DEMAND_PER_PAIR_SHARE;
  // The surge link depends on the topology and the affected link, not on per-tick loads.
  const linkSignature = links.map(link => `${networkEdgeKey(link.source, link.target)}:${link.status === 'failed'}`).join('|');
  const surgeEdge = useMemo(
    () => comparisonSurgeEdge(nodes, links, surgeLink, demandPerPair),
    [nodes, surgeLink?.source, surgeLink?.target, linkSignature],
  );
  const labels = new Map(nodes.map(node => [node.id, node.label]));
  const surgeLabel = surgeEdge ? surgeEdge.split('::').map(id => labels.get(id) ?? id).join(' – ') : '';
  // Both panels carry only the traffic simulator's load: background traffic
  // in proportion to its intensity plus its surge on the affected link.
  const scenarioLinks = useMemo(() => links.map(link => ({
    ...link,
    trafficLevel: networkEdgeKey(link.source, link.target) === surgeEdge
      ? Math.min(100, intensity + SURGE_EXTRA)
      : intensity * BACKGROUND_SHARE,
  })), [links, surgeEdge, intensity]);
  const traditional = useMemo(() => traditionalPlan(nodes, scenarioLinks, demandPerPair), [nodes, scenarioLinks, demandPerPair]);
  const sdn = useMemo(() => sdnPlan(nodes, scenarioLinks, demandPerPair), [nodes, scenarioLinks, demandPerPair]);
  const topologyKey = `${runId}:${nodes.map(node => node.id).join('|')}:${links.map(link => networkEdgeKey(link.source, link.target)).join('|')}`;
  const active = running && !paused;

  return (
    <div className="space-y-3">
    {running && surgeLabel && (
      <p className="font-mono text-[11px] uppercase tracking-wider text-orange-200">
        Surge link · {surgeLabel}
      </p>
    )}
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <TopologyPanel
        title="Traditional Routing"
        subtitle="Static shortest path by hop count with no view of link load: each host pair keeps one fixed path, even when it congests."
        tone="amber"
        nodes={nodes}
        links={links}
        plan={traditional}
        active={active}
        started={running}
        resetKey={topologyKey}
        surgeEdge={surgeEdge}
      />
      <TopologyPanel
        title="SDN Routing"
        subtitle="Controller with a global view of link load: traffic is split across the least-loaded paths and steered around congested links."
        tone="cyan"
        nodes={nodes}
        links={links}
        plan={sdn}
        active={active}
        started={running}
        resetKey={topologyKey}
        surgeEdge={surgeEdge}
      />
    </div>
    </div>
  );
}
