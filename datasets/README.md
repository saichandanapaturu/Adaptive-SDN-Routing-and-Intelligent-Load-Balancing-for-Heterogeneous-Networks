# AIFE datasets

Exported from the controller telemetry recorded during the 20-minute Mininet
training run on 2026-10-22 (11:34–11:55 UTC): 4 OpenFlow 1.3 switches, 3 hosts,
10 Mbit/s links, UDP iperf traffic from `mininet/collect_traffic.py`. The source
is `server/data/telemetry.sqlite3` (table `port_samples`), which is not committed.

## `mininet_port_telemetry.csv` — raw port statistics (13,694 rows)

One row per switch port per OpenFlow port-statistics reply (about once a second).

| Column | Meaning |
|---|---|
| `dpid`, `port_no` | Switch datapath ID and port number |
| `ts`, `timestamp` | Sample time (Unix seconds, ISO 8601 UTC) |
| `rx_/tx_packets`, `rx_/tx_bytes`, `rx_/tx_errors`, `rx_/tx_dropped` | Cumulative OpenFlow counters |
| `rx_/tx_packet_rate`, `rx_/tx_byte_rate` | Per-second rates since the previous sample (0 for the first sample after a gap) |
| `tx_utilization` | `tx_byte_rate * 8 / 10 Mbit/s` |
| `congested` | 1 when `tx_utilization >= 0.8` |

## `congestion_training_dataset.csv` — Random Forest dataset (13,540 rows)

The rows the model in `server/controller/congestion_model.py` was trained and
tested on, built with that module's feature, label, and split code.

| Column | Meaning |
|---|---|
| `timestamp`, `dpid`, `port_no` | Sample the row predicts from |
| `tx_utilization` … `rx_packet_rate` | The 9 model features, from the port's last 5 gap-free samples |
| `label_congested_within_10s` | 1 when the port is congested at any sample in the next 10 s |
| `split` | `train` (first 70% by time), `test` (last 30%), or `purged` (training rows whose 10 s label window reaches the test period, excluded from both) |

Split sizes: train 9,372 rows (843 congested), test 4,064 rows (397 congested),
purged 104. The trained model's held-out results are in
`server/data/congestion_metrics.json` (accuracy 94.9%, balanced accuracy 82.8%,
median lead time 2.07 s).
