# AIFE Telemetry API

The telemetry API is served by the same Python process as the OS-Ken controller. It reads the existing `OpenFlowStatisticsCollector` instance; it does not create a second collector and does not generate values. The service binds to `127.0.0.1` by default so the internal telemetry port is not publicly exposed.

## Processes and configuration

- OS-Ken controller and telemetry API: `server/controller/osken_controller.py`
- OpenFlow counter/rate processing: `server/controller/statistics.py`
- HTTP API: `server/controller/telemetry_api.py`
- Default telemetry address: `http://127.0.0.1:8765`
- Override with `AIFE_TELEMETRY_HOST` (loopback only) and `AIFE_TELEMETRY_PORT`.
- Freshness threshold: 5 seconds by default; the current implementation reports stale data rather than pretending it is live.

The Express server continues to serve the dashboard separately. In default live mode the dashboard consumes controller-discovered topology, controller events, installed flow status, and OpenFlow counters from this API. It does not animate or fabricate controller packet delivery. Custom/generated modes remain frontend simulations and are labeled as configured topologies.

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

In default mode the Congestion Predictor's Model, Accuracy, and Lead Time cards
read `GET /api/telemetry/model`. They show `—` until a Random Forest model has
been trained from recorded controller telemetry, and never compute values in
the browser. Custom and generated topology modes retain their existing
illustrative behavior, show `N/A` for model metrics, and are labeled as
configured topology visualizations.

## Random Forest congestion model

Data flow: OVS switches → OpenFlow port counters → `statistics.py` rates →
`telemetry_store.py` SQLite history (`server/data/telemetry.sqlite3`, override
with `AIFE_TELEMETRY_DB`) → `congestion_model.py` features, labels, training,
and evaluation → `server/data/congestion_rf.joblib` + `congestion_metrics.json`
(override with `AIFE_MODEL_DIR`) → controller inference and path selection →
`/api/telemetry/model` → dashboard cards.

Congestion policy, defined in `congestion_model.py`:

- Link capacity 10 Mbit/s; `mininet/topology.py` sets `bw=10` on every link.
- A port sample is **congested** when TX utilization (`tx_byte_rate × 8 / 10 Mbit/s`) is ≥ 0.8.
- Prediction horizon 10 s: the label at time t is 1 if the same port is congested at any sample in (t, t + 10 s].
- A **warning** is a prediction with P(congested within horizon) ≥ 0.5.
- Features use the port's last 5 measured samples at or before t (TX/RX utilization, TX mean/max/delta/slope, drop delta, packet rates). Windows never span a gap > 3 s, and the first sample after a gap is discarded because its rates were not measured.

Collect real telemetry and train in one step from WSL (Ubuntu 22.04
recommended; prompts once for sudo):

```bash
bash scripts/train_on_mininet.sh            # MINUTES=40 for a longer run
```

It installs OS-Ken and scikit-learn into `~/.aife-venv`, starts the
controller, runs `mininet/collect_traffic.py` (UDP iperf ramps and bursts past
8 Mbit/s, abrupt bursts, and loads below the threshold, separated by idle
periods), and then trains. To train manually after collecting telemetry some
other way: `PYTHONPATH=. python3 -m server.controller.congestion_model train`.

### Simulated-traffic model (deployed dashboard)

The deployed dashboard has no controller, so its simulated views (the
reference topology shown when no controller is connected, and custom and
generated topologies) use a second model trained on simulated traffic:

```bash
python3 -m server.controller.simulated_training   # writes client/public/models/congestion_rf_simulated.json
```

`simulated_training.py` reproduces the dashboard's per-link traffic dynamics
(base drift and bursts, flow-route hotspots, peak-hour load floors, and Traffic
Surge Simulator surges), then runs the same labeling, chronological split,
accuracy, and lead-time code as above. The forest (60 trees, depth ≤ 10) is
exported as JSON and evaluated in the browser by
`client/src/lib/simulatedCongestionModel.ts`; tests check that browser features
and probabilities match Python and scikit-learn exactly. The cards label its
scores "simulated": they measure prediction of simulated traffic, not a real
network. Predicted Hotspots lists links with P(congested within 10 s) ≥ 0.5.

Training refuses to produce a model (exit code 2, JSON reason) when there are
fewer than 250 labeled rows, or when either split lacks enough congested and
uncongested rows. The running controller loads a new model file automatically.

