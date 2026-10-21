# AIFE Telemetry API

The telemetry API is served by the same Python process as the OS-Ken controller. It reads the existing `OpenFlowStatisticsCollector` instance; it does not create a second collector and does not generate values. The service binds to `127.0.0.1` by default so the internal telemetry port is not publicly exposed.

## Processes and configuration

- OS-Ken controller and telemetry API: `server/controller/osken_controller.py`
- OpenFlow counter/rate processing: `server/controller/statistics.py`
- HTTP API: `server/controller/telemetry_api.py`
- Default telemetry address: `http://127.0.0.1:8765`
- Override with `AIFE_TELEMETRY_HOST` (loopback only) and `AIFE_TELEMETRY_PORT`.
- Freshness threshold: 5 seconds by default; the current implementation reports stale data rather than pretending it is live.
- Historical SQLite storage: `server/controller/telemetry_storage.py`
- Default database path: `~/.local/share/aife/telemetry.sqlite3`
- Override the database path with `AIFE_TELEMETRY_DB_PATH`.
- Historical sample retention defaults to 30 days; override with the positive integer `AIFE_TELEMETRY_RETENTION_DAYS`.
- OS-Ken topology discovery and controller integration: `server/controller/osken_controller.py`
- Verified discovery dependency: `server/controller/requirements-sdn.txt` (`os-ken==4.2.2`)

For example, configure the controller before starting it:

```bash
export AIFE_TELEMETRY_DB_PATH=/var/lib/aife/telemetry.sqlite3
export AIFE_TELEMETRY_RETENTION_DAYS=14
PYTHONPATH=. osken-manager --observe-links server/controller/osken_controller.py
```

The controller creates the database and schema automatically. It keeps the
existing in-memory latest-sample collector for API responses and queues each
OpenFlow reply's real port samples to a bounded background SQLite writer.
SQLite writes and retention cleanup therefore do not run in the OpenFlow
statistics event handler. A database initialization or write failure is
logged; the controller continues collecting in-memory samples. If the bounded
writer queue fills, the dropped batch is logged rather than silently treated
as persisted.

The `port_samples` table stores UTC `sample_timestamp`, `dpid`, `port_no`,
RX/TX byte and packet counters, their derived byte and packet rates, errors,
and dropped counters. It has indexes on `(dpid, port_no, sample_timestamp)`
and on `sample_timestamp`. Rows are append-only until retention removes those
older than the configured number of days; cleanup runs at writer startup and
approximately hourly. `OFPP_LOCAL` is excluded before collection and again
before insertion.

Historical rows are currently available through the Python
`HistoricalTelemetryStore.history()` method only; this change does not add an
HTTP history endpoint and does not change existing API response shapes. The
database contains only samples received from OpenFlow replies. It does not
store simulated frontend telemetry. Rates for a port's first received sample
are zero because no prior counter sample exists to calculate an interval rate.

The Express server continues to serve the existing dashboard separately. Its
default-topology adapter polls this API for current switch and port telemetry;
historical rows remain server-side and are not exposed to the dashboard.

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
exist. The topology endpoint reports observed switch-port peers, but the
dashboard does not visualize that mapping and link traffic values remain
unpopulated rather than being inferred from port numbers.

The Prediction and Reroute panels remain in the existing layout, but default
real-telemetry mode does not claim Random Forest predictions or controller
reroutes. Custom and generated topology modes retain their existing
illustrative behavior and are labeled as configured topology visualizations.
An offline, experimental training tool that reads the persisted telemetry is
documented in [CONGESTION_MODEL.md](./CONGESTION_MODEL.md); it is not a
deployed prediction service.

## Start

From the project root on Ubuntu/WSL, after installing OS-Ken, Mininet, and Open vSwitch:

```bash
# Terminal 1: controller + telemetry API
PYTHONPATH=. osken-manager --observe-links server/controller/osken_controller.py

# Terminal 2: Mininet topology
sudo python3 mininet/topology.py

# Terminal 3: generate traffic
sudo mnexec -a "$(pgrep -f 'mininet:.*h1' | head -n1)" ping -c 3 10.0.0.3
# Or use the Mininet CLI: h1 ping -c 3 h3
```

