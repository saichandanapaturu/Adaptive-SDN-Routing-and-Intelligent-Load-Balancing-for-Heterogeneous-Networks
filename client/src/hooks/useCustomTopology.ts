import { useState } from 'react';
import { NetworkNode, NetworkLink } from './useLiveNetworkData';

export function useCustomTopology() {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [links, setLinks] = useState<NetworkLink[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const addNode = (label: string, x: number, y: number, type: 'switch' | 'host' | 'router' = 'switch') => {
    const newNode: NetworkNode = {
      id: `node-${Date.now()}`,
      label,
      type,
      status: 'healthy',
      x,
      y,
      trafficLevel: 0,
    };
    setNodes([...nodes, newNode]);
    return newNode.id;
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setLinks(links.filter(l => l.source !== nodeId && l.target !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };

  const updateNode = (nodeId: string, updates: Partial<NetworkNode>) => {
    setNodes(nodes.map(n => (n.id === nodeId ? { ...n, ...updates } : n)));
  };

  const addLink = (sourceId: string, targetId: string, bandwidth: number = 1) => {
    // Prevent duplicate links
    const linkExists = links.some(
      l => (l.source === sourceId && l.target === targetId) || 
           (l.source === targetId && l.target === sourceId)
    );
    
    if (linkExists || sourceId === targetId) return;

    const newLink: NetworkLink = {
      source: sourceId,
      target: targetId,
      bandwidth,
      trafficLevel: 0,
      status: 'healthy',
    };
    setLinks([...links, newLink]);
  };

  const deleteLink = (sourceId: string, targetId: string) => {
    setLinks(links.filter(l => !(l.source === sourceId && l.target === targetId)));
  };

  const clearTopology = () => {
    setNodes([]);
    setLinks([]);
    setSelectedNodeId(null);
  };

  const exportTopology = () => {
    return JSON.stringify({ nodes, links }, null, 2);
  };

  const importTopology = (jsonData: string) => {
    try {
      const { nodes: importedNodes, links: importedLinks } = JSON.parse(jsonData);
      setNodes(importedNodes);
      setLinks(importedLinks);
    } catch (error) {
      console.error('Failed to import topology:', error);
    }
  };

  return {
    nodes,
    links,
    selectedNodeId,
    setSelectedNodeId,
    addNode,
    deleteNode,
    updateNode,
    addLink,
    deleteLink,
    clearTopology,
    exportTopology,
    importTopology,
  };
}
