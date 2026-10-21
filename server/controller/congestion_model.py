"""Leakage-aware experimental future-congestion training and inference.

This module is deliberately separate from the OS-Ken event loop. It reads
persisted OpenFlow port samples and never consumes frontend simulation data.
"""

from __future__ import annotations

import argparse
import json
import logging
import math
import os
import tempfile
from collections import defaultdict, deque
from dataclasses import asdict, dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Iterable, Optional, Sequence

try:
    from server.controller.telemetry_storage import (
        DEFAULT_DATABASE_PATH,
        HistoricalTelemetryStore,
    )
except ImportError:
    from telemetry_storage import DEFAULT_DATABASE_PATH, HistoricalTelemetryStore


LOG = logging.getLogger("aife.congestion_model")
ARTIFACT_TYPE = "aife-port-congestion-random-forest"
ARTIFACT_SCHEMA_VERSION = 1
DEFAULT_MODEL_PATH = Path.home() / ".local" / "share" / "aife" / "models" / "port-congestion.joblib"
DEFAULT_THRESHOLD_BYTES_PER_SECOND = 10 * 1024 * 1024
DEFAULT_HORIZON_SECONDS = 10
DEFAULT_HISTORY_SAMPLES = 100_000
HISTORY_PAGE_SIZE = 10_000

REQUIRED_COLUMNS = (
    "sample_timestamp",
    "dpid",
    "port_no",
    "rx_bytes",
    "tx_bytes",
    "rx_packets",
    "tx_packets",
    "rx_byte_rate",
    "tx_byte_rate",
    "rx_packet_rate",
    "tx_packet_rate",
)


@dataclass(frozen=True)
class TrainingConfig:
    congestion_threshold_bytes_per_second: float = DEFAULT_THRESHOLD_BYTES_PER_SECOND
    horizon_seconds: int = DEFAULT_HORIZON_SECONDS
    lag_count: int = 3
    test_fraction: float = 0.2
    minimum_samples: int = 100
    maximum_history_samples: int = DEFAULT_HISTORY_SAMPLES
    random_seed: int = 42
    estimator_count: int = 200

    def __post_init__(self) -> None:
        if not math.isfinite(self.congestion_threshold_bytes_per_second) or self.congestion_threshold_bytes_per_second <= 0:
            raise ValueError("congestion threshold must be a positive finite byte-per-second value")
        if self.horizon_seconds < 1:
            raise ValueError("horizon_seconds must be at least 1")
        if self.lag_count < 1:
            raise ValueError("lag_count must be at least 1")
        if not 0.05 <= self.test_fraction <= 0.5:
            raise ValueError("test_fraction must be between 0.05 and 0.5")
        if self.minimum_samples < 4:
            raise ValueError("minimum_samples must be at least 4")
        if self.maximum_history_samples < 1:
            raise ValueError("maximum_history_samples must be at least 1")
        if self.estimator_count < 1:
            raise ValueError("estimator_count must be at least 1")


@dataclass(frozen=True)
class FeatureRow:
    timestamp: datetime
    dpid: int
    port_no: int
    features: tuple[float, ...]
    label: int


@dataclass
class PreparedDataset:
    feature_names: list[str]
    rows: list[FeatureRow]
    diagnostics: dict[str, int]


def _parse_timestamp(value: object) -> datetime:
    if not isinstance(value, str):
        raise ValueError("sample_timestamp must be a string")
    timestamp = datetime.fromisoformat(value)
    if timestamp.tzinfo is None:
        timestamp = timestamp.replace(tzinfo=timezone.utc)
    return timestamp.astimezone(timezone.utc)


def _finite_number(value: object) -> Optional[float]:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    number = float(value)
    return number if math.isfinite(number) else None


def _feature_names(lag_count: int) -> list[str]:
    names = ["rx_byte_rate", "tx_byte_rate", "total_byte_rate"]
    for lag in range(1, lag_count + 1):
        names.extend(
            (
                f"rx_byte_rate_lag_{lag}",
                f"tx_byte_rate_lag_{lag}",
                f"total_byte_rate_lag_{lag}",
            )
        )
    names.extend(
        (
            "total_byte_rate_rolling_mean_3",
            "total_byte_rate_rolling_max_3",
            f"total_byte_rate_change_{lag_count}",
        )
    )
    return names


