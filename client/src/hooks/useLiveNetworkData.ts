import { useEffect, useState } from 'react';

export interface NetworkNode {
  id: string;
  label: string;
  type: 'switch' | 'host' | 'router';
  status: 'healthy' | 'warning' | 'critical';
  x: number;
  y: number;
  trafficLevel: number; // 0-100
}

export interface NetworkLink {
  source: string;
  target: string;
  bandwidth: number; // MB/s
  trafficLevel: number; // 0-100
  status: 'healthy' | 'warning' | 'critical';
}

export interface PortStat {
  node: string;
  port: number;
  rxRate: number; // MB/s
  txRate: number; // MB/s
  packetsRx: number;
  packetsTx: number;
  errors: number;
  congestion: number; // 0-100
}

export interface RerouteEvent {
  id: string;
  timestamp: Date;
  source: string;
  destination: string;
  reason: string;
  oldPath: string[];
  newPath: string[];
}

export interface PredictionData {
  timestamp: Date;
  predictedCongestion: number; // 0-100
  predictedPacketLoss: number; // 0-100
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface PacketFlow {
  id: string;
  source: string;
  destination: string;
  path: string[];
  progress: number; // 0-100
  startTime: number;
  duration: number;
}

const NODES: NetworkNode[] = [
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

const LINKS: NetworkLink[] = [
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

function generatePortStats(): PortStat[] {
  return NODES.map((node, idx) => ({
    node: node.label,
    port: Math.floor(Math.random() * 48) + 1,
    rxRate: Math.random() * 5,
    txRate: Math.random() * 5,
    packetsRx: Math.floor(Math.random() * 100000),
    packetsTx: Math.floor(Math.random() * 100000),
    errors: Math.random() < 0.1 ? Math.floor(Math.random() * 10) : 0,
    congestion: Math.random() * 80,
  }));
}

function generateRerouteEvent(): RerouteEvent {
  const sourceNode = NODES[Math.floor(Math.random() * NODES.length)];
  const destNode = NODES[Math.floor(Math.random() * NODES.length)];
  
  if (sourceNode.id === destNode.id) {
    return generateRerouteEvent();
  }

  const reasons = ['Link Failure', 'Congestion Detected', 'Maintenance Mode', 'Load Balancing'];
  return {
    id: `reroute-${Date.now()}`,
    timestamp: new Date(),
    source: sourceNode.label,
    destination: destNode.label,
    reason: reasons[Math.floor(Math.random() * reasons.length)],
    oldPath: [sourceNode.id, 'core', destNode.id],
    newPath: [sourceNode.id, 'router-1', 'router-2', destNode.id],
  };
}

function generatePredictionData(): PredictionData {
  const trends: Array<'increasing' | 'stable' | 'decreasing'> = ['increasing', 'stable', 'decreasing'];
  return {
    timestamp: new Date(),
    predictedCongestion: Math.random() * 60,
    predictedPacketLoss: Math.random() * 2,
    trend: trends[Math.floor(Math.random() * trends.length)],
  };
}

function findPath(source: string, destination: string): string[] {
  // Simple BFS pathfinding
  const visited = new Set<string>();
  const queue: Array<{ node: string; path: string[] }> = [{ node: source, path: [source] }];
  
  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    
    if (node === destination) {
      return path;
    }
    
    if (visited.has(node)) continue;
    visited.add(node);
    
    const neighbors = LINKS
      .filter(link => link.source === node || link.target === node)
      .map(link => (link.source === node ? link.target : link.source));
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push({ node: neighbor, path: [...path, neighbor] });
      }
    }
  }
  
  return [source, destination];
}

export function useLiveNetworkData() {
  const [nodes, setNodes] = useState<NetworkNode[]>(NODES);
  const [links, setLinks] = useState<NetworkLink[]>(LINKS);
  const [portStats, setPortStats] = useState<PortStat[]>(generatePortStats());
  const [rerouteEvents, setRerouteEvents] = useState<RerouteEvent[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [packetFlows, setPacketFlows] = useState<PacketFlow[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>('host-1');
  const [selectedDestination, setSelectedDestination] = useState<string>('host-3');

  // Update live data every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      // Update port statistics
      setPortStats(prev => 
        prev.map(stat => ({
          ...stat,
          rxRate: Math.max(0, stat.rxRate + (Math.random() - 0.5) * 2),
          txRate: Math.max(0, stat.txRate + (Math.random() - 0.5) * 2),
          packetsRx: stat.packetsRx + Math.floor(Math.random() * 1000),
          packetsTx: stat.packetsTx + Math.floor(Math.random() * 1000),
          errors: stat.errors + (Math.random() < 0.05 ? 1 : 0),
          congestion: Math.max(0, Math.min(100, stat.congestion + (Math.random() - 0.5) * 10)),
        }))
      );

      // Update node traffic levels
      setNodes(prev =>
        prev.map(node => ({
          ...node,
          trafficLevel: Math.max(0, Math.min(100, Math.random() * 80)),
          status: Math.random() > 0.95 ? 'warning' : Math.random() > 0.98 ? 'critical' : 'healthy',
        }))
      );

      // Update link traffic levels
      setLinks(prev =>
        prev.map(link => ({
          ...link,
          trafficLevel: Math.max(0, Math.min(100, Math.random() * 75)),
          status: Math.random() > 0.93 ? 'warning' : Math.random() > 0.97 ? 'critical' : 'healthy',
        }))
      );

      // Add occasional reroute events
      if (Math.random() < 0.1) {
        setRerouteEvents(prev => [generateRerouteEvent(), ...prev.slice(0, 9)]);
      }

      // Add prediction data
      if (Math.random() < 0.2) {
        setPredictions(prev => [generatePredictionData(), ...prev.slice(0, 19)]);
      }

      // Update packet flows
      setPacketFlows(prev => {
        const now = Date.now();
        const updated = prev
          .map(flow => ({
            ...flow,
            progress: Math.min(100, ((now - flow.startTime) / flow.duration) * 100),
          }))
          .filter(flow => flow.progress < 100);

        // Add new packet flows occasionally
        if (Math.random() < 0.3 && updated.length < 5) {
          const path = findPath(selectedSource, selectedDestination);
          updated.push({
            id: `packet-${Date.now()}`,
            source: selectedSource,
            destination: selectedDestination,
            path,
            progress: 0,
            startTime: now,
            duration: 2000 + Math.random() * 2000,
          });
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSource, selectedDestination]);

  const updateRoute = (source: string, destination: string) => {
    setSelectedSource(source);
    setSelectedDestination(destination);
    setPacketFlows([]);
  };

  const getNetworkStats = () => ({
    totalNodes: nodes.length,
    activeLinks: links.filter(l => l.status === 'healthy').length,
    congestedLinks: links.filter(l => l.status === 'warning' || l.status === 'critical').length,
    failedLinks: links.filter(l => l.status === 'critical').length,
    maxTraffic: Math.max(...links.map(l => l.trafficLevel)),
    avgTraffic: links.reduce((sum, l) => sum + l.trafficLevel, 0) / links.length,
    activeNodes: nodes.filter(n => n.status === 'healthy').length,
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
  };
}
