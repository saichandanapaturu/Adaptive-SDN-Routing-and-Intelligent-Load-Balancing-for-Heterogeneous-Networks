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

function edgeKey(source: string, target: string) {
  return source < target ? `${source}::${target}` : `${target}::${source}`;
}

function pathEdgeKeys(path: string[]) {
  return path.slice(0, -1).map((node, index) => edgeKey(node, path[index + 1]));
}

function pathsEqual(first: string[], second: string[]) {
  return first.length === second.length && first.every((node, index) => node === second[index]);
}

function findPath(
  source: string,
  destination: string,
  links: NetworkLink[],
  avoidEdges: Set<string> = new Set(),
  predictionDriven = false,
): string[] {
  if (!source || !destination || source === destination) return source === destination && source ? [source] : [];

  const queue: Array<{ node: string; path: string[]; cost: number }> = [{ node: source, path: [source], cost: 0 }];
  const bestCost = new Map<string, number>([[source, 0]]);

  while (queue.length > 0) {
    queue.sort((left, right) => left.cost - right.cost);
    const current = queue.shift();
    if (!current) break;

    if (current.node === destination) return current.path;

    const neighbors = links
      .filter(link => link.source === current.node || link.target === current.node)
      .map(link => ({
        link,
        neighbor: link.source === current.node ? link.target : link.source,
      }));

    neighbors.forEach(({ link, neighbor }) => {
      if (avoidEdges.has(edgeKey(link.source, link.target))) return;

      const statusPenalty = link.status === 'critical' ? 200 : link.status === 'warning' ? 8 : 0;
      const forecastPenalty = predictionDriven && link.trafficLevel >= 55 ? 12 : 0;
      const linkCost = 1 + link.trafficLevel / 24 + statusPenalty + forecastPenalty;
      const nextCost = current.cost + linkCost;

      if (nextCost < (bestCost.get(neighbor) ?? Number.POSITIVE_INFINITY)) {
        bestCost.set(neighbor, nextCost);
        queue.push({ node: neighbor, path: [...current.path, neighbor], cost: nextCost });
      }
    });
  }

  return [];
}

function countPacketActiveLinks(links: NetworkLink[], packetFlows: PacketFlow[]) {
  const packetEdges = new Set(packetFlows.flatMap(flow => pathEdgeKeys(flow.path)));
  return links.filter(link => packetEdges.has(edgeKey(link.source, link.target))).length;
}