def feature_names_for_lags(lag_count: int) -> list[str]:
    """Return the exact ordered input schema used by training and inference."""
    if lag_count < 1:
        raise ValueError("lag_count must be at least 1")
    return _feature_names(lag_count)


def _feature_vector(
    group: Sequence[dict[str, Any]],
    index: int,
    lag_count: int,
) -> tuple[float, ...]:
    current = group[index]
    current_total = current["rx_byte_rate"] + current["tx_byte_rate"]
    values = [current["rx_byte_rate"], current["tx_byte_rate"], current_total]
    for lag in range(1, lag_count + 1):
        previous = group[index - lag]
        values.extend(
            (
                previous["rx_byte_rate"],
                previous["tx_byte_rate"],
                previous["rx_byte_rate"] + previous["tx_byte_rate"],
            )
        )
    recent_totals = [
        row["rx_byte_rate"] + row["tx_byte_rate"]
        for row in group[max(0, index - 2):index + 1]
    ]
    oldest_total = group[index - lag_count]["rx_byte_rate"] + group[index - lag_count]["tx_byte_rate"]
    elapsed = (current["timestamp"] - group[index - lag_count]["timestamp"]).total_seconds()
    values.extend(
        (
            sum(recent_totals) / len(recent_totals),
            max(recent_totals),
            (current_total - oldest_total) / elapsed,
        )
    )
    return tuple(values)


def prepare_dataset(
    observations: Iterable[dict[str, object]],
    config: TrainingConfig,
) -> PreparedDataset:
    """Build past-only features and labels from complete future windows."""
    diagnostics = {
        "rows_read": 0,
        "valid_rows": 0,
        "missing_or_invalid_rows": 0,
        "duplicate_observations": 0,
        "out_of_order_observations": 0,
        "rows_without_lag_context": 0,
        "rows_without_complete_future_window": 0,
        "rows_without_future_observations": 0,
        "labeled_rows": 0,
    }
    grouped: dict[tuple[int, int], list[dict[str, Any]]] = defaultdict(list)
    seen: set[tuple[int, int, datetime]] = set()
    last_seen: dict[tuple[int, int], datetime] = {}

    for observation in observations:
        diagnostics["rows_read"] += 1
        try:
            if any(column not in observation or observation[column] is None for column in REQUIRED_COLUMNS):
                raise ValueError("missing required telemetry field")
            timestamp = _parse_timestamp(observation["sample_timestamp"])
            dpid_value = observation["dpid"]
            port_value = observation["port_no"]
            if isinstance(dpid_value, bool) or isinstance(port_value, bool):
                raise ValueError("switch and port identifiers must be integers")
            dpid = int(dpid_value)
            port_no = int(port_value)
            rates = {
                name: _finite_number(observation[name])
                for name in ("rx_byte_rate", "tx_byte_rate")
            }
            counters = (
                _finite_number(observation["rx_bytes"]),
                _finite_number(observation["tx_bytes"]),
                _finite_number(observation["rx_packets"]),
                _finite_number(observation["tx_packets"]),
                _finite_number(observation["rx_packet_rate"]),
                _finite_number(observation["tx_packet_rate"]),
            )
            if any(value is None or value < 0 for value in (*rates.values(), *counters)):
                raise ValueError("telemetry values must be finite and non-negative")
        except (KeyError, TypeError, ValueError, OverflowError):
            diagnostics["missing_or_invalid_rows"] += 1
            continue

        key = (dpid, port_no)
        previous_timestamp = last_seen.get(key)
        if previous_timestamp is not None and timestamp < previous_timestamp:
            diagnostics["out_of_order_observations"] += 1
        last_seen[key] = timestamp if previous_timestamp is None else max(previous_timestamp, timestamp)

        duplicate_key = (dpid, port_no, timestamp)
        if duplicate_key in seen:
            diagnostics["duplicate_observations"] += 1
            continue
        seen.add(duplicate_key)
        grouped[key].append(
            {
                "timestamp": timestamp,
                "rx_byte_rate": rates["rx_byte_rate"],
                "tx_byte_rate": rates["tx_byte_rate"],
            }
        )
        diagnostics["valid_rows"] += 1

    dataset_rows: list[FeatureRow] = []
    horizon = timedelta(seconds=config.horizon_seconds)
    for (dpid, port_no), group in grouped.items():
        group.sort(key=lambda row: row["timestamp"])
        timestamps = [row["timestamp"] for row in group]
        future_maxima: deque[tuple[int, float]] = deque()
        right = 0

        for index, row in enumerate(group):
            if index < config.lag_count:
                diagnostics["rows_without_lag_context"] += 1
                continue
            horizon_end = row["timestamp"] + horizon
            if timestamps[-1] < horizon_end:
                diagnostics["rows_without_complete_future_window"] += 1
                continue

            while right < len(group) and timestamps[right] <= horizon_end:
                if right > index:
                    future_rate = group[right]["rx_byte_rate"] + group[right]["tx_byte_rate"]
                    while future_maxima and future_rate >= future_maxima[-1][1]:
                        future_maxima.pop()
                    future_maxima.append((right, future_rate))
                right += 1
            while future_maxima and future_maxima[0][0] <= index:
                future_maxima.popleft()
            if not future_maxima:
                diagnostics["rows_without_future_observations"] += 1
                continue
            future_peak = future_maxima[0][1]
            label = int(future_peak > config.congestion_threshold_bytes_per_second)
            dataset_rows.append(
                FeatureRow(
                    timestamp=row["timestamp"],
                    dpid=dpid,
                    port_no=port_no,
                    features=_feature_vector(group, index, config.lag_count),
                    label=label,
                )
            )
            diagnostics["labeled_rows"] += 1

    dataset_rows.sort(key=lambda row: (row.timestamp, row.dpid, row.port_no))
    return PreparedDataset(
        feature_names=_feature_names(config.lag_count),
        rows=dataset_rows,
        diagnostics=diagnostics,
    )


