import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { NetworkNode, NetworkLink } from '@/hooks/useLiveNetworkData';

interface TopologyContextType {
  customNodes: NetworkNode[];
  customLinks: NetworkLink[];
  generatedNodes: NetworkNode[];
  generatedLinks: NetworkLink[];
  isUsingCustom: boolean;
  isUsingGenerated: boolean;
  setCustomNodes: (nodes: NetworkNode[]) => void;
  setCustomLinks: (links: NetworkLink[]) => void;
  setGeneratedNodes: (nodes: NetworkNode[]) => void;
  setGeneratedLinks: (links: NetworkLink[]) => void;
  setIsUsingCustom: (value: boolean) => void;
  setIsUsingGenerated: (value: boolean) => void;
  addCustomNode: (node: NetworkNode) => void;
  deleteCustomNode: (nodeId: string) => void;
  addCustomLink: (link: NetworkLink) => void;
  deleteCustomLink: (sourceId: string, targetId: string) => void;
  clearCustomTopology: () => void;
}

const TopologyContext = createContext<TopologyContextType | undefined>(undefined);

const STORAGE_KEY_NODES = 'aife-custom-nodes';
const STORAGE_KEY_LINKS = 'aife-custom-links';
const STORAGE_KEY_MODE = 'aife-using-custom';
const STORAGE_KEY_GENERATED_NODES = 'nexus-generated-nodes';
const STORAGE_KEY_GENERATED_LINKS = 'nexus-generated-links';
const STORAGE_KEY_GENERATED_MODE = 'nexus-using-generated';

export function TopologyProvider({ children }: { children: ReactNode }) {
  const [customNodes, setCustomNodesState] = useState<NetworkNode[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_NODES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [customLinks, setCustomLinksState] = useState<NetworkLink[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LINKS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [generatedNodes, setGeneratedNodesState] = useState<NetworkNode[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GENERATED_NODES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [generatedLinks, setGeneratedLinksState] = useState<NetworkLink[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GENERATED_LINKS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isUsingCustom, setIsUsingCustomState] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MODE);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  const [isUsingGenerated, setIsUsingGeneratedState] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GENERATED_MODE);
      return stored ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  // Persist nodes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_NODES, JSON.stringify(customNodes));
    }
  }, [customNodes]);

  // Persist links to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(customLinks));
    }
  }, [customLinks]);

  // Persist mode to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_MODE, JSON.stringify(isUsingCustom));
    }
  }, [isUsingCustom]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_GENERATED_NODES, JSON.stringify(generatedNodes));
    }
  }, [generatedNodes]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_GENERATED_LINKS, JSON.stringify(generatedLinks));
    }
  }, [generatedLinks]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_GENERATED_MODE, JSON.stringify(isUsingGenerated));
    }
  }, [isUsingGenerated]);

  const setCustomNodes = (nodes: NetworkNode[]) => {
    setCustomNodesState(nodes);
  };

  const setCustomLinks = (links: NetworkLink[]) => {
    setCustomLinksState(links);
  };

  const setGeneratedNodes = (nodes: NetworkNode[]) => {
    setGeneratedNodesState(nodes);
  };

  const setGeneratedLinks = (links: NetworkLink[]) => {
    setGeneratedLinksState(links);
  };

  const setIsUsingCustom = (value: boolean) => {
    setIsUsingCustomState(value);
    setIsUsingGeneratedState(false);
  };

  const setIsUsingGenerated = (value: boolean) => {
    setIsUsingGeneratedState(value);
    if (value) setIsUsingCustomState(false);
  };

  const addCustomNode = (node: NetworkNode) => {
    setCustomNodesState(prev => [...prev, node]);
  };

  const deleteCustomNode = (nodeId: string) => {
    setCustomNodesState(prev => prev.filter(n => n.id !== nodeId));
    setCustomLinksState(prev => prev.filter(l => l.source !== nodeId && l.target !== nodeId));
  };

  const addCustomLink = (link: NetworkLink) => {
    setCustomLinksState(prev => [...prev, link]);
  };

  const deleteCustomLink = (sourceId: string, targetId: string) => {
    setCustomLinksState(prev => prev.filter(l => !(l.source === sourceId && l.target === targetId)));
  };

  const clearCustomTopology = () => {
    setCustomNodesState([]);
    setCustomLinksState([]);
  };

  return (
    <TopologyContext.Provider
      value={{
        customNodes,
        customLinks,
        generatedNodes,
        generatedLinks,
        isUsingCustom,
        isUsingGenerated,
        setCustomNodes,
        setCustomLinks,
        setGeneratedNodes,
        setGeneratedLinks,
        setIsUsingCustom,
        setIsUsingGenerated,
        addCustomNode,
        deleteCustomNode,
        addCustomLink,
        deleteCustomLink,
        clearCustomTopology,
      }}
    >
      {children}
    </TopologyContext.Provider>
  );
}

export function useTopologyContext() {
  const context = useContext(TopologyContext);
  if (!context) {
    throw new Error('useTopologyContext must be used within TopologyProvider');
  }
  return context;
}
