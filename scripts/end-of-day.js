#!/usr/bin/env node
// end-of-day.js — MIPO Work Journal Generator
// מייצר סיכום יומי ושבועי אוטומטי מ-git log

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const JOURNAL_DIR = join(process.env.HOME, "Documents", "mipo-journal");

// ─── תאריכים ────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function weekStr() {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const week = Math.ceil(
    ((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7
  );
  return `week-${year}-${String(week).padStart(2, "0")}`;
}

// ─── git log של היום ─────────────────────────────────────────────────────────

function getGitLog() {
  try {
    const since = `${todayStr()} 00:00:00`;
    const raw = execSync(
      `git -C "${REPO_ROOT}" log --since="${since}" --oneline --no-merges 2>/dev/null`,
      { encoding: "utf8" }
    ).trim();

    if (!raw) return "_אין קומיטים היום_";

    return raw
      .split("\n")
      .map((line) => `- \`${line}\``)
      .join("\n");
  } catch {
    return "_לא ניתן לקרוא git log_";
  }
}

function getGitDiff() {
  try {
    const files = execSync(
      `git -C "${REPO_ROOT}" diff --name-only HEAD~1 HEAD 2>/dev/null`,
      { encoding: "utf8" }
    ).trim();
    if (!files) return "_אין שינויים_";
    return files
      .split("\n")
      .map((f) => `- \`${f}\``)
      .join("\n");
  } catch {
    return "_לא ניתן לקרוא diff_";
  }
}

// ─── tasks/ ──────────────────────────────────────────────────────────────────

function getTasks() {
  const tasksDir = join(REPO_ROOT, "tasks");
  if (!existsSync(tasksDir)) return { done: [], open: [] };

  const files = readdirSync(tasksDir).filter((f) => f.endsWith(".md"));
  const done = [];
  const open = [];

  for (const file of files) {
    const content = readFileSync(join(tasksDir, file), "utf8");
    const title = content.split("\n")[0].replace(/^#+\s*/, "").trim();
    if (/status:\s*(done|completed|הושלם)/i.test(content)) {
      done.push(`- ${title}`);
    } else {
      open.push(`- ${title}`);
    }
  }

  return { done, open };
}

// ─── קלט אינטראקטיבי ─────────────────────────────────────────────────────────

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function collectInput() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n📓 MIPO Work Journal — סיכום יומי\n");

  const nextStep    = await ask(rl, "➡️  השלב הבא (מה ממשיכים מחר?): ");
  const openIssues  = await ask(rl, "🔴 בעיות פתוחות (אפשר להשאיר ריק): ");
  const lessons     = await ask(rl, "💡 Lessons Learned (תובנות מהיום): ");

  rl.close();
  return { nextStep, openIssues, lessons };
}

// ─── בניית הקובץ היומי ───────────────────────────────────────────────────────

function buildDaily({ nextStep, openIssues, lessons }) {
  const today = todayStr();
  const gitLog = getGitLog();
  const gitDiff = getGitDiff();
  const { done, open } = getTasks();

  const doneSection  = done.length  ? done.join("\n")  : "_אין tasks שהושלמו_";
  const openSection  = open.length  ? open.join("\n")  : "_אין tasks פתוחים_";
  const issuesBlock  = openIssues.trim() || "_ללא בעיות פתוחות_";
  const lessonsBlock = lessons.trim()    || "_ללא תובנות מיוחדות_";

  return `# יומן עבודה — ${today}

## Git Log — קומיטים של היום
${gitLog}

## קבצים שהשתנו
${gitDiff}

## Tasks שהושלמו
${doneSection}

## Tasks פתוחים
${openSection}

## בעיות פתוחות
${issuesBlock}

## השלב הבא
${nextStep.trim() || "_לא צוין_"}

## Lessons Learned
${lessonsBlock}

---
_נוצר אוטומטית על ידי end-of-day.js · ${new Date().toLocaleString("he-IL")}_
`;
}

// ─── עדכון הקובץ השבועי ──────────────────────────────────────────────────────

function updateWeekly(today, nextStep) {
  const weekFile = join(JOURNAL_DIR, `${weekStr()}.md`);
  const entry = `\n## ${today}\n${nextStep.trim() || "_ראה קובץ יומי_"}\n`;

  if (existsSync(weekFile)) {
    const current = readFileSync(weekFile, "utf8");
    // לא מוסיפים אם כבר קיים רשומה לתאריך זה
    if (current.includes(`## ${today}`)) return;
    writeFileSync(weekFile, current + entry, "utf8");
  } else {
    const header = `# ${weekStr()} — סיכום שבועי\n${entry}`;
    writeFileSync(weekFile, header, "utf8");
  }
}

// ─── ראשי ────────────────────────────────────────────────────────────────────

async function main() {
  const input = await collectInput();
  const today = todayStr();

  const dailyContent = buildDaily(input);
  const dailyFile = join(JOURNAL_DIR, `${today}.md`);
  writeFileSync(dailyFile, dailyContent, "utf8");

  updateWeekly(today, input.nextStep);

  console.log(`\n✅ נשמר: ${dailyFile}`);
  console.log(`✅ עודכן: ${join(JOURNAL_DIR, weekStr() + ".md")}`);
  console.log("\nלילה טוב 🐾\n");
}

main().catch((err) => {
  console.error("שגיאה:", err.message);
  process.exit(1);
});
