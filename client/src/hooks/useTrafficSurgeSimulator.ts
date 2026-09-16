import { useEffect, useMemo, useRef, useState } from 'react';
import type { NetworkLink, NetworkNode } from '@/hooks/useLiveNetworkData';

type Scenario = 'normal' | 'morning' | 'evening' | 'random' | 'flash' | 'dynamic';
export type TrafficState = 'NORMAL' | 'MODERATE' | 'RAMPING_UP' | 'PEAK' | 'SUDDEN SURGE' | 'FLASH CROWD' | 'RANDOM_SURGE' | 'RAMPING_DOWN' | 'RECOVERY';
export type SimulationSpeed = 1 | 2 | 5;

export interface SurgeHistoryPoint {
  time: string;
  intensity: number;
  state: TrafficState;
}

export interface SurgeEvent {
  id: string;
  time: string;
  message: string;
  tone: 'neutral' | 'warning' | 'critical' | 'success';
}

export interface SurgeRouting {
  currentPath: string[];
  recommendedPath: string[];
  currentCost: number;
  recommendedCost: number;
  reason: string;
  action: 'MONITOR' | 'PREPARE REROUTE' | 'REROUTE' | 'RECOVER';
}

export interface TrafficEventInfo {
  name: string;
  scheduledMinute?: number;
  detectedMinute?: number;
  durationMinutes?: number;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface TrafficSurgeState {
  scenario: Scenario;
  running: boolean;
  paused: boolean;
  speed: SimulationSpeed;
  trafficState: TrafficState;
  intensity: number;
  surgeActive: boolean;
  affectedLink?: NetworkLink;
  affectedNodeLabels: string[];
  history: SurgeHistoryPoint[];
  events: SurgeEvent[];
  routing: SurgeRouting;
  congestionProbability: number;
  trend: 'STABLE' | 'INCREASING' | 'RAPIDLY INCREASING' | 'DECREASING';
  runId: number;
  simulatedMinute: number;
  simulatedTime: string;
  currentEvent?: TrafficEventInfo;
  nextScheduledEvent: TrafficEventInfo & { timeUntilMinutes: number };
}

const SCENARIOS: Array<{ value: Scenario; label: string }> = [
  { value: 'normal', label: 'Normal Traffic' },
  { value: 'morning', label: 'Morning-like Peak' },
  { value: 'evening', label: 'Evening-like Peak' },
  { value: 'random', label: 'Random Traffic Surge' },
  { value: 'flash', label: 'Flash Crowd' },
  { value: 'dynamic', label: 'Custom / Dynamic' },
];

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));
const edgeKey = (source: string, target: string) => [source, target].sort().join('::');
const formatClock = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const formatSimulatedTime = (minute: number) => {
  const normalized = ((minute % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, '0')}:${String(normalized % 60).padStart(2, '0')}`;
};
const minutesUntil = (from: number, to: number) => (to - from + 1440) % 1440;
const baselineForMinute = (minute: number) => {
  const hour = ((minute % 1440) + 1440) % 1440 / 60;
  if (hour < 6) return 18;
  if (hour < 9) return 26 + ((hour - 6) / 3) * 18;
  if (hour < 12) return 48;
  if (hour < 14) return 42 + Math.sin((hour - 12) * Math.PI) * 10;
  if (hour < 17) return 44;
  if (hour < 18) return 44 + ((hour - 17) * 20);
  if (hour < 20) return 76 - ((hour - 18) * 8);
  if (hour < 23) return 50 - ((hour - 20) * 7);
  return 28;
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function pathCost(path: string[], links: NetworkLink[], predictedPenalty: number) {
  if (path.length < 2) return Number.POSITIVE_INFINITY;
  return path.slice(0, -1).reduce((total, node, index) => {
    const next = path[index + 1];
    const link = links.find(item => edgeKey(item.source, item.target) === edgeKey(node, next));
    return total + (link ? 1 + link.trafficLevel / 22 + predictedPenalty / 100 : 1000);
  }, 0);
}

function findPath(source: string, destination: string, links: NetworkLink[], blocked: Set<string> = new Set()) {
  const queue: Array<{ node: string; path: string[] }> = [{ node: source, path: [source] }];
  const visited = new Set([source]);
  while (queue.length) {
    const current = queue.shift();
    if (!current) break;
    if (current.node === destination) return current.path;
    links.filter(link => !blocked.has(edgeKey(link.source, link.target)) && (link.source === current.node || link.target === current.node)).forEach(link => {
      const next = link.source === current.node ? link.target : link.source;
      if (!visited.has(next)) {
        visited.add(next);
        queue.push({ node: next, path: [...current.path, next] });
      }
    });
  }
  return [];
}

function buildInitialRouting(nodes: NetworkNode[], links: NetworkLink[]): SurgeRouting {
  const hosts = nodes.filter(node => node.type === 'host');
  const source = hosts[0]?.id ?? nodes[0]?.id ?? '';
  const destination = hosts[hosts.length - 1]?.id ?? nodes[nodes.length - 1]?.id ?? '';
  const currentPath = findPath(source, destination, links);
  return { currentPath, recommendedPath: currentPath, currentCost: pathCost(currentPath, links, 0), recommendedCost: pathCost(currentPath, links, 0), reason: 'Monitoring baseline traffic.', action: 'MONITOR' };
}

export function useTrafficSurgeSimulator(nodes: NetworkNode[], links: NetworkLink[]) {
  const [scenario, setScenario] = useState<Scenario>('random');
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState<SimulationSpeed>(1);
  const [trafficState, setTrafficState] = useState<TrafficState>('NORMAL');
  const [intensity, setIntensity] = useState(28);
  const [surgeActive, setSurgeActive] = useState(false);
  const [history, setHistory] = useState<SurgeHistoryPoint[]>([]);
  const [events, setEvents] = useState<SurgeEvent[]>([]);
  const [routing, setRouting] = useState<SurgeRouting>(() => buildInitialRouting(nodes, links));
  const [congestionProbability, setCongestionProbability] = useState(18);
  const [trend, setTrend] = useState<TrafficSurgeState['trend']>('STABLE');
  const [runId, setRunId] = useState(0);
  const [simulatedMinute, setSimulatedMinute] = useState(17 * 60 + 30);
  const [currentEvent, setCurrentEvent] = useState<TrafficEventInfo | undefined>(undefined);
  const elapsedRef = useRef(0);
  const randomRef = useRef<() => number>(seededRandom(Date.now()));
  const affectedIndexRef = useRef(0);
  const previousIntensityRef = useRef(28);
  const randomEventMinuteRef = useRef<number | null>(null);
  const randomEventDetectedRef = useRef(false);

  const addEvent = (message: string, tone: SurgeEvent['tone'] = 'neutral') => {
    setEvents(previous => [{ id: `${Date.now()}-${Math.random()}`, time: formatClock(new Date()), message, tone }, ...previous].slice(0, 12));
  };

  const reset = () => {
    setRunning(false);
    setPaused(false);
    elapsedRef.current = 0;
    previousIntensityRef.current = 28;
    setTrafficState('NORMAL');
    setIntensity(28);
    setSurgeActive(false);
    setHistory([]);
    setEvents([]);
    setCongestionProbability(18);
    setTrend('STABLE');
    setSimulatedMinute(17 * 60 + 30);
    setCurrentEvent(undefined);
    randomEventMinuteRef.current = null;
    randomEventDetectedRef.current = false;
    setRouting(buildInitialRouting(nodes, links));
  };

  const start = () => {
    const random = seededRandom(Date.now() ^ Math.floor(Math.random() * 100000));
    randomRef.current = random;
    elapsedRef.current = 0;
    affectedIndexRef.current = links.length ? Math.floor(random() * links.length) : 0;
    setRunId(value => value + 1);
    setRunning(true);
    setPaused(false);
    setHistory([]);
    setEvents([]);
    setTrafficState('NORMAL');
    setIntensity(28);
    setSurgeActive(false);
    setCongestionProbability(18);
    setTrend('STABLE');
    setSimulatedMinute(17 * 60 + 30);
    setCurrentEvent(undefined);
    randomEventMinuteRef.current = 90 + Math.floor(random() * 1260);
    randomEventDetectedRef.current = false;
    setRouting(buildInitialRouting(nodes, links));
    addEvent('Normal traffic baseline established.', 'neutral');
  };

  const triggerSurge = () => {
    if (!running) start();
    elapsedRef.current = Math.max(elapsedRef.current, 4);
    addEvent('Unpredictable traffic surge injected into a targeted flow.', 'warning');
  };

  useEffect(() => {
    if (!running || paused || links.length === 0) return;
    const interval = window.setInterval(() => {
      elapsedRef.current += 1;
      const step = elapsedRef.current;
      const random = randomRef.current;
      const nextMinute = (simulatedMinute + 15) % 1440;
      const scheduledEventStart = 18 * 60;
      const scheduledWindow = nextMinute >= scheduledEventStart - 15 && nextMinute <= scheduledEventStart + 45;
      const randomEventMinute = randomEventMinuteRef.current ?? 720;
      const randomWindow = nextMinute >= randomEventMinute && nextMinute <= randomEventMinute + 30;
      if (randomWindow && !randomEventDetectedRef.current) {
        randomEventDetectedRef.current = true;
        setCurrentEvent({ name: 'Unexpected Traffic Surge', detectedMinute: randomEventMinute, durationMinutes: 30, impact: 'HIGH' });
        addEvent(`Unexpected traffic surge detected at ${formatSimulatedTime(randomEventMinute)}.`, 'warning');
      }
      setSimulatedMinute(nextMinute);
      const duration = scenario === 'flash' ? 18 : scenario === 'normal' ? 22 : 28;
      const surgeStart = scenario === 'normal' ? duration + 1 : 3 + Math.floor(random() * 5);
      const surgeEnd = surgeStart + (scenario === 'flash' ? 4 : 8 + Math.floor(random() * 5));
      let target = 28;
      let nextState: TrafficState = 'NORMAL';
      if (step < surgeStart - 2) {
        target = scenario === 'morning' || scenario === 'evening' ? 42 : 30;
        nextState = target > 40 ? 'MODERATE' : 'NORMAL';
      } else if (step < surgeStart) {
        target = 48;
        nextState = 'MODERATE';
      } else if (step < surgeStart + 2) {
        target = scenario === 'flash' ? 94 : 76;
        nextState = scenario === 'flash' ? 'FLASH CROWD' : 'SUDDEN SURGE';
      } else if (step < surgeEnd) {
        const peakNoise = random();
        target = scenario === 'normal' ? 45 : scenario === 'flash' ? 88 : 72 + peakNoise * 18;
        nextState = 'PEAK';
      } else if (step < surgeEnd + 5) {
        target = 52 - (step - surgeEnd) * 4;
        nextState = 'RECOVERY';
      } else {
        const recoveryNoise = random();
        target = 28 + recoveryNoise * 8;
        nextState = 'NORMAL';
        if (step > duration) elapsedRef.current = 0;
      }

      const dayBaseline = baselineForMinute(nextMinute);
      const eventBoost = scheduledWindow ? 22 : randomWindow ? 28 : 0;
      target = clamp(target * 0.58 + dayBaseline * 0.42 + eventBoost);
      if (scheduledWindow && nextState === 'NORMAL') nextState = nextMinute < scheduledEventStart ? 'RAMPING_UP' : 'PEAK';
      if (randomWindow) nextState = 'RANDOM_SURGE';
      const currentIntensity = intensity;
      const smoothing = scenario === 'flash' && nextState === 'FLASH CROWD' ? 0.72 : 0.32;
      const nextIntensity = clamp(currentIntensity + (target - currentIntensity) * smoothing + (random() - 0.5) * 4);
      const delta = nextIntensity - previousIntensityRef.current;
      const nextTrend: TrafficSurgeState['trend'] = delta > 8 ? 'RAPIDLY INCREASING' : delta > 2 ? 'INCREASING' : delta < -3 ? 'DECREASING' : 'STABLE';
      const probability = clamp(12 + nextIntensity * 0.66 + Math.max(0, delta) * 2.8);
      const affectedLink = links[affectedIndexRef.current % links.length];
      const stressedLinks = affectedLink ? links.map(link => link === affectedLink ? { ...link, trafficLevel: clamp(nextIntensity + 12) } : link) : links;
      const hosts = nodes.filter(node => node.type === 'host');
      const source = hosts[0]?.id ?? nodes[0]?.id ?? '';
      const destination = hosts[hosts.length - 1]?.id ?? nodes[nodes.length - 1]?.id ?? '';
      const blocked = affectedLink && nextIntensity > 58 ? new Set([edgeKey(affectedLink.source, affectedLink.target)]) : new Set<string>();
      const currentPath = findPath(source, destination, stressedLinks);
      const recommendedPath = findPath(source, destination, stressedLinks, blocked);
      const currentCost = pathCost(currentPath, stressedLinks, probability);
      const recommendedCost = pathCost(recommendedPath, stressedLinks, probability * 0.55);
      const shouldReroute = nextIntensity > 64 && recommendedPath.length > 1 && recommendedCost < currentCost;
      const action: SurgeRouting['action'] = nextState === 'RECOVERY' ? 'RECOVER' : shouldReroute ? 'REROUTE' : probability > 58 ? 'PREPARE REROUTE' : 'MONITOR';

      if (nextState !== trafficState) {
        const message = nextState === 'SUDDEN SURGE' || nextState === 'FLASH CROWD' ? `${nextState} detected on ${affectedLink?.source ?? 'targeted'} → ${affectedLink?.target ?? 'flow'}.` : `${nextState} phase entered.`;
        addEvent(message, nextState === 'NORMAL' ? 'success' : nextState === 'RECOVERY' ? 'neutral' : 'warning');
      }
      if (shouldReroute && action === 'REROUTE' && routing.action !== 'REROUTE') addEvent('AIFE recommends alternate path after rapidly increasing utilization.', 'critical');

      setTrafficState(nextState);
      setIntensity(nextIntensity);
      setSurgeActive(nextState === 'SUDDEN SURGE' || nextState === 'FLASH CROWD' || nextState === 'PEAK');
      setCongestionProbability(probability);
      setTrend(nextTrend);
      setRouting({ currentPath, recommendedPath: shouldReroute ? recommendedPath : currentPath, currentCost, recommendedCost: shouldReroute ? recommendedCost : currentCost, reason: shouldReroute ? `Rapid traffic increase detected near ${affectedLink?.source ?? 'the affected link'} → ${affectedLink?.target ?? 'target flow'}.` : nextState === 'RECOVERY' ? 'Traffic is decreasing; reevaluating the original path.' : 'Monitoring utilization and recent traffic variance.', action });
      setHistory(previous => [...previous, { time: formatClock(new Date()), intensity: nextIntensity, state: nextState }].slice(-24));
      previousIntensityRef.current = nextIntensity;
    }, Math.max(200, 1000 / speed));
    return () => window.clearInterval(interval);
  }, [links, nodes, running, paused, scenario, speed, intensity, trafficState, routing.action]);

  const scenarioOptions = useMemo(() => SCENARIOS, []);
  const affectedLink = links[affectedIndexRef.current % Math.max(links.length, 1)];
  const affectedNodeLabels = affectedLink ? [affectedLink.source, affectedLink.target] : [];

  return {
    scenario,
    setScenario,
    scenarioOptions,
    running,
    paused,
    speed,
    setSpeed,
    trafficState,
    intensity,
    surgeActive,
    affectedLink,
    affectedNodeLabels,
    history,
    events,
    routing,
    congestionProbability,
    trend,
    runId,
    start,
    pause: () => setPaused(value => !value),
    reset,
    triggerSurge,
    simulatedMinute,
    simulatedTime: formatSimulatedTime(simulatedMinute),
    currentEvent,
    nextScheduledEvent: {
      name: 'Major Ticket Release',
      scheduledMinute: 18 * 60,
      impact: 'HIGH',
      timeUntilMinutes: minutesUntil(simulatedMinute, 18 * 60),
    },
  } satisfies Omit<TrafficSurgeState, 'scenario'> & {
    scenario: Scenario;
    setScenario: typeof setScenario;
    scenarioOptions: typeof SCENARIOS;
    setSpeed: typeof setSpeed;
    start: () => void;
    pause: () => void;
    reset: () => void;
    triggerSurge: () => void;
  };
}

export type TrafficScenarioOption = typeof SCENARIOS[number];
