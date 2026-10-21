import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchTelemetrySnapshot, TelemetryApiError } from './telemetryApi';

const health = (overrides: Record<string, unknown> = {}) => ({
  api_running: true,
  controller_connected: true,
  switches_connected: 1,
  statistics_received: true,
  data_status: 'fresh',
  stale_after_seconds: 5,
  ...overrides,
});

const port = {
  dpid: 1,
  port_no: 2,
  timestamp: '2026-10-19T08:00:10+00:00',
  rx_packets: 10,
  tx_packets: 8,
  rx_bytes: 1000,
  tx_bytes: 800,
  rx_errors: 0,
  tx_errors: 1,
  rx_dropped: 0,
  tx_dropped: 0,
  rx_packet_rate: 2,
  tx_packet_rate: 1,
  rx_byte_rate: 300,
  tx_byte_rate: 200,
};

function mockJson(...bodies: unknown[]) {
  const fetchMock = vi.fn(async () => {
    const body = bodies.shift();
    return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const controllerTopology = { nodes: [], links: [] };
const controllerEvents = { events: [] };
const controllerForwarding = { flows: [] };

describe('fetchTelemetrySnapshot', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('maps valid health, switch, port, and summary responses', async () => {
    const fetchMock = mockJson(
      health(),
      { switches: [{ dpid: 1, status: 'connected' }] },
      controllerTopology,
      controllerEvents,
      controllerForwarding,
      { data_status: 'fresh', ports: [port] },
      {
        switches_connected: 1,
        ports_with_statistics: 1,
        total_rx_byte_rate: 300,
        total_tx_byte_rate: 200,
        total_rx_packet_rate: 2,
        total_tx_packet_rate: 1,
        last_statistics_update: port.timestamp,
        data_status: 'fresh',
      },
    );
    const snapshot = await fetchTelemetrySnapshot({ baseUrl: 'http://127.0.0.1:8765' });
    expect(snapshot.ports[0].rx_byte_rate).toBe(300);
    expect(snapshot.switches[0].dpid).toBe(1);
    expect(snapshot.topology).toEqual(controllerTopology);
    expect(snapshot.events).toEqual([]);
    expect(snapshot.flows).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(7);
  });

  it('does not request or fabricate ports when the controller awaits its first sample', async () => {
    const fetchMock = mockJson(
      health({ statistics_received: false, data_status: 'unavailable' }),
      { switches: [{ dpid: 1, status: 'connected' }] },
      controllerTopology,
      controllerEvents,
      controllerForwarding,
    );
    const snapshot = await fetchTelemetrySnapshot({ baseUrl: 'http://127.0.0.1:8765' });
    expect(snapshot.ports).toEqual([]);
    expect(snapshot.summary).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it('preserves stale status from the backend', async () => {
    mockJson(
      health({ data_status: 'stale' }),
      { switches: [{ dpid: 1, status: 'connected' }] },
      controllerTopology,
      controllerEvents,
      controllerForwarding,
      { data_status: 'stale', ports: [port] },
      {
        switches_connected: 1,
        ports_with_statistics: 1,
        total_rx_byte_rate: 300,
        total_tx_byte_rate: 200,
        total_rx_packet_rate: 2,
        total_tx_packet_rate: 1,
        last_statistics_update: port.timestamp,
        data_status: 'stale',
      },
    );
    const snapshot = await fetchTelemetrySnapshot({ baseUrl: 'http://127.0.0.1:8765' });
    expect(snapshot.health.data_status).toBe('stale');
    expect(snapshot.summary?.data_status).toBe('stale');
  });

  it('reports API unavailability instead of substituting telemetry', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('connection refused'); }));
    await expect(fetchTelemetrySnapshot({ baseUrl: 'http://127.0.0.1:8765' })).rejects.toMatchObject({ kind: 'unavailable' } satisfies Partial<TelemetryApiError>);
  });

  it('rejects malformed responses instead of accepting fake values', async () => {
    mockJson({ api_running: true });
    await expect(fetchTelemetrySnapshot({ baseUrl: 'http://127.0.0.1:8765' })).rejects.toMatchObject({ kind: 'malformed' } satisfies Partial<TelemetryApiError>);
  });
});