def chronological_split(
    rows: Sequence[FeatureRow],
    test_fraction: float,
    horizon_seconds: int,
) -> tuple[list[FeatureRow], list[FeatureRow], datetime]:
    """Hold out the latest timestamps and purge train labels crossing the boundary."""
    unique_timestamps = sorted({row.timestamp for row in rows})
    if len(unique_timestamps) < 2:
        return [], [], unique_timestamps[0] if unique_timestamps else datetime.min.replace(tzinfo=timezone.utc)
    split_index = max(1, min(len(unique_timestamps) - 1, int(len(unique_timestamps) * (1 - test_fraction))))
    test_start = unique_timestamps[split_index]
    train_cutoff = test_start - timedelta(seconds=horizon_seconds)
    train = [row for row in rows if row.timestamp < test_start and row.timestamp + timedelta(seconds=horizon_seconds) < test_start]
    test = [row for row in rows if row.timestamp >= test_start]
    if not train:
        return [], test, test_start
    if any(row.timestamp + timedelta(seconds=horizon_seconds) >= test_start for row in train):
        raise AssertionError(f"training target window crosses chronological split at {train_cutoff.isoformat()}")
    return train, test, test_start


def _class_distribution(labels: Sequence[int]) -> dict[str, int]:
    return {"not_congested": labels.count(0), "congested": labels.count(1)}


def _classification_metrics(y_true: Sequence[int], y_pred: Sequence[int]) -> dict[str, Any]:
    from sklearn.metrics import (
        balanced_accuracy_score,
        confusion_matrix,
        precision_recall_fscore_support,
    )

    precision, recall, f1, _ = precision_recall_fscore_support(
        y_true,
        y_pred,
        labels=[1],
        average=None,
        zero_division=0,
    )
    return {
        "confusion_matrix_labels_0_1": confusion_matrix(y_true, y_pred, labels=[0, 1]).tolist(),
        "precision_congested": float(precision[0]),
        "recall_congested": float(recall[0]),
        "f1_congested": float(f1[0]),
        "balanced_accuracy": float(balanced_accuracy_score(y_true, y_pred)),
    }


def _load_history(
    store: HistoricalTelemetryStore,
    maximum_samples: int,
) -> tuple[list[dict[str, object]], int]:
    total_count = store.history_count()
    selected_count = min(total_count, maximum_samples)
    offset = total_count - selected_count
    result: list[dict[str, object]] = []
    while len(result) < selected_count:
        page_size = min(HISTORY_PAGE_SIZE, selected_count - len(result))
        page = store.history(limit=page_size, offset=offset + len(result))
        if not page:
            break
        result.extend(page)
    return result, total_count


