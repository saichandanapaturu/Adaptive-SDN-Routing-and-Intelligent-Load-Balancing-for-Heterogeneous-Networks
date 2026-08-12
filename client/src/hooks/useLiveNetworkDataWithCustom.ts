// Style: AIFE Live Operations — dense telemetry, dark canvas, emerald/cyan status accents, and motion that explains network state.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTopologyContext } from '@/contexts/TopologyContext';
import {
  NetworkNode,
  NetworkLink,
  PortStat,
  RerouteEvent,
  PredictionData,
  PacketFlow,
} from './useLiveNetworkData';

const DEFAULT_NODES: NetworkNode[] = [
  { id: 'switch-1', label: 'Switch-1', type: 'switch', status: 'healthy', x: 100, y: 100, trafficLevel: 0 },
  { id: 'switch-2', label: 'Switch-2', type: 'switch', status: 'healthy', x: 300, y: 100, trafficLevel: 0 },
  { id: 'switch-3', label: 'Switch-3', type: 'switch', status: 'healthy', x: 500, y: 100, trafficLevel: 0 },
  { id: 'switch-4', label: 'Switch-4', type: 'switch', status: 'healthy', x: 700, y: 100, trafficLevel: 0 },
  { id: 'host-1', label: 'Host-1', type: 'host', status: 'healthy', x: 150, y: 250, trafficLevel: 0 },
  { id: 'host-2', label: 'Host-2', type: 'host', status: 'healthy', x: 350, y: 250, trafficLevel: 0 },
  { id: 'host-3', label: 'Host-3', type: 'host', status: 'healthy', x: 550, y: 250, trafficLevel: 0 },
  { id: 'router-1', label: 'Router-1', type: 'router', status: 'healthy', x: 200, y: 50, trafficLevel: 0 },
  { id: 'router-2', label: 'Router-2', type: 'router', status: 'healthy', x: 400, y: 50, trafficLevel: 0 },
  { id: 'router-3', label: 'Router-3', type: 'router', status: 'healthy', x: 600, y: 50, trafficLevel: 0 },
  { id: 'abs-3', label: 'ABS-3', type: 'router', status: 'healthy', x: 750, y: 250, trafficLevel: 0 },
  { id: 'rr2s-5', label: 'RR2S-5', type: 'router', status: 'healthy', x: 50, y: 150, trafficLevel: 0 },
  { id: 'core', label: 'Core', type: 'switch', status: 'healthy', x: 400, y: 150, trafficLevel: 0 },
];

