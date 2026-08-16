import React, { useEffect, useMemo, useState } from 'react';
import { useLiveNetworkDataWithCustom } from '@/hooks/useLiveNetworkDataWithCustom';
import { useTopologyContext } from '@/contexts/TopologyContext';
import { ImprovedNetworkTopology } from '@/components/ImprovedNetworkTopology';
import { CustomTopologyBuilder } from '@/components/CustomTopologyBuilder';
import { NetworkGenerator } from '@/components/NetworkGenerator';
import { PortStatistics } from '@/components/PortStatistics';
import { RerouteLog } from '@/components/RerouteLog';
import { PredictionPanel } from '@/components/PredictionPanel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';
import { Activity, AlertTriangle, BarChart3, Boxes, BrainCircuit, CircleDot, GitBranch, Network, PanelLeft, ScrollText, Search, Waypoints, XCircle, Zap, type LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: (context: { activeTab: string; isUsingGenerated: boolean }) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'monitor', label: 'Monitor', icon: Activity, isActive: ({ activeTab }) => activeTab === 'monitor' },
  { id: 'statistics', label: 'Statistics', icon: BarChart3, isActive: ({ activeTab }) => activeTab === 'statistics' },
  { id: 'prediction', label: 'Prediction', icon: BrainCircuit, isActive: ({ activeTab }) => activeTab === 'prediction' },
  { id: 'reroute', label: 'Reroute Log', icon: ScrollText, isActive: ({ activeTab }) => activeTab === 'reroute' },
  { id: 'generator', label: 'Network Generator', icon: Boxes, isActive: ({ activeTab, isUsingGenerated }) => activeTab === 'generator' || isUsingGenerated },
];

interface TopologyMode {
  id: 'dashboard' | 'custom';
  label: string;
  icon: LucideIcon;
  isActive: (context: { isUsingCustom: boolean; isUsingGenerated: boolean }) => boolean;
}

const TOPOLOGY_MODES: TopologyMode[] = [
  { id: 'dashboard', label: 'Dashboard Topology', icon: Network, isActive: ({ isUsingCustom, isUsingGenerated }) => !isUsingCustom && !isUsingGenerated },
  { id: 'custom', label: 'Custom Topology', icon: GitBranch, isActive: ({ isUsingCustom }) => isUsingCustom },
];