def _insufficient_result(reason: str, dataset: PreparedDataset, total_rows: int, **extra: Any) -> dict[str, Any]:
    labels = [row.label for row in dataset.rows]
    return {
        "status": "insufficient_data",
        "reason": reason,
        "historical_rows_available": total_rows,
        "historical_rows_selected": dataset.diagnostics["rows_read"],
        "usable_labeled_rows": len(dataset.rows),
        "labeled_class_distribution": _class_distribution(labels),
        "diagnostics": dataset.diagnostics,
        **extra,
    }


def train_from_store(
    store: HistoricalTelemetryStore,
    model_path: Path,
    config: TrainingConfig,
) -> dict[str, Any]:
    """Train/evaluate on persisted samples and atomically save trusted artifact."""
    observations, total_rows = _load_history(store, config.maximum_history_samples)
    dataset = prepare_dataset(observations, config)
    if len(dataset.rows) < config.minimum_samples:
        return _insufficient_result(
            f"Need at least {config.minimum_samples} usable labeled observations.",
            dataset,
            total_rows,
        )

    train_rows, test_rows, test_start = chronological_split(
        dataset.rows,
        config.test_fraction,
        config.horizon_seconds,
    )
    train_labels = [row.label for row in train_rows]
    test_labels = [row.label for row in test_rows]
    minimum_train_rows = max(4, int(config.minimum_samples * (1 - config.test_fraction) * 0.5))
    minimum_test_rows = max(4, int(config.minimum_samples * config.test_fraction * 0.5))
    if len(train_rows) < minimum_train_rows or len(test_rows) < minimum_test_rows:
        return _insufficient_result("Chronological split leaves too few train or test rows.", dataset, total_rows)
    if len(set(train_labels)) < 2:
        return _insufficient_result(
            "Training partition contains only one class; a meaningful classifier cannot be fit.",
            dataset,
            total_rows,
            train_class_distribution=_class_distribution(train_labels),
            test_class_distribution=_class_distribution(test_labels),
        )
    if len(set(test_labels)) < 2:
        return _insufficient_result(
            "Chronological test partition must contain both classes for balanced evaluation.",
            dataset,
            total_rows,
            train_class_distribution=_class_distribution(train_labels),
            test_class_distribution=_class_distribution(test_labels),
        )
    try:
        from sklearn.ensemble import RandomForestClassifier
    except ImportError as error:
        raise RuntimeError(
            "scikit-learn is required for training; install server/controller/requirements-ml.txt"
        ) from error

    classifier = RandomForestClassifier(
        n_estimators=config.estimator_count,
        random_state=config.random_seed,
        class_weight="balanced_subsample",
        min_samples_leaf=2,
        n_jobs=1,
    )
    classifier.fit(
        [row.features for row in train_rows],
        train_labels,
    )
    predictions = classifier.predict([row.features for row in test_rows]).tolist()
    majority_class = 1 if train_labels.count(1) > train_labels.count(0) else 0
    baseline_predictions = [majority_class] * len(test_rows)
    evaluation = {
        "test_class_distribution": _class_distribution(test_labels),
        "random_forest": _classification_metrics(test_labels, predictions),
        "majority_class_baseline": {
            "predicted_class": "congested" if majority_class else "not_congested",
            **_classification_metrics(test_labels, baseline_predictions),
        },
    }
    training_timestamp = datetime.now(timezone.utc).isoformat()
    metadata = {
        "artifact_type": ARTIFACT_TYPE,
        "artifact_schema_version": ARTIFACT_SCHEMA_VERSION,
        "feature_schema": dataset.feature_names,
        "target": {
            "name": "future_port_congestion",
            "definition": (
                "1 when any later recorded RX byte rate plus TX byte rate "
                "within the prediction horizon strictly exceeds the threshold; otherwise 0"
            ),
            "threshold_bytes_per_second": config.congestion_threshold_bytes_per_second,
            "horizon_seconds": config.horizon_seconds,
            "physical_capacity_known": False,
        },
        "training_timestamp": training_timestamp,
        "training_data": {
            "source": "persisted OpenFlow port_samples SQLite table only",
            "historical_rows_available": total_rows,
            "historical_rows_selected": len(observations),
            "usable_labeled_rows": len(dataset.rows),
            "labeled_class_distribution": _class_distribution([row.label for row in dataset.rows]),
            "train_rows_after_purge": len(train_rows),
            "test_rows": len(test_rows),
            "test_start_utc": test_start.isoformat(),
            "train_class_distribution": _class_distribution(train_labels),
            "test_class_distribution": _class_distribution(test_labels),
            "diagnostics": dataset.diagnostics,
        },
        "configuration": asdict(config),
        "evaluation": evaluation,
    }
    artifact = {
        "artifact_type": ARTIFACT_TYPE,
        "artifact_schema_version": ARTIFACT_SCHEMA_VERSION,
        "feature_names": dataset.feature_names,
        "metadata": metadata,
        "model": classifier,
    }
    _save_trusted_artifact(model_path, artifact)
    return {
        "status": "trained",
        "model_path": str(model_path),
        "metadata": metadata,
    }


