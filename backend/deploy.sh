#!/usr/bin/env bash
# deploy.sh — MIPO Backend → Google Cloud Run
# קורא env vars מ-~/.openclaw/agents/main/secrets.env ומפרס ל-Cloud Run

set -euo pipefail

PROJECT="calcium-spanner-449711-u1"
REGION="europe-west1"
SERVICE="mipo-backend"
REPO="europe-west1-docker.pkg.dev/$PROJECT/mipo-backend/api"
SHA=$(git rev-parse --short HEAD)
SECRETS_FILE="$HOME/.openclaw/agents/main/secrets.env"

echo ""
echo "═══════════════════════════════════════════════════"
echo "  🚀 MIPO Backend → Cloud Run"
echo "  SHA: $SHA"
echo "═══════════════════════════════════════════════════"

# ── קריאת secrets ────────────────────────────────────────
if [[ ! -f "$SECRETS_FILE" ]]; then
  echo "❌ לא נמצא: $SECRETS_FILE"
  exit 1
fi

load_var() {
  grep -E "^$1=" "$SECRETS_FILE" | tail -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'"
}

SUPABASE_URL=$(load_var SUPABASE_URL)
SUPABASE_SERVICE_ROLE_KEY=$(load_var SUPABASE_SERVICE_ROLE_KEY)
ANTHROPIC_API_KEY=$(load_var ANTHROPIC_API_KEY)
PETID_ADMIN_TOKEN=$(load_var PETID_ADMIN_TOKEN)

# ── וולידציה ─────────────────────────────────────────────
missing=()
[[ -z "$SUPABASE_URL"              ]] && missing+=(SUPABASE_URL)
[[ -z "$SUPABASE_SERVICE_ROLE_KEY" ]] && missing+=(SUPABASE_SERVICE_ROLE_KEY)
[[ -z "$ANTHROPIC_API_KEY"         ]] && missing+=(ANTHROPIC_API_KEY)
[[ -z "$PETID_ADMIN_TOKEN"         ]] && missing+=(PETID_ADMIN_TOKEN)

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "❌ משתנים חסרים ב-$SECRETS_FILE:"
  for v in "${missing[@]}"; do echo "   - $v"; done
  exit 1
fi

echo "✅ כל ה-secrets נטענו"

# ── שלב 1: בנייה + push ל-Artifact Registry ──────────────
echo ""
echo "📦 בונה image ושולח ל-Artifact Registry..."

cd "$(dirname "$0")"
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions="SHORT_SHA=$SHA" \
  --project="$PROJECT" \
  .

echo "✅ Image: $REPO:$SHA"

# ── שלב 2: Deploy ל-Cloud Run עם env vars ────────────────
echo ""
echo "🚀 מפרס ל-Cloud Run..."

gcloud run deploy "$SERVICE" \
  --image="$REPO:$SHA" \
  --region="$REGION" \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --concurrency=80 \
  --timeout=60 \
  --set-env-vars="SUPABASE_URL=${SUPABASE_URL},SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY},ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY},PETID_ADMIN_TOKEN=${PETID_ADMIN_TOKEN}" \
  --project="$PROJECT"

# ── פלט ──────────────────────────────────────────────────
URL=$(gcloud run services describe "$SERVICE" \
  --region="$REGION" \
  --project="$PROJECT" \
  --format="value(status.url)" 2>/dev/null)

echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅ Deploy הצליח!"
echo "  🌐 URL: $URL"
echo "  🔍 Health: $URL/health"
echo "═══════════════════════════════════════════════════"
