// scripts/lib/utils.js — MIPO Work Journal shared utilities

import { execSync } from "child_process";
import { existsSync, readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT   = join(__dirname, "../..");
export const JOURNAL_DIR = join(process.env.HOME, "Documents", "mipo-journal");
export const TASKS_DIR   = join(REPO_ROOT, "tasks");

// ─── ENV ──────────────────────────────────────────────────────────────────────

export function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = join(REPO_ROOT, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const idx = t.indexOf("=");
      if (idx < 0) continue;
      const key = t.slice(0, idx).trim();
      const val = t.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

// ─── DATES ────────────────────────────────────────────────────────────────────

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** ISO week: week-YYYY-WW */
export function isoWeekStr(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `week-${d.getUTCFullYear()}-${String(weekNo).padStart(2, "0")}`;
}

/** Monday of current ISO week */
export function weekStartStr(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return d.toISOString().slice(0, 10);
}

// ─── GIT ──────────────────────────────────────────────────────────────────────

export function getGitLog(since = todayStr(), until = null) {
  try {
    const flags = [
      `--since="${since} 00:00:00"`,
      until ? `--until="${until} 23:59:59"` : "",
      `--format="%h|%s|%an|%ai"`,
      "--no-merges",
    ].filter(Boolean).join(" ");
    const raw = execSync(
      `git -C "${REPO_ROOT}" log ${flags} 2>/dev/null`,
      { encoding: "utf8" }
    ).trim();
    if (!raw) return [];
    return raw.split("\n").filter(Boolean).map(line => {
      const [hash, subject, author, date] = line.split("|");
      return {
        hash:    hash?.trim()    ?? "",
        subject: subject?.trim() ?? "",
        author:  author?.trim()  ?? "",
        date:    date?.trim()    ?? "",
      };
    });
  } catch {
    return [];
  }
}

export function getWorkTime(since = todayStr()) {
  try {
    const raw = execSync(
      `git -C "${REPO_ROOT}" log --since="${since} 00:00:00" --format="%ai" --no-merges 2>/dev/null`,
      { encoding: "utf8" }
    ).trim();
    if (!raw) return null;
    const times = raw.split("\n").filter(Boolean).map(t => new Date(t));
    const first = new Date(Math.min(...times));
    const last  = new Date(Math.max(...times));
    const diffMins = Math.round((last - first) / 60000);
    const h = Math.floor(diffMins / 60);
    const m = diffMins % 60;
    return {
      first:    first.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
      last:     last.toLocaleTimeString("he-IL",  { hour: "2-digit", minute: "2-digit" }),
      duration: h > 0 ? `${h}ש' ${m}ד'` : `${m} דקות`,
      commits:  times.length,
    };
  } catch {
    return null;
  }
}

export function getBranchName() {
  try {
    return execSync(`git -C "${REPO_ROOT}" rev-parse --abbrev-ref HEAD 2>/dev/null`, {
      encoding: "utf8",
    }).trim();
  } catch {
    return "unknown";
  }
}

// ─── TASKS ────────────────────────────────────────────────────────────────────

export function getTasks() {
  const parse = (file) => {
    if (!existsSync(file)) return [];
    return readFileSync(file, "utf8")
      .split("\n")
      .filter(l => /^[-*]\s|\[.\]/.test(l))
      .map(l => l.replace(/^[-*]\s+(\[.\]\s+)?/, "").trim())
      .filter(Boolean);
  };
  return {
    done: parse(join(TASKS_DIR, "done.md")),
    todo: parse(join(TASKS_DIR, "todo.md")),
  };
}

// ─── ANTHROPIC COST ──────────────────────────────────────────────────────────
// ניסיון לקרוא עלות מ-~/.claude/cost-log.json (קובץ ידני/אוטומטי)
// פורמט: { "YYYY-MM-DD": 0.0123, ... }

export async function getAnthropicCost() {
  const costLog = join(process.env.HOME, ".claude", "cost-log.json");
  if (existsSync(costLog)) {
    try {
      const data = JSON.parse(readFileSync(costLog, "utf8"));
      const today = todayStr();
      if (data[today] != null) return `$${parseFloat(data[today]).toFixed(4)}`;
    } catch {}
  }

  // ניסיון דרך Anthropic API
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  try {
    const today = todayStr();
    const res = await fetch(
      `https://api.anthropic.com/v1/usage/costs?start_date=${today}&end_date=${today}`,
      {
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const cost = data?.total_cost ?? data?.data?.[0]?.total_cost;
    return cost != null ? `$${parseFloat(cost).toFixed(4)}` : null;
  } catch {
    return null;
  }
}

// ─── OPENCLAW NOTIFICATION ───────────────────────────────────────────────────

export async function sendNotification(message) {
  const url    = process.env.OPENCLAW_WEBHOOK_URL;
  const secret = process.env.OPENCLAW_WEBHOOK_SECRET;

  if (!url) {
    console.log("⏭️  OPENCLAW_WEBHOOK_URL לא מוגדר — מדלג על הודעת WhatsApp");
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { "X-Webhook-Secret": secret } : {}),
      },
      body: JSON.stringify({
        event:     "journal_update",
        timestamp: new Date().toISOString(),
        message,
      }),
    });
    return res.ok;
  } catch (e) {
    console.warn("⚠️  שגיאה בשליחת הודעה:", e.message);
    return false;
  }
}

// ─── JOURNAL FILES ────────────────────────────────────────────────────────────

export function getDailyFiles(dir = JOURNAL_DIR) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort();
}

export function extractSection(content, heading) {
  // Matches "## heading\ncontent" until next ## or end
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`##[^\\S\\n]*${escaped}[^\\S\\n]*\\n([\\s\\S]*?)(?=\\n##|$)`);
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}
