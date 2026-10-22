#!/usr/bin/env bash
# Record real OpenFlow telemetry from Mininet and train the controller's
# Random Forest congestion model. Run from WSL (Ubuntu 22.04 recommended):
#
#   bash scripts/train_on_mininet.sh            # 20 minutes of traffic
#   MINUTES=40 bash scripts/train_on_mininet.sh
#
# Prompts once for your sudo password (Mininet needs root). Writes
# server/data/telemetry.sqlite3, congestion_rf.joblib, and
# congestion_metrics.json; a running controller serves the metrics at
# /api/telemetry/model for the dashboard's live view.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
MINUTES="${MINUTES:-20}"
VENV="${AIFE_VENV:-$HOME/.aife-venv}"

if [ ! -x "$VENV/bin/python" ]; then
  echo "*** Creating Python environment for OS-Ken and scikit-learn in $VENV"
  python3 -m venv "$VENV"
fi
"$VENV/bin/python" -m pip install --quiet --upgrade pip
"$VENV/bin/python" -m pip install --quiet os-ken -r server/requirements-ml.txt

sudo -v
sudo mn -c >/dev/null 2>&1 || true
mkdir -p server/data

echo "*** Starting the AIFE controller (log: server/data/controller.log)"
PYTHONPATH="$ROOT" "$VENV/bin/python" -m server.controller.run_controller \
  > server/data/controller.log 2>&1 &
CONTROLLER=$!
cleanup() {
  kill "$CONTROLLER" 2>/dev/null || true
  sudo mn -c >/dev/null 2>&1 || true
}
trap cleanup EXIT
sleep 5
if ! kill -0 "$CONTROLLER" 2>/dev/null; then
  echo "Controller exited; see server/data/controller.log" >&2
  exit 1
fi

echo "*** Generating $MINUTES minutes of traffic on the Mininet topology"
sudo python3 mininet/collect_traffic.py --minutes "$MINUTES"

kill "$CONTROLLER" 2>/dev/null || true
wait "$CONTROLLER" 2>/dev/null || true

echo "*** Training and evaluating the Random Forest"
PYTHONPATH="$ROOT" "$VENV/bin/python" -m server.controller.congestion_model train
