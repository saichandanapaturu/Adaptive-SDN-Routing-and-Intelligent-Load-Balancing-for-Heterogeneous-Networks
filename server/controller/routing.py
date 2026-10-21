"""Deterministic congestion-aware route recommendations; no FlowMods are sent."""

from __future__ import annotations

import heapq
import logging
import math
import os
import pickle
import sqlite3
from dataclasses import dataclass
from datetime import datetime, timezone
from functools import wraps
from pathlib import Path
from threading import RLock
from typing import Any, Callable, Optional

try:
    from server.controller.congestion_model import (
        ARTIFACT_SCHEMA_VERSION,
        ARTIFACT_TYPE,
        DEFAULT_HISTORY_SAMPLES,
        DEFAULT_MODEL_PATH,
        feature_names_for_lags,
        latest_feature_rows,
        load_trusted_artifact,
    )
    from server.controller.telemetry_storage import HistoricalTelemetryStore
except ImportError:
    from congestion_model import (
        ARTIFACT_SCHEMA_VERSION,
        ARTIFACT_TYPE,
        DEFAULT_HISTORY_SAMPLES,
        DEFAULT_MODEL_PATH,
        feature_names_for_lags,
        latest_feature_rows,
        load_trusted_artifact,
    )
    from telemetry_storage import HistoricalTelemetryStore


LOG = logging.getLogger("aife.routing")
MAX_NORMAL_PORT = 0xFFFFFF00
_HISTORY_PAGE_SIZE = 10_000


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _timestamp(value: datetime) -> str:
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc).isoformat()


def _parse_timestamp(value: object) -> Optional[datetime]:
    if not isinstance(value, str):
        return None
    try:
        result = datetime.fromisoformat(value)
    except ValueError:
        return None
    if result.tzinfo is None:
        result = result.replace(tzinfo=timezone.utc)
    return result.astimezone(timezone.utc)


def _identifier(value: object) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and 0 <= value < 2**64


def _port_number(value: object) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and 0 < value < MAX_NORMAL_PORT


def _number(value: object) -> Optional[float]:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    parsed = float(value)
    return parsed if math.isfinite(parsed) and parsed >= 0 else None


def _serialized(method):
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        with self._lock:
            return method(self, *args, **kwargs)

    return wrapper


@dataclass(frozen=True)
class RoutingConfig:
    max_candidates: int = 8
    telemetry_weight: float = 0.55
    prediction_weight: float = 0.30
    hop_weight: float = 0.15
    telemetry_max_age_seconds: float = 5.0
    topology_max_age_seconds: float = 15.0
    model_max_age_seconds: float = 30 * 24 * 60 * 60
    minimum_improvement: float = 0.05
    cooldown_seconds: float = 10.0

    def __post_init__(self) -> None:
        if self.max_candidates < 1:
            raise ValueError("max_candidates must be at least 1")
        weights = (self.telemetry_weight, self.prediction_weight, self.hop_weight)
        if any(not math.isfinite(weight) or weight < 0 for weight in weights):
            raise ValueError("route signal weights must be finite and non-negative")
        if sum(weights) <= 0:
            raise ValueError("at least one route signal weight must be positive")
        for name in (
            "telemetry_max_age_seconds",
            "topology_max_age_seconds",
            "model_max_age_seconds",
        ):
            value = getattr(self, name)
            if not math.isfinite(value) or value <= 0:
                raise ValueError(f"{name} must be positive and finite")
        if not math.isfinite(self.minimum_improvement) or self.minimum_improvement < 0:
            raise ValueError("minimum_improvement must be finite and non-negative")
        if not math.isfinite(self.cooldown_seconds) or self.cooldown_seconds < 0:
            raise ValueError("cooldown_seconds must be finite and non-negative")

    @classmethod
    def from_environment(cls) -> "RoutingConfig":
        return cls(
            max_candidates=int(os.getenv("AIFE_ROUTE_MAX_CANDIDATES", "8")),
            telemetry_weight=float(os.getenv("AIFE_ROUTE_TELEMETRY_WEIGHT", "0.55")),
            prediction_weight=float(os.getenv("AIFE_ROUTE_PREDICTION_WEIGHT", "0.30")),
            hop_weight=float(os.getenv("AIFE_ROUTE_HOP_WEIGHT", "0.15")),
            telemetry_max_age_seconds=float(os.getenv("AIFE_ROUTE_TELEMETRY_MAX_AGE_SECONDS", "5")),
            topology_max_age_seconds=float(os.getenv("AIFE_ROUTE_TOPOLOGY_MAX_AGE_SECONDS", "15")),
            model_max_age_seconds=float(os.getenv("AIFE_ROUTE_MODEL_MAX_AGE_SECONDS", str(30 * 24 * 60 * 60))),
            minimum_improvement=float(os.getenv("AIFE_ROUTE_MINIMUM_IMPROVEMENT", "0.05")),
            cooldown_seconds=float(os.getenv("AIFE_ROUTE_COOLDOWN_SECONDS", "10")),
        )


