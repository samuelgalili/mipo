#!/usr/bin/env bash
# end-of-day.sh — MIPO Work Journal
# הרץ בסוף כל סשן פיתוח

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

node end-of-day.js
