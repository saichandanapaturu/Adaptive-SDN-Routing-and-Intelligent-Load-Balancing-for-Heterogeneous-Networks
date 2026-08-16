/* Style: AIFE topology renderer — high-contrast NOC canvas, crisp instrument lines, mono labels, emerald active state, cyan packet flow. */
import React, { useEffect, useRef } from 'react';
import { NetworkNode, NetworkLink, PacketFlow } from '@/hooks/useLiveNetworkData';

interface ImprovedNetworkTopologyProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  packetFlows: PacketFlow[];
  selectedSources: string[];
  selectedDestinations: string[];
  onNodeSelect?: (nodeId: string) => void;
  isInteractive?: boolean;
  onCanvasClick?: (x: number, y: number) => void;
}

type Point = { x: number; y: number };

const COLORS = {
  canvas: '#070d14',
  panel: '#0b131c',
  grid: 'rgba(71, 91, 111, 0.24)',
  gridMajor: 'rgba(100, 116, 139, 0.32)',
  ink: '#f8fafc',
  muted: '#94a3b8',
  emerald: '#10b981',
  cyan: '#22d3ee',
  amber: '#f59e0b',
  red: '#ef4444',
  slate: '#1e293b',
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function getCanvasSize(canvas: HTMLCanvasElement) {
  const width = Math.max(canvas.clientWidth || 900, 320);
  const height = Math.max(360, Math.round(width * 0.56));
  return { width, height };
}

function buildLayout(nodes: NetworkNode[], width: number, height: number) {
  const padding = { x: 72, y: 72 };
  const minX = Math.min(...nodes.map(node => node.x), 0);
  const maxX = Math.max(...nodes.map(node => node.x), 1);
  const minY = Math.min(...nodes.map(node => node.y), 0);
  const maxY = Math.max(...nodes.map(node => node.y), 1);
  const rangeX = Math.max(maxX - minX, 0.001);
  const rangeY = Math.max(maxY - minY, 0.001);
  const usableWidth = Math.max(width - padding.x * 2, 1);
  const usableHeight = Math.max(height - padding.y * 2, 1);

  return new Map(
    nodes.map((node, index) => {
      const fallback = nodes.length <= 1 ? 0.5 : index / (nodes.length - 1);
      const normalizedX = rangeX > 0.001 ? (node.x - minX) / rangeX : fallback;
      const normalizedY = rangeY > 0.001 ? (node.y - minY) / rangeY : 0.5;
      return [node.id, {
        x: padding.x + clamp(normalizedX, 0, 1) * usableWidth,
        y: padding.y + clamp(normalizedY, 0, 1) * usableHeight,
      } satisfies Point];
    }),
  );
}

function statusColor(status: NetworkNode['status'] | NetworkLink['status']) {
  if (status === 'critical') return COLORS.red;
  if (status === 'warning') return COLORS.amber;
  return COLORS.emerald;
}

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function drawPill(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, options?: { align?: CanvasTextAlign; fontSize?: number }) {
  const fontSize = options?.fontSize ?? 11;
  const align = options?.align ?? 'center';
  ctx.save();
  ctx.font = `700 ${fontSize}px "Space Mono", monospace`;
  const textWidth = ctx.measureText(text).width;
  const width = textWidth + 18;
  const height = fontSize + 10;
  let left = x - width / 2;
  if (align === 'left') left = x;
  if (align === 'right') left = x - width;
  const top = y - height / 2;
  ctx.fillStyle = 'rgba(7, 13, 20, 0.94)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, left, top, width, height, 5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.textAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, align === 'left' ? left + 9 : align === 'right' ? left + width - 9 : x, y + 0.5);
  ctx.restore();
}

function drawNodeGlyph(ctx: CanvasRenderingContext2D, type: NetworkNode['type'], x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  if (type === 'switch') {
    ctx.moveTo(x - 8, y - 5);
    ctx.lineTo(x, y - 9);
    ctx.lineTo(x + 8, y - 5);
    ctx.lineTo(x + 8, y + 5);
    ctx.lineTo(x, y + 9);
    ctx.lineTo(x - 8, y + 5);
    ctx.closePath();
  } else if (type === 'router') {
    ctx.moveTo(x, y - 9);
    ctx.lineTo(x + 9, y);
    ctx.lineTo(x, y + 9);
    ctx.lineTo(x - 9, y);
    ctx.closePath();
  } else if (type === 'hub') {
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.moveTo(x - 12, y);
    ctx.lineTo(x + 12, y);
    ctx.moveTo(x, y - 12);
    ctx.lineTo(x, y + 12);
  } else {
    ctx.arc(x, y, 7, 0, Math.PI * 2);
  }
  ctx.stroke();
  ctx.restore();
}

export const ImprovedNetworkTopology: React.FC<ImprovedNetworkTopologyProps> = ({
  nodes,
  links,
  packetFlows,
  selectedSources,
  selectedDestinations,
  onNodeSelect,
  isInteractive = false,
  onCanvasClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const render = () => {
      const { width, height } = getCanvasSize(canvas);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextCssHeight = `${height}px`;
      if (canvas.style.height !== nextCssHeight) {
        canvas.style.height = nextCssHeight;
      }
      const backingWidth = Math.round(width * dpr);
      const backingHeight = Math.round(height * dpr);
      if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
        canvas.width = backingWidth;
        canvas.height = backingHeight;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;

      const background = ctx.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, COLORS.panel);
      background.addColorStop(1, COLORS.canvas);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      // Crisp grid with major registration lines, not a diffuse blur.
      const gridSize = Math.max(32, Math.round(width / 28));
      for (let x = 0; x <= width; x += gridSize) {
        ctx.strokeStyle = x % (gridSize * 4) === 0 ? COLORS.gridMajor : COLORS.grid;
        ctx.lineWidth = x % (gridSize * 4) === 0 ? 1 : 0.65;
        ctx.beginPath();
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.strokeStyle = y % (gridSize * 4) === 0 ? COLORS.gridMajor : COLORS.grid;
        ctx.lineWidth = y % (gridSize * 4) === 0 ? 1 : 0.65;
        ctx.beginPath();
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(width, Math.round(y) + 0.5);
        ctx.stroke();
      }

      // Fine viewport frame and corner registration marks.
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.36)';
      ctx.lineWidth = 1;
      ctx.strokeRect(18.5, 18.5, width - 37, height - 37);
      ctx.fillStyle = COLORS.muted;
      ctx.font = '700 10px "Space Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('TOPOLOGY // LIVE TELEMETRY', 32, 30);
      ctx.textAlign = 'right';
      ctx.fillText(`${nodes.length.toString().padStart(2, '0')} NODES · ${links.length.toString().padStart(2, '0')} LINKS`, width - 32, 30);

      if (nodes.length === 0) {
        ctx.fillStyle = COLORS.muted;
        ctx.font = '700 14px "Space Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('NO NODES IN ACTIVE TOPOLOGY', width / 2, height / 2);
        return;
      }

      const positions = buildLayout(nodes, width, height);
      const routeEdges = new Set<string>();
      packetFlows.forEach(flow => {
        flow.path.forEach((nodeId, index) => {
          if (index < flow.path.length - 1) {
            routeEdges.add(`${nodeId}::${flow.path[index + 1]}`);
            routeEdges.add(`${flow.path[index + 1]}::${nodeId}`);
          }
        });
      });

      // Links are drawn first so nodes and packet cores stay sharp above them.
      links.forEach(link => {
        const sourcePos = positions.get(link.source);
        const targetPos = positions.get(link.target);
        if (!sourcePos || !targetPos) return;
        const color = statusColor(link.status);
        const routeEdge = routeEdges.has(`${link.source}::${link.target}`);
        const traffic = clamp(link.trafficLevel, 0, 100);
        const lineWidth = routeEdge ? 4 : 1.5 + traffic * 0.025;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.setLineDash(link.status === 'critical' ? [8, 6] : link.status === 'warning' ? [4, 4] : []);
        ctx.strokeStyle = 'rgba(2, 6, 23, 0.95)';
        ctx.lineWidth = lineWidth + 5;
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.stroke();
        ctx.strokeStyle = routeEdge ? COLORS.cyan : color;
        ctx.globalAlpha = routeEdge ? 0.95 : 0.72 + traffic / 360;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.stroke();
        ctx.restore();

        const midX = (sourcePos.x + targetPos.x) / 2;
        const midY = (sourcePos.y + targetPos.y) / 2;
        drawPill(ctx, `${traffic.toFixed(0)}%`, midX, midY, routeEdge ? COLORS.cyan : color, { fontSize: 10 });
      });

      // Nodes use hard-edged instrument rings and a geometric glyph for clarity.
      nodes.forEach(node => {
        const pos = positions.get(node.id);
        if (!pos) return;
        const color = statusColor(node.status);
        const isSource = selectedSources.includes(node.id);
        const isDestination = selectedDestinations.includes(node.id);
        const selected = isSource || isDestination;
        const radius = selected ? 24 : 20;
        const label = node.label.length > 22 ? `${node.label.slice(0, 20)}…` : node.label;

        ctx.save();
        ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
        ctx.strokeStyle = selected ? COLORS.cyan : color;
        ctx.lineWidth = selected ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.45;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(8, 18, 27, 0.98)';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = selected ? COLORS.cyan : color;
        ctx.lineWidth = 3;
        ctx.stroke();
        drawNodeGlyph(ctx, node.type, pos.x, pos.y, color);
        ctx.restore();

        const labelWidth = Math.max(78, Math.min(190, label.length * 7.5 + 24));
        ctx.save();
        ctx.fillStyle = 'rgba(7, 13, 20, 0.94)';
        ctx.strokeStyle = selected ? 'rgba(34, 211, 238, 0.65)' : 'rgba(148, 163, 184, 0.32)';
        ctx.lineWidth = 1;
        drawRoundedRect(ctx, pos.x - labelWidth / 2, pos.y + radius + 14, labelWidth, 25, 5);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = COLORS.ink;
        ctx.font = '700 11px "Space Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, pos.x, pos.y + radius + 26.5);
        ctx.restore();

        if (selected) {
          const badgeText = isSource && isDestination ? 'SRC/DST' : isSource ? 'SRC' : 'DST';
          drawPill(ctx, badgeText, pos.x, pos.y - radius - 26, COLORS.cyan, { fontSize: 10 });
        }
      });

      // Packets remain bright and precise without a large shadow blur that makes the canvas look soft.
      packetFlows.forEach(flow => {
        if (flow.path.length < 2) return;
        // Use wall-clock progress for smooth movement between telemetry ticks.
        // React supplies new flows roughly once per second; the canvas now
        // interpolates their position on every animation frame.
        const elapsedProgress = flow.duration > 0
          ? ((Date.now() - flow.startTime) / flow.duration) * 100
          : flow.progress;
        const progress = clamp(elapsedProgress / 100, 0, 0.9999);
        const segmentIndex = Math.floor(progress * (flow.path.length - 1));
        const segmentProgress = progress * (flow.path.length - 1) - segmentIndex;
        const source = positions.get(flow.path[segmentIndex]);
        const target = positions.get(flow.path[segmentIndex + 1]);
        if (!source || !target) return;
        const x = source.x + (target.x - source.x) * segmentProgress;
        const y = source.y + (target.y - source.y) * segmentProgress;
        ctx.save();
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#ecfeff';
        ctx.strokeStyle = COLORS.cyan;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });
    };

    let animationFrame = 0;
    let packetAnimationFrame = 0;
    const scheduleRender = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        render();
      });
    };

    // Observe the stable layout parent rather than the canvas itself. The previous
    // implementation observed the canvas and synchronously changed its CSS height,
    // which could make the browser report a ResizeObserver notification loop.
    const observedElement = canvas.parentElement;
    const observer = observedElement && typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(scheduleRender)
      : null;
    observer?.observe(observedElement ?? canvas);
    window.addEventListener('resize', scheduleRender, { passive: true });
    scheduleRender();

    // Keep the packet layer moving continuously in production builds. The
    // telemetry interval creates/removes flows, while this lightweight loop
    // interpolates their position smoothly between those updates.
    if (packetFlows.length > 0) {
      const animatePackets = () => {
        render();
        packetAnimationFrame = window.requestAnimationFrame(animatePackets);
      };
      packetAnimationFrame = window.requestAnimationFrame(animatePackets);
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', scheduleRender);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (packetAnimationFrame) window.cancelAnimationFrame(packetAnimationFrame);
    };
  }, [links, nodes, packetFlows, selectedDestinations, selectedSources]);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full rounded-xl border border-emerald-500/35 bg-slate-950 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08),0_18px_50px_rgba(2,6,23,0.28)] cursor-crosshair"
      aria-label="Live network topology visualization"
      onClick={(event) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const { width, height } = getCanvasSize(canvas);
        const x = (event.clientX - rect.left) * (width / rect.width);
        const y = (event.clientY - rect.top) * (height / rect.height);

        if (isInteractive && onCanvasClick) {
          onCanvasClick(x, y);
          return;
        }
        if (!onNodeSelect || nodes.length === 0) return;
        const positions = buildLayout(nodes, width, height);
        nodes.forEach(node => {
          const position = positions.get(node.id);
          if (!position) return;
          const distance = Math.hypot(x - position.x, y - position.y);
          if (distance <= 30) onNodeSelect(node.id);
        });
      }}
    />
  );
};