The controller requests OpenFlow 1.3 port counters once per second. Use `ping` or `iperf` to make counters change.

### Enable live topology discovery

The controller loads OS-Ken's `Switches` topology application as a context.
Its LLDP link discovery is disabled by default, so launch OS-Ken with
`--observe-links` to enable LLDP transmission and switch-to-switch link events.
The default `--install-lldp-flow` behavior installs the framework's LLDP
discovery flow; this is not a traffic-forwarding or rerouting rule.
The pinned Python dependency supplies the verified OS-Ken APIs, but the
authoring environment's OS-Ken 4.2.2 wheel did not include an
`osken-manager` executable. Use a deployment environment that provides that
launcher (`command -v osken-manager`) to run the command below; a standalone
Python package install in this Windows environment was not sufficient to
start the controller.

```bash
python3 -m pip install -r server/controller/requirements-sdn.txt
PYTHONPATH=. osken-manager --observe-links server/controller/osken_controller.py
```

The controller handles OS-Ken switch, port, link, and host events and refreshes
the framework's topology snapshot every two seconds. Switch-to-switch links
come only from OS-Ken's LLDP discovery state. A port is marked
`host_facing` only when OS-Ken has actually observed a host attached there;
other non-link ports remain `unknown`. No host or peer is inferred from the
static Mininet topology. The topology state uses a 15-second freshness limit;
stale links are separated from active links and must not be used for future
path decisions. If LLDP is disabled, the endpoint reports `disabled`.

## Endpoints

