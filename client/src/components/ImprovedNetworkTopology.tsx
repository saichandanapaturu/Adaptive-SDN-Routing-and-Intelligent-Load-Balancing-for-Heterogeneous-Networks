import React, { useEffect, useRef } from 'react';
import { NetworkNode, NetworkLink, PacketFlow } from '@/hooks/useLiveNetworkData';

interface ImprovedNetworkTopologyProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  packetFlows: PacketFlow[];
  selectedSource: string;
  selectedDestination: string;
  onNodeSelect?: (nodeId: string) => void;
  isInteractive?: boolean;
  onCanvasClick?: (x: number, y: number) => void;
}

export const ImprovedNetworkTopology: React.FC<ImprovedNetworkTopologyProps> = ({
  nodes,
  links,
  packetFlows,
  selectedSource,
  selectedDestination,
  onNodeSelect,
  isInteractive = false,
  onCanvasClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas with dark background
    ctx.fillStyle = '#0f1419';
    ctx.fillRect(0, 0, width, height);

    // Draw grid background for clarity
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (nodes.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '16px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No nodes in topology', width / 2, height / 2);
      return;
    }

    // Calculate scaling
    const padding = 80;
    const maxX = Math.max(...nodes.map(n => n.x), 1);
    const maxY = Math.max(...nodes.map(n => n.y), 1);
    const scaleX = (width - padding * 2) / maxX;
    const scaleY = (height - padding * 2) / maxY;

    const getScreenPos = (node: NetworkNode) => ({
      x: node.x * scaleX + padding,
      y: node.y * scaleY + padding,
    });

    // Draw links first (so they appear behind nodes)
    links.forEach(link => {
      const source = nodes.find(n => n.id === link.source);
      const target = nodes.find(n => n.id === link.target);
      if (!source || !target) return;

      const sourcePos = getScreenPos(source);
      const targetPos = getScreenPos(target);

      // Link color based on status
      let linkColor = '#10b981'; // healthy - green
      let lineWidth = 2;
      
      if (link.status === 'warning') {
        linkColor = '#f59e0b'; // amber
        lineWidth = 3;
      }
      if (link.status === 'critical') {
        linkColor = '#ef4444'; // red
        lineWidth = 4;
      }

      // Draw link shadow for depth
      ctx.strokeStyle = '#00000040';
      ctx.lineWidth = lineWidth + 4;
      ctx.beginPath();
      ctx.moveTo(sourcePos.x, sourcePos.y);
      ctx.lineTo(targetPos.x, targetPos.y);
      ctx.stroke();

      // Draw link with gradient based on traffic
      const gradient = ctx.createLinearGradient(sourcePos.x, sourcePos.y, targetPos.x, targetPos.y);
      const alpha = 0.4 + (link.trafficLevel / 100) * 0.6;
      gradient.addColorStop(0, `${linkColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${linkColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(sourcePos.x, sourcePos.y);
      ctx.lineTo(targetPos.x, targetPos.y);
      ctx.stroke();

      // Draw traffic indicator badge
      const midX = (sourcePos.x + targetPos.x) / 2;
      const midY = (sourcePos.y + targetPos.y) / 2;
      
      // Badge background
      ctx.fillStyle = '#0f1419';
      ctx.strokeStyle = linkColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(midX - 22, midY - 12, 44, 24, 4);
      ctx.fill();
      ctx.stroke();

      // Badge text
      ctx.fillStyle = linkColor;
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${link.trafficLevel.toFixed(0)}%`, midX, midY);
    });

    // Draw nodes
    nodes.forEach(node => {
      const pos = getScreenPos(node);
      const isSelected = node.id === selectedSource || node.id === selectedDestination;
      const baseRadius = 18;
      const radius = isSelected ? 24 : baseRadius;

      // Node color based on status
      let nodeColor = '#10b981'; // healthy
      if (node.status === 'warning') nodeColor = '#f59e0b';
      if (node.status === 'critical') nodeColor = '#ef4444';

      // Draw node shadow
      ctx.fillStyle = '#00000060';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw outer glow ring
      ctx.strokeStyle = `${nodeColor}30`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius + 12, 0, Math.PI * 2);
      ctx.stroke();

      // Draw node circle
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw selection highlight
      if (isSelected) {
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 6, 0, Math.PI * 2);
        ctx.stroke();

        // Draw selection label
        const label = node.id === selectedSource ? 'SRC' : 'DST';
        ctx.fillStyle = '#06b6d4';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, pos.x, pos.y - radius - 18);
      }

      // Draw node label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, pos.x, pos.y + radius + 28);

      // Draw node type indicator (small icon)
      ctx.fillStyle = nodeColor;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const typeSymbol = node.type === 'switch' ? '⬢' : node.type === 'host' ? '●' : '◆';
      ctx.fillText(typeSymbol, pos.x, pos.y);
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

      // Draw packet with enhanced glow
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      // Draw packet trail rings
      ctx.strokeStyle = '#06b6d480';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#06b6d440';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 18, 0, Math.PI * 2);
      ctx.stroke();
    });
  }, [nodes, links, packetFlows, selectedSource, selectedDestination]);

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={500}
      className="w-full border border-border rounded-lg bg-slate-950 cursor-crosshair"
      onClick={(e) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        if (isInteractive && onCanvasClick) {
          onCanvasClick(x, y);
        } else if (onNodeSelect) {
          const width = canvas.width;
          const height = canvas.height;
          const padding = 80;
          const maxX = Math.max(...nodes.map(n => n.x), 1);
          const maxY = Math.max(...nodes.map(n => n.y), 1);
          const scaleX = (width - padding * 2) / maxX;
          const scaleY = (height - padding * 2) / maxY;

          // Check if click is near any node
          nodes.forEach(node => {
            const nodeX = node.x * scaleX + padding;
            const nodeY = node.y * scaleY + padding;
            const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);

            if (distance < 24) {
              onNodeSelect(node.id);
            }
          });
        }
      }}
    />
  );
};