def _model_prediction_map(
    model_signals: Optional[dict[str, Any]],
    now: datetime,
    max_model_age_seconds: float,
    max_prediction_age_seconds: float,
) -> tuple[dict[tuple[int, int], tuple[float, datetime]], str]:
    if not isinstance(model_signals, dict) or model_signals.get("status") != "available":
        reason = (
            model_signals.get("reason", "No compatible congestion model is available.")
            if isinstance(model_signals, dict)
            else "No compatible congestion model is configured."
        )
        return {}, str(reason)

    feature_schema = model_signals.get("feature_schema")
    if not isinstance(feature_schema, list):
        return {}, "Model feature schema is missing."
    lag_count = sum(
        isinstance(name, str) and name.startswith("rx_byte_rate_lag_")
        for name in feature_schema
    )
    try:
        compatible_schema = feature_schema == feature_names_for_lags(lag_count)
    except ValueError:
        compatible_schema = False
    if (
        model_signals.get("artifact_type") != ARTIFACT_TYPE
        or model_signals.get("artifact_schema_version") != ARTIFACT_SCHEMA_VERSION
        or not compatible_schema
    ):
        return {}, "Model artifact or feature schema is incompatible with this predictor."

    trained_at = _parse_timestamp(model_signals.get("training_timestamp"))
    if trained_at is None:
        return {}, "Model training timestamp is missing or invalid."
    model_age = (now - trained_at).total_seconds()
    if model_age < 0 or model_age > max_model_age_seconds:
        return {}, "Model artifact is stale or has a future training timestamp."

    target = model_signals.get("target")
    threshold = _number(target.get("threshold_bytes_per_second")) if isinstance(target, dict) else None
    horizon = target.get("horizon_seconds") if isinstance(target, dict) else None
    if (
        not isinstance(target, dict)
        or target.get("name") != "future_port_congestion"
        or target.get("physical_capacity_known") is not False
        or threshold is None
        or threshold <= 0
        or isinstance(horizon, bool)
        or not isinstance(horizon, int)
        or horizon < 1
    ):
        return {}, "Model target metadata is incompatible with route scoring."

    prediction_rows = model_signals.get("predictions")
    if not isinstance(prediction_rows, list):
        return {}, "Model predictions are missing."
    predictions: dict[tuple[int, int], tuple[float, datetime]] = {}
    for row in prediction_rows:
        if not isinstance(row, dict):
            continue
        dpid, port_no = row.get("dpid"), row.get("port_no")
        probability = _number(row.get("congestion_probability"))
        timestamp = _parse_timestamp(row.get("sample_timestamp"))
        if (
            not _identifier(dpid)
            or not _port_number(port_no)
            or probability is None
            or probability > 1
            or timestamp is None
            or (now - timestamp).total_seconds() < 0
            or (now - timestamp).total_seconds() > max_prediction_age_seconds
        ):
            continue
        key = (dpid, port_no)
        current = predictions.get(key)
        if current is None or timestamp > current[1]:
            predictions[key] = (probability, timestamp)
    if not predictions:
        return {}, "No recent compatible model predictions are available."
    return predictions, ""


