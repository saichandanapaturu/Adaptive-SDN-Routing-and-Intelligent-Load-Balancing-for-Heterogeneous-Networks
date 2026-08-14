import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Activity, AlertTriangle, BarChart3, Boxes, BrainCircuit, CircleDot, Clock, GitBranch, Network, PanelLeft, ScrollText, Search, Zap } from 'lucide-react';

export default function Home() {
  const {
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
    hasGeneratedTopology,
    activeMode,
    telemetryTick,
  } = useLiveNetworkDataWithCustom();

  const { isUsingCustom, isUsingGenerated, setIsUsingCustom } = useTopologyContext();

  const stats = getNetworkStats();
  const [activeTab, setActiveTab] = useState('monitor');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSourceChange = (nodeId: string) => {
    updateRoute(nodeId, selectedDestination);
  };

  const handleDestinationChange = (nodeId: string) => {
    updateRoute(selectedSource, nodeId);
  };

  const handleNodeSelect = (nodeId: string) => {
    if (nodeId === selectedSource) {
      handleDestinationChange(nodeId);
    } else {
      handleSourceChange(nodeId);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100">
      {isSidebarExpanded && <button type="button" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setIsSidebarExpanded(false)} aria-label="Close navigation menu" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex-col border-r border-cyan-500/15 bg-[#0b1018] text-slate-200 shadow-[12px_0_40px_rgba(0,0,0,0.22)] transition-[width] duration-200 ${isSidebarExpanded ? 'flex w-72' : 'hidden w-[92px] lg:flex'}`}>
        <div className={`flex min-h-[86px] items-center border-b border-cyan-500/15 ${isSidebarExpanded ? 'justify-between px-4' : 'justify-center px-2'}`}>
          <button type="button" onClick={() => setIsSidebarExpanded((open) => !open)} className="group flex items-center gap-3 rounded-md p-1.5 transition hover:bg-cyan-400/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70" aria-label={isSidebarExpanded ? 'Collapse Nexus navigation menu' : 'Expand Nexus navigation menu'} aria-expanded={isSidebarExpanded}>
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center border border-cyan-400/60 bg-cyan-400/[0.08] text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.08)] transition group-hover:border-cyan-200">
              <span className="h-3 w-3 bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" aria-hidden="true" />
              <svg viewBox="0 0 48 48" className="absolute h-8 w-8 opacity-0" role="img" aria-label="Nexus mark">
                <path d="M24 8 10 34h28L24 8Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="24" cy="8" r="3.2" fill="currentColor" />
                <circle cx="10" cy="34" r="3.2" fill="currentColor" />
                <circle cx="38" cy="34" r="3.2" fill="currentColor" />
              </svg>
            </span>
            {isSidebarExpanded && <span className="text-left"><span className="block font-mono text-lg font-bold tracking-tight text-white">NEXUS</span><span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">Control plane</span></span>}
          </button>
          {isSidebarExpanded && <div className="flex items-center gap-1 text-slate-400"><button type="button" className="rounded-md p-2 transition hover:bg-white/[0.06] hover:text-white" aria-label="Search dashboard"><Search className="h-4 w-4" /></button><button type="button" onClick={() => setIsSidebarExpanded(false)} className="rounded-md p-2 transition hover:bg-white/[0.06] hover:text-white" aria-label="Collapse sidebar"><PanelLeft className="h-4 w-4" /></button></div>}
        </div>

        <nav className={`flex-1 overflow-y-auto py-5 ${isSidebarExpanded ? 'px-3' : 'px-2'}`} aria-label="Dashboard navigation">
          <div className="space-y-3">
            <button type="button" onClick={() => setActiveTab('monitor')} title="Monitor" className={`group flex w-full items-center gap-3 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${activeTab === 'monitor' ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border transition ${activeTab === 'monitor' ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}><Activity className="h-4 w-4" /></span>
              {isSidebarExpanded && <span>Monitor</span>}
            </button>
            <button type="button" onClick={() => setActiveTab('statistics')} title="Statistics" className={`group flex w-full items-center gap-3 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${activeTab === 'statistics' ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border transition ${activeTab === 'statistics' ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}><BarChart3 className="h-4 w-4" /></span>
              {isSidebarExpanded && <span>Statistics</span>}
            </button>
            <button type="button" onClick={() => setActiveTab('prediction')} title="Prediction" className={`group flex w-full items-center gap-3 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${activeTab === 'prediction' ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border transition ${activeTab === 'prediction' ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}><BrainCircuit className="h-4 w-4" /></span>
              {isSidebarExpanded && <span>Prediction</span>}
            </button>
            <button type="button" onClick={() => setActiveTab('reroute')} title="Reroute Log" className={`group flex w-full items-center gap-3 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${activeTab === 'reroute' ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border transition ${activeTab === 'reroute' ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}><ScrollText className="h-4 w-4" /></span>
              {isSidebarExpanded && <span>Reroute Log</span>}
            </button>
            <button type="button" onClick={() => setActiveTab('generator')} title="Network Generator" className={`group flex w-full items-center gap-3 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${activeTab === 'generator' || isUsingGenerated ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border transition ${activeTab === 'generator' || isUsingGenerated ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}><Boxes className="h-4 w-4" /></span>
              {isSidebarExpanded && <span>Network Generator</span>}
            </button>
          </div>

          {isSidebarExpanded && <div className="mt-9 px-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600">Topology</div>}
          <div className="mt-3 space-y-3">
            <button type="button" onClick={() => { setActiveTab('monitor'); setIsUsingCustom(false); }} title="Dashboard Topology" className={`group flex w-full items-center gap-3 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${!isUsingCustom && !isUsingGenerated ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}
>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border transition ${!isUsingCustom && !isUsingGenerated ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}><Network className="h-4 w-4" /></span>
              {isSidebarExpanded && <span>Dashboard Topology</span>}
            </button>
            <button type="button" onClick={() => { setActiveTab('monitor'); setIsUsingCustom(true); }} title="Custom Topology" className={`group flex w-full items-center gap-3 rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-2 py-2' : 'justify-center p-1.5'} ${isUsingCustom ? 'text-cyan-100' : 'text-slate-400 hover:text-cyan-100'}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center border transition ${isUsingCustom ? 'border-cyan-300/80 bg-cyan-400/[0.14] text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-700/70 bg-slate-950/30 text-slate-500 group-hover:border-cyan-400/60 group-hover:text-cyan-200'}`}><GitBranch className="h-4 w-4" /></span>
              {isSidebarExpanded && <span>Custom Topology</span>}
            </button>
          </div>
        </nav>

        <button type="button" onClick={() => setIsSidebarExpanded((open) => !open)} className={`border-t border-cyan-500/15 py-5 text-cyan-300 transition hover:bg-cyan-400/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${isSidebarExpanded ? 'px-4 text-left' : 'px-2 text-center'}`} aria-label="Toggle navigation menu">
          <span className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em]"><CircleDot className="h-3.5 w-3.5" />{isSidebarExpanded && <span>Live telemetry</span>}</span>
        </button>
      </aside>

      {/* Header */}
      <header className={`sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm transition-[margin] duration-200 ${isSidebarExpanded ? 'lg:ml-72' : 'lg:ml-[92px]'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setIsSidebarExpanded((open) => !open)} className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.18)] transition hover:border-cyan-300/70 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70" aria-label="Toggle Nexus navigation menu" aria-expanded={isSidebarExpanded}>
                <svg viewBox="0 0 48 48" className="h-8 w-8" role="img" aria-hidden="true">
                  <path d="M24 8 10 34h28L24 8Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="24" cy="8" r="3.2" fill="currentColor" />
                  <circle cx="10" cy="34" r="3.2" fill="currentColor" />
                  <circle cx="38" cy="34" r="3.2" fill="currentColor" />
                </svg>
              </button>
              <div>
                <h1 className="font-mono text-2xl font-bold tracking-tight text-white">
                  NEXUS <span className="text-emerald-400">/</span> Dashboard
                </h1>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Network Operations Center · Intelligent Flow Engine
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-right">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Live</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Telemetry</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className={`max-w-none px-4 py-6 space-y-8 transition-[margin] duration-200 sm:px-6 lg:px-8 lg:py-8 ${isSidebarExpanded ? 'lg:ml-72' : 'lg:ml-[92px]'}`}>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Nodes</p>
                  <p className="font-mono text-3xl font-bold text-slate-100">{stats.totalNodes}</p>
                </div>
                <Activity className="w-8 h-8 text-emerald-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Active Links</p>
                  <p className="font-mono text-3xl font-bold text-slate-100">{stats.activeLinks}</p>
                </div>
                <Zap className="w-8 h-8 text-emerald-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Congested Links</p>
                  <p className="font-mono text-3xl font-bold text-amber-500">{stats.congestedLinks}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-amber-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Failed Links</p>
                  <p className="font-mono text-3xl font-bold text-red-500">{stats.failedLinks}</p>
                </div>
                <Clock className="w-8 h-8 text-red-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-start">
            <TabsList className="flex w-full flex-row gap-1 overflow-x-auto bg-slate-900/50 border border-slate-800 p-1 lg:hidden">
            <TabsTrigger value="monitor" className="justify-start text-left data-[state=active]:bg-slate-800">
              Monitor
            </TabsTrigger>
            <TabsTrigger value="statistics" className="justify-start text-left data-[state=active]:bg-slate-800">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="prediction" className="justify-start text-left data-[state=active]:bg-slate-800">
              Prediction
            </TabsTrigger>
            <TabsTrigger value="reroute" className="justify-start text-left data-[state=active]:bg-slate-800">
              Reroute Log
            </TabsTrigger>
            <TabsTrigger value="generator" className="justify-start text-left data-[state=active]:bg-slate-800">
              Network Generator
            </TabsTrigger>
          </TabsList>

          {/* Monitor Tab */}
          <TabsContent value="monitor" className="mt-0 min-w-0 flex-1 space-y-6">
            {/* Dashboard/Custom Topology Mode */}
            {!isUsingCustom ? (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg font-bold">
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
                  {/* Source/Destination Selector */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Source Node
                      </label>
                      <Select value={selectedSource} onValueChange={handleSourceChange}>
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {nodes.map(node => (
                            <SelectItem key={node.id} value={node.id}>
                              {node.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Destination Node
                      </label>
                      <Select value={selectedDestination} onValueChange={handleDestinationChange}>
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {nodes.map(node => (
                            <SelectItem key={node.id} value={node.id}>
                              {node.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Topology Canvas */}
                  <ImprovedNetworkTopology
                    nodes={nodes}
                    links={links}
                    packetFlows={packetFlows}
                    selectedSource={selectedSource}
                    selectedDestination={selectedDestination}
                    onNodeSelect={handleNodeSelect}
                  />

                  {/* Legend */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-slate-400">Healthy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-sm text-slate-400">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-slate-400">Critical</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-sm text-cyan-100">
                  Build or edit your network here, then choose <span className="font-semibold">Dashboard Topology</span> to see the same nodes and links animated with live telemetry.
                </div>
                <CustomTopologyBuilder />
              </div>
            )}

            {/* Traffic Heatmap */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                      <CardTitle className="font-mono text-lg font-bold uppercase tracking-wide">Network Stats</CardTitle>
                <CardDescription>Overall network health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">Max Traffic</p>
                    <p className="text-2xl font-bold text-slate-100">
                                              <span className="font-mono">{stats.maxTraffic.toFixed(0)}%</span>

                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">Avg Traffic</p>
                    <p className="text-2xl font-bold text-slate-100">
                                              <span className="font-mono">{stats.avgTraffic.toFixed(0)}%</span>

                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">Active Nodes</p>
                    <p className="text-2xl font-bold text-emerald-500">
                      <span className="font-mono">{stats.activeNodes}/{stats.totalNodes}</span>
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">Packet Flows</p>
                    <p className="text-2xl font-bold text-cyan-500">
                      <span className="font-mono">{packetFlows.length}</span>
                    </p>
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
      <footer className={`mt-12 border-t border-slate-800 bg-slate-900/50 transition-[margin] duration-200 ${isSidebarExpanded ? 'lg:ml-72' : 'lg:ml-[92px]'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-slate-500">
          Made with Manus
        </div>
      </footer>
    </div>
  );
}
