"""Train the browser Random Forest on the dashboard's simulated traffic.

The deployed dashboard has no controller, so its simulated topology views
(reference, custom, generated) cannot use a model trained on OpenFlow
telemetry. This module generates link traffic with the dynamics the dashboard
simulates, runs it through the same labeling, chronological split, accuracy,
and lead-time code as the controller model (``congestion_model``), and
exports the forest as JSON for in-browser inference.

The resulting scores measure prediction of *simulated* traffic only and are
labelled that way in the dashboard. They are not real-network performance.

    python3 -m server.controller.simulated_training \
        --out client/public/models/congestion_rf_simulated.json

Dynamics mirrored from the dashboard (per one-second tick, per link):

- ``useLiveNetworkDataWithCustom``: base load ``0.58 * previous + drift``
  (uniform +/-9), a +24 burst with probability 0.18, and +84 on links of
  active packet-flow routes during the forecast-hotspot phase (tick % 8 >= 5).
- ``peakHours.simulatedLinkTraffic``: an active peak period raises every link
  to at least its intensity; the surge overlay replaces the stressed link's
  load with ``intensity + 12``.
- ``useTrafficSurgeSimulator``: surge intensity moves toward phase targets
  (moderate, sudden surge or flash crowd, peak, recovery) with smoothing 0.32
  (0.72 for a flash crowd).
"""

from __future__ import annotations

import argparse
import json
import random
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

try:
    from server.controller import congestion_model as cm
except ImportError:
    import congestion_model as cm

# Reference topology from mininet/topology.py, as drawn by the dashboard.
REFERENCE_LINKS: List[Tuple[str, str]] = [
    ("host-1", "switch-1"), ("host-2", "switch-3"), ("host-3", "switch-4"),
    ("switch-1", "switch-2"), ("switch-1", "switch-3"),
    ("switch-2", "switch-4"), ("switch-3", "switch-4"),
]
ROUTES: List[List[Tuple[str, str]]] = [
    [("host-1", "switch-1"), ("switch-1", "switch-2"), ("switch-2", "switch-4"), ("host-3", "switch-4")],
    [("host-1", "switch-1"), ("switch-1", "switch-3"), ("switch-3", "switch-4"), ("host-3", "switch-4")],
    [("host-1", "switch-1"), ("switch-1", "switch-3"), ("host-2", "switch-3")],
    [("host-2", "switch-3"), ("switch-3", "switch-4"), ("host-3", "switch-4")],
]

START_TS = datetime(2026, 1, 1, tzinfo=timezone.utc).timestamp()
DEFAULT_SECONDS = 4 * 3600
# Browser model size: small enough to ship as static JSON.
BROWSER_TREES = 60
BROWSER_MAX_DEPTH = 10


def clamp(value: float, low: float = 0.0, high: float = 100.0) -> float:
    return max(low, min(high, value))


def link_sample(link_index: int, ts: float, traffic_level: float) -> Dict[str, Any]:
    """Port-sample view of a displayed link load; mirrored in simulatedCongestionModel.ts."""
    byte_rate = traffic_level / 100.0 * cm.LINK_CAPACITY_BPS / 8.0
    return {
        "dpid": link_index, "port_no": 1, "ts": ts,
        "rx_byte_rate": byte_rate, "tx_byte_rate": byte_rate,
        "rx_packet_rate": byte_rate / 1000.0, "tx_packet_rate": byte_rate / 1000.0,
        "rx_dropped": 0, "tx_dropped": 0,
    }


class _Surge:
    """Traffic Surge Simulator run stressing one link."""

    def __init__(self, rng: random.Random, link_index: int) -> None:
        self.rng = rng
        self.link_index = link_index
        self.flash = rng.random() < 0.25
        self.intensity = 28.0
        self.step = 0
        self.surge_start = 3 + rng.randrange(5)
        self.surge_end = self.surge_start + (4 if self.flash else 8 + rng.randrange(5))
        self.length = self.surge_end + 5 + rng.randrange(6)

    def advance(self) -> Optional[float]:
        """Return the stressed link's load for this tick, or None once the run ends."""
        self.step += 1
        if self.step > self.length:
            return None
        if self.step < self.surge_start - 2:
            target = 30.0
        elif self.step < self.surge_start:
            target = 48.0
        elif self.step < self.surge_start + 2:
            target = 94.0 if self.flash else 76.0
        elif self.step < self.surge_end:
            target = 88.0 if self.flash else 72.0 + self.rng.random() * 18.0
        else:
            target = 52.0 - (self.step - self.surge_end) * 4.0
        smoothing = 0.72 if self.flash and self.surge_start <= self.step < self.surge_start + 2 else 0.32
        self.intensity = clamp(self.intensity + (target - self.intensity) * smoothing + (self.rng.random() - 0.5) * 4.0)
        return clamp(self.intensity + 12.0)


