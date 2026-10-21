export type TelemetryDataStatus = 'unavailable' | 'fresh' | 'stale';

export interface TelemetryHealth {
  api_running: boolean;
  controller_connected: boolean;
  switches_connected: number;
  statistics_received: boolean;
  data_status: TelemetryDataStatus;
  stale_after_seconds: number;
}

export interface TelemetrySwitch {
  dpid: number;
  status: 'connected' | string;
}

export interface TelemetryPort {
  dpid: number;
  port_no: number;
  timestamp: string;
  rx_packets: number;
  tx_packets: number;
  rx_bytes: number;
  tx_bytes: number;
  rx_errors: number;
  tx_errors: number;
  rx_dropped: number;
  tx_dropped: number;
  rx_packet_rate: number;
  tx_packet_rate: number;
  rx_byte_rate: number;
  tx_byte_rate: number;
}

export interface TelemetrySummary {
  switches_connected: number;
  ports_with_statistics: number;
  total_rx_byte_rate: number;
  total_tx_byte_rate: number;
  total_rx_packet_rate: number;
  total_tx_packet_rate: number;
  last_statistics_update: string | null;
  data_status: TelemetryDataStatus;
}

export interface TelemetryTopologyNode {
  id: string;
  label: string;
  type: 'switch' | 'host';
  status: string;
  x: number;
  y: number;
  trafficLevel: number;
}

export interface TelemetryTopologyLink {
  source: string;
  target: string;
  source_port?: number;
  target_port?: number;
  bandwidth: number;
  trafficLevel: number;
  status: 'healthy' | 'warning' | 'critical' | 'failed';
  reason: string;
  origin: 'detected';
}

export interface TelemetryControllerEvent {
  id: string;
  type: string;
  timestamp: string;
  [key: string]: unknown;
}

export interface TelemetryForwardedFlow {
  source_mac: string;
  destination_mac: string;
  source_dpid: number;
  source_port: number;
  destination_dpid: number;
  destination_port: number;
  path: number[];
  status: 'active' | 'blocked' | 'pending';
  blocked_reason: string | null;
}

export interface TelemetryLeadTime {
  status: 'available' | 'unavailable';
  reason: string | null;
  statistic: 'median';
  unit: 'seconds';
  median_seconds: number | null;
  mean_seconds: number | null;
  events_evaluated: number;
  events_warned: number;
}

/** Random Forest status and held-out evaluation from /api/telemetry/model. */
export interface TelemetryModelStatus {
  model_type: 'random_forest';
  status: 'trained' | 'unavailable';
  reason: string | null;
  inference?: string;
  trained_at?: string;
  split?: { test_rows: number; train_rows: number; test_start: string; test_end: string };
  evaluation?: {
    accuracy: number;
    balanced_accuracy: number;
    precision: number;
    recall: number;
    f1: number;
  };
  lead_time?: TelemetryLeadTime;
}

export interface TelemetrySnapshot {
  health: TelemetryHealth;
  switches: TelemetrySwitch[];
  ports: TelemetryPort[];
  summary: TelemetrySummary | null;
  topology: { nodes: TelemetryTopologyNode[]; links: TelemetryTopologyLink[] };
  events: TelemetryControllerEvent[];
  flows: TelemetryForwardedFlow[];
}

export class TelemetryApiError extends Error {
  readonly kind: 'unavailable' | 'malformed' | 'timeout';

  constructor(message: string, kind: TelemetryApiError['kind']) {
    super(message);
    this.name = 'TelemetryApiError';
    this.kind = kind;
  }
}

const DEFAULT_TIMEOUT_MS = 2500;