def _save_trusted_artifact(model_path: Path, artifact: dict[str, Any]) -> None:
    import joblib

    path = Path(model_path).expanduser().resolve()
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    os.close(descriptor)
    try:
        joblib.dump(artifact, temporary_name, compress=3)
        os.replace(temporary_name, path)
    finally:
        if os.path.exists(temporary_name):
            os.unlink(temporary_name)


def load_trusted_artifact(model_path: Path) -> dict[str, Any]:
    """Load only a configured local artifact; joblib files must be trusted."""
    import joblib

    path = Path(model_path).expanduser()
    if not path.is_file():
        raise FileNotFoundError(f"Model artifact does not exist: {path}")
    artifact = joblib.load(path)
    if (
        not isinstance(artifact, dict)
        or artifact.get("artifact_type") != ARTIFACT_TYPE
        or artifact.get("artifact_schema_version") != ARTIFACT_SCHEMA_VERSION
        or not isinstance(artifact.get("metadata"), dict)
        or not isinstance(artifact.get("feature_names"), list)
        or artifact["metadata"].get("feature_schema") != artifact["feature_names"]
        or not hasattr(artifact.get("model"), "predict_proba")
    ):
        raise ValueError("Model artifact has an unsupported or invalid AIFE schema")
    return artifact


def latest_feature_rows(
    observations: Iterable[dict[str, object]],
    lag_count: int,
) -> list[tuple[datetime, int, int, tuple[float, ...]]]:
    """Construct features for latest observed port samples without future labels."""
    config = TrainingConfig(lag_count=lag_count)
    grouped: dict[tuple[int, int], list[dict[str, Any]]] = defaultdict(list)
    seen: set[tuple[int, int, datetime]] = set()
    for observation in observations:
        try:
            if any(column not in observation or observation[column] is None for column in REQUIRED_COLUMNS):
                continue
            timestamp = _parse_timestamp(observation["sample_timestamp"])
            if isinstance(observation["dpid"], bool) or isinstance(observation["port_no"], bool):
                continue
            dpid = int(observation["dpid"])
            port_no = int(observation["port_no"])
            rx_rate = _finite_number(observation["rx_byte_rate"])
            tx_rate = _finite_number(observation["tx_byte_rate"])
            counters = (
                _finite_number(observation["rx_bytes"]),
                _finite_number(observation["tx_bytes"]),
                _finite_number(observation["rx_packets"]),
                _finite_number(observation["tx_packets"]),
                _finite_number(observation["rx_packet_rate"]),
                _finite_number(observation["tx_packet_rate"]),
            )
            if (
                rx_rate is None
                or tx_rate is None
                or min(rx_rate, tx_rate) < 0
                or any(value is None or value < 0 for value in counters)
            ):
                continue
        except (TypeError, ValueError, OverflowError):
            continue
        key = (dpid, port_no)
        unique_key = (dpid, port_no, timestamp)
        if unique_key in seen:
            continue
        seen.add(unique_key)
        grouped[key].append(
            {
                "timestamp": timestamp,
                "rx_byte_rate": rx_rate,
                "tx_byte_rate": tx_rate,
            }
        )

    features = []
    for (dpid, port_no), group in grouped.items():
        group.sort(key=lambda row: row["timestamp"])
        if len(group) <= lag_count:
            continue
        latest_index = len(group) - 1
        row = group[latest_index]
        features.append(
            (
                row["timestamp"],
                dpid,
                port_no,
                _feature_vector(group, latest_index, config.lag_count),
            )
        )
    return sorted(features, key=lambda item: (item[0], item[1], item[2]))


