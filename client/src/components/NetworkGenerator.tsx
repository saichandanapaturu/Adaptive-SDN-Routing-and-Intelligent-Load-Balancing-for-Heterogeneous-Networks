/* Style: Nexus Network Generator — dark NOC tooling, square instrument controls, cyan generation signal, and precise technical copy. */
import React, { useMemo, useState } from 'react';
import { Boxes, Check, Network, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTopologyContext } from '@/contexts/TopologyContext';
import { buildGeneratedNetwork, GENERATOR_LIMITS, CustomTopologyType, GeneratorCounts, GeneratorStrategy } from '@/lib/networkGenerator';

interface NetworkGeneratorProps {
  onGenerated: () => void;
}

const initialCounts: GeneratorCounts = {
  switches: 4,
  routers: 2,
  hubs: 1,
  hosts: 8,
};

const fields: Array<{ key: keyof GeneratorCounts; label: string; hint: string }> = [
  { key: 'switches', label: 'Switches', hint: 'Layer 2 nodes' },
  { key: 'routers', label: 'Routers', hint: 'Layer 3 nodes' },
  { key: 'hubs', label: 'Hubs', hint: 'Shared segments' },
  { key: 'hosts', label: 'Hosts', hint: 'Endpoints' },
];

export const NetworkGenerator: React.FC<NetworkGeneratorProps> = ({ onGenerated }) => {
  const { setGeneratedNodes, setGeneratedLinks, setIsUsingGenerated } = useTopologyContext();
  const [counts, setCounts] = useState<GeneratorCounts>(initialCounts);
  const [strategy, setStrategy] = useState<GeneratorStrategy>('recommended');
  const [customTopologyType, setCustomTopologyType] = useState<CustomTopologyType>('ring');
  const [message, setMessage] = useState('Set device counts, choose a strategy or user-defined topology type, then generate a live network.');

  const totalNodes = useMemo(() => Object.values(counts).reduce((sum, count) => sum + count, 0), [counts]);

  const handleCountChange = (key: keyof GeneratorCounts, value: string) => {
    const parsed = Number(value);
    const nextValue = Number.isFinite(parsed) ? Math.max(GENERATOR_LIMITS.min, Math.min(GENERATOR_LIMITS.max, Math.floor(parsed))) : 0;
    setCounts(previous => ({ ...previous, [key]: nextValue }));
  };

  const handleGenerate = () => {
    if (totalNodes < 2) {
      setMessage('Add at least two devices so Nexus can create a connected network.');
      return;
    }

    const generated = buildGeneratedNetwork(counts, strategy, customTopologyType);
    setGeneratedNodes(generated.nodes);
    setGeneratedLinks(generated.links);
    setIsUsingGenerated(true);
    const modeDesc = strategy === 'recommended' ? 'recommended topology' : `user-defined ${customTopologyType.toUpperCase()} topology`;
    setMessage(`Generated ${generated.nodes.length} nodes and ${generated.links.length} links using the ${modeDesc}.`);
    onGenerated();
  };

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/20 bg-slate-900/50">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg font-bold"><Boxes className="h-5 w-5 text-cyan-300" /> Network Generator</CardTitle>
              <CardDescription>Create a separate multi-node network without changing your existing Custom Topology.</CardDescription>
            </div>
            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200">{totalNodes} nodes requested</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {fields.map(({ key, label, hint }) => (
              <label key={key} className="space-y-2">
                <span className="block text-sm font-semibold text-slate-200">{label}</span>
                <Input
                  type="number"
                  min={GENERATOR_LIMITS.min}
                  max={GENERATOR_LIMITS.max}
                  value={counts[key]}
                  onChange={(event) => handleCountChange(key, event.target.value)}
                  className="border-slate-700 bg-slate-800 font-mono text-slate-100"
                  aria-label={`${label} count`}
                />
                <span className="block text-[11px] text-slate-500">{hint} · 0–{GENERATOR_LIMITS.max}</span>
              </label>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <button type="button" onClick={() => setStrategy('recommended')} className={`flex items-start gap-3 border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${strategy === 'recommended' ? 'border-cyan-300/80 bg-cyan-400/[0.1]' : 'border-slate-700 bg-slate-950/30 hover:border-cyan-400/50'}`}>
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border ${strategy === 'recommended' ? 'border-cyan-300/80 text-cyan-200' : 'border-slate-700 text-slate-500'}`}><Sparkles className="h-4 w-4" /></span>
              <span><span className="block font-semibold text-slate-100">Recommended topology</span><span className="mt-1 block text-xs leading-5 text-slate-400">Build a layered backbone with resilient device attachments.</span></span>
              {strategy === 'recommended' && <Check className="ml-auto h-4 w-4 text-cyan-200" />}
            </button>
            <button type="button" onClick={() => setStrategy('custom')} className={`flex items-start gap-3 border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${strategy === 'custom' ? 'border-cyan-300/80 bg-cyan-400/[0.1]' : 'border-slate-700 bg-slate-950/30 hover:border-cyan-400/50'}`}>
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border ${strategy === 'custom' ? 'border-cyan-300/80 text-cyan-200' : 'border-slate-700 text-slate-500'}`}><Network className="h-4 w-4" /></span>
              <span><span className="block font-semibold text-slate-100">User-defined topology</span><span className="mt-1 block text-xs leading-5 text-slate-400">Choose a specific topology pattern from the dropdown below.</span></span>
              {strategy === 'custom' && <Check className="ml-auto h-4 w-4 text-cyan-200" />}
            </button>
          </div>

          {strategy === 'custom' && (
            <div className="space-y-2 rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-4">
              <label className="block text-sm font-semibold text-cyan-200" htmlFor="custom-topology-select">
                User-Defined Topology Type
              </label>
              <Select value={customTopologyType} onValueChange={(value: CustomTopologyType) => setCustomTopologyType(value)}>
                <SelectTrigger id="custom-topology-select" className="border-cyan-500/30 bg-slate-800 text-slate-100">
                  <SelectValue placeholder="Select topology type" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900 text-slate-100">
                  <SelectItem value="ring">Ring Topology (Circular path with cross-links)</SelectItem>
                  <SelectItem value="star">Star Topology (Centralized core hub & spokes)</SelectItem>
                  <SelectItem value="mesh">Mesh Topology (High interconnectivity)</SelectItem>
                  <SelectItem value="tree">Tree Topology (Hierarchical branching structure)</SelectItem>
                  <SelectItem value="bus">Bus Topology (Sequential linear backbone)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-400">Nexus will connect your {totalNodes} nodes using the selected {customTopologyType.toUpperCase()} architectural layout.</p>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm text-slate-400" role="status">{message}</p>
            <Button type="button" onClick={handleGenerate} className="shrink-0 bg-cyan-600 font-semibold text-white hover:bg-cyan-500"><Boxes className="mr-2 h-4 w-4" /> Generate Network</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="flex items-start gap-3 py-5 text-sm text-slate-400">
          <Network className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
          <p>Generated networks become the active source for live monitoring, statistics, predictions, and reroute logs. Your existing Custom Topology remains safely stored and editable independently.</p>
        </CardContent>
      </Card>
    </div>
  );
};