const DEFAULT_LINKS: NetworkLink[] = [
  { source: 'switch-1', target: 'switch-2', bandwidth: 10, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-2', target: 'switch-3', bandwidth: 10, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-3', target: 'switch-4', bandwidth: 10, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-1', target: 'host-1', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-2', target: 'host-2', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-3', target: 'host-3', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
  { source: 'router-1', target: 'switch-1', bandwidth: 5, trafficLevel: 0, status: 'healthy' },
  { source: 'router-2', target: 'switch-2', bandwidth: 5, trafficLevel: 0, status: 'healthy' },
  { source: 'router-3', target: 'switch-3', bandwidth: 5, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-4', target: 'abs-3', bandwidth: 2, trafficLevel: 0, status: 'healthy' },
  { source: 'rr2s-5', target: 'switch-1', bandwidth: 3, trafficLevel: 0, status: 'healthy' },
  { source: 'core', target: 'switch-2', bandwidth: 8, trafficLevel: 0, status: 'healthy' },
  { source: 'core', target: 'switch-3', bandwidth: 8, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-1', target: 'core', bandwidth: 8, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-2', target: 'core', bandwidth: 8, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-3', target: 'core', bandwidth: 8, trafficLevel: 0, status: 'healthy' },
  { source: 'host-1', target: 'host-2', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
  { source: 'host-2', target: 'host-3', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
  { source: 'router-1', target: 'router-2', bandwidth: 3, trafficLevel: 0, status: 'healthy' },
  { source: 'router-2', target: 'router-3', bandwidth: 3, trafficLevel: 0, status: 'healthy' },
  { source: 'abs-3', target: 'core', bandwidth: 5, trafficLevel: 0, status: 'healthy' },
  { source: 'rr2s-5', target: 'core', bandwidth: 4, trafficLevel: 0, status: 'healthy' },
  { source: 'switch-4', target: 'router-3', bandwidth: 2, trafficLevel: 0, status: 'healthy' },
  { source: 'host-1', target: 'router-1', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
  { source: 'host-3', target: 'abs-3', bandwidth: 1, trafficLevel: 0, status: 'healthy' },
];

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

function statusForTraffic(trafficLevel: number): NetworkNode['status'] {
  if (trafficLevel >= 86) return 'critical';
  if (trafficLevel >= 68) return 'warning';
  return 'healthy';
}

function portForNode(nodeId: string) {
  return (Array.from(nodeId).reduce((sum, character) => sum + character.charCodeAt(0), 0) % 48) + 1;
}

function findPath(source: string, destination: string, links: NetworkLink[]): string[] {
  if (!source || !destination || source === destination) return source === destination && source ? [source] : [];

  const queue: Array<{ node: string; path: string[] }> = [{ node: source, path: [source] }];
  const visited = new Set<string>([source]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    if (current.node === destination) return current.path;

    const neighbors = links
      .filter(link => link.source === current.node || link.target === current.node)
      .map(link => (link.source === current.node ? link.target : link.source));

    neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ node: neighbor, path: [...current.path, neighbor] });
      }
    });
  }

  return [];
}

function connectedPair(nodes: NetworkNode[], links: NetworkLink[]) {
  const candidates: Array<{ source: NetworkNode; destination: NetworkNode; path: string[] }> = [];

  for (let sourceIndex = 0; sourceIndex < nodes.length; sourceIndex += 1) {
    for (let destinationIndex = sourceIndex + 1; destinationIndex < nodes.length; destinationIndex += 1) {
      const source = nodes[sourceIndex];
      const destination = nodes[destinationIndex];
      const path = findPath(source.id, destination.id, links);
      if (path.length > 1) candidates.push({ source, destination, path });
    }
  }

  return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : null;
}

function buildPortStats(nodes: NetworkNode[], links: NetworkLink[], previous: PortStat[] = []): PortStat[] {
  return nodes.map(node => {
    const incidentLinks = links.filter(link => link.source === node.id || link.target === node.id);
    const averageTraffic = incidentLinks.length > 0
      ? incidentLinks.reduce((sum, link) => sum + link.trafficLevel, 0) / incidentLinks.length
      : 0;
    const capacity = incidentLinks.reduce((sum, link) => sum + link.bandwidth, 0);
    const previousStat = previous.find(stat => stat.node === node.label);
    const rate = capacity * (averageTraffic / 100);
    const rxRate = incidentLinks.length > 0 ? clamp(rate * (0.82 + Math.random() * 0.34), 0, Math.max(capacity, 1) * 1.2) : 0;
    const txRate = incidentLinks.length > 0 ? clamp(rate * (0.76 + Math.random() * 0.42), 0, Math.max(capacity, 1) * 1.2) : 0;
    const packetsRx = incidentLinks.length > 0
      ? (previousStat?.packetsRx ?? 0) + Math.floor(rxRate * 70 + Math.random() * 90)
      : 0;
    const packetsTx = incidentLinks.length > 0
      ? (previousStat?.packetsTx ?? 0) + Math.floor(txRate * 70 + Math.random() * 90)
      : 0;
    const errorChance = averageTraffic > 78 ? 0.16 : averageTraffic > 58 ? 0.06 : 0.015;

    return {
      node: node.label,
      port: portForNode(node.id),
      rxRate,
      txRate,
      packetsRx,
      packetsTx,
      errors: incidentLinks.length > 0
        ? (previousStat?.errors ?? 0) + (Math.random() < errorChance ? 1 : 0)
        : 0,
      congestion: clamp(averageTraffic + (incidentLinks.length > 0 ? (Math.random() - 0.5) * 8 : 0)),
    };
  });
}

function buildPrediction(links: NetworkLink[], previous?: PredictionData): PredictionData {
  if (links.length === 0) {
    return {
      timestamp: new Date(),
      predictedCongestion: 0,
      predictedPacketLoss: 0,
      trend: 'stable',
    };
  }

  const averageTraffic = links.reduce((sum, link) => sum + link.trafficLevel, 0) / links.length;
  const peakTraffic = Math.max(...links.map(link => link.trafficLevel));
  const congestedRatio = links.filter(link => link.trafficLevel >= 68).length / links.length;
  const predictedCongestion = clamp(averageTraffic * 0.72 + peakTraffic * 0.28 + (Math.random() - 0.5) * 5);
  const predictedPacketLoss = clamp(congestedRatio * 2.8 + Math.max(0, predictedCongestion - 65) * 0.045 + (Math.random() - 0.5) * 0.16, 0, 10);
  const previousCongestion = previous?.predictedCongestion ?? predictedCongestion;
  const delta = predictedCongestion - previousCongestion;
  const trend: PredictionData['trend'] = delta > 2.5 ? 'increasing' : delta < -2.5 ? 'decreasing' : 'stable';

  return {
    timestamp: new Date(),
    predictedCongestion,
    predictedPacketLoss,
    trend,
  };
}

function buildRerouteEvent(nodes: NetworkNode[], links: NetworkLink[]): RerouteEvent | null {
  const pair = connectedPair(nodes, links);
  if (!pair) return null;

  const reasons = ['Congestion Detected', 'Load Balancing', 'Latency Optimization', 'Link Health Update'];
  const labels = new Map(nodes.map(node => [node.id, node.label]));

  return {
    id: `reroute-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date(),
    source: pair.source.label,
    destination: pair.destination.label,
    reason: reasons[Math.floor(Math.random() * reasons.length)],
    oldPath: pair.path.map(nodeId => labels.get(nodeId) ?? nodeId),
    newPath: pair.path.map(nodeId => labels.get(nodeId) ?? nodeId),
  };
}

function initialRoute(nodes: NetworkNode[], links: NetworkLink[]) {
  const pair = connectedPair(nodes, links);
  if (pair) return { source: pair.source.id, destination: pair.destination.id };

  return {
    source: nodes[0]?.id ?? '',
    destination: nodes[1]?.id ?? '',
  };
}

export function useLiveNetworkDataWithCustom() {
  const { customNodes, customLinks } = useTopologyContext();
  const hasCustomTopology = customNodes.length > 0;

  const activeNodes = useMemo(
    () => (hasCustomTopology ? customNodes : DEFAULT_NODES),
    [customNodes, hasCustomTopology],
  );

  const activeNodeIds = useMemo(() => new Set(activeNodes.map(node => node.id)), [activeNodes]);
  const activeLinks = useMemo(
    () => {
      const sourceLinks = hasCustomTopology ? customLinks : DEFAULT_LINKS;
      return sourceLinks.filter(link => activeNodeIds.has(link.source) && activeNodeIds.has(link.target));
    },
    [activeNodeIds, customLinks, hasCustomTopology],
  );

  const topologyKey = useMemo(
    () => `${hasCustomTopology ? 'custom' : 'default'}:${activeNodes.map(node => node.id).join('|')}:${activeLinks.map(link => `${link.source}-${link.target}`).join('|')}`,
    [activeLinks, activeNodes, hasCustomTopology],
  );

  const initial = useMemo(() => initialRoute(activeNodes, activeLinks), [activeLinks, activeNodes]);
  const [nodes, setNodes] = useState<NetworkNode[]>(activeNodes);
  const [links, setLinks] = useState<NetworkLink[]>(activeLinks);
  const [portStats, setPortStats] = useState<PortStat[]>(() => buildPortStats(activeNodes, activeLinks));
  const [rerouteEvents, setRerouteEvents] = useState<RerouteEvent[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>(() => [buildPrediction(activeLinks)]);
  const [packetFlows, setPacketFlows] = useState<PacketFlow[]>([]);
  const [selectedSource, setSelectedSource] = useState(initial.source);
  const [selectedDestination, setSelectedDestination] = useState(initial.destination);
  const [tick, setTick] = useState(0);
  const nodesRef = useRef(nodes);
  const linksRef = useRef(links);
  const tickRef = useRef(0);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    linksRef.current = links;
  }, [links]);

  useEffect(() => {
    const nextRoute = initialRoute(activeNodes, activeLinks);
    setNodes(activeNodes.map(node => ({ ...node, trafficLevel: 0, status: 'healthy' })));
    setLinks(activeLinks.map(link => ({ ...link, trafficLevel: 0, status: 'healthy' })));
    setPortStats(buildPortStats(activeNodes, activeLinks));
    setRerouteEvents([]);
    setPredictions([buildPrediction(activeLinks)]);
    setPacketFlows([]);
    setSelectedSource(nextRoute.source);
    setSelectedDestination(nextRoute.destination);
    tickRef.current = 0;
    setTick(0);
  }, [topologyKey, activeLinks, activeNodes]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const currentNodes = nodesRef.current;
      const currentLinks = linksRef.current;
      const nextLinks = currentLinks.map(link => {
        const drift = (Math.random() - 0.5) * 24;
        const burst = Math.random() < 0.12 ? 22 : 0;
        const trafficLevel = clamp(link.trafficLevel + drift + burst);
        return { ...link, trafficLevel, status: statusForTraffic(trafficLevel) };
      });
      const nextNodes = currentNodes.map(node => {
        const incident = nextLinks.filter(link => link.source === node.id || link.target === node.id);
        const trafficLevel = incident.length > 0
          ? clamp(incident.reduce((sum, link) => sum + link.trafficLevel, 0) / incident.length + (Math.random() - 0.5) * 6)
          : 0;
        return { ...node, trafficLevel, status: statusForTraffic(trafficLevel) };
      });

      linksRef.current = nextLinks;
      nodesRef.current = nextNodes;
      setLinks(nextLinks);
      setNodes(nextNodes);
      setPortStats(previous => buildPortStats(nextNodes, nextLinks, previous));
      setPredictions(previous => [buildPrediction(nextLinks, previous[0]), ...previous.slice(0, 19)]);

      tickRef.current += 1;
      setTick(tickRef.current);

      if (tickRef.current % 5 === 0 && Math.random() < 0.75) {
        const event = buildRerouteEvent(nextNodes, nextLinks);
        if (event) setRerouteEvents(previous => [event, ...previous.slice(0, 11)]);
      }

      const now = Date.now();
      setPacketFlows(previous => {
        const updated = previous
          .map(flow => ({ ...flow, progress: clamp(((now - flow.startTime) / flow.duration) * 100) }))
          .filter(flow => flow.progress < 100);
        const path = findPath(selectedSource, selectedDestination, nextLinks);

        if (updated.length < 6 && path.length > 1 && Math.random() < 0.72) {
          updated.push({
            id: `packet-${now}-${Math.random().toString(36).slice(2, 7)}`,
            source: selectedSource,
            destination: selectedDestination,
            path,
            progress: 0,
            startTime: now,
            duration: 2200 + Math.random() * 1800,
          });
        }

        return updated;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [selectedDestination, selectedSource, topologyKey]);

  const updateRoute = (source: string, destination: string) => {
    const validSource = activeNodeIds.has(source) ? source : activeNodes[0]?.id ?? '';
    const validDestination = activeNodeIds.has(destination) ? destination : activeNodes[1]?.id ?? '';
    setSelectedSource(validSource);
    setSelectedDestination(validDestination);
    setPacketFlows([]);
  };

  const getNetworkStats = () => ({
    totalNodes: nodes.length,
    activeLinks: links.filter(link => link.status === 'healthy').length,
    congestedLinks: links.filter(link => link.status === 'warning' || link.status === 'critical').length,
    failedLinks: links.filter(link => link.status === 'critical').length,
    maxTraffic: Math.max(...links.map(link => link.trafficLevel), 0),
    avgTraffic: links.length > 0 ? links.reduce((sum, link) => sum + link.trafficLevel, 0) / links.length : 0,
    activeNodes: nodes.filter(node => node.status === 'healthy').length,
  });

  return {
    nodes,
    links,
    portStats,
    rerouteEvents,
    predictions,
    packetFlows,
    selectedSource,
    selectedDestination,
    updateRoute,
    getNetworkStats,
    hasCustomTopology,
    telemetryTick: tick,
  };
}
