# Experimental port-congestion predictor

This is an offline, experimental training/prediction tool. It is not part of
the OS-Ken event loop, does not affect forwarding, and is not a prediction
service. The dashboard remains unchanged and must not describe this artifact
as a deployed model.

## Data source and target

The module reads rows through `HistoricalTelemetryStore.history()` from the
Step 1 `port_samples` SQLite table. It reads persisted OpenFlow samples only;
frontend simulation values and test fixtures are not used for a real training
run. Storage timestamps are normalized to UTC. The model will return
`insufficient_data` rather than fabricate a model when the data checks or
chronological split cannot support training.

For each switch port and observation time `t`, the target is:

```text
1 if any later recorded sample in (t, t + horizon] has
    rx_byte_rate + tx_byte_rate > congestion_threshold_bytes_per_second
0 otherwise, if the port has a recorded sample at or after t + horizon
unlabeled if there is no sample by the end of the horizon or there are no
    later observations inside the horizon
```

Rates are bytes per second, derived by the Step 1 collector from counter
differences. The default threshold is `10 * 1024 * 1024` bytes/second
(10 MiB/s), and the default future horizon is 10 seconds. These defaults are
experimental examples, not link-capacity values. The threshold is not a
percentage and is not claimed to represent physical congestion unless an
operator independently configures it against known capacity.

RX plus TX is a port-level measure. Without switch-port-to-link mapping,
these values can include ingress/egress duplication and cannot identify a
physical link's utilization. Port rates may be zero for the first sample
after controller startup because there is no prior counter sample for the
collector to calculate a rate.

## Features and leakage controls

The model uses current and lagged RX/TX byte rates, their totals, a trailing
three-observation mean and maximum of the combined rate, and a rate-change
feature from the current observation to the oldest lag. Every feature is
constructed only from that port's samples at or before `t`. Three earlier
samples are required by default; rows without the necessary context or a
complete future window are excluded and counted in diagnostics. Missing,
non-finite, duplicate `(DPID, port, UTC timestamp)`, and out-of-order samples
are counted; invalid and duplicate rows are not used.

The split is chronological by observation timestamp. The newest portion is
held out for testing, while training rows whose future label window reaches
the test period are purged. The Random Forest is fit only on the remaining
training rows. There is no random train/test split or preprocessing fit on
held-out data.

Training requires enough labeled observations and both classes in each split.
If a split has only one class, evaluation is reported as unavailable and no
artifact is written. Otherwise the result includes train/test class counts,
confusion matrices, congested-class precision/recall/F1, balanced accuracy,
and a majority-class baseline.

## Dependencies and commands

Install the optional model dependency from the repository root:

```bash
python -m pip install -r server/controller/requirements-ml.txt
```

The controller has already collected real samples into the configured Step 1
database before training. The command is explicit and does not run inside the
controller:

```bash
python -m server.controller.congestion_model train
python -m server.controller.congestion_model predict
```

Configuration is available as environment variables:

| Variable | Default | Meaning |
| --- | --- | --- |
| `AIFE_TELEMETRY_DB_PATH` | `~/.local/share/aife/telemetry.sqlite3` | Step 1 telemetry database |
| `AIFE_ML_MODEL_PATH` | `~/.local/share/aife/models/port-congestion.joblib` | Local model artifact path |
| `AIFE_ML_CONGESTION_THRESHOLD_BPS` | `10485760` | Experimental aggregate RX+TX threshold in bytes/second |
| `AIFE_ML_HORIZON_SECONDS` | `10` | Future label horizon in seconds |
| `AIFE_ML_MINIMUM_SAMPLES` | `100` | Minimum labeled rows before splitting |
| `AIFE_ML_MAX_HISTORY_SAMPLES` | `100000` | Maximum newest retained rows read for one run |

The CLI equivalents for the threshold and horizon are `--threshold-bps` and
`--horizon-seconds`; database/model paths can be set with `--database` and
`--model`. The model uses a fixed random seed. Artifacts are saved atomically
with schema, feature list, target definition, training timestamp, diagnostics,
split counts, and evaluation metadata.

`predict` loads only the configured local artifact and predicts for the latest
port samples with enough feature history. It returns a prediction result; no
HTTP service consumes it and no switch flow is changed. Joblib artifacts use
Python object deserialization: only load artifacts from a trusted local path
created by this training code. Never load uploaded or otherwise untrusted
model files.

## Validation and limitations

Run model and telemetry tests from the repository root:

```bash
python -m unittest server.controller.test_congestion_model -v
python -m unittest server.controller.test_telemetry_api server.controller.test_telemetry_storage -v
```

Tests use explicitly synthetic, deterministic fixtures and temporary
databases. Passing tests do not imply real-data model quality. The model has
not been validated against a live Mininet/OVS deployment, a known link
capacity, or a labeled operational congestion dataset. Rate sampling is
irregular in real deployments; observations without a complete and observed
future window are excluded, but this does not correct for a biased or
incomplete switch sample stream. The holdout metrics are a basic temporal
benchmark, not a guarantee of future performance.