def generate_samples(seconds: int = DEFAULT_SECONDS, seed: int = 7) -> List[Dict[str, Any]]:
    rng = random.Random(seed)
    base = [0.0] * len(REFERENCE_LINKS)
    route: set = set()
    route_until = 0
    peak_level: Optional[float] = None
    peak_until = 0
    next_peak = rng.randrange(120, 600)
    surge: Optional[_Surge] = None
    next_surge = rng.randrange(30, 120)
    samples: List[Dict[str, Any]] = []

    for tick in range(seconds):
        if tick >= route_until:
            # Selected source/destination flows, or none for a while.
            route = set(rng.choice(ROUTES)) if rng.random() < 0.7 else set()
            route_until = tick + rng.randrange(60, 240)
        if peak_level is not None and tick >= peak_until:
            peak_level = None
        if peak_level is None and tick >= next_peak:
            peak_level = float(rng.randrange(20, 96))
            # Accelerated-clock blips while the simulator runs, or long idle-clock periods.
            peak_until = tick + (rng.randrange(3, 7) if rng.random() < 0.5 else rng.randrange(60, 400))
            next_peak = peak_until + rng.randrange(120, 900)
        if surge is None and tick >= next_surge:
            surge = _Surge(rng, rng.randrange(len(REFERENCE_LINKS)))
        surge_level = surge.advance() if surge else None
        if surge is not None and surge_level is None:
            surge = None
            next_surge = tick + rng.randrange(20, 180)

        hotspot = tick % 8 >= 5
        for index, edge in enumerate(REFERENCE_LINKS):
            drift = (rng.random() - 0.5) * 18.0
            burst = 24.0 if rng.random() < 0.18 else 0.0
            route_burst = 84.0 if hotspot and edge in route else 0.0
            base[index] = clamp(base[index] * 0.58 + drift + burst + route_burst)
            shown = max(base[index], peak_level) if peak_level is not None else base[index]
            if surge is not None and surge_level is not None and surge.link_index == index:
                shown = surge_level
            samples.append(link_sample(index, START_TS + tick, shown))
    return samples


def export_browser_model(model: Any, metrics: Dict[str, Any], samples: List[Dict[str, Any]], out: Path, seed: int) -> Dict[str, Any]:
    positive = list(model.classes_).index(1)
    trees = []
    for estimator in model.estimators_:
        tree = estimator.tree_
        values = tree.value[:, 0, :]
        totals = values.sum(axis=1)
        trees.append({
            "left": tree.children_left.tolist(),
            "right": tree.children_right.tolist(),
            "feature": tree.feature.tolist(),
            # sklearn compares float32-cast features; thresholds are float32 values.
            "threshold": [float(value) for value in tree.threshold],
            "p1": [float(row[positive] / total) if total > 0 else 0.0 for row, total in zip(values, totals)],
        })

    segments = cm.measured_segments(samples)
    rows = cm.build_dataset(segments)
    parity_rows = rows[:: max(1, len(rows) // 25)][:25]
    feature_windows = []
    for (dpid, _port), port_segments in sorted(segments.items()):
        segment = port_segments[0]
        for end in (cm.FEATURE_WINDOW, 40, 400):
            window = segment[end - cm.FEATURE_WINDOW:end]
            feature_windows.append({
                "samples": [{key: sample[key] for key in ("ts", "tx_byte_rate", "rx_byte_rate", "tx_packet_rate", "rx_packet_rate", "tx_dropped", "rx_dropped")} for sample in window],
                "features": cm.port_features(window),
            })
    probabilities = model.predict_proba([row.features for row in parity_rows])[:, positive]
    payload = {
        **metrics,
        "source": "simulated_traffic",
        "generator": {
            "module": "server.controller.simulated_training",
            "seed": seed,
            "seconds": int(max(sample["ts"] for sample in samples) - START_TS) + 1,
            "links": len(REFERENCE_LINKS),
            "n_estimators": len(trees),
            "max_depth": BROWSER_MAX_DEPTH,
        },
        "trees": trees,
        "parity": [
            {"features": row.features, "probability": float(probability)}
            for row, probability in zip(parity_rows, probabilities)
        ],
        "feature_parity": feature_windows,
    }
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")
    return payload


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Train and export the simulated-traffic browser Random Forest.")
    parser.add_argument("--out", type=Path, default=Path("client/public/models/congestion_rf_simulated.json"))
    parser.add_argument("--seconds", type=int, default=DEFAULT_SECONDS)
    parser.add_argument("--seed", type=int, default=7)
    args = parser.parse_args(argv)

    samples = generate_samples(args.seconds, args.seed)
    model, metrics = cm.train_and_evaluate(samples, n_estimators=BROWSER_TREES, max_depth=BROWSER_MAX_DEPTH)
    export_browser_model(model, metrics, samples, args.out, args.seed)
    summary = {key: metrics[key] for key in ("split", "evaluation", "lead_time")}
    print(json.dumps(summary, indent=2))
    print(f"wrote {args.out} ({args.out.stat().st_size // 1024} KiB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
