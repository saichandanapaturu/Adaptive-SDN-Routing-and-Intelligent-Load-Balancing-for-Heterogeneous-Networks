// Style: AIFE Live Operations — dense telemetry, dark canvas, emerald/cyan status accents, and motion that explains network state.
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTopologyContext } from '@/contexts/TopologyContext';
import {
  NetworkNode,
  NetworkLink,
  PortStat,
  RerouteEvent,
  PredictionData,
  PacketFlow,
} from './useLiveNetworkData';
import {
  fetchModelStatus,
  fetchTelemetrySnapshot,
  TelemetryDataStatus,
  TelemetryForwardedFlow,
  TelemetryModelStatus,
  TelemetrySwitch,
} from '@/lib/telemetryApi';
import { applyPeakHourSchedule } from '@/lib/peakHours';
import {
  findAvailablePath,
  linkEndpointNames,
  linkFailureTransitions,
  networkEdgeKey as edgeKey,
  pathContainsFailedLink,
  reconcilePacketFlowForFailures,
  snapshotLinkFailures,
} from '@/lib/networkRouting';
import { toast } from 'sonner';

export type DashboardTelemetryStatus = TelemetryDataStatus | 'connecting' | 'awaiting-statistics';

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

function openFlowPortStatsToDashboard(stats: import('@/lib/telemetryApi').TelemetryPort[]): PortStat[] {
  return stats.map(stat => ({
    node: `Switch-${stat.dpid}`,
    port: stat.port_no,
    rxRate: stat.rx_byte_rate / (1024 * 1024),
    txRate: stat.tx_byte_rate / (1024 * 1024),
    packetsRx: stat.rx_packets,
    packetsTx: stat.tx_packets,
    errors: stat.rx_errors + stat.tx_errors,
    // The OpenFlow collector does not classify congestion. NaN keeps the
    // existing table contract without presenting a fabricated percentage.
    congestion: Number.NaN,
  }));
}

function switchStatusForTelemetry(node: NetworkNode, switches: TelemetrySwitch[]): NetworkNode {
  if (node.type !== 'switch') return node;
  const switchNumber = Number(node.id.replace('switch-', ''));
  const connected = switches.some(item => item.dpid === switchNumber && item.status === 'connected');
  return { ...node, status: connected ? 'healthy' : 'warning', trafficLevel: 0 };
}

function statusForTraffic(trafficLevel: number): NetworkNode['status'] {
  if (trafficLevel >= 86) return 'critical';
  if (trafficLevel >= 68) return 'warning';
  return 'healthy';
}

function statusForLink(link: NetworkLink): NetworkLink {
  return link.status === 'failed'
    ? { ...link, trafficLevel: 0, status: 'failed' }
    : { ...link, status: statusForTraffic(link.trafficLevel) };
}

function portForNode(nodeId: string) {
  return (Array.from(nodeId).reduce((sum, character) => sum + character.charCodeAt(0), 0) % 48) + 1;
}

function pathEdgeKeys(path: string[]) {
  return path.slice(0, -1).map((node, index) => edgeKey(node, path[index + 1]));
}

function pathsEqual(first: string[], second: string[]) {
  return first.length === second.length && first.every((node, index) => node === second[index]);
}

