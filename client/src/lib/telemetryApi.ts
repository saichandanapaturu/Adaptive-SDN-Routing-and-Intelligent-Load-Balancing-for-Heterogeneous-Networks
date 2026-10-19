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

export interface TelemetrySnapshot {
  health: TelemetryHealth;
  switches: TelemetrySwitch[];
  ports: TelemetryPort[];
  summary: TelemetrySummary | null;
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

    if (!healthBody.statistics_received) {
      return { health: healthBody, switches: switchesBody.switches, ports: [], summary: null };
    }

    const [portsBody, summaryBody] = await Promise.all([
      getJson('/api/telemetry/ports', controller.signal, baseUrl),
      getJson('/api/telemetry/summary', controller.signal, baseUrl),
    ]);
    if (!isRecord(portsBody) || !Array.isArray(portsBody.ports) || !portsBody.ports.every(isPort)) {
      throw new TelemetryApiError('Telemetry ports response is malformed.', 'malformed');
    }
    if (!isSummary(summaryBody)) throw new TelemetryApiError('Telemetry summary response is malformed.', 'malformed');

    return { health: healthBody, switches: switchesBody.switches, ports: portsBody.ports, summary: summaryBody };
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