```bash
curl http://127.0.0.1:8765/api/telemetry/health
curl http://127.0.0.1:8765/api/telemetry/switches
curl http://127.0.0.1:8765/api/telemetry/ports
curl http://127.0.0.1:8765/api/telemetry/summary
curl http://127.0.0.1:8765/api/telemetry/topology
curl "http://127.0.0.1:8765/api/telemetry/route?source=10.0.0.1&destination=10.0.0.3"
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

`GET /api/telemetry/topology` is additive; it does not change any existing
response contract. It returns discovered switch ports, directed switch-to-
switch links, observed host MAC/IP attachments, observation timestamps, and
discovery status:

```json
{
  "discovery_enabled": true,
  "discovery_status": "fresh",
  "link_discovery_status": "fresh",
  "observed_at": "2026-10-19T08:00:10+00:00",
  "stale_after_seconds": 15.0,
  "last_error": null,
  "switches": [{
    "dpid": 1,
    "status": "connected",
    "observed_at": "2026-10-19T08:00:10+00:00",
    "ports": [{
      "port_no": 2,
      "role": "switch_link",
      "observed_at": "2026-10-19T08:00:10+00:00",
      "peers": [{"dpid": 2, "port_no": 1}],
      "stale_peers": []
    }]
  }],
  "hosts": [{
    "host_id": "00:00:00:00:00:01",
    "dpid": 1,
    "port_no": 1,
    "ipv4": ["10.0.0.1"],
    "ipv6": [],
    "observed_at": "2026-10-19T08:00:10+00:00"
  }],
  "links": [{
    "src_dpid": 1,
    "src_port_no": 2,
    "dst_dpid": 2,
    "dst_port_no": 1,
    "observed_at": "2026-10-19T08:00:10+00:00",
    "status": "fresh"
  }],
  "stale_links": [],
  "rejected_link_events": 0
}
```

Each LLDP direction is represented independently. Port roles are `switch_link`,
`host_facing` (observed by OS-Ken host discovery), `stale_switch_link`, or
`unknown`; an unknown port is not presumed to connect to a host. `discovery_status` is `disabled`,
`awaiting_discovery`, `unavailable`, `fresh`, or `stale`. The separate
`link_discovery_status` is `disabled`, `unavailable`, `awaiting_links`,
`fresh`, or `stale`; a fresh OS-Ken query with an empty link list remains
`awaiting_links`, not a claim that any switch-to-switch link was discovered.
If discovery has not
yet succeeded, `observed_at` is null; query failures are reported in
`last_error`. Stale links are not included in `links` and are returned only in
`stale_links`. Timestamps indicate when the controller observed the OS-Ken
topology table, not the exact time an LLDP frame crossed the link.

Topology data is ephemeral and is rebuilt from live OS-Ken events and queries;
it is not persisted. LLDP discovery depends on switch support/configuration,
controller connectivity, and the `--observe-links` option. Host discovery is
packet-driven and does not guarantee that every host-facing port will be
identified. Step 4A adds route recommendations but does not install forwarding
rules or reroute traffic. The dashboard UI remains unchanged and does not yet
visualize the topology or recommendation endpoints.

`GET /api/telemetry/route?source=<endpoint>&destination=<endpoint>` returns a
recommendation only. A numeric endpoint is interpreted as a switch DPID;
otherwise the value must exactly identify one observed host MAC or IP address.
No `h1`/`h3` name-to-MAC inference is performed. If a host attachment has not
been learned from OS-Ken, host-to-host routing is unavailable. Switch-to-switch
recommendations remain available when fresh directed links exist.

The selector enumerates up to eight deterministic shortest-hop simple paths.
It preserves each discovered direction and the source output/destination
input port numbers, rejects disconnected or stale topology and malformed
links, and prevents switch loops. Ties are broken by DPID sequence and then
port/link sequence. A missing route returns `no_path`; absent host attachment
or stale topology returns `unavailable`.

Each candidate has normalized cost components in `[0, 1]`; lower is better.
The default weights are 0.55 for relative measured byte rate, 0.30 for
future-congestion probability, and 0.15 for hop count. Relative byte rate is
the current aggregate RX+TX rate for the discovered link's source port divided
by the maximum valid such rate among the candidate links. The prediction term
is the mean compatible model probability for those link output ports. Hop
count is the path's link count divided by the maximum candidate path length.
For each route, unknown terms are omitted and remaining configured weights
are renormalized to sum to one. This relative byte-rate score is not
utilization and is never divided by an assumed or experimental capacity.
Telemetry is associated only through the verified directed source DPID/port
mapping. Stale/missing samples are omitted. RX+TX is a port-counter aggregate,
not a unidirectional link load, and may reflect duplicated traffic across
ports; it is only a relative signal. Per-signal output includes sample/link
coverage so partial observations are visible.

Hysteresis defaults to a minimum absolute cost improvement of `0.05` and a
10-second cooldown before recommending a different still-valid route. If the
previous path becomes invalid, the best remaining route is returned
immediately. Route configuration is available through these environment
variables: `AIFE_ROUTE_MAX_CANDIDATES`, `AIFE_ROUTE_TELEMETRY_WEIGHT`,
`AIFE_ROUTE_PREDICTION_WEIGHT`, `AIFE_ROUTE_HOP_WEIGHT`,
`AIFE_ROUTE_TELEMETRY_MAX_AGE_SECONDS`,
`AIFE_ROUTE_TOPOLOGY_MAX_AGE_SECONDS`, `AIFE_ROUTE_MODEL_MAX_AGE_SECONDS`,
`AIFE_ROUTE_MINIMUM_IMPROVEMENT`, and `AIFE_ROUTE_COOLDOWN_SECONDS`.

The endpoint response contains `status`, `source`, `destination`,
`candidate_paths`, `selected_path`, `signals_used`, `unavailable_signals`,
`decision_timestamp`, `reason`, and `recommendation_only`. Each path lists
switches, directed links with ports, endpoint attachments when applicable,
the per-signal `cost_breakdown`, and `total_cost`. `recommendation_only` is
always true in this step; no OpenFlow FlowMod is sent.

The route selector may load only the configured local
`AIFE_ML_MODEL_PATH` artifact created by the Step 2 training module (default
`~/.local/share/aife/models/port-congestion.joblib`). It verifies artifact
type/version, exact ordered feature schema, target metadata, training age
(30-day default), and latest feature timestamp (5-second default) before
using predictions. Missing, stale, incompatible, unreadable, or unscorable
models are reported under `unavailable_signals`; measured-rate and
hop-only recommendations remain possible. Joblib is a Python deserialization
format: the configured model path must be a trusted local file, never an
upload. Predictions represent the Step 2 experimental port-rate target and
are not physical-capacity estimates.

Example schema (values illustrative, not live measurements):

```json
{
  "status": "selected",
  "source": "10.0.0.1",
  "destination": "10.0.0.3",
  "candidate_paths": [{
    "switches": [1, 4],
    "directed_links": [{
      "src_dpid": 1,
      "src_port_no": 2,
      "dst_dpid": 4,
      "dst_port_no": 1,
      "observed_at": "2026-10-19T08:00:10+00:00"
    }],
    "source_attachment": {"host_id": "00:00:00:00:00:01", "dpid": 1, "port_no": 1},
    "destination_attachment": {"host_id": "00:00:00:00:00:03", "dpid": 4, "port_no": 3},
    "cost_breakdown": {
      "signals_used": ["measured_byte_rate", "hop_count"],
      "unavailable_signals": ["future_congestion_probability"],
      "signals": {
        "measured_byte_rate": {
          "raw_mean": 1000.0,
          "normalized_score": 1.0,
          "configured_weight": 0.55,
          "effective_weight": 0.7857142857,
          "weighted_contribution": 0.7857142857,
          "observations_used": 1,
          "links_total": 1,
          "coverage_ratio": 1.0
        },
        "hop_count": {
          "raw_mean": 1.0,
          "normalized_score": 1.0,
          "configured_weight": 0.15,
          "effective_weight": 0.2142857143,
          "weighted_contribution": 0.2142857143,
          "observations_used": 1,
          "links_total": 1,
          "coverage_ratio": 1.0
        }
      },
      "active_configured_weight_sum": 0.7
    },
    "total_cost": 1.0
  }],
  "selected_path": {
    "switches": [1, 4],
    "directed_links": [{
      "src_dpid": 1,
      "src_port_no": 2,
      "dst_dpid": 4,
      "dst_port_no": 1,
      "observed_at": "2026-10-19T08:00:10+00:00"
    }],
    "source_attachment": {"host_id": "00:00:00:00:00:01", "dpid": 1, "port_no": 1},
    "destination_attachment": {"host_id": "00:00:00:00:00:03", "dpid": 4, "port_no": 3},
    "cost_breakdown": {
      "signals_used": ["measured_byte_rate", "hop_count"],
      "unavailable_signals": ["future_congestion_probability"],
      "signals": {
        "measured_byte_rate": {
          "raw_mean": 1000.0,
          "normalized_score": 1.0,
          "configured_weight": 0.55,
          "effective_weight": 0.7857142857,
          "weighted_contribution": 0.7857142857,
          "observations_used": 1,
          "links_total": 1,
          "coverage_ratio": 1.0
        },
        "hop_count": {
          "raw_mean": 1.0,
          "normalized_score": 1.0,
          "configured_weight": 0.15,
          "effective_weight": 0.2142857143,
          "weighted_contribution": 0.2142857143,
          "observations_used": 1,
          "links_total": 1,
          "coverage_ratio": 1.0
        }
      },
      "active_configured_weight_sum": 0.7
    },
    "total_cost": 1.0
  },
  "signals_used": ["measured_byte_rate", "hop_count"],
  "unavailable_signals": {
    "physical_utilization": "No explicit link capacity is configured; rate is not treated as utilization.",
    "future_congestion_prediction": "No compatible congestion model is configured."
  },
  "decision_timestamp": "2026-10-19T08:00:10+00:00",
  "reason": "Lowest-cost candidate selected; recommendation only.",
  "recommendation_only": true
}
```

## Tests

Run the telemetry, storage, ML, topology, and routing tests from the project root:

```bash
python3 -m unittest \
  server.controller.test_telemetry_api \
  server.controller.test_telemetry_storage \
  server.controller.test_congestion_model \
  server.controller.test_topology_discovery \
  server.controller.test_routing -v
```

The API tests use fixed mock counter objects to validate response shape,
local-port filtering, rate calculations, stale data, empty state, and summary
aggregation. The storage tests use deterministic `PortStatistics` fixtures
and temporary SQLite databases to validate schema/index creation, persistence,
ordered history, bound query values, retention, local-port exclusion, and the
background writer. Topology/API tests use fake events and deterministic
fixtures; they validate serialization and state transitions but are not live
LLDP, Mininet, OVS, or OS-Ken integration tests. Route tests use explicitly
synthetic topology and telemetry fixtures; they test recommendation logic
only, not real forwarding or network behavior.