function apiBaseUrl() {
  const configured = import.meta.env.VITE_AIFE_TELEMETRY_API_URL as string | undefined;
  return (configured || 'http://127.0.0.1:8765').replace(/\/$/, '');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isHealth(value: unknown): value is TelemetryHealth {
  return isRecord(value)
    && typeof value.api_running === 'boolean'
    && typeof value.controller_connected === 'boolean'
    && isFiniteNumber(value.switches_connected)
    && typeof value.statistics_received === 'boolean'
    && (value.data_status === 'unavailable' || value.data_status === 'fresh' || value.data_status === 'stale')
    && isFiniteNumber(value.stale_after_seconds);
}

function isPort(value: unknown): value is TelemetryPort {
  if (!isRecord(value)) return false;
  const requiredNumbers = [
    'dpid', 'port_no', 'rx_packets', 'tx_packets', 'rx_bytes', 'tx_bytes',
    'rx_errors', 'tx_errors', 'rx_dropped', 'tx_dropped', 'rx_packet_rate',
    'tx_packet_rate', 'rx_byte_rate', 'tx_byte_rate',
  ];
  return requiredNumbers.every(field => isFiniteNumber(value[field])) && typeof value.timestamp === 'string';
}

function isSwitch(value: unknown): value is TelemetrySwitch {
  return isRecord(value) && isFiniteNumber(value.dpid) && typeof value.status === 'string';
}

function isSummary(value: unknown): value is TelemetrySummary {
  if (!isRecord(value)) return false;
  const numericFields = [
    'switches_connected', 'ports_with_statistics', 'total_rx_byte_rate',
    'total_tx_byte_rate', 'total_rx_packet_rate', 'total_tx_packet_rate',
  ];
  return numericFields.every(field => isFiniteNumber(value[field]))
    && (value.last_statistics_update === null || typeof value.last_statistics_update === 'string')
    && (value.data_status === 'unavailable' || value.data_status === 'fresh' || value.data_status === 'stale');
}

function isTopologyNode(value: unknown): value is TelemetryTopologyNode {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.label === 'string'
    && (value.type === 'switch' || value.type === 'host')
    && typeof value.status === 'string'
    && isFiniteNumber(value.x)
    && isFiniteNumber(value.y)
    && isFiniteNumber(value.trafficLevel);
}

function isTopologyLink(value: unknown): value is TelemetryTopologyLink {
  return isRecord(value)
    && typeof value.source === 'string'
    && typeof value.target === 'string'
    && isFiniteNumber(value.bandwidth)
    && isFiniteNumber(value.trafficLevel)
    && ['healthy', 'warning', 'critical', 'failed'].includes(String(value.status))
    && typeof value.reason === 'string'
    && value.origin === 'detected';
}

function isControllerEvent(value: unknown): value is TelemetryControllerEvent {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.type === 'string'
    && typeof value.timestamp === 'string';
}

function isForwardedFlow(value: unknown): value is TelemetryForwardedFlow {
  return isRecord(value)
    && typeof value.source_mac === 'string'
    && typeof value.destination_mac === 'string'
    && isFiniteNumber(value.source_dpid)
    && isFiniteNumber(value.source_port)
    && isFiniteNumber(value.destination_dpid)
    && isFiniteNumber(value.destination_port)
    && Array.isArray(value.path)
    && value.path.every(isFiniteNumber)
    && ['active', 'blocked', 'pending'].includes(String(value.status))
    && (value.blocked_reason === null || typeof value.blocked_reason === 'string');
}

function isProbability(value: unknown): value is number {
  return isFiniteNumber(value) && value >= 0 && value <= 1;
}

function isLeadTime(value: unknown): value is TelemetryLeadTime {
  if (!isRecord(value) || !isFiniteNumber(value.events_evaluated) || !isFiniteNumber(value.events_warned)) return false;
  if (value.status === 'available') {
    return isFiniteNumber(value.median_seconds) && value.median_seconds >= 0 && isFiniteNumber(value.mean_seconds);
  }
  return value.status === 'unavailable';
}

function isModelStatus(value: unknown): value is TelemetryModelStatus {
  if (!isRecord(value) || value.model_type !== 'random_forest') return false;
  if (value.status === 'unavailable') return true;
  return value.status === 'trained'
    && isRecord(value.evaluation)
    && ['accuracy', 'balanced_accuracy', 'precision', 'recall', 'f1'].every(field => isProbability((value.evaluation as Record<string, unknown>)[field]))
    && isRecord(value.split)
    && isFiniteNumber(value.split.test_rows)
    && isLeadTime(value.lead_time);
}

async function getJson(path: string, signal: AbortSignal, baseUrl: string): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new TelemetryApiError('Telemetry request timed out.', 'timeout');
    }
    throw new TelemetryApiError('Telemetry API is unavailable.', 'unavailable');
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new TelemetryApiError('Telemetry API returned malformed JSON.', 'malformed');
  }

  if (!response.ok) {
    const message = isRecord(body) && typeof body.message === 'string' ? body.message : `Telemetry API returned HTTP ${response.status}.`;
    throw new TelemetryApiError(message, response.status === 503 ? 'unavailable' : 'malformed');
  }
  return body;
}