def load_trusted_model_signals(
    store: Optional[HistoricalTelemetryStore],
    model_path: Path = DEFAULT_MODEL_PATH,
    *,
    now: Optional[datetime] = None,
    max_model_age_seconds: float = RoutingConfig.model_max_age_seconds,
    max_sample_age_seconds: float = RoutingConfig.telemetry_max_age_seconds,
) -> dict[str, Any]:
    """Load a trusted local Step 2 artifact and score only its latest port rows."""
    current = now or _utc_now()
    if current.tzinfo is None:
        current = current.replace(tzinfo=timezone.utc)
    current = current.astimezone(timezone.utc)
    unavailable = {
        "status": "unavailable",
        "reason": "Historical telemetry storage is unavailable.",
    }
    if store is None:
        return unavailable

    try:
        artifact = load_trusted_artifact(Path(model_path))
        feature_schema = artifact["feature_names"]
        lag_count = sum(
            isinstance(name, str) and name.startswith("rx_byte_rate_lag_")
            for name in feature_schema
        )
        if feature_schema != feature_names_for_lags(lag_count):
            return {**unavailable, "reason": "Model feature schema is incompatible."}
        metadata = artifact["metadata"]
        trained_at = _parse_timestamp(metadata.get("training_timestamp"))
        if trained_at is None:
            return {**unavailable, "reason": "Model training timestamp is invalid."}
        model_age = (current - trained_at).total_seconds()
        if model_age < 0 or model_age > max_model_age_seconds:
            return {**unavailable, "reason": "Model artifact is stale or future-dated."}

        total_rows = store.history_count()
        selected_count = min(total_rows, DEFAULT_HISTORY_SAMPLES)
        offset = max(0, total_rows - selected_count)
        observations: list[dict[str, object]] = []
        while len(observations) < selected_count:
            page = store.history(
                limit=min(_HISTORY_PAGE_SIZE, selected_count - len(observations)),
                offset=offset + len(observations),
            )
            if not page:
                break
            observations.extend(page)
        latest_rows = latest_feature_rows(observations, lag_count)
        model = artifact["model"]
        classes = list(model.classes_)
        if 1 not in classes:
            return {**unavailable, "reason": "Model has no congested class."}
        positive_index = classes.index(1)
        predictions = []
        for timestamp, dpid, port_no, features in latest_rows:
            age = (current - timestamp).total_seconds()
            if age < 0 or age > max_sample_age_seconds:
                continue
            probability = float(model.predict_proba([features])[0][positive_index])
            if not math.isfinite(probability) or not 0 <= probability <= 1:
                continue
            predictions.append(
                {
                    "sample_timestamp": _timestamp(timestamp),
                    "dpid": dpid,
                    "port_no": port_no,
                    "congestion_probability": probability,
                }
            )
        return {
            "status": "available" if predictions else "unavailable",
            "reason": "" if predictions else "No sufficiently recent model features are available.",
            "artifact_type": artifact["artifact_type"],
            "artifact_schema_version": artifact["artifact_schema_version"],
            "feature_schema": feature_schema,
            "training_timestamp": metadata["training_timestamp"],
            "target": metadata["target"],
            "predictions": predictions,
        }
    except FileNotFoundError as error:
        return {**unavailable, "reason": str(error)}
    except (
        OSError,
        ValueError,
        TypeError,
        ImportError,
        sqlite3.Error,
        EOFError,
        IndexError,
        pickle.UnpicklingError,
        AttributeError,
    ) as error:
        LOG.warning("Congestion model signal unavailable: %s", error)
        return {**unavailable, "reason": str(error)}


