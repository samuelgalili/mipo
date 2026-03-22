#!/usr/bin/env bash
# context-snapshot.sh — MIPO Start-of-Day Context

set -e
SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPTS_DIR"

node context-snapshot.js
