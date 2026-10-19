# AIFE Telemetry API

The telemetry API is served by the same Python process as the OS-Ken controller. It reads the existing `OpenFlowStatisticsCollector` instance; it does not create a second collector and does not generate values. The service binds to `127.0.0.1` by default so the internal telemetry port is not publicly exposed.

## Processes and configuration

- OS-Ken controller and telemetry API: `server/controller/osken_controller.py`
- OpenFlow counter/rate processing: `server/controller/statistics.py`
- HTTP API: `server/controller/telemetry_api.py`
- Default telemetry address: `http://127.0.0.1:8765`
- Override with `AIFE_TELEMETRY_HOST` (loopback only) and `AIFE_TELEMETRY_PORT`.
- Freshness threshold: 5 seconds by default; the current implementation reports stale data rather than pretending it is live.

The Express server continues to serve the existing dashboard separately. The dashboard is not connected to this API in this step.

## Start the integrated dashboard

The default React adapter polls `http://127.0.0.1:8765` every two seconds when
the default dashboard topology is active. To point it at another internal
telemetry address during development, set the Vite variable before starting
the dashboard:

```bash
VITE_AIFE_TELEMETRY_API_URL=http://127.0.0.1:8765 pnpm run dev
```

Run the dashboard in a separate terminal after starting the controller:

```bash
pnpm run dev
```

The frontend shows `Connecting to API`, `Awaiting statistics`, `OpenFlow live`,
`OpenFlow stale`, or `Backend unavailable` in the existing header status area.
It uses real OpenFlow port counters for the Port Statistics table when samples
exist. Because the API does not yet provide a verified port-to-link mapping,
the topology link traffic values and link summary remain unpopulated in
default mode rather than being inferred from port numbers.

The Prediction and Reroute panels remain in the existing layout, but default
real-telemetry mode does not claim Random Forest predictions or controller
reroutes. Custom and generated topology modes retain their existing
illustrative behavior and are labeled as configured topology visualizations.

## Start

From the project root on Ubuntu/WSL, after installing OS-Ken, Mininet, and Open vSwitch:

```bash
# Terminal 1: controller + telemetry API
PYTHONPATH=. osken-manager server/controller/osken_controller.py

# Terminal 2: Mininet topology
sudo python3 mininet/topology.py

# Terminal 3: generate traffic
sudo mnexec -a "$(pgrep -f 'mininet:.*h1' | head -n1)" ping -c 3 10.0.0.3
# Or use the Mininet CLI: h1 ping -c 3 h3
```

The controller requests OpenFlow 1.3 port counters once per second. Use `ping` or `iperf` to make counters change.

## Endpoints

```bash
curl http://127.0.0.1:8765/api/telemetry/health
curl http://127.0.0.1:8765/api/telemetry/switches
curl http://127.0.0.1:8765/api/telemetry/ports
curl http://127.0.0.1:8765/api/telemetry/summary
```

`GET /api/telemetry/health` distinguishes service liveness, controller/switch connectivity, statistics receipt, and data freshness:

```json
{
  "api_running": true,
  "controller_connected": true,
  "switches_connected": 4,
  "statistics_received": true,
  "data_status": "fresh",
  "stale_after_seconds": 5.0
}
```

`GET /api/telemetry/switches` returns connected DPID metadata:

```json
{"switches":[{"dpid":1,"status":"connected"}]}
```

`GET /api/telemetry/ports` returns the latest non-local port samples. It includes cumulative counters and elapsed-time rates: `dpid`, `port_no`, `timestamp`, RX/TX packets, bytes, errors, dropped packets, and RX/TX packet/byte rates. `OFPP_LOCAL` (`4294967294`) is excluded. If no OpenFlow reply has been received yet, it returns HTTP `503` with `statistics_unavailable`.

`GET /api/telemetry/summary` returns totals derived only from the latest collected samples:

```json
{
  "switches_connected": 4,
  "ports_with_statistics": 8,
  "total_rx_byte_rate": 1200.0,
  "total_tx_byte_rate": 980.0,
  "total_rx_packet_rate": 12.0,
  "total_tx_packet_rate": 10.0,
  "last_statistics_update": "2026-10-19T08:00:10+00:00",
  "data_status": "fresh"
}
```

The numeric values above are schema examples only. The running service returns values from actual OpenFlow replies. `data_status` is `unavailable` before the first reply, `fresh` within the freshness threshold, and `stale` after statistics stop arriving. If the controller process is unavailable, the telemetry endpoint is unavailable because both run together; a refused connection must not be interpreted as healthy telemetry.

## Tests

Run deterministic API tests from the project root:

```bash
python3 -m unittest server.controller.test_telemetry_api -v
```

These tests use fixed mock counter objects to validate response shape, local-port filtering, rate calculations, stale data, empty state, and summary aggregation. They are not live Mininet/OVS/OS-Ken integration tests.