export async function fetchTelemetrySnapshot(options?: { timeoutMs?: number; baseUrl?: string }): Promise<TelemetrySnapshot> {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const baseUrl = options?.baseUrl ?? apiBaseUrl();
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const healthBody = await getJson('/api/telemetry/health', controller.signal, baseUrl);
    if (!isHealth(healthBody)) throw new TelemetryApiError('Telemetry health response is malformed.', 'malformed');

    const switchesBody = await getJson('/api/telemetry/switches', controller.signal, baseUrl);
    if (!isRecord(switchesBody) || !Array.isArray(switchesBody.switches) || !switchesBody.switches.every(isSwitch)) {
      throw new TelemetryApiError('Telemetry switches response is malformed.', 'malformed');
    }

    const [topologyBody, eventsBody, forwardingBody] = await Promise.all([
      getJson('/api/telemetry/topology', controller.signal, baseUrl),
      getJson('/api/telemetry/events', controller.signal, baseUrl),
      getJson('/api/telemetry/forwarding', controller.signal, baseUrl),
    ]);
    if (!isRecord(topologyBody)
      || !Array.isArray(topologyBody.nodes) || !topologyBody.nodes.every(isTopologyNode)
      || !Array.isArray(topologyBody.links) || !topologyBody.links.every(isTopologyLink)) {
      throw new TelemetryApiError('Telemetry topology response is malformed.', 'malformed');
    }
    if (!isRecord(eventsBody) || !Array.isArray(eventsBody.events) || !eventsBody.events.every(isControllerEvent)) {
      throw new TelemetryApiError('Telemetry events response is malformed.', 'malformed');
    }
    if (!isRecord(forwardingBody) || !Array.isArray(forwardingBody.flows) || !forwardingBody.flows.every(isForwardedFlow)) {
      throw new TelemetryApiError('Telemetry forwarding response is malformed.', 'malformed');
    }

    if (!healthBody.statistics_received) {
      return {
        health: healthBody,
        switches: switchesBody.switches,
        ports: [],
        summary: null,
        topology: topologyBody as TelemetrySnapshot['topology'],
        events: eventsBody.events,
        flows: forwardingBody.flows,
      };
    }

    const [portsBody, summaryBody] = await Promise.all([
      getJson('/api/telemetry/ports', controller.signal, baseUrl),
      getJson('/api/telemetry/summary', controller.signal, baseUrl),
    ]);
    if (!isRecord(portsBody) || !Array.isArray(portsBody.ports) || !portsBody.ports.every(isPort)) {
      throw new TelemetryApiError('Telemetry ports response is malformed.', 'malformed');
    }
    if (!isSummary(summaryBody)) throw new TelemetryApiError('Telemetry summary response is malformed.', 'malformed');

    return {
      health: healthBody,
      switches: switchesBody.switches,
      ports: portsBody.ports,
      summary: summaryBody,
      topology: topologyBody as TelemetrySnapshot['topology'],
      events: eventsBody.events,
      flows: forwardingBody.flows,
    };
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export async function fetchModelStatus(options?: { timeoutMs?: number; baseUrl?: string }): Promise<TelemetryModelStatus> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), options?.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  try {
    const body = await getJson('/api/telemetry/model', controller.signal, options?.baseUrl ?? apiBaseUrl());
    if (!isModelStatus(body)) throw new TelemetryApiError('Telemetry model response is malformed.', 'malformed');
    return body;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
