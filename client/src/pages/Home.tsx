import React, { useState } from 'react';
import { useLiveNetworkData } from '@/hooks/useLiveNetworkData';
import { NetworkTopology } from '@/components/NetworkTopology';
import { PortStatistics } from '@/components/PortStatistics';
import { RerouteLog } from '@/components/RerouteLog';
import { PredictionPanel } from '@/components/PredictionPanel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, AlertTriangle, Zap, Clock } from 'lucide-react';

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
  } = useLiveNetworkData();

  const stats = getNetworkStats();
  const [activeTab, setActiveTab] = useState('monitor');

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
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                AIFE Dashboard
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                AI Intelligent Flow Engine - Network Monitoring
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-500">●</div>
              <p className="text-xs text-slate-400">Live</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Total Nodes</p>
                  <p className="text-3xl font-bold text-slate-100">{stats.totalNodes}</p>
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
                  <p className="text-3xl font-bold text-slate-100">{stats.activeLinks}</p>
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
                  <p className="text-3xl font-bold text-amber-500">{stats.congestedLinks}</p>
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
                  <p className="text-3xl font-bold text-red-500">{stats.failedLinks}</p>
                </div>
                <Clock className="w-8 h-8 text-red-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="monitor" className="data-[state=active]:bg-slate-800">
              Monitor
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-slate-800">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="prediction" className="data-[state=active]:bg-slate-800">
              Prediction
            </TabsTrigger>
            <TabsTrigger value="reroute" className="data-[state=active]:bg-slate-800">
              Reroute Log
            </TabsTrigger>
          </TabsList>

          {/* Monitor Tab */}
          <TabsContent value="monitor" className="space-y-6 mt-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Network Topology</CardTitle>
                <CardDescription>Real-time network visualization with packet flow</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Source/Destination Selector */}
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                <NetworkTopology
                  nodes={nodes}
                  links={links}
                  packetFlows={packetFlows}
                  selectedSource={selectedSource}
                  selectedDestination={selectedDestination}
                  onNodeSelect={handleNodeSelect}
                />

                {/* Legend */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
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

            {/* Traffic Heatmap */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Network Stats</CardTitle>
                <CardDescription>Overall network health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">Max Traffic</p>
                    <p className="text-2xl font-bold text-slate-100">
                      {stats.maxTraffic.toFixed(0)}%
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">Avg Traffic</p>
                    <p className="text-2xl font-bold text-slate-100">
                      {stats.avgTraffic.toFixed(0)}%
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">Active Nodes</p>
                    <p className="text-2xl font-bold text-emerald-500">
                      {stats.activeNodes}/{stats.totalNodes}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/50">
                    <p className="text-xs text-slate-400 mb-1">Packet Flows</p>
                    <p className="text-2xl font-bold text-cyan-500">
                      {packetFlows.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="mt-6">
            <PortStatistics stats={portStats} />
          </TabsContent>

          {/* Prediction Tab */}
          <TabsContent value="prediction" className="mt-6">
            <PredictionPanel predictions={predictions} />
          </TabsContent>

          {/* Reroute Log Tab */}
          <TabsContent value="reroute" className="mt-6">
            <RerouteLog events={rerouteEvents} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-slate-500">
          Made with Manus
        </div>
      </footer>
    </div>
  );
}