- **Split:** rows are ordered by time; the latest 30% are the test set. Training rows whose label window reaches the test period (t + 10 s ≥ test start) are purged, so no test-period congestion labels a training row.
- **Accuracy:** `accuracy_score` of test-set warnings vs. test labels. Balanced accuracy, precision, recall, F1, and the confusion matrix are reported alongside it. Training accuracy is never reported.
- **Lead time:** for each congestion onset (a congested sample whose previous measured sample was not congested) in the test period, the first qualifying warning is the earliest test prediction ≥ 0.5 made strictly before the onset, within 10 s of it, and after the port's previous congested sample. Lead time = onset timestamp − first qualifying warning timestamp. The card shows the **median** in seconds over warned onsets; `events_evaluated` and `events_warned` give the detection count. Lead time is a measured quantity bounded by, but distinct from, the configured 10 s horizon. With no onsets or no warned onsets it is reported unavailable.

`GET /api/telemetry/model` returns `{"status": "unavailable", "reason": ...}`
(for example `model_missing`) or the stored metrics plus `inference`
(`ready` when the controller can predict) and `live_evaluation`.

`live_evaluation` scores the model's live predictions with the same policy:
every port sample is predicted, each prediction is scored once its 10 s
horizon has been observed, and each congestion onset whose warning window was
fully observed counts toward lead time. It reports `scored` (last
`window_predictions` = 600), `accuracy` (`null` until 50 are scored),
`events_evaluated`, `events_warned` (last 40 onsets), and
`median_lead_seconds`. It resets when the model file changes. The cards show
these rolling values once available ("live · last n=…") and the held-out test
values until then; simulated views do the same in the browser with the
simulated model ("live simulated").

### Path selection

The routing policy is unchanged: shortest operational hop count. When a flow
is installed or repaired, the controller enumerates the equal-hop operational
candidates. If every egress port on every candidate has a fresh prediction
(newest sample ≤ 5 s old, complete window, model loaded), candidates are ranked
by highest predicted port risk, then total risk; otherwise the existing
deterministic shortest path is used. Failed or unverified links are never
candidates. Each flow in `/api/telemetry/forwarding` reports
`route_selection` (`ml_ranked`, `shortest_path_fallback`, or `single_switch`)
and `predicted_risk`. Already-active flows are not pre-emptively moved when
predictions change; that is not implemented.

## Start

From the project root on Ubuntu/WSL, after installing OS-Ken, Mininet, and Open vSwitch:

```bash
# Terminal 1: controller + telemetry API (OS-Ken 4 removed osken-manager)
PYTHONPATH=. python3 -m server.controller.run_controller

# Terminal 2: Mininet topology
sudo python3 mininet/topology.py

# Terminal 3: generate traffic
sudo mnexec -a "$(pgrep -f 'mininet:.*h1' | head -n1)" ping -c 3 10.0.0.3
# Or use the Mininet CLI: h1 ping -c 3 h3
```

The controller enables OS-Ken's `observe_links` option (disabled by default) and uses topology discovery (`EventLinkAdd`/`EventLinkDelete`), OpenFlow 1.3 port status and port-description state, and switch lifecycle events. A link is routable only after both endpoint ports are verified up. Link deletion, port down/deletion, or switch disconnection marks it failed. A re-discovered link remains failed until fresh port reports confirm both sides up.

The controller learns hosts from packet source MAC addresses, floods initial/unknown-destination frames only to verified host-facing ports, computes simple paths over operational switch links, installs cookie-scoped OpenFlow rules, and waits for barriers before releasing the first packet. Failure handling removes AIFE rules, waits for barriers, then installs replacement routes; flows are reported blocked when no path exists or installation cannot be confirmed. Congestion and frontend prediction do not set physical link state.

The controller requests OpenFlow 1.3 port counters once per second. Use `ping` or `iperf` to make counters change. In the Mininet CLI, `link s1 s2 down` causes a detected fabric-link failure and `link s1 s2 up` restores it after both ports are verified operational.

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

`GET /api/telemetry/topology` returns the controller's discovered switches, learned hosts, and links. Link `status` is `healthy`, `warning` (discovery pending/unverified), or `failed`; detected physical links include both endpoint port numbers and `origin: "detected"`.

`GET /api/telemetry/events` returns recent controller events with stable IDs unique to the controller process. Event types include `link_failed`, `link_recovered`, `flow_rerouted`, and `flow_blocked`; reroute events are emitted only after replacement forwarding rules are barrier-confirmed.

`GET /api/telemetry/forwarding` returns learned MAC-pair flows and their current status/path. An `active` flow means its OpenFlow rules were installed and acknowledged; it is not a frontend animation.

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

These tests use fixed mock counter objects and state providers to validate response shape, local-port filtering, rate calculations, stale data, empty state, topology/event/forwarding endpoints, and summary aggregation. Routing and controller state tests use deterministic link and fake datapath objects; they are not live Mininet/OVS/OS-Ken integration tests.
