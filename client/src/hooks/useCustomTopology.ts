import { useState } from 'react';
import { useTopologyContext } from '@/contexts/TopologyContext';
import { NetworkNode, NetworkLink } from './useLiveNetworkData';

export function useCustomTopology() {
  const context = useTopologyContext();
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
    context.addCustomNode(newNode);
    return newNode.id;
  };

  const deleteNode = (nodeId: string) => {
    context.deleteCustomNode(nodeId);
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  };

  const updateNode = (nodeId: string, updates: Partial<NetworkNode>) => {
    const updated = context.customNodes.map(n => (n.id === nodeId ? { ...n, ...updates } : n));
    context.setCustomNodes(updated);
  };

  const addLink = (sourceId: string, targetId: string, bandwidth: number = 1) => {
    // Prevent duplicate links
    const linkExists = context.customLinks.some(
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
    context.addCustomLink(newLink);
  };

  const deleteLink = (sourceId: string, targetId: string) => {
    context.deleteCustomLink(sourceId, targetId);
  };

  const clearTopology = () => {
    context.clearCustomTopology();
    setSelectedNodeId(null);
  };

  const exportTopology = () => {
    return JSON.stringify({ nodes: context.customNodes, links: context.customLinks }, null, 2);
  };

  const importTopology = (jsonData: string): boolean => {
    try {
      const { nodes: importedNodes, links: importedLinks } = JSON.parse(jsonData);
      context.setCustomNodes(importedNodes);
      context.setCustomLinks(importedLinks);
      return true;
    } catch (error) {
      console.error('Failed to import topology:', error);
      return false;
    }
  };

  return {
    nodes: context.customNodes,
    links: context.customLinks,
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


