import React, { useState } from 'react';
import { useCustomTopology } from '@/hooks/useCustomTopology';
import { ImprovedNetworkTopology } from './ImprovedNetworkTopology';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Download, Upload, Monitor } from 'lucide-react';
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
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddToDashboard = () => {
    if (nodes.length === 0) {
      setSuccessMessage('Add at least one node before pushing to the dashboard.');
      return;
    }
    setIsUsingCustom(true);
    setSuccessMessage('Custom topology added to dashboard successfully! Switch to Monitor to view live telemetry.');
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
    const data = exportTopology();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `topology-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      importTopology(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Topology Canvas */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Custom Network Topology</CardTitle>
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
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Add Nodes</CardTitle>
          <CardDescription>Create network nodes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Node label (e.g., Router-1)"
              value={nodeLabel}
              onChange={(e) => setNodeLabel(e.target.value)}
              className="bg-slate-800 border-slate-700"
              onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
            />
            <Select value={nodeType} onValueChange={(v: any) => setNodeType(v)}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="switch">Switch</SelectItem>
                <SelectItem value="host">Host</SelectItem>
                <SelectItem value="router">Router</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddNode} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Node
            </Button>
            <Button onClick={clearTopology} variant="destructive">
              Clear All
            </Button>
          </div>

          {/* Nodes List */}
          <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {nodes.length === 0 ? (
              <p className="text-sm text-slate-500">No nodes added yet</p>
            ) : (
              nodes.map(node => (
                <div
                  key={node.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    selectedNodeId === node.id
                      ? 'bg-emerald-500/20 border-emerald-500'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">{node.id}</span>
                    <span className="font-semibold text-slate-200">{node.label}</span>
                    <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                      {node.type}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteNode(node.id)}
                    className="text-red-500 hover:text-red-600"
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
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Add Links</CardTitle>
          <CardDescription>Connect nodes with network links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Select value={linkSource} onValueChange={setLinkSource}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue placeholder="Source Node" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {nodes.map(node => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={linkTarget} onValueChange={setLinkTarget}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue placeholder="Target Node" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
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
              className="bg-slate-800 border-slate-700"
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
              <p className="text-sm text-slate-500">No links added yet</p>
            ) : (
              links.map((link, idx) => {
                const sourceNode = nodes.find(n => n.id === link.source);
                const targetNode = nodes.find(n => n.id === link.target);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-200">
                        {sourceNode?.label} → {targetNode?.label}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                        {link.bandwidth} Mbps
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteLink(link.source, link.target)}
                      className="text-red-500 hover:text-red-600"
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
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Topology Management</CardTitle>
          <CardDescription>Export, import, or push your custom network to the live dashboard monitor.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleAddToDashboard} className="bg-emerald-600 font-semibold text-white hover:bg-emerald-500">
              <Monitor className="w-4 h-4 mr-2" />
              Add to Dashboard
            </Button>
            <Button onClick={handleExport} variant="outline" className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700">
              <Download className="w-4 h-4 mr-2" />
              Export Topology
            </Button>
            <label>
              <Button variant="outline" className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700" asChild>
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
          {successMessage && (
            <p className="text-sm font-medium text-emerald-300" role="status">
              {successMessage}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