class RouteDecisionEngine:
    """Generate deterministic simple paths and recommend their lowest-cost option."""

    def __init__(
        self,
        config: RoutingConfig = RoutingConfig(),
        *,
        now: Optional[Callable[[], datetime]] = None,
    ) -> None:
        self.config = config
        self._now = now or _utc_now
        self._lock = RLock()
        self._previous: dict[tuple[object, object], tuple[tuple[Any, ...], float, datetime]] = {}

    @_serialized
    def recommend(
        self,
        topology: object,
        telemetry: object,
        source: object,
        destination: object,
        *,
        model_signals: Optional[dict[str, Any]] = None,
    ) -> dict[str, Any]:
        current = self._now()
        if current.tzinfo is None:
            current = current.replace(tzinfo=timezone.utc)
        current = current.astimezone(timezone.utc)
        base = {
            "status": "unavailable",
            "source": source,
            "destination": destination,
            "candidate_paths": [],
            "selected_path": None,
            "signals_used": [],
            "unavailable_signals": {},
            "decision_timestamp": _timestamp(current),
            "reason": "",
            "recommendation_only": True,
        }
        if not isinstance(topology, dict):
            return {**base, "reason": "Live topology snapshot is missing or malformed."}
        if topology.get("discovery_status") != "fresh":
            return {
                **base,
                "reason": f"Live topology is {topology.get('discovery_status', 'unavailable')}.",
                "unavailable_signals": {"topology": "A fresh live topology snapshot is required."},
            }
        topology_observed_at = _parse_timestamp(topology.get("observed_at"))
        if (
            topology_observed_at is None
            or (current - topology_observed_at).total_seconds() < 0
            or (current - topology_observed_at).total_seconds() > self.config.topology_max_age_seconds
        ):
            return {
                **base,
                "reason": "Live topology observation is stale or has an invalid timestamp.",
                "unavailable_signals": {"topology": "A fresh live topology snapshot is required."},
            }

        switches, adjacency, malformed_links = self._topology_graph(topology, current)
        if not switches:
            return {
                **base,
                "reason": "No connected switches are present in the live topology.",
                "unavailable_signals": {"topology": "No connected switches were discovered."},
            }
        source_switch, source_attachment, source_error = self._resolve_endpoint(
            source, switches, topology.get("hosts")
        )
        destination_switch, destination_attachment, destination_error = self._resolve_endpoint(
            destination, switches, topology.get("hosts")
        )
        if source_error or destination_error:
            errors = [error for error in (source_error, destination_error) if error]
            return {
                **base,
                "reason": "; ".join(errors),
                "unavailable_signals": {"host_attachments": "; ".join(errors)},
            }
        assert source_switch is not None and destination_switch is not None

        if (
            source_switch != destination_switch
            and topology.get("link_discovery_status") != "fresh"
        ):
            return {
                **base,
                "status": "no_path",
                "reason": (
                    "Switch-link discovery is "
                    f"{topology.get('link_discovery_status', 'unavailable')}."
                ),
                "unavailable_signals": {
                    "topology": "No fresh discovered switch links are available."
                },
            }
        paths = self._simple_paths(source_switch, destination_switch, adjacency)
        if not paths:
            reason = (
                "No valid directed path connects the requested endpoints."
                if source_switch != destination_switch
                else "No valid route connects the requested endpoints."
            )
            return {
                **base,
                "status": "no_path",
                "reason": reason,
                "unavailable_signals": {
                    "topology": (
                        f"{malformed_links} malformed or stale link(s) were excluded."
                        if malformed_links
                        else "No valid directed path was discovered."
                    )
                },
            }

        telemetry_map, telemetry_reason = self._telemetry_map(telemetry, current)
        model_map, model_reason = _model_prediction_map(
            model_signals,
            current,
            self.config.model_max_age_seconds,
            self.config.telemetry_max_age_seconds,
        )
        candidate_link_keys = {
            (link["src_dpid"], link["src_port_no"])
            for path in paths
            for link in path["links"]
        }
        has_candidate_telemetry = bool(candidate_link_keys.intersection(telemetry_map))
        has_candidate_predictions = bool(candidate_link_keys.intersection(model_map))
        maximum_rate = max(
            (
                telemetry_map[(link["src_dpid"], link["src_port_no"])]
                for path in paths
                for link in path["links"]
                if (link["src_dpid"], link["src_port_no"]) in telemetry_map
            ),
            default=0.0,
        )
        maximum_hops = max((len(path["links"]) for path in paths), default=0)
        candidates = [
            self._score_path(
                path,
                source_attachment,
                destination_attachment,
                telemetry_map,
                model_map,
                maximum_rate,
                maximum_hops,
            )
            for path in paths
        ]
        candidates.sort(
            key=lambda item: (
                item["total_cost"],
                len(item["switches"]),
                tuple(item["switches"]),
                tuple(
                    (
                        link["src_dpid"],
                        link["src_port_no"],
                        link["dst_dpid"],
                        link["dst_port_no"],
                    )
                    for link in item["directed_links"]
                ),
            )
        )

        selected, reason = self._apply_hysteresis(
            (source, destination),
            candidates,
            current,
        )
        selected_signals = selected["cost_breakdown"]["signals_used"]
        unavailable_signals: dict[str, str] = {
            "physical_utilization": (
                "No explicit link capacity is configured; rate is not treated as utilization."
            )
        }
        if not has_candidate_telemetry:
            unavailable_signals["measured_byte_rate"] = (
                telemetry_reason
                or "No recent byte-rate sample maps to a candidate link's source port."
            )
        if not has_candidate_predictions:
            unavailable_signals["future_congestion_prediction"] = (
                model_reason
                or "No recent model prediction maps to a candidate link's source port."
            )
        if malformed_links:
            unavailable_signals["malformed_links"] = f"{malformed_links} malformed or stale link(s) were excluded."
        return {
            **base,
            "status": "selected",
            "candidate_paths": [self._public_candidate(candidate) for candidate in candidates],
            "selected_path": self._public_candidate(selected),
            "signals_used": selected_signals,
            "unavailable_signals": unavailable_signals,
            "reason": reason,
        }

    def _topology_graph(
        self,
        topology: dict[str, Any],
        now: datetime,
    ) -> tuple[dict[int, dict[int, set[int]]], dict[int, list[dict[str, Any]]], int]:
        switch_rows = topology.get("switches")
        link_rows = topology.get("links")
        if not isinstance(switch_rows, list) or not isinstance(link_rows, list):
            return {}, {}, 0
        switches: dict[int, dict[int, set[int]]] = {}
        for row in switch_rows:
            if not isinstance(row, dict) or row.get("status") != "connected":
                continue
            dpid = row.get("dpid")
            if not _identifier(dpid):
                continue
            ports = row.get("ports")
            if not isinstance(ports, list):
                continue
            valid_ports = {
                port.get("port_no")
                for port in ports
                if isinstance(port, dict)
                and _port_number(port.get("port_no"))
            }
            switches[dpid] = {port: set() for port in valid_ports}

        adjacency: dict[int, list[dict[str, Any]]] = {dpid: [] for dpid in switches}
        malformed = 0
        seen: set[tuple[int, int, int, int]] = set()
        for row in link_rows:
            if not isinstance(row, dict) or row.get("status") != "fresh":
                malformed += 1
                continue
            src, src_port = row.get("src_dpid"), row.get("src_port_no")
            dst, dst_port = row.get("dst_dpid"), row.get("dst_port_no")
            observed_at = _parse_timestamp(row.get("observed_at"))
            key = (src, src_port, dst, dst_port)
            if (
                not _identifier(src)
                or not _identifier(dst)
                or not _port_number(src_port)
                or not _port_number(dst_port)
                or src == dst
                or src not in switches
                or dst not in switches
                or src_port not in switches[src]
                or dst_port not in switches[dst]
                or observed_at is None
                or (now - observed_at).total_seconds() < 0
                or (now - observed_at).total_seconds() > self.config.topology_max_age_seconds
            ):
                malformed += 1
                continue
            if key in seen:
                continue
            seen.add(key)
            edge = {
                "src_dpid": src,
                "src_port_no": src_port,
                "dst_dpid": dst,
                "dst_port_no": dst_port,
                "observed_at": _timestamp(observed_at),
            }
            adjacency[src].append(edge)
            switches[src][src_port].add(dst)
        for edges in adjacency.values():
            edges.sort(
                key=lambda edge: (
                    edge["dst_dpid"],
                    edge["src_port_no"],
                    edge["dst_port_no"],
                )
            )
        return switches, adjacency, malformed

    @staticmethod
    def _resolve_endpoint(
        endpoint: object,
        switches: dict[int, dict[int, set[int]]],
        hosts: object,
    ) -> tuple[Optional[int], Optional[dict[str, Any]], str]:
        if _identifier(endpoint):
            if endpoint not in switches:
                return None, None, f"Switch DPID {endpoint} is not connected."
            return endpoint, None, ""
        if not isinstance(endpoint, str) or not endpoint:
            return None, None, "Endpoint must be a connected switch DPID or observed host MAC/IP."
        matches: list[dict[str, Any]] = []
        if isinstance(hosts, list):
            normalized = endpoint.casefold()
            for host in hosts:
                if not isinstance(host, dict):
                    continue
                host_id = host.get("host_id")
                dpid, port_no = host.get("dpid"), host.get("port_no")
                if not isinstance(host_id, str) or not host_id or not _identifier(dpid) or not _port_number(port_no):
                    continue
                identities = [host_id]
                for field in ("ipv4", "ipv6"):
                    addresses = host.get(field)
                    if isinstance(addresses, list):
                        identities.extend(addresses)
                if any(isinstance(identity, str) and identity.casefold() == normalized for identity in identities):
                    matches.append(host)
        unique_attachments = {
            (item.get("host_id"), item.get("dpid"), item.get("port_no")): item
            for item in matches
        }
        if len(unique_attachments) != 1:
            return (
                None,
                None,
                "Host attachment is absent or ambiguous; use an OS-Ken-observed host MAC/IP.",
            )
        host = next(iter(unique_attachments.values()))
        dpid, port_no = host.get("dpid"), host.get("port_no")
        if (
            not _identifier(dpid)
            or not _port_number(port_no)
            or dpid not in switches
            or port_no not in switches[dpid]
        ):
            return None, None, "Observed host attachment points to a disconnected switch or malformed port."
        return (
            dpid,
            {"host_id": host.get("host_id"), "dpid": dpid, "port_no": port_no},
            "",
        )

    def _simple_paths(
        self,
        source: int,
        destination: int,
        adjacency: dict[int, list[dict[str, Any]]],
    ) -> list[dict[str, Any]]:
        if source == destination:
            return [{"switches": (source,), "links": ()}]
        queue: list[tuple[int, tuple[int, ...], tuple[tuple[int, int, int, int], ...]]] = [
            (0, (source,), ())
        ]
        edge_by_key = {
            (
                edge["src_dpid"],
                edge["src_port_no"],
                edge["dst_dpid"],
                edge["dst_port_no"],
            ): edge
            for edges in adjacency.values()
            for edge in edges
        }
        paths = []
        while queue and len(paths) < self.config.max_candidates:
            _, nodes, edge_keys = heapq.heappop(queue)
            current = nodes[-1]
            if current == destination:
                paths.append(
                    {
                        "switches": nodes,
                        "links": tuple(edge_by_key[key] for key in edge_keys),
                    }
                )
                continue
            for edge in adjacency.get(current, []):
                next_switch = edge["dst_dpid"]
                if next_switch in nodes:
                    continue
                next_nodes = (*nodes, next_switch)
                next_edge_keys = (
                    *edge_keys,
                    (
                        edge["src_dpid"],
                        edge["src_port_no"],
                        edge["dst_dpid"],
                        edge["dst_port_no"],
                    ),
                )
                heapq.heappush(queue, (len(next_edge_keys), next_nodes, next_edge_keys))
        return paths

    def _telemetry_map(
        self,
        telemetry: object,
        now: datetime,
    ) -> tuple[dict[tuple[int, int], float], str]:
        if not isinstance(telemetry, list):
            return {}, "Latest OpenFlow port telemetry is unavailable."
        result: dict[tuple[int, int], float] = {}
        for row in telemetry:
            if not isinstance(row, dict):
                continue
            dpid, port_no = row.get("dpid"), row.get("port_no")
            timestamp = _parse_timestamp(row.get("timestamp", row.get("sample_timestamp")))
            rx_rate, tx_rate = _number(row.get("rx_byte_rate")), _number(row.get("tx_byte_rate"))
            if (
                not _identifier(dpid)
                or not _port_number(port_no)
                or timestamp is None
                or (now - timestamp).total_seconds() < 0
                or (now - timestamp).total_seconds() > self.config.telemetry_max_age_seconds
                or rx_rate is None
                or tx_rate is None
            ):
                continue
            aggregate_rate = rx_rate + tx_rate
            if math.isfinite(aggregate_rate):
                result[(dpid, port_no)] = aggregate_rate
        reason = (
            "No recent valid OpenFlow byte rates map to discovered switch-link output ports."
            if not result
            else ""
        )
        return result, reason

    def _score_path(
        self,
        path: dict[str, Any],
        source_attachment: Optional[dict[str, Any]],
        destination_attachment: Optional[dict[str, Any]],
        telemetry: dict[tuple[int, int], float],
        predictions: dict[tuple[int, int], tuple[float, datetime]],
        maximum_rate: float,
        maximum_hops: int,
    ) -> dict[str, Any]:
        links = path["links"]
        rate_values = [
            telemetry[(edge["src_dpid"], edge["src_port_no"])]
            for edge in links
            if (edge["src_dpid"], edge["src_port_no"]) in telemetry
        ]
        prediction_values = [
            predictions[(edge["src_dpid"], edge["src_port_no"])][0]
            for edge in links
            if (edge["src_dpid"], edge["src_port_no"]) in predictions
        ]
        raw_signals: dict[str, tuple[float, float, str]] = {}
        if rate_values:
            normalized_rate = (
                sum(rate_values) / len(rate_values) / maximum_rate
                if maximum_rate > 0
                else 0.0
            )
            raw_signals["measured_byte_rate"] = (
                sum(rate_values) / len(rate_values),
                min(1.0, normalized_rate),
                "telemetry_weight",
            )
        if prediction_values:
            raw_signals["future_congestion_probability"] = (
                sum(prediction_values) / len(prediction_values),
                sum(prediction_values) / len(prediction_values),
                "prediction_weight",
            )
        normalized_hops = len(links) / maximum_hops if maximum_hops else 0.0
        raw_signals["hop_count"] = (float(len(links)), normalized_hops, "hop_weight")
        weights = {
            "telemetry_weight": self.config.telemetry_weight,
            "prediction_weight": self.config.prediction_weight,
            "hop_weight": self.config.hop_weight,
        }
        raw_signals = {
            signal: values
            for signal, values in raw_signals.items()
            if weights[values[2]] > 0
        }
        active_weight = sum(weights[name] for _, _, name in raw_signals.values())
        signal_results = {}
        total_cost = 0.0
        for signal, (raw_mean, normalized, weight_name) in raw_signals.items():
            weight = weights[weight_name]
            effective_weight = weight / active_weight if active_weight else 0.0
            contribution = normalized * effective_weight
            total_cost += contribution
            observations_used = (
                len(rate_values)
                if signal == "measured_byte_rate"
                else len(prediction_values)
                if signal == "future_congestion_probability"
                else len(links)
            )
            signal_results[signal] = {
                "raw_mean": raw_mean,
                "normalized_score": normalized,
                "configured_weight": weight,
                "effective_weight": effective_weight,
                "weighted_contribution": contribution,
                "observations_used": observations_used,
                "links_total": len(links),
                "coverage_ratio": observations_used / len(links) if links else 1.0,
            }
        unavailable = []
        if not rate_values or self.config.telemetry_weight == 0:
            unavailable.append("measured_byte_rate")
        if not prediction_values or self.config.prediction_weight == 0:
            unavailable.append("future_congestion_probability")
        return {
            "switches": list(path["switches"]),
            "directed_links": [dict(edge) for edge in links],
            "source_attachment": source_attachment,
            "destination_attachment": destination_attachment,
            "cost_breakdown": {
                "signals": signal_results,
                "signals_used": list(signal_results),
                "unavailable_signals": unavailable,
                "active_configured_weight_sum": active_weight,
            },
            "total_cost": total_cost,
            "_signature": (
                tuple(path["switches"]),
                tuple(
                    (
                        edge["src_dpid"],
                        edge["src_port_no"],
                        edge["dst_dpid"],
                        edge["dst_port_no"],
                    )
                    for edge in links
                ),
                (
                    source_attachment.get("host_id"),
                    source_attachment.get("dpid"),
                    source_attachment.get("port_no"),
                )
                if source_attachment
                else None,
                (
                    destination_attachment.get("host_id"),
                    destination_attachment.get("dpid"),
                    destination_attachment.get("port_no"),
                )
                if destination_attachment
                else None,
            ),
        }

    def _apply_hysteresis(
        self,
        request_key: tuple[object, object],
        candidates: list[dict[str, Any]],
        now: datetime,
    ) -> tuple[dict[str, Any], str]:
        best = candidates[0]
        previous = self._previous.get(request_key)
        if previous is None:
            self._previous[request_key] = (best["_signature"], best["total_cost"], now)
            return best, "Lowest-cost candidate selected; recommendation only."

        old_signature, old_cost, last_change = previous
        incumbent = next(
            (candidate for candidate in candidates if candidate["_signature"] == old_signature),
            None,
        )
        if incumbent is None:
            self._previous[request_key] = (best["_signature"], best["total_cost"], now)
            return best, "Previous route is no longer a valid candidate; lowest-cost route recommended."
        if incumbent is best or incumbent["_signature"] == best["_signature"]:
            self._previous[request_key] = (old_signature, incumbent["total_cost"], last_change)
            return incumbent, "Current route remains the lowest-cost candidate; recommendation only."
        elapsed = (now - last_change).total_seconds()
        if elapsed < self.config.cooldown_seconds:
            return incumbent, "Cooldown is active; retaining the previous route recommendation."
        improvement = incumbent["total_cost"] - best["total_cost"]
        if improvement < self.config.minimum_improvement:
            return incumbent, "Cost improvement is below the configured hysteresis margin."
        self._previous[request_key] = (best["_signature"], best["total_cost"], now)
        return best, "Alternative route clears cooldown and minimum improvement margin."

    def _public_candidate(self, candidate: dict[str, Any]) -> dict[str, Any]:
        return {key: value for key, value in candidate.items() if key != "_signature"}