export default function Home() {
  const {
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
    telemetryTick,
  } = useLiveNetworkDataWithCustom();

  const { isUsingCustom, isUsingGenerated, setIsUsingCustom } = useTopologyContext();

  const stats = getNetworkStats();
  const [activeTab, setActiveTab] = useState('monitor');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const hostNodes = useMemo(() => nodes.filter(node => node.type === 'host'), [nodes]);
  const maxPairs = useMemo(() => Math.max(1, Math.floor(hostNodes.length / 2)), [hostNodes]);

  const requiredDestCount = useMemo(() => Math.max(1, Math.floor(hostNodes.length / 2)), [hostNodes]);

  const handleSourceSelectChange = (nodeId: string) => {
    const nextSources = Array.from(new Set([...selectedSources, nodeId]));
    updateMultiRoutes(nextSources, selectedDestinations);
  };

  const handleRemoveSource = (nodeId: string) => {
    const nextSources = selectedSources.filter(id => id !== nodeId);
    updateMultiRoutes(nextSources.length > 0 ? nextSources : [nodes[0]?.id ?? ''], selectedDestinations);
  };

  const handleDestinationSelectChange = (nodeId: string) => {
    // Keep exactly requiredDestCount destinations
    const currentWithout = selectedDestinations.filter(id => id !== nodeId);
    const nextDests = [nodeId, ...currentWithout].slice(0, requiredDestCount);
    updateMultiRoutes(selectedSources, nextDests);
  };

  const handleNodeSelect = (nodeId: string) => {
    if (selectedSources.includes(nodeId)) {
      handleDestinationSelectChange(nodeId);
    } else {
      handleSourceSelectChange(nodeId);
    }
  };

  const handleTopologyModeSelect = (mode: TopologyMode['id']) => {
    setActiveTab('monitor');
    setIsUsingCustom(mode === 'custom');
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const jumpToTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsCommandOpen(false);
  };

  const jumpToNode = (nodeId: string) => {
    updateMultiRoutes([nodeId], selectedDestinations);
    setActiveTab('monitor');
    setIsCommandOpen(false);
  };

  const navContext = useMemo(() => ({ activeTab, isUsingGenerated }), [activeTab, isUsingGenerated]);
  const topologyContext = useMemo(() => ({ isUsingCustom, isUsingGenerated }), [isUsingCustom, isUsingGenerated]);

  return (
    <div className="isolate min-h-screen bg-[#080b12] text-slate-100">
      {/* Ambient glow — gives the glass panels something colorful to blur over.
          `isolate` on the root wrapper is required: without it, this div's own
          opaque bg paints on top of a -z-10 fixed child (negative z-index
          descendants paint before non-positioned ancestor backgrounds when
          there's no local stacking context), hiding the glow entirely. */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-48 -left-32 h-[600px] w-[600px] rounded-full bg-cyan-500/40 blur-[120px]" />
        <div className="absolute top-1/4 -right-40 h-[560px] w-[560px] rounded-full bg-emerald-500/30 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-violet-500/25 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[420px] w-[420px] rounded-full bg-amber-500/15 blur-[120px]" />
      </div>

      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen} title="Nexus Command Palette" description="Jump to a section or select a node">
        <CommandInput placeholder="Search sections or nodes…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Sections">
            {NAV_ITEMS.map((item) => (
              <CommandItem key={item.id} value={item.label} onSelect={() => jumpToTab(item.id)}>
                <item.icon className="text-cyan-400" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Nodes">
            {nodes.map((node) => (
              <CommandItem key={node.id} value={node.label} onSelect={() => jumpToNode(node.id)}>
                <Waypoints className="text-emerald-400" />
                <span>{node.label}</span>
                <CommandShortcut>{node.type}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {isSidebarExpanded && <button type="button" className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarExpanded(false)} aria-label="Close navigation menu" />}
      <aside className={`glass-strong fixed inset-y-0 left-0 z-50 flex-col border-r border-cyan-500/15 bg-[#0b1018]/60 text-slate-200 backdrop-blur-2xl transition-[width] duration-200 ${isSidebarExpanded ? 'flex w-72' : 'hidden w-[92px] lg:flex'}`}>
        <div className={`flex min-h-[86px] items-center border-b border-cyan-500/15 ${isSidebarExpanded ? 'justify-between px-4' : 'justify-center px-2'}`}>
          <button type="button" onClick={() => setIsSidebarExpanded((open) => !open)} className="group flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-cyan-400/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70" aria-label={isSidebarExpanded ? 'Collapse Nexus navigation menu' : 'Expand Nexus navigation menu'} aria-expanded={isSidebarExpanded}>
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/60 bg-cyan-400/[0.08] text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.12)] transition group-hover:border-cyan-200">
              <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]" aria-hidden="true" />
              <svg viewBox="0 0 48 48" className="absolute h-8 w-8 opacity-0" role="img" aria-label="Nexus mark">
                <path d="M24 8 10 34h28L24 8Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="24" cy="8" r="3.2" fill="currentColor" />
                <circle cx="10" cy="34" r="3.2" fill="currentColor" />
                <circle cx="38" cy="34" r="3.2" fill="currentColor" />
              </svg>
            </span>
            {isSidebarExpanded && <span className="text-left"><span className="block font-mono text-lg font-semibold tracking-tight text-white">NEXUS</span><span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">Control plane</span></span>}
          </button>
          {isSidebarExpanded && (
            <div className="flex items-center gap-1 text-slate-400">
              <button type="button" onClick={() => setIsCommandOpen(true)} className="rounded-lg p-2 transition hover:bg-white/[0.06] hover:text-white" aria-label="Search nodes and sections (Ctrl+K)" title="Search (Ctrl+K)">
                <Search className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setIsSidebarExpanded(false)} className="rounded-lg p-2 transition hover:bg-white/[0.06] hover:text-white" aria-label="Collapse sidebar">
                <PanelLeft className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <nav className={`flex-1 overflow-y-auto py-5 ${isSidebarExpanded ? 'px-3' : 'px-2'}`} aria-label="Dashboard navigation">
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(navContext);
              return (
                <button key={item.id} type="button" onClick={() => setActiveTab(item.id)} title={item.label} className={`group flex w-full items-center gap-3 rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${active ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}>
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${active ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.14)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}>
                    <item.icon className="h-4 w-4" />
                  </span>
                  {isSidebarExpanded && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>

          {isSidebarExpanded && <div className="mt-9 px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-slate-600">Topology</div>}
          <div className="mt-3 space-y-2">
            {TOPOLOGY_MODES.map((mode) => {
              const active = mode.isActive(topologyContext);
              return (
                <button key={mode.id} type="button" onClick={() => handleTopologyModeSelect(mode.id)} title={mode.label} className={`group flex w-full items-center gap-3 rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${active ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}>
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${active ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.14)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}>
                    <mode.icon className="h-4 w-4" />
                  </span>
                  {isSidebarExpanded && <span>{mode.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        <button type="button" onClick={() => setIsSidebarExpanded((open) => !open)} className={`border-t border-cyan-500/15 py-5 text-cyan-300 transition hover:bg-cyan-400/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-4 text-left' : 'px-2 text-center'}`} aria-label="Toggle navigation menu">
          <span className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em]"><CircleDot className="h-3.5 w-3.5" />{isSidebarExpanded && <span>Live telemetry</span>}</span>
        </button>
      </aside>

      {/* Header */}
      <header className={`glass sticky top-0 z-40 border-b border-white/[0.06] bg-slate-900/40 backdrop-blur-xl transition-[margin] duration-200 ${isSidebarExpanded ? 'lg:ml-72' : 'lg:ml-[92px]'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setIsSidebarExpanded((open) => !open)} className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.16)] transition hover:border-cyan-300/70 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70" aria-label="Toggle Nexus navigation menu" aria-expanded={isSidebarExpanded}>
                <svg viewBox="0 0 48 48" className="h-8 w-8" role="img" aria-hidden="true">
                  <path d="M24 8 10 34h28L24 8Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="24" cy="8" r="3.2" fill="currentColor" />
                  <circle cx="10" cy="34" r="3.2" fill="currentColor" />
                  <circle cx="38" cy="34" r="3.2" fill="currentColor" />
                </svg>
              </button>
              <div>
                <h1 className="font-mono text-2xl font-semibold tracking-tight text-white">
                  NEXUS <span className="text-emerald-400">/</span> Dashboard
                </h1>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
                  Network Operations Center · Intelligent Flow Engine
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCommandOpen(true)}
                className="hidden items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-800/50 px-3 py-1.5 text-slate-400 transition hover:border-slate-600 hover:text-slate-200 sm:flex"
                aria-label="Search nodes and sections"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="text-xs">Search</span>
                <kbd className="ml-1 rounded-md border border-slate-700 bg-slate-900 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">⌘K</kbd>
              </button>
              <div className="flex items-center gap-2 text-right">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">Live</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Telemetry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className={`max-w-none px-4 py-6 space-y-8 transition-[margin] duration-200 sm:px-6 lg:px-8 lg:py-8 ${isSidebarExpanded ? 'lg:ml-72' : 'lg:ml-[92px]'}`}>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 p-4 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-1.5">Total Nodes</p>
                <p className="font-mono text-3xl font-semibold text-slate-100">{stats.totalNodes}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <Activity className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-xs text-slate-500">network devices</div>
          </Card>

          <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 p-4 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-1.5">Active Links</p>
                <p className="font-mono text-3xl font-semibold text-slate-100">{stats.activeLinks}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                <Zap className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-xs text-slate-500">carrying live traffic</div>
          </Card>

          <Card className="glass rounded-2xl border-amber-500/25 bg-slate-900/30 p-4 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-1.5">Congested Links</p>
                <p className="font-mono text-3xl font-semibold text-amber-400">{stats.congestedLinks}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400">
                <AlertTriangle className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-xs text-slate-500">above utilization threshold</div>
          </Card>

          <Card className="glass rounded-2xl border-red-500/25 bg-slate-900/30 p-4 backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 mb-1.5">Failed Links</p>
                <p className="font-mono text-3xl font-semibold text-red-400">{stats.failedLinks}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 text-red-400">
                <XCircle className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-xs text-slate-500">requires attention</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-start">
            <TabsList className="glass flex w-full flex-row gap-1 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/30 p-1 backdrop-blur-xl lg:hidden">
              {NAV_ITEMS.map((item) => (
                <TabsTrigger key={item.id} value={item.id} className="justify-start gap-1.5 text-left data-[state=active]:bg-cyan-400/[0.14] data-[state=active]:text-cyan-200">
                  <item.icon className="h-3.5 w-3.5" /> {item.label}
                </TabsTrigger>
              ))}
            </TabsList>

          {/* Monitor Tab */}
          <TabsContent value="monitor" className="mt-0 min-w-0 flex-1 space-y-6">
            {/* Dashboard/Custom Topology Mode */}
            {!isUsingCustom ? (
              <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {activeMode === 'generated' ? 'Generated Network Topology' : hasCustomTopology ? 'Live Custom Network Topology' : 'Network Topology'}
                      </CardTitle>
                      <CardDescription>
                        {activeMode === 'generated'
                          ? 'Live telemetry is driven by the network generated from your device counts.'
                          : hasCustomTopology
                            ? 'Dashboard telemetry is driven by your saved custom nodes and links.'
                            : 'Real-time network visualization with packet flow'}
                      </CardDescription>
                    </div>
                    <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      {activeMode === 'generated' ? `GENERATED LIVE · TICK ${telemetryTick}` : hasCustomTopology ? `CUSTOM LIVE · TICK ${telemetryTick}` : 'DEFAULT LIVE'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Multi-Source & Multi-Destination Dropdown Configuration */}
                  <div className="space-y-4 rounded-xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">Multi-Path Parallel Packet Flow</p>
                        <p className="text-xs text-slate-400">Select any number of sources and exactly {requiredDestCount} destinations (hosts / 2) for concurrent traffic and path switching.</p>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
                        <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-cyan-200">{selectedSources.length} Sources Active</span>
                        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-200">{selectedDestinations.length} / {requiredDestCount} Destinations</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.7)]" />
                          Add Source Node
                        </label>
                        <Select onValueChange={handleSourceSelectChange}>
                          <SelectTrigger className="border-white/10 bg-slate-800/50 backdrop-blur-md">
                            <SelectValue placeholder="Select source node to add..." />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/10 bg-slate-900/80 backdrop-blur-xl">
                            {nodes.map(node => (
                              <SelectItem key={node.id} value={node.id}>
                                {node.label} {selectedSources.includes(node.id) ? '✓ (Active)' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {selectedSources.map(id => {
                            const node = nodes.find(n => n.id === id);
                            return node ? (
                              <span key={id} className="inline-flex items-center gap-1.5 rounded border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] text-cyan-200">
                                {node.label}
                                {selectedSources.length > 1 && (
                                  <button type="button" onClick={() => handleRemoveSource(id)} className="text-cyan-400 hover:text-cyan-200">×</button>
                                )}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.7)]" />
                          Select Destination Nodes (Required: {requiredDestCount})
                        </label>
                        <Select onValueChange={handleDestinationSelectChange}>
                          <SelectTrigger className="border-white/10 bg-slate-800/50 backdrop-blur-md">
                            <SelectValue placeholder="Select destination node..." />
                          </SelectTrigger>
                          <SelectContent className="glass border-white/10 bg-slate-900/80 backdrop-blur-xl">
                            {nodes.map(node => (
                              <SelectItem key={node.id} value={node.id}>
                                {node.label} {selectedDestinations.includes(node.id) ? '★ (Selected)' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {selectedDestinations.map(id => {
                            const node = nodes.find(n => n.id === id);
                            return node ? (
                              <span key={id} className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-200">
                                ★ {node.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Topology Canvas */}
                  <ImprovedNetworkTopology
                    nodes={nodes}
                    links={links}
                    packetFlows={packetFlows}
                    selectedSources={selectedSources}
                    selectedDestinations={selectedDestinations}
                    onNodeSelect={handleNodeSelect}
                  />

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.65)]" />
                      <span className="font-mono text-xs uppercase tracking-[0.1em] text-slate-400">Healthy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.65)]" />
                      <span className="font-mono text-xs uppercase tracking-[0.1em] text-slate-400">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.65)]" />
                      <span className="font-mono text-xs uppercase tracking-[0.1em] text-slate-400">Critical</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="glass rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] px-4 py-3 text-sm text-cyan-100 backdrop-blur-md">
                  Build or edit your network here, then choose <span className="font-semibold">Dashboard Topology</span> to see the same nodes and links animated with live telemetry.
                </div>
                <CustomTopologyBuilder />
              </div>
            )}

            {/* Traffic Heatmap */}
            <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono text-lg font-semibold uppercase tracking-wide">
                  <BarChart3 className="h-4 w-4 text-cyan-400" /> Network Stats
                </CardTitle>
                <CardDescription>Overall network health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-white/10 bg-slate-950/25 p-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1.5">Max Traffic</p>
                    <p className="font-mono text-2xl font-semibold text-slate-100">{stats.maxTraffic.toFixed(0)}%</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/25 p-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1.5">Avg Traffic</p>
                    <p className="font-mono text-2xl font-semibold text-slate-100">{stats.avgTraffic.toFixed(0)}%</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/25 p-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1.5">Active Nodes</p>
                    <p className="font-mono text-2xl font-semibold text-emerald-400">{stats.activeNodes}/{stats.totalNodes}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/25 p-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1.5">Packet Flows</p>
                    <p className="font-mono text-2xl font-semibold text-cyan-400">{packetFlows.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network Generator Tab */}
          <TabsContent value="generator" className="mt-0 min-w-0 flex-1">
            <NetworkGenerator onGenerated={() => setActiveTab('monitor')} />
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="mt-0 min-w-0 flex-1">
            <PortStatistics stats={portStats} />
          </TabsContent>

          {/* Prediction Tab */}
          <TabsContent value="prediction" className="mt-0 min-w-0 flex-1">
            <PredictionPanel predictions={predictions} links={links} rerouteEvents={rerouteEvents} />
          </TabsContent>

          {/* Reroute Log Tab */}
          <TabsContent value="reroute" className="mt-0 min-w-0 flex-1">
            <RerouteLog events={rerouteEvents} />
          </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className={`glass mt-12 border-t border-white/[0.06] bg-slate-900/30 backdrop-blur-xl transition-[margin] duration-200 ${isSidebarExpanded ? 'lg:ml-72' : 'lg:ml-[92px]'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col items-center justify-center gap-1 text-center">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Nexus <span className="text-emerald-400">/</span> Control Plane
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">
            Adaptive SDN Routing &amp; Intelligent Load Balancing
          </span>
        </div>
      </footer>
    </div>
  );
}
