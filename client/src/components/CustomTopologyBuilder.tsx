/* Style: Nexus custom topology builder — instrument card shell, rounded type chips, mono uppercase labels matching Network Generator. */
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useCustomTopology } from '@/hooks/useCustomTopology';
import { ImprovedNetworkTopology } from './ImprovedNetworkTopology';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Download, Upload, Monitor, Network, Waypoints, GitMerge, Settings2 } from 'lucide-react';
import { useTopologyContext } from '@/contexts/TopologyContext';

export const CustomTopologyBuilder: React.FC = () => {
  const {
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
  } = useCustomTopology();

  const { setIsUsingCustom } = useTopologyContext();

  const handleAddToDashboard = () => {
    if (nodes.length === 0) {
      toast.error('Add at least one node before pushing to the dashboard.');
      return;
    }
    setIsUsingCustom(true);
    toast.success('Custom topology added to dashboard', {
      description: 'Switch to Monitor to see it driving live telemetry.',
    });
  };

  const handleClearTopology = () => {
    if (nodes.length === 0 && links.length === 0) return;
    clearTopology();
    toast('Topology cleared', { description: 'All custom nodes and links were removed.' });
  };

  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeType, setNodeType] = useState<'switch' | 'host' | 'router'>('switch');
  const [linkSource, setLinkSource] = useState('');
  const [linkTarget, setLinkTarget] = useState('');
  const [linkBandwidth, setLinkBandwidth] = useState('1');

  const handleAddNode = () => {
    if (!nodeLabel.trim()) return;
    
    // Generate random position
    const x = Math.random() * 600 + 50;
    const y = Math.random() * 300 + 50;
    
    addNode(nodeLabel, x, y, nodeType);
    setNodeLabel('');
  };

  const handleAddLink = () => {
    if (!linkSource || !linkTarget || linkSource === linkTarget) return;
    addLink(linkSource, linkTarget, parseFloat(linkBandwidth) || 1);
    setLinkSource('');
    setLinkTarget('');
    setLinkBandwidth('1');
  };

  const handleExport = () => {
    if (nodes.length === 0) {
      toast.error('Nothing to export yet — add at least one node first.');
      return;
    }
    const data = exportTopology();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `topology-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Topology exported', { description: `${nodes.length} nodes, ${links.length} links.` });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = importTopology(content);
      if (success) {
        toast.success('Topology imported', { description: file.name });
      } else {
        toast.error('Import failed', { description: 'That file is not a valid topology export.' });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Topology Canvas */}
      <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold"><Network className="h-4 w-4 text-cyan-400" /> Custom Network Topology</CardTitle>
          <CardDescription>Design your own network topology</CardDescription>
        </CardHeader>
        <CardContent>
          <ImprovedNetworkTopology
            nodes={nodes}
            links={links}
            packetFlows={[]}
            selectedSource=""
            selectedDestination=""
            onNodeSelect={setSelectedNodeId}
            isInteractive={false}
          />
        </CardContent>
      </Card>

      {/* Node Management */}
      <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold"><Waypoints className="h-4 w-4 text-cyan-400" /> Add Nodes</CardTitle>
          <CardDescription>Create network nodes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Node label (e.g., Router-1)"
              value={nodeLabel}
              onChange={(e) => setNodeLabel(e.target.value)}
              className="bg-slate-800/50 backdrop-blur-md border-white/10"
              onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
            />
            <Select value={nodeType} onValueChange={(v: any) => setNodeType(v)}>
              <SelectTrigger className="bg-slate-800/50 backdrop-blur-md border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass bg-slate-900/80 backdrop-blur-xl border-white/10">
                <SelectItem value="switch">Switch</SelectItem>
                <SelectItem value="host">Host</SelectItem>
                <SelectItem value="router">Router</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddNode} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Node
            </Button>
            <Button onClick={handleClearTopology} variant="destructive">
              Clear All
            </Button>
          </div>

          {/* Nodes List */}
          <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {nodes.length === 0 ? (
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-600">No nodes added yet</p>
            ) : (
              nodes.map(node => (
                <div
                  key={node.id}
                  className={`backdrop-blur-md flex items-center justify-between rounded-lg border p-3 transition-colors ${
                    selectedNodeId === node.id
                      ? 'bg-emerald-500/[0.1] border-emerald-500/60'
                      : 'bg-slate-950/20 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500">{node.id}</span>
                    <span className="font-semibold text-slate-200">{node.label}</span>
                    <span className="rounded-full border border-slate-700 bg-slate-800/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-300">
                      {node.type}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteNode(node.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Link Management */}
      <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold"><GitMerge className="h-4 w-4 text-cyan-400" /> Add Links</CardTitle>
          <CardDescription>Connect nodes with network links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Select value={linkSource} onValueChange={setLinkSource}>
              <SelectTrigger className="bg-slate-800/50 backdrop-blur-md border-white/10">
                <SelectValue placeholder="Source Node" />
              </SelectTrigger>
              <SelectContent className="glass bg-slate-900/80 backdrop-blur-xl border-white/10">
                {nodes.map(node => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={linkTarget} onValueChange={setLinkTarget}>
              <SelectTrigger className="bg-slate-800/50 backdrop-blur-md border-white/10">
                <SelectValue placeholder="Target Node" />
              </SelectTrigger>
              <SelectContent className="glass bg-slate-900/80 backdrop-blur-xl border-white/10">
                {nodes.map(node => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Bandwidth (Mbps)"
              value={linkBandwidth}
              onChange={(e) => setLinkBandwidth(e.target.value)}
              className="bg-slate-800/50 backdrop-blur-md border-white/10"
              min="1"
              max="100"
            />

            <Button onClick={handleAddLink} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>

          {/* Links List */}
          <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {links.length === 0 ? (
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-600">No links added yet</p>
            ) : (
              links.map((link, idx) => {
                const sourceNode = nodes.find(n => n.id === link.source);
                const targetNode = nodes.find(n => n.id === link.target);
                return (
                  <div
                    key={idx}
                    className="backdrop-blur-md flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/20 p-3 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-200">
                        {sourceNode?.label} → {targetNode?.label}
                      </span>
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-cyan-300">
                        {link.bandwidth} Mbps
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteLink(link.source, link.target)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Import/Export & Dashboard Handoff */}
      <Card className="glass rounded-2xl border-white/10 bg-slate-900/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold"><Settings2 className="h-4 w-4 text-cyan-400" /> Topology Management</CardTitle>
          <CardDescription>Export, import, or push your custom network to the live dashboard monitor.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleAddToDashboard} className="bg-emerald-600 font-semibold text-white hover:bg-emerald-500">
              <Monitor className="w-4 h-4 mr-2" />
              Add to Dashboard
            </Button>
            <Button onClick={handleExport} variant="outline" className="border-white/10 bg-slate-800/50 backdrop-blur-md text-slate-200 hover:bg-slate-700/50">
              <Download className="w-4 h-4 mr-2" />
              Export Topology
            </Button>
            <label>
              <Button variant="outline" className="border-white/10 bg-slate-800/50 backdrop-blur-md text-slate-200 hover:bg-slate-700/50" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Topology
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
