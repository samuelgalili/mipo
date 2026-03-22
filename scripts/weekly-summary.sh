#!/usr/bin/env bash
# weekly-summary.sh — MIPO Weekly Summary + Dashboard update

set -e
SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPTS_DIR"

echo ""
echo "═══════════════════════════════════════════"
echo "  📊 MIPO Weekly Summary"
echo "═══════════════════════════════════════════"

node weekly-summary.js

echo ""
echo "📊 מעדכן dashboard..."
node generate-dashboard.js