function countPacketActiveLinks(links: NetworkLink[], packetFlows: PacketFlow[]) {
  const packetEdges = new Set(packetFlows
    .filter(flow => flow.status !== 'blocked')
    .flatMap(flow => pathEdgeKeys(flow.path)));
  return links.filter(link => link.status !== 'failed' && packetEdges.has(edgeKey(link.source, link.target))).length;
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
      const path = findAvailablePath(source.id, destination.id, links);
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

function createPacketFlow(source: string, destination: string, links: NetworkLink[]): PacketFlow {
  const path = findAvailablePath(source, destination, links);
  const now = Date.now();
  return {
    id: `packet-${now}-${Math.random().toString(36).slice(2, 7)}`,
    source,
    destination,
    path,
    progress: 0,
    startTime: now,
    duration: 1800 + Math.random() * 900,
    status: path.length > 1 ? 'active' : 'blocked',
    blockedReason: path.length > 1 ? undefined : 'No available route.',
  };
}

export function packetFlowProgress(flow: PacketFlow, now: number): number {
  return flow.duration > 0
    ? clamp(((now - flow.startTime) / flow.duration) * 100)
    : 100;
}

export function useLiveNetworkDataWithCustom() {
  const {
    customNodes,
    customLinks,
    generatedNodes,
    generatedLinks,
    isUsingCustom,
    isUsingGenerated,
    peakHours,
    simulatedMinute,
  } = useTopologyContext();
  const hasCustomTopology = customNodes.length > 0;
  const hasGeneratedTopology = generatedNodes.length > 0;
  const activeMode = isUsingGenerated && hasGeneratedTopology ? 'generated' : isUsingCustom && hasCustomTopology ? 'custom' : 'default';

  const activeNodes = useMemo(
    () => (activeMode === 'generated' ? generatedNodes : activeMode === 'custom' ? customNodes : []),
    [activeMode, customNodes, generatedNodes],
  );

  const activeNodeIds = useMemo(() => new Set(activeNodes.map(node => node.id)), [activeNodes]);
  const activeLinks = useMemo(
    () => {
      const sourceLinks = activeMode === 'generated' ? generatedLinks : activeMode === 'custom' ? customLinks : [];
      return sourceLinks.filter(link => activeNodeIds.has(link.source) && activeNodeIds.has(link.target));
    },
    [activeMode, activeNodeIds, customLinks, generatedLinks],
  );

  const topologyKey = useMemo(
    () => `${activeMode}:${activeNodes.map(node => `${node.id}@${node.x},${node.y}`).join('|')}:${activeLinks.map(link => `${link.source}-${link.target}:${link.bandwidth}`).join('|')}`,
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
  const [telemetryStatus, setTelemetryStatus] = useState<DashboardTelemetryStatus>('connecting');
  const [connectedSwitches, setConnectedSwitches] = useState<TelemetrySwitch[]>([]);
  const [controllerFlows, setControllerFlows] = useState<TelemetryForwardedFlow[]>([]);
  const [modelStatus, setModelStatus] = useState<TelemetryModelStatus | null>(null);
  const [lastTelemetryUpdate, setLastTelemetryUpdate] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const failedEdgesRef = useRef<Set<string>>(new Set());
  const failureTopologyRef = useRef<string>('');
  const nodesRef = useRef(nodes);
  const linksRef = useRef(links);
  const baseLinksRef = useRef(activeLinks);
  const peakHoursRef = useRef(peakHours);
  const simulatedMinuteRef = useRef(simulatedMinute);
  const packetFlowsRef = useRef<PacketFlow[]>([]);
  const predictionsRef = useRef<PredictionData[]>([buildPrediction(activeLinks)]);
  const tickRef = useRef(0);
  const sourceLinkStatusesRef = useRef(new Map(activeLinks.map(link => [
    edgeKey(link.source, link.target),
    link.status,
  ])));
  const failureSnapshotRef = useRef(snapshotLinkFailures([]));
  const seenControllerEventsRef = useRef(new Set<string>());

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    linksRef.current = links;
  }, [links]);

  useEffect(() => {
    peakHoursRef.current = peakHours;
    simulatedMinuteRef.current = simulatedMinute;
  }, [peakHours, simulatedMinute]);

  useEffect(() => {
    baseLinksRef.current = activeLinks.map(link => ({ ...link, trafficLevel: 0, status: link.status }));
    setNodes(activeNodes.map(node => ({
      ...node,
      trafficLevel: 0,
      status: activeMode === 'default' && node.type === 'switch' ? 'warning' : 'healthy',
    })));
    setLinks(activeLinks.map(link => ({ ...link, trafficLevel: 0, status: link.status })));
    setPortStats(activeMode === 'default' ? [] : buildPortStats(activeNodes, activeLinks));
    setRerouteEvents([]);
    const resetPredictions = activeMode === 'default' ? [] : [buildPrediction(activeLinks)];
    predictionsRef.current = resetPredictions;
    setPredictions(resetPredictions);
    packetFlowsRef.current = [];
    setPacketFlows([]);
    setSelectedSources([]);
    setSelectedDestinations([]);
    setSourceCount(0);
    setDestinationCount(0);
    setTelemetryStatus(activeMode === 'default' ? 'connecting' : 'unavailable');
    setConnectedSwitches([]);
    setControllerFlows([]);
    setModelStatus(null);
    setLastTelemetryUpdate(null);
    tickRef.current = 0;
    setTick(0);
  }, [topologyKey]);

  useLayoutEffect(() => {
    const nextStatuses = new Map(activeLinks.map(link => [
      edgeKey(link.source, link.target),
      link.status,
    ]));
    const changedStatuses = new Map<string, NetworkLink['status']>();
    activeLinks.forEach(link => {
      const key = edgeKey(link.source, link.target);
      const previousStatus = sourceLinkStatusesRef.current.get(key);
      if (previousStatus !== undefined && previousStatus !== link.status) {
        changedStatuses.set(key, link.status);
      }
    });
    sourceLinkStatusesRef.current = nextStatuses;

    if (changedStatuses.size === 0) return;
    baseLinksRef.current = baseLinksRef.current.map(link => {
      const status = changedStatuses.get(edgeKey(link.source, link.target));
      return status
        ? { ...link, status, trafficLevel: status === 'failed' ? 0 : link.trafficLevel }
        : link;
    });
    const updatedLinks = linksRef.current.map(link => {
      const status = changedStatuses.get(edgeKey(link.source, link.target));
      return status
        ? { ...link, status, trafficLevel: status === 'failed' ? 0 : link.trafficLevel }
        : link;
    });
    linksRef.current = updatedLinks;
    setLinks(updatedLinks);
  }, [activeLinks]);

  useEffect(() => {
    const transitions = linkFailureTransitions(failureSnapshotRef.current, links);
    failureSnapshotRef.current = transitions.snapshot;
    if (activeMode === 'default') return;
    transitions.failed.forEach(link => {
      toast.error('Link marked failed', {
        description: `${linkEndpointNames(link, nodes)} is unavailable in the active topology.`,
      });
    });
    transitions.restored.forEach(link => {
      toast.success('Link restored', {
        description: `${linkEndpointNames(link, nodes)} is available for simulated routing.`,
      });
    });
  }, [activeMode, links, nodes]);

  useEffect(() => {
    if (activeMode === 'default') return;
    const scheduledLinks = applyPeakHourSchedule(
      baseLinksRef.current,
      peakHoursRef.current,
      simulatedMinuteRef.current,
      true,
    ).map(statusForLink);
    linksRef.current = scheduledLinks;
    setLinks(scheduledLinks);

    const scheduledNodes = activeNodes.map(node => {
      const incident = scheduledLinks.filter(link => link.source === node.id || link.target === node.id);
      const trafficLevel = incident.length > 0
        ? incident.reduce((sum, link) => sum + link.trafficLevel, 0) / incident.length
        : 0;
      return { ...node, trafficLevel, status: statusForTraffic(trafficLevel) };
    });
    nodesRef.current = scheduledNodes;
    setNodes(scheduledNodes);
  }, [activeMode, activeNodes, peakHours, simulatedMinute, topologyKey]);

  useEffect(() => {
    if (activeMode !== 'default') return;
    let cancelled = false;
    let inFlight = false;

    const poll = async () => {
      if (cancelled || inFlight) return;
      inFlight = true;
      try {
        const snapshot = await fetchTelemetrySnapshot();
        // The model endpoint is optional: an older controller without it
        // leaves the prediction cards in their unavailable state.
        const model = await fetchModelStatus().catch(() => null);
        if (cancelled) return;
        setModelStatus(model);
        setConnectedSwitches(snapshot.switches);
        setControllerFlows(snapshot.flows);
        setTelemetryStatus(
          snapshot.health.statistics_received
            ? snapshot.health.data_status
            : snapshot.health.controller_connected
              ? 'awaiting-statistics'
              : 'unavailable',
        );
        setLastTelemetryUpdate(snapshot.summary?.last_statistics_update ?? null);
        setPortStats(openFlowPortStatsToDashboard(snapshot.ports));
        const detectedNodes: NetworkNode[] = snapshot.topology.nodes.map(node => ({
          ...node,
          type: node.type,
          status: node.status === 'healthy' ? 'healthy' : 'warning',
        }));
        const detectedLinks: NetworkLink[] = snapshot.topology.links.map(link => ({
          ...link,
          status: link.status,
        }));
        setNodes(detectedNodes.map(node => switchStatusForTelemetry(node, snapshot.switches)));
        baseLinksRef.current = detectedLinks;
        linksRef.current = detectedLinks;
        setLinks(detectedLinks);
        const newEvents = snapshot.events.filter(event => !seenControllerEventsRef.current.has(event.id));
        newEvents.forEach(event => seenControllerEventsRef.current.add(event.id));
        newEvents.forEach(event => {
          if (event.type === 'link_failed') {
            const failedLabel = `${String(event.source)}–${String(event.target)}`;
            toast.error(`Link ${failedLabel} failed`, {
              description: 'Controller detected the failure; forwarding rules are being updated.',
              id: event.id,
            });
          } else if (event.type === 'link_recovered') {
            toast.success(`Link ${String(event.source)}–${String(event.target)} recovered`, {
              description: 'Both endpoint ports were verified operational by the controller.',
              id: event.id,
            });
          } else if (event.type === 'flow_rerouted') {
            const oldPath = Array.isArray(event.old_path) ? event.old_path.join('–') : '';
            const newPath = Array.isArray(event.new_path) ? event.new_path.join('–') : '';
            const failedLink = typeof event.failed_link === 'string' ? event.failed_link : 'failed link';
            toast.success(`Link ${failedLink} failed. Traffic rerouted through ${newPath}.`, {
              description: oldPath ? `Previous route: ${oldPath}` : 'Controller installed the replacement route.',
              id: event.id,
            });
            setRerouteEvents(previous => [{
              id: event.id,
              timestamp: new Date(event.timestamp),
              source: String(event.source),
              destination: String(event.destination),
              reason: 'Link Failure',
              oldPath: Array.isArray(event.old_path) ? event.old_path.map(String) : [],
              newPath: Array.isArray(event.new_path) ? event.new_path.map(String) : [],
            }, ...previous].slice(0, 12));
          } else if (event.type === 'flow_blocked') {
            toast.error('Link failed. No alternative path available; traffic blocked.', { id: event.id });
          }
        });
      } catch {
        if (!cancelled) {
          setTelemetryStatus('unavailable');
          setConnectedSwitches([]);
          setLastTelemetryUpdate(null);
          setPortStats([]);
          setControllerFlows([]);
          setModelStatus(null);
        }
      } finally {
        inFlight = false;
      }
    };

    void poll();
    const interval = window.setInterval(() => { void poll(); }, 2000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [activeMode]);

  useEffect(() => {
    if (activeMode === 'default') return;
    const interval = window.setInterval(() => {
      const currentNodes = nodesRef.current;
      const currentLinks = baseLinksRef.current;
      const activeRouteEdges = new Set(packetFlowsRef.current
        .filter(flow => flow.status !== 'blocked' && !pathContainsFailedLink(flow.path, currentLinks))
        .flatMap(flow => pathEdgeKeys(flow.path)));
      const forecastHotspot = tickRef.current % 8 >= 5;
      const nextBaseLinks = currentLinks.map(link => {
        if (link.status === 'failed') return { ...link, trafficLevel: 0 };
        const drift = (Math.random() - 0.5) * 18;
        const burst = Math.random() < 0.18 ? 24 : 0;
        const predictedRouteBurst = forecastHotspot && activeRouteEdges.has(edgeKey(link.source, link.target)) ? 84 : 0;
        const trafficLevel = clamp(link.trafficLevel * 0.58 + drift + burst + predictedRouteBurst);
        return { ...link, trafficLevel, status: statusForTraffic(trafficLevel) };
      });
      baseLinksRef.current = nextBaseLinks;
      const nextLinks = applyPeakHourSchedule(
        nextBaseLinks,
        peakHoursRef.current,
        simulatedMinuteRef.current,
        true,
      ).map(statusForLink);
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
          const reconciledFlow = reconcilePacketFlowForFailures(flow, nextLinks, now);
          if (reconciledFlow.status === 'blocked') return reconciledFlow;
          if (reconciledFlow.path !== flow.path && !pathsEqual(reconciledFlow.path, flow.path)) {
            reroutes.push(rerouteEventForFlow(flow, reconciledFlow.path, nextNodes, 'Link Failure'));
          }
          const currentFlow = reconciledFlow;
          const progress = packetFlowProgress(currentFlow, now);
          if (progress >= 100) return null;

          const currentEdges = pathEdgeKeys(currentFlow.path);
          const routeHasPressure = currentEdges.some(key => {
            const link = linkByEdge.get(key);
            return Boolean(link && (link.trafficLevel >= 68 || link.status !== 'healthy'));
          });
          const shouldReroute = routeHasPressure || (predictionPressure && currentEdges.some(key => {
            const link = linkByEdge.get(key);
            return Boolean(link && link.trafficLevel >= 52);
          }));

          if (shouldReroute) {
            const alternatePath = findAvailablePath(currentFlow.source, currentFlow.destination, nextLinks, new Set(currentEdges), true);
            if (alternatePath.length > 1 && !pathsEqual(alternatePath, currentFlow.path)) {
              reroutes.push(rerouteEventForFlow(
                currentFlow,
                alternatePath,
                nextNodes,
                predictionPressure ? 'Load Balancing' : 'Congestion Detected',
              ));
              return {
                ...currentFlow,
                path: alternatePath,
                progress: 0,
                startTime: now,
                status: 'active',
              };
            }
          }

          return { ...currentFlow, progress };
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
  }, [activeMode, selectedDestinations, selectedSources, topologyKey]);

  const updateMultiRoutes = (sources: string[], destinations: string[]) => {
    setSelectedSources(sources);
    setSelectedDestinations(destinations);
    setSourceCount(sources.length);
    setDestinationCount(destinations.length);

    if (activeMode === 'default') {
      packetFlowsRef.current = [];
      setPacketFlows([]);
      return;
    }

    const newFlows: PacketFlow[] = [];
    sources.forEach((src) => {
      destinations.forEach((dst) => {
        if (src && dst && src !== dst) {
          const flow = createPacketFlow(src, dst, activeLinks);
          if (flow) newFlows.push(flow);
        }
      });
    });
    if (newFlows.length === 0 && sources[0] && destinations[0] && sources[0] !== destinations[0]) {
      newFlows.push(createPacketFlow(sources[0], destinations[0], linksRef.current));
    }
    packetFlowsRef.current = newFlows;
    setPacketFlows(newFlows);
  };

  const getNetworkStats = () => ({
    totalNodes: nodes.length,
    activeLinks: activeMode === 'default'
      ? new Set(controllerFlows.filter(flow => flow.status === 'active').flatMap(flow =>
        flow.path.slice(0, -1).map((dpid, index) => edgeKey(`switch-${dpid}`, `switch-${flow.path[index + 1]}`)),
      )).size
      : countPacketActiveLinks(links, packetFlows),
    congestedLinks: activeMode === 'default' ? 0 : links.filter(link => link.status === 'warning' || link.status === 'critical').length,
    failedLinks: links.filter(link => link.status === 'failed').length,
    maxTraffic: Math.max(...links.map(link => link.trafficLevel), 0),
    avgTraffic: links.length > 0 ? links.reduce((sum, link) => sum + link.trafficLevel, 0) / links.length : 0,
    activeNodes: activeMode === 'default' ? connectedSwitches.length : nodes.filter(node => node.status === 'healthy').length,
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
    telemetryStatus,
    connectedSwitches,
    controllerFlows,
    modelStatus,
    lastTelemetryUpdate,
  };
}