function rerouteEventForFlow(
  flow: PacketFlow,
  newPath: string[],
  nodes: NetworkNode[],
  reason: string,
): RerouteEvent {
  const labels = new Map(nodes.map(node => [node.id, node.label]));
  return {
    id: `reroute-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date(),
    source: labels.get(flow.source) ?? flow.source,
    destination: labels.get(flow.destination) ?? flow.destination,
    reason,
    oldPath: flow.path.map(nodeId => labels.get(nodeId) ?? nodeId),
    newPath: newPath.map(nodeId => labels.get(nodeId) ?? nodeId),
  };
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
  const predictedCongestion = clamp(averageTraffic * 0.25 + peakTraffic * 0.75 + (Math.random() - 0.5) * 3);
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

function createPacketFlow(source: string, destination: string, links: NetworkLink[]): PacketFlow | null {
  const path = findPath(source, destination, links);
  if (path.length < 2) return null;

  const now = Date.now();
  return {
    id: `packet-${now}-${Math.random().toString(36).slice(2, 7)}`,
    source,
    destination,
    path,
    progress: 0,
    startTime: now,
    duration: 1100 + Math.random() * 700,
  };
}

export function useLiveNetworkDataWithCustom() {
  const { customNodes, customLinks, generatedNodes, generatedLinks, isUsingCustom, isUsingGenerated } = useTopologyContext();
  const hasCustomTopology = customNodes.length > 0;
  const hasGeneratedTopology = generatedNodes.length > 0;
  const activeMode = isUsingGenerated && hasGeneratedTopology ? 'generated' : isUsingCustom && hasCustomTopology ? 'custom' : 'default';

  const activeNodes = useMemo(
    () => (activeMode === 'generated' ? generatedNodes : activeMode === 'custom' ? customNodes : DEFAULT_NODES),
    [activeMode, customNodes, generatedNodes],
  );

  const activeNodeIds = useMemo(() => new Set(activeNodes.map(node => node.id)), [activeNodes]);
  const activeLinks = useMemo(
    () => {
      const sourceLinks = activeMode === 'generated' ? generatedLinks : activeMode === 'custom' ? customLinks : DEFAULT_LINKS;
      return sourceLinks.filter(link => activeNodeIds.has(link.source) && activeNodeIds.has(link.target));
    },
    [activeMode, activeNodeIds, customLinks, generatedLinks],
  );

  const topologyKey = useMemo(
    () => `${activeMode}:${activeNodes.map(node => node.id).join('|')}:${activeLinks.map(link => `${link.source}-${link.target}`).join('|')}`,
    [activeLinks, activeMode, activeNodes],
  );

  const [nodes, setNodes] = useState<NetworkNode[]>(activeNodes);
  const [links, setLinks] = useState<NetworkLink[]>(activeLinks);
  const [portStats, setPortStats] = useState<PortStat[]>(() => buildPortStats(activeNodes, activeLinks));
  const [rerouteEvents, setRerouteEvents] = useState<RerouteEvent[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>(() => [buildPrediction(activeLinks)]);
  const [packetFlows, setPacketFlows] = useState<PacketFlow[]>([]);
  const [sourceCount, setSourceCount] = useState<number>(0);
  const [destinationCount, setDestinationCount] = useState<number>(0);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [tick, setTick] = useState(0);
  const nodesRef = useRef(nodes);
  const linksRef = useRef(links);
  const packetFlowsRef = useRef<PacketFlow[]>([]);
  const predictionsRef = useRef<PredictionData[]>([buildPrediction(activeLinks)]);
  const tickRef = useRef(0);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    linksRef.current = links;
  }, [links]);

  useEffect(() => {
    setNodes(activeNodes.map(node => ({ ...node, trafficLevel: 0, status: 'healthy' })));
    setLinks(activeLinks.map(link => ({ ...link, trafficLevel: 0, status: 'healthy' })));
    setPortStats(buildPortStats(activeNodes, activeLinks));
    setRerouteEvents([]);
    const resetPredictions = [buildPrediction(activeLinks)];
    predictionsRef.current = resetPredictions;
    setPredictions(resetPredictions);
    packetFlowsRef.current = [];
    setPacketFlows([]);
    setSelectedSources([]);
    setSelectedDestinations([]);
    setSourceCount(0);
    setDestinationCount(0);
    tickRef.current = 0;
    setTick(0);
  }, [topologyKey, activeLinks, activeNodes]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const currentNodes = nodesRef.current;
      const currentLinks = linksRef.current;
      const activeRouteEdges = new Set(packetFlowsRef.current.flatMap(flow => pathEdgeKeys(flow.path)));
      const forecastHotspot = tickRef.current % 8 >= 5;
      const nextLinks = currentLinks.map(link => {
        const drift = (Math.random() - 0.5) * 18;
        const burst = Math.random() < 0.18 ? 24 : 0;
        const predictedRouteBurst = forecastHotspot && activeRouteEdges.has(edgeKey(link.source, link.target)) ? 84 : 0;
        const trafficLevel = clamp(link.trafficLevel * 0.58 + drift + burst + predictedRouteBurst);
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

      const nextPrediction = buildPrediction(nextLinks, predictionsRef.current[0]);
      const nextPredictions = [nextPrediction, ...predictionsRef.current.slice(0, 19)];
      predictionsRef.current = nextPredictions;
      setPredictions(nextPredictions);

      tickRef.current += 1;
      setTick(tickRef.current);

      const now = Date.now();
      const linkByEdge = new Map(nextLinks.map(link => [edgeKey(link.source, link.target), link]));
      const predictionPressure = nextPrediction.predictedCongestion >= 62
        || nextPrediction.predictedPacketLoss >= 1.4
        || nextPrediction.trend === 'increasing';
      const reroutes: RerouteEvent[] = [];
      const updated = packetFlowsRef.current
        .map(flow => {
          const progress = clamp(((now - flow.startTime) / flow.duration) * 100);
          if (progress >= 100) return null;

          const currentEdges = pathEdgeKeys(flow.path);
          const routeHasPressure = currentEdges.some(key => {
            const link = linkByEdge.get(key);
            return Boolean(link && (link.trafficLevel >= 68 || link.status !== 'healthy'));
          });
          const shouldReroute = routeHasPressure || (predictionPressure && currentEdges.some(key => {
            const link = linkByEdge.get(key);
            return Boolean(link && link.trafficLevel >= 52);
          }));

          if (shouldReroute) {
            const alternatePath = findPath(flow.source, flow.destination, nextLinks, new Set(currentEdges), true);
            if (alternatePath.length > 1 && !pathsEqual(alternatePath, flow.path)) {
              reroutes.push(rerouteEventForFlow(
                flow,
                alternatePath,
                nextNodes,
                predictionPressure ? 'Load Balancing' : 'Congestion Detected',
              ));
              return {
                ...flow,
                path: alternatePath,
                progress: 0,
                startTime: now,
              };
            }
          }

          return { ...flow, progress };
        })
        .filter((flow): flow is PacketFlow => Boolean(flow));

      if (reroutes.length > 0) {
        setRerouteEvents(previous => [...reroutes, ...previous].slice(0, 12));
      }

      if (selectedSources.length > 0 && selectedDestinations.length > 0) {
        if (updated.length < 16 && tickRef.current % 1 === 0) {
          const src = selectedSources[Math.floor(Math.random() * selectedSources.length)];
          const dst = selectedDestinations[Math.floor(Math.random() * selectedDestinations.length)];
          if (src && dst && src !== dst) {
            const staggeredFlow = createPacketFlow(src, dst, nextLinks);
            if (staggeredFlow) updated.push(staggeredFlow);
          }
        }
      }

      packetFlowsRef.current = updated;
      setPacketFlows(updated);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [selectedDestinations, selectedSources, topologyKey]);

  const updateMultiRoutes = (sources: string[], destinations: string[]) => {
    setSelectedSources(sources);
    setSelectedDestinations(destinations);
    setSourceCount(sources.length);
    setDestinationCount(destinations.length);

    const newFlows: PacketFlow[] = [];
    sources.forEach((src) => {
      destinations.forEach((dst) => {
        if (src && dst && src !== dst) {
          const flow = createPacketFlow(src, dst, activeLinks);
          if (flow) newFlows.push(flow);
        }
      });
    });
    if (newFlows.length === 0 && sources[0] && destinations[0]) {
      const flow = createPacketFlow(sources[0], destinations[0], activeLinks);
      if (flow) newFlows.push(flow);
    }
    packetFlowsRef.current = newFlows;
    setPacketFlows(newFlows);
  };

  const getNetworkStats = () => ({
    totalNodes: nodes.length,
    activeLinks: countPacketActiveLinks(links, packetFlows),
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
    selectedSources,
    selectedDestinations,
    sourceCount,
    destinationCount,
    updateMultiRoutes,
    getNetworkStats,
    hasCustomTopology,
    hasGeneratedTopology,
    activeMode,
    telemetryTick: tick,
  };
}
