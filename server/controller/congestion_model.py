"""Random Forest congestion prediction for AIFE switch egress ports.

Congestion policy (shared by labeling, evaluation, inference, and the docs):

- Link capacity is ``LINK_CAPACITY_BPS`` (10 Mbit/s, the Mininet ``bw=10``).
- A measured port sample is congested when its TX utilization,
  ``tx_byte_rate * 8 / LINK_CAPACITY_BPS``, is at least
  ``CONGESTION_UTILIZATION`` (0.8).
- The label for a sample at time t is 1 when any later sample of the same port
  in (t, t + ``HORIZON_SECONDS``] is congested.
- A prediction is a warning when P(congested within horizon) >=
  ``WARNING_PROBABILITY`` (0.5).

Features at time t use only that port's samples at or before t. Training and
evaluation use a chronological split with a purge gap of one horizon, so no
training label window overlaps the test period.

Train and evaluate from recorded controller telemetry::

    python3 -m server.controller.congestion_model train
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import threading
from collections import deque
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from time import time
from typing import Any, Callable, Deque, Dict, Iterable, List, Optional, Sequence, Tuple

try:
    from server.controller.telemetry_store import TelemetryStore, configured_db_path
except ImportError:
    from telemetry_store import TelemetryStore, configured_db_path


LINK_CAPACITY_BPS = 10_000_000.0
CONGESTION_UTILIZATION = 0.8
HORIZON_SECONDS = 10.0
WARNING_PROBABILITY = 0.5

# Samples arrive about once per second. A larger gap means missing telemetry
# (controller restart, disconnected switch), so windows never span it.
MAX_SAMPLE_GAP_SECONDS = 3.0
# A label is known only when the observed future reaches the horizon, allowing
# one polling interval of jitter.
HORIZON_COVERAGE_TOLERANCE_SECONDS = 1.0
FEATURE_WINDOW = 5
# Inference refuses windows whose newest sample is older than this.
PREDICTION_STALE_SECONDS = 5.0

TEST_FRACTION = 0.3
MIN_TRAIN_ROWS = 200
MIN_TEST_ROWS = 50
MIN_TRAIN_ROWS_PER_CLASS = 10
MIN_TEST_ROWS_PER_CLASS = 5

FEATURE_NAMES = (
    "tx_utilization",
    "rx_utilization",
    "tx_utilization_mean",
    "tx_utilization_max",
    "tx_utilization_delta",
    "tx_utilization_slope",
    "dropped_delta",
    "tx_packet_rate",
    "rx_packet_rate",
)

DEFAULT_MODEL_DIR = Path(__file__).resolve().parents[1] / "data"
MODEL_FILENAME = "congestion_rf.joblib"
METRICS_FILENAME = "congestion_metrics.json"

PortKey = Tuple[int, int]


def configured_model_dir() -> Path:
    return Path(os.getenv("AIFE_MODEL_DIR", str(DEFAULT_MODEL_DIR)))


def policy() -> Dict[str, Any]:
    return {
        "link_capacity_bps": LINK_CAPACITY_BPS,
        "congestion_utilization": CONGESTION_UTILIZATION,
        "horizon_seconds": HORIZON_SECONDS,
        "warning_probability": WARNING_PROBABILITY,
        "feature_window": FEATURE_WINDOW,
    }


def tx_utilization(sample: Dict[str, Any]) -> float:
    return float(sample["tx_byte_rate"]) * 8.0 / LINK_CAPACITY_BPS


def is_congested(sample: Dict[str, Any]) -> bool:
    return tx_utilization(sample) >= CONGESTION_UTILIZATION


def port_features(window: Sequence[Dict[str, Any]]) -> Optional[List[float]]:
    """Features from the last ``FEATURE_WINDOW`` measured samples of one port.

    Returns None when the window is incomplete or spans a telemetry gap.
    """
    if len(window) < FEATURE_WINDOW:
        return None
    window = window[-FEATURE_WINDOW:]
    for previous, current in zip(window, window[1:]):
        if not 0 < current["ts"] - previous["ts"] <= MAX_SAMPLE_GAP_SECONDS:
            return None
    utilization = [tx_utilization(sample) for sample in window]
    last, previous, first = window[-1], window[-2], window[0]
    dropped = lambda sample: int(sample["tx_dropped"]) + int(sample["rx_dropped"])
    # Plain left-to-right addition: Python 3.12+ sum() is compensated, which
    # would make features depend on the Python version and differ from the
    # browser implementation (simulatedCongestionModel.ts).
    total = 0.0
    for value in utilization:
        total += value
    return [
        utilization[-1],
        float(last["rx_byte_rate"]) * 8.0 / LINK_CAPACITY_BPS,
        total / len(utilization),
        max(utilization),
        utilization[-1] - utilization[-2],
        (utilization[-1] - utilization[0]) / (last["ts"] - first["ts"]),
        float(max(0, dropped(last) - dropped(previous))),
        float(last["tx_packet_rate"]),
        float(last["rx_packet_rate"]),
    ]


def measured_segments(samples: Iterable[Dict[str, Any]]) -> Dict[PortKey, List[List[Dict[str, Any]]]]:
    """Split stored samples into gap-free runs of measured samples per port.

    The first sample after a gap has no previous counter, so the collector
    could not measure its rates; it is dropped rather than read as idle.
    """
    by_port: Dict[PortKey, List[Dict[str, Any]]] = {}
    for sample in samples:
        by_port.setdefault((int(sample["dpid"]), int(sample["port_no"])), []).append(sample)

    segments: Dict[PortKey, List[List[Dict[str, Any]]]] = {}
    for key, port_samples in by_port.items():
        port_samples.sort(key=lambda sample: sample["ts"])
        current: List[Dict[str, Any]] = []
        previous_ts: Optional[float] = None
        for sample in port_samples:
            if previous_ts is None or sample["ts"] - previous_ts > MAX_SAMPLE_GAP_SECONDS:
                if len(current) > 0:
                    segments.setdefault(key, []).append(current)
                current = []
            else:
                current.append(sample)
            previous_ts = sample["ts"]
        if current:
            segments.setdefault(key, []).append(current)
    return segments


@dataclass(frozen=True)
class LabeledRow:
    ts: float
    port: PortKey
    features: List[float]
    label: int


def build_dataset(segments: Dict[PortKey, List[List[Dict[str, Any]]]]) -> List[LabeledRow]:
    """Rows with complete feature windows and fully observed label windows."""
    rows: List[LabeledRow] = []
    for port, port_segments in segments.items():
        for segment in port_segments:
            end_ts = segment[-1]["ts"]
            for index, sample in enumerate(segment):
                features = port_features(segment[max(0, index - FEATURE_WINDOW + 1):index + 1])
                if features is None:
                    continue
                if end_ts < sample["ts"] + HORIZON_SECONDS - HORIZON_COVERAGE_TOLERANCE_SECONDS:
                    break
                label = 0
                ahead = index + 1
                while ahead < len(segment) and segment[ahead]["ts"] - sample["ts"] <= HORIZON_SECONDS:
                    if is_congested(segment[ahead]):
                        label = 1
                        break
                    ahead += 1
                rows.append(LabeledRow(sample["ts"], port, features, label))
    rows.sort(key=lambda row: (row.ts, row.port))
    return rows


def chronological_split(rows: List[LabeledRow]) -> Tuple[List[LabeledRow], List[LabeledRow], float]:
    """Hold out the latest ``TEST_FRACTION`` of rows by time.

    Training rows whose label window (t, t + horizon] reaches the test period
    are purged so that test-period congestion never labels a training row.
    """
    cutoff = rows[int(len(rows) * (1 - TEST_FRACTION))].ts
    train = [row for row in rows if row.ts + HORIZON_SECONDS < cutoff]
    test = [row for row in rows if row.ts >= cutoff]
    return train, test, cutoff


def lead_time_backtest(
    segments: Dict[PortKey, List[List[Dict[str, Any]]]],
    probabilities: Dict[Tuple[PortKey, float], float],
    test_start: float,
) -> Dict[str, Any]:
    """Measure warning lead time for congestion onsets in the test period.

    An onset is a congested sample whose previous measured sample on the same
    port was not congested. A qualifying warning is a test prediction with
    probability >= ``WARNING_PROBABILITY`` made strictly before the onset,
    within one horizon of it, and after the port's previous congested sample.
    Lead time = onset timestamp - first qualifying warning timestamp. Events
    are counted only when that whole warning window lies in the test period.
    """
    lead_times: List[float] = []
    events = 0
    for port, port_segments in segments.items():
        for segment in port_segments:
            for index in range(1, len(segment)):
                sample = segment[index]
                if not is_congested(sample):
                    continue
                if is_congested(segment[index - 1]):
                    continue
                onset = sample["ts"]
                # Walk back through the uncongested run before the onset, at
                # most one horizon; the earliest qualifying warning wins.
                window_start = onset - HORIZON_SECONDS
                first_warning: Optional[float] = None
                back = index - 1
                while back >= 0 and segment[back]["ts"] >= window_start and not is_congested(segment[back]):
                    if probabilities.get((port, segment[back]["ts"]), 0.0) >= WARNING_PROBABILITY:
                        first_warning = segment[back]["ts"]
                    back -= 1
                if back >= 0 and is_congested(segment[back]):
                    window_start = max(window_start, segment[back + 1]["ts"])
                elif back < 0:
                    window_start = max(window_start, segment[0]["ts"])
                if window_start < test_start:
                    continue
                events += 1
                if first_warning is not None:
                    lead_times.append(onset - first_warning)

    result: Dict[str, Any] = {
        "statistic": "median",
        "unit": "seconds",
        "events_evaluated": events,
        "events_warned": len(lead_times),
        "median_seconds": None,
        "mean_seconds": None,
    }
    if events == 0:
        result.update(status="unavailable", reason="no_congestion_onsets_in_test_period")
    elif not lead_times:
        result.update(status="unavailable", reason="no_onset_was_warned")
    else:
        ordered = sorted(lead_times)
        middle = len(ordered) // 2
        result.update(
            status="available",
            reason=None,
            median_seconds=ordered[middle] if len(ordered) % 2 else (ordered[middle - 1] + ordered[middle]) / 2,
            mean_seconds=sum(ordered) / len(ordered),
        )
    return result


class TrainingError(Exception):
    def __init__(self, reason: str, **details: Any) -> None:
        super().__init__(reason)
        self.reason = reason
        self.details = details


def train_and_evaluate(
    samples: List[Dict[str, Any]],
    *,
    random_state: int = 42,
    n_estimators: int = 200,
    max_depth: Optional[int] = None,
) -> Tuple[Any, Dict[str, Any]]:
    """Fit on the chronological training split and evaluate on the held-out test split."""
    try:
        from sklearn.ensemble import RandomForestClassifier
        from sklearn.metrics import (
            accuracy_score,
            balanced_accuracy_score,
            confusion_matrix,
            f1_score,
            precision_score,
            recall_score,
        )
    except ImportError as error:
        raise TrainingError("scikit_learn_not_installed") from error

    segments = measured_segments(samples)
    rows = build_dataset(segments)
    if len(rows) < MIN_TRAIN_ROWS + MIN_TEST_ROWS:
        raise TrainingError("insufficient_samples", labeled_rows=len(rows))
    train, test, cutoff = chronological_split(rows)
    train_positive = sum(row.label for row in train)
    test_positive = sum(row.label for row in test)
    counts = {
        "train_rows": len(train),
        "test_rows": len(test),
        "train_congested": train_positive,
        "test_congested": test_positive,
    }
    if len(train) < MIN_TRAIN_ROWS or len(test) < MIN_TEST_ROWS:
        raise TrainingError("insufficient_samples", **counts)
    if min(train_positive, len(train) - train_positive) < MIN_TRAIN_ROWS_PER_CLASS:
        raise TrainingError("training_split_missing_a_class", **counts)
    if min(test_positive, len(test) - test_positive) < MIN_TEST_ROWS_PER_CLASS:
        raise TrainingError("test_split_missing_a_class", **counts)

    model = RandomForestClassifier(
        n_estimators=n_estimators,
        max_depth=max_depth,
        min_samples_leaf=2,
        class_weight="balanced",
        random_state=random_state,
        n_jobs=1,
    )
    model.fit([row.features for row in train], [row.label for row in train])

    positive_column = list(model.classes_).index(1)
    test_probabilities = [p[positive_column] for p in model.predict_proba([row.features for row in test])]
    predicted = [int(p >= WARNING_PROBABILITY) for p in test_probabilities]
    actual = [row.label for row in test]
    matrix = confusion_matrix(actual, predicted, labels=[0, 1]).tolist()

    metrics = {
        "model_type": "random_forest",
        "status": "trained",
        "trained_at": datetime.now(timezone.utc).isoformat(),
        "policy": policy(),
        "feature_names": list(FEATURE_NAMES),
        "split": {
            "method": "chronological",
            "test_fraction": TEST_FRACTION,
            "purge_seconds": HORIZON_SECONDS,
            "test_start": datetime.fromtimestamp(cutoff, timezone.utc).isoformat(),
            "test_end": datetime.fromtimestamp(test[-1].ts, timezone.utc).isoformat(),
            **counts,
        },
        "evaluation": {
            "accuracy": accuracy_score(actual, predicted),
            "balanced_accuracy": balanced_accuracy_score(actual, predicted),
            "precision": precision_score(actual, predicted, zero_division=0),
            "recall": recall_score(actual, predicted, zero_division=0),
            "f1": f1_score(actual, predicted, zero_division=0),
            "confusion_matrix": {"labels": [0, 1], "rows_actual_columns_predicted": matrix},
        },
        "lead_time": lead_time_backtest(
            segments,
            {(row.port, row.ts): probability for row, probability in zip(test, test_probabilities)},
            cutoff,
        ),
    }
    return model, metrics


def save_artifacts(model: Any, metrics: Dict[str, Any], model_dir: Path) -> None:
    import joblib

    model_dir.mkdir(parents=True, exist_ok=True)
    joblib.dump(
        {"model": model, "feature_names": list(FEATURE_NAMES), "policy": policy(), "trained_at": metrics["trained_at"]},
        model_dir / MODEL_FILENAME,
    )
    (model_dir / METRICS_FILENAME).write_text(json.dumps(metrics, indent=2), encoding="utf-8")


LIVE_SCORE_WINDOW = 600
LIVE_ONSET_WINDOW = 40
MIN_LIVE_SCORED = 50


class LiveEvaluation:
    """Rolling score of live predictions under the held-out test's policy.

    Each prediction is scored once its horizon (t, t + horizon] has been
    observed. Each congestion onset counts toward lead time when its whole
    warning window was observed. Mirrors client/src/lib/liveModelEvaluation.ts.
    """

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._ports: Dict[PortKey, List[Dict[str, Any]]] = {}
        self._scored: Deque[bool] = deque(maxlen=LIVE_SCORE_WINDOW)
        self._onsets: Deque[Optional[float]] = deque(maxlen=LIVE_ONSET_WINDOW)

    def reset(self, key: Optional[PortKey] = None) -> None:
        with self._lock:
            if key is not None:
                self._ports.pop(key, None)
                return
            self._ports.clear()
            self._scored.clear()
            self._onsets.clear()

    def observe(self, key: PortKey, ts: float, probability: Optional[float], congested: bool) -> None:
        with self._lock:
            history = self._ports.get(key, [])
            if history and not 0 < ts - history[-1]["ts"] <= MAX_SAMPLE_GAP_SECONDS:
                history = []
            if congested and history and not history[-1]["congested"]:
                first_warning: Optional[float] = None
                index = len(history) - 1
                while index >= 0:
                    observation = history[index]
                    if observation["congested"] or observation["ts"] < ts - HORIZON_SECONDS:
                        break
                    if observation["probability"] is not None and observation["probability"] >= WARNING_PROBABILITY:
                        first_warning = observation["ts"]
                    index -= 1
                # Skip onsets whose warning window was not fully observed.
                if index >= 0 or history[0]["ts"] <= ts - HORIZON_SECONDS + HORIZON_COVERAGE_TOLERANCE_SECONDS:
                    self._onsets.append(None if first_warning is None else ts - first_warning)

            history.append({"ts": ts, "probability": probability, "congested": congested, "scored": False})
            for index, observation in enumerate(history):
                if observation["scored"] or observation["probability"] is None:
                    continue
                if ts < observation["ts"] + HORIZON_SECONDS - HORIZON_COVERAGE_TOLERANCE_SECONDS:
                    break
                label = False
                for ahead in history[index + 1:]:
                    if ahead["ts"] - observation["ts"] > HORIZON_SECONDS:
                        break
                    if ahead["congested"]:
                        label = True
                        break
                observation["scored"] = True
                self._scored.append((observation["probability"] >= WARNING_PROBABILITY) == label)
            self._ports[key] = [
                observation for observation in history
                if observation["ts"] >= ts - HORIZON_SECONDS - MAX_SAMPLE_GAP_SECONDS
            ]

    def summary(self) -> Dict[str, Any]:
        with self._lock:
            scored = list(self._scored)
            onsets = list(self._onsets)
        leads = sorted(lead for lead in onsets if lead is not None)
        middle = len(leads) // 2
        median = None
        if leads:
            median = leads[middle] if len(leads) % 2 else (leads[middle - 1] + leads[middle]) / 2
        return {
            "window_predictions": LIVE_SCORE_WINDOW,
            "scored": len(scored),
            "accuracy": sum(scored) / len(scored) if len(scored) >= MIN_LIVE_SCORED else None,
            "events_evaluated": len(onsets),
            "events_warned": len(leads),
            "median_lead_seconds": median,
        }


class CongestionPredictor:
    """Controller-side inference over live, gap-free port sample windows."""

    def __init__(self, model_dir: Optional[Path] = None, *, now: Callable[[], float] = time) -> None:
        self.model_dir = model_dir or configured_model_dir()
        self._now = now
        self._windows: Dict[PortKey, Deque[Dict[str, Any]]] = {}
        self._last_ts: Dict[PortKey, float] = {}
        self._model: Any = None
        self._positive_column = 1
        self._metrics: Optional[Dict[str, Any]] = None
        self._loaded_mtime: Optional[float] = None
        self.inference_status = "model_missing"
        self.live_evaluation = LiveEvaluation()
        self._reload_if_changed()

    def _reload_if_changed(self) -> None:
        model_path = self.model_dir / MODEL_FILENAME
        try:
            mtime = model_path.stat().st_mtime
        except OSError:
            self._model, self._metrics, self._loaded_mtime = None, None, None
            self.inference_status = "model_missing"
            return
        if mtime == self._loaded_mtime:
            return
        self._loaded_mtime = mtime
        self._model, self._metrics = None, None
        # Scores of a replaced model do not describe the new one.
        self.live_evaluation.reset()
        try:
            import joblib
        except ImportError:
            self.inference_status = "scikit_learn_not_installed"
            return
        try:
            artifact = joblib.load(model_path)
            metrics = json.loads((self.model_dir / METRICS_FILENAME).read_text(encoding="utf-8"))
        except Exception:  # noqa: BLE001 - any unreadable artifact is reported, not used
            self.inference_status = "model_load_failed"
            return
        if artifact.get("feature_names") != list(FEATURE_NAMES) or artifact.get("policy") != policy():
            self.inference_status = "model_incompatible_with_policy"
            return
        self._model = artifact["model"]
        self._positive_column = list(self._model.classes_).index(1)
        self._metrics = metrics
        self.inference_status = "ready"

    def observe(self, samples: Iterable[Any]) -> None:
        measured: List[Tuple[PortKey, Dict[str, Any], Optional[List[float]]]] = []
        for sample in samples:
            values = sample.as_dict()
            values["ts"] = datetime.fromisoformat(values["timestamp"]).timestamp()
            key = (int(values["dpid"]), int(values["port_no"]))
            previous_ts = self._last_ts.get(key)
            self._last_ts[key] = values["ts"]
            if previous_ts is None or values["ts"] - previous_ts > MAX_SAMPLE_GAP_SECONDS:
                # Rates of the first sample after a gap were not measured.
                self._windows[key] = deque(maxlen=FEATURE_WINDOW)
                self.live_evaluation.reset(key)
                continue
            window = self._windows.setdefault(key, deque(maxlen=FEATURE_WINDOW))
            window.append(values)
            measured.append((key, values, port_features(list(window))))
        self._score_live(measured)

    def _score_live(self, measured: List[Tuple[PortKey, Dict[str, Any], Optional[List[float]]]]) -> None:
        """Predict every measured port in one batch and score earlier predictions."""
        self._reload_if_changed()
        if self._model is None or not measured:
            return
        rows = [features for _key, _values, features in measured if features is not None]
        predicted = iter(self._model.predict_proba(rows)[:, self._positive_column]) if rows else iter(())
        for key, values, features in measured:
            probability = float(next(predicted)) if features is not None else None
            self.live_evaluation.observe(key, values["ts"], probability, is_congested(values))

    def probability(self, dpid: int, port_no: int) -> Optional[float]:
        """P(port congested within the horizon), or None when no valid prediction exists."""
        self._reload_if_changed()
        if self._model is None:
            return None
        window = self._windows.get((dpid, port_no))
        if not window or self._now() - window[-1]["ts"] > PREDICTION_STALE_SECONDS:
            return None
        features = port_features(list(window))
        if features is None:
            return None
        return float(self._model.predict_proba([features])[0][self._positive_column])

    def status(self) -> Dict[str, Any]:
        self._reload_if_changed()
        if self._metrics is None:
            return {
                "model_type": "random_forest",
                "status": "unavailable",
                "reason": self.inference_status,
                "inference": self.inference_status,
                "policy": policy(),
            }
        return {
            **self._metrics,
            "reason": None,
            "inference": self.inference_status,
            "live_evaluation": self.live_evaluation.summary(),
        }


def _train_command(args: argparse.Namespace) -> int:
    store = TelemetryStore(args.db)
    try:
        samples = store.load()
    finally:
        store.close()
    try:
        model, metrics = train_and_evaluate(samples)
    except TrainingError as error:
        print(json.dumps({"status": "unavailable", "reason": error.reason, "samples": len(samples), **error.details}, indent=2))
        return 2
    save_artifacts(model, metrics, args.model_dir)
    print(json.dumps(metrics, indent=2))
    return 0


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Train and evaluate the AIFE Random Forest congestion model.")
    commands = parser.add_subparsers(dest="command", required=True)
    train = commands.add_parser("train", help="fit on recorded telemetry and write model + metrics")
    train.add_argument("--db", type=Path, default=configured_db_path())
    train.add_argument("--model-dir", type=Path, default=configured_model_dir())
    args = parser.parse_args(argv)
    return _train_command(args)


if __name__ == "__main__":
    sys.exit(main())