def predict_latest(
    store: HistoricalTelemetryStore,
    model_path: Path,
    maximum_history_samples: int = DEFAULT_HISTORY_SAMPLES,
) -> dict[str, Any]:
    artifact = load_trusted_artifact(model_path)
    observations, total_rows = _load_history(store, maximum_history_samples)
    feature_names = artifact["feature_names"]
    lag_count = sum(name.startswith("rx_byte_rate_lag_") for name in feature_names)
    latest = latest_feature_rows(observations, lag_count)
    if not latest:
        return {
            "status": "insufficient_data",
            "reason": "No port has enough valid past samples to construct prediction features.",
            "historical_rows_available": total_rows,
            "predictions": [],
        }

    model = artifact["model"]
    predictions = []
    for timestamp, dpid, port_no, features in latest:
        positive_index = list(model.classes_).index(1) if 1 in model.classes_ else None
        probability = float(model.predict_proba([features])[0][positive_index]) if positive_index is not None else 0.0
        predicted_class = int(model.predict([features])[0])
        predictions.append(
            {
                "sample_timestamp": timestamp.isoformat(),
                "dpid": dpid,
                "port_no": port_no,
                "predicted_congested": bool(predicted_class),
                "congestion_probability": probability,
            }
        )
    return {
        "status": "available",
        "model_path": str(model_path),
        "target": artifact["metadata"]["target"],
        "predictions": predictions,
    }


def _positive_float_from_env(name: str, default: float) -> float:
    value = float(os.getenv(name, str(default)))
    if not math.isfinite(value) or value <= 0:
        raise ValueError(f"{name} must be a positive finite number")
    return value


def _positive_int_from_env(name: str, default: int) -> int:
    value = int(os.getenv(name, str(default)))
    if value < 1:
        raise ValueError(f"{name} must be at least 1")
    return value


def main(argv: Optional[Sequence[str]] = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("train", "predict"))
    parser.add_argument(
        "--database",
        type=Path,
        default=Path(os.getenv("AIFE_TELEMETRY_DB_PATH", str(DEFAULT_DATABASE_PATH))),
        help="SQLite database created by the OS-Ken telemetry collector",
    )
    parser.add_argument(
        "--model",
        type=Path,
        default=Path(
            os.getenv("AIFE_ML_MODEL_PATH", str(DEFAULT_MODEL_PATH))
        ),
        help="trusted local joblib model artifact path",
    )
    parser.add_argument(
        "--threshold-bps",
        type=float,
        default=_positive_float_from_env(
            "AIFE_ML_CONGESTION_THRESHOLD_BPS",
            DEFAULT_THRESHOLD_BYTES_PER_SECOND,
        ),
        help="experimental aggregate RX+TX bytes/second congestion threshold",
    )
    parser.add_argument(
        "--horizon-seconds",
        type=int,
        default=_positive_int_from_env("AIFE_ML_HORIZON_SECONDS", DEFAULT_HORIZON_SECONDS),
        help="future label horizon in seconds",
    )
    parser.add_argument(
        "--minimum-samples",
        type=int,
        default=_positive_int_from_env("AIFE_ML_MINIMUM_SAMPLES", 100),
    )
    parser.add_argument(
        "--history-samples",
        type=int,
        default=_positive_int_from_env("AIFE_ML_MAX_HISTORY_SAMPLES", DEFAULT_HISTORY_SAMPLES),
    )
    arguments = parser.parse_args(argv)
    config = TrainingConfig(
        congestion_threshold_bytes_per_second=arguments.threshold_bps,
        horizon_seconds=arguments.horizon_seconds,
        minimum_samples=arguments.minimum_samples,
        maximum_history_samples=arguments.history_samples,
    )
    store = HistoricalTelemetryStore(arguments.database)
    result = (
        train_from_store(store, arguments.model, config)
        if arguments.command == "train"
        else predict_latest(store, arguments.model, config.maximum_history_samples)
    )
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0 if result["status"] in {"trained", "available"} else 2


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
    raise SystemExit(main())
