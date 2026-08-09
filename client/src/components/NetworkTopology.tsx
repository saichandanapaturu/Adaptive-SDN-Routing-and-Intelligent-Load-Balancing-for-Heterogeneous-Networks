import React, { useEffect, useRef } from 'react';
import { NetworkNode, NetworkLink, PacketFlow } from '@/hooks/useLiveNetworkData';

interface NetworkTopologyProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  packetFlows: PacketFlow[];
  selectedSource: string;
  selectedDestination: string;
  onNodeSelect?: (nodeId: string) => void;
}

export const NetworkTopology: React.FC<NetworkTopologyProps> = ({
  nodes,
  links,
  packetFlows,
  selectedSource,
  selectedDestination,
  onNodeSelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#0f1419';
    ctx.fillRect(0, 0, width, height);

    // Scale nodes to fit canvas
    const padding = 60;
    const maxX = Math.max(...nodes.map(n => n.x));
    const maxY = Math.max(...nodes.map(n => n.y));
    const scaleX = (width - padding * 2) / maxX;
    const scaleY = (height - padding * 2) / maxY;

    const getScreenPos = (node: NetworkNode) => ({
      x: node.x * scaleX + padding,
      y: node.y * scaleY + padding,
    });

    // Draw links
    links.forEach(link => {
      const source = nodes.find(n => n.id === link.source);
      const target = nodes.find(n => n.id === link.target);
      if (!source || !target) return;

      const sourcePos = getScreenPos(source);
      const targetPos = getScreenPos(target);

      // Link color based on status
      let linkColor = '#10b981'; // healthy - green
      if (link.status === 'warning') linkColor = '#f59e0b'; // amber
      if (link.status === 'critical') linkColor = '#ef4444'; // red

      // Draw link with gradient based on traffic
      const gradient = ctx.createLinearGradient(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y);
      const alpha = 0.3 + (link.trafficLevel / 100) * 0.5;
      gradient.addColorStop(0, `${linkColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${linkColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 + (link.trafficLevel / 100) * 3;
      ctx.beginPath();
      ctx.moveTo(sourcePos.x, sourcePos.y);
      ctx.lineTo(targetPos.x, targetPos.y);
      ctx.stroke();

      // Draw traffic indicator
      const midX = (sourcePos.x + targetPos.x) / 2;
      const midY = (sourcePos.y + targetPos.y) / 2;
      ctx.fillStyle = linkColor;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(midX - 15, midY - 8, 30, 16);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${link.trafficLevel.toFixed(0)}%`, midX, midY);
    });

    // Draw nodes
    nodes.forEach(node => {
      const pos = getScreenPos(node);
      const isSelected = node.id === selectedSource || node.id === selectedDestination;
      const radius = isSelected ? 20 : 15;

      // Node color based on status
      let nodeColor = '#10b981'; // healthy
      if (node.status === 'warning') nodeColor = '#f59e0b';
      if (node.status === 'critical') nodeColor = '#ef4444';

      // Draw node circle
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw glow effect
      ctx.strokeStyle = `${nodeColor}40`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 8, 0, Math.PI * 2);
      ctx.stroke();

      // Draw selection highlight
      if (isSelected) {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw node label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, pos.x, pos.y + radius + 20);
    });

    // Draw packet flows
    packetFlows.forEach(flow => {
      const path = flow.path;
      if (path.length < 2) return;

      // Calculate packet position along path
      const pathProgress = flow.progress / 100;
      const totalSegments = path.length - 1;
      const currentSegment = Math.floor(pathProgress * totalSegments);
      const segmentProgress = (pathProgress * totalSegments) - currentSegment;

      if (currentSegment >= path.length - 1) return;

      const sourceNode = nodes.find(n => n.id === path[currentSegment]);
      const targetNode = nodes.find(n => n.id === path[currentSegment + 1]);

      if (!sourceNode || !targetNode) return;

      const sourcePos = getScreenPos(sourceNode);
      const targetPos = getScreenPos(targetNode);

      const packetX = sourcePos.x + (targetPos.x - sourcePos.x) * segmentProgress;
      const packetY = sourcePos.y + (targetPos.y - sourcePos.y) * segmentProgress;

      // Draw packet with glow
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Draw packet trail
      ctx.strokeStyle = '#06b6d480';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 10, 0, Math.PI * 2);
      ctx.stroke();
    });
  }, [nodes, links, packetFlows, selectedSource, selectedDestination]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="w-full border border-border rounded-lg bg-slate-950"
      onClick={(e) => {
        if (!canvasRef.current || !onNodeSelect) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        const width = canvas.width;
        const height = canvas.height;
        const padding = 60;
        const maxX = Math.max(...nodes.map(n => n.x));
        const maxY = Math.max(...nodes.map(n => n.y));
        const scaleX = (width - padding * 2) / maxX;
        const scaleY = (height - padding * 2) / maxY;

        // Check if click is near any node
        nodes.forEach(node => {
          const nodeX = node.x * scaleX + padding;
          const nodeY = node.y * scaleY + padding;
          const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
          
          if (distance < 20) {
            onNodeSelect(node.id);
          }
        });
      }}
    />
  );
};
