#!/usr/bin/env node
// weekly-summary.js — MIPO Weekly Summary Generator

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import {
  loadEnv, JOURNAL_DIR,
  todayStr, isoWeekStr, weekStartStr,
  getGitLog, getWorkTime,
  extractSection, getDailyFiles,
  sendNotification,
} from "./lib/utils.js";

loadEnv();

// ─── Aggregate this week's daily files ───────────────────────────────────────

function aggregateWeek() {
  const weekStart = weekStartStr();
  const today     = todayStr();
  const files     = getDailyFiles();

  const weekFiles = files.filter(f => {
    const date = f.replace(".md", "");
    return date >= weekStart && date <= today;
  });

  if (!weekFiles.length) return null;

  let totalCommits = 0;
  const allNextSteps  = [];
  const allDecisions  = [];
  const allLessons    = [];
  const allIssues     = [];
  const dailyStats    = [];

  for (const file of weekFiles) {
    const date    = file.replace(".md", "");
    const content = readFileSync(join(JOURNAL_DIR, file), "utf8");

    // Count commits from git log section
    const gitSection = extractSection(content, "📝 Git Log — קומיטים של היום");
    const commitsToday = gitSection
      ? gitSection.split("\n").filter(l => l.startsWith("- `")).length
      : 0;
    totalCommits += commitsToday;

    // Collect sections
    const nextStep  = extractSection(content, "➡️ השלב הבא");
    const decisions = extractSection(content, "🧠 Decision Log");
    const lessons   = extractSection(content, "💡 Lessons Learned");
    const issues    = extractSection(content, "🔴 בעיות פתוחות");

    dailyStats.push({ date, commits: commitsToday });

    if (nextStep  && nextStep  !== "_לא צוין_")                   allNextSteps.push(`**${date}:** ${nextStep}`);
    if (decisions && decisions !== "_ללא החלטות מיוחדות היום_")   allDecisions.push(`**${date}:** ${decisions}`);
    if (lessons   && lessons   !== "_ללא_")                        allLessons.push(`**${date}:** ${lessons}`);
    if (issues    && issues    !== "_ללא_")                        allIssues.push(`**${date}:** ${issues}`);
  }

  return { weekFiles, totalCommits, dailyStats, allNextSteps, allDecisions, allLessons, allIssues };
}

// ─── Velocity bar ─────────────────────────────────────────────────────────────

function velocityBar(commits) {
  const max = 10;
  const filled = Math.min(commits, max);
  return "█".repeat(filled) + "░".repeat(max - filled) + ` ${commits}`;
}

// ─── Build markdown ───────────────────────────────────────────────────────────

function buildWeeklyMd(data) {
  const { weekFiles, totalCommits, dailyStats, allNextSteps, allDecisions, allLessons, allIssues } = data;
  const week   = isoWeekStr();
  const start  = weekStartStr();
  const today  = todayStr();
  const days   = weekFiles.length;
  const avgCom = days ? (totalCommits / days).toFixed(1) : "0";

  const velocityTable = dailyStats.map(({ date, commits }) =>
    `| ${date} | ${velocityBar(commits)} |`
  ).join("\n");

  const fmtDecisions = allDecisions.length ? allDecisions.join("\n\n") : "_ללא החלטות מיוחדות_";
  const fmtLessons   = allLessons.length   ? allLessons.join("\n\n")   : "_ללא_";
  const fmtIssues    = allIssues.length    ? allIssues.join("\n\n")    : "_ללא בעיות פתוחות_";
  const fmtNextSteps = allNextSteps.length ? allNextSteps.join("\n\n") : "_לא צוין_";

  return `# ${week} — סיכום שבועי
> ${start} → ${today} | ${days} ימי עבודה

## 📊 Velocity — קומיטים לפי יום
| תאריך | קומיטים |
|--------|---------|
${velocityTable}

**סה"כ קומיטים:** ${totalCommits} | **ממוצע יומי:** ${avgCom}

## 🧠 Decision Log — החלטות השבוע
${fmtDecisions}

## 💡 Lessons Learned — תובנות השבוע
${fmtLessons}

## 🔴 בעיות שנפתחו השבוע
${fmtIssues}

## ➡️ השלבים הבאים
${fmtNextSteps}

---
_נוצר אוטומטית על ידי weekly-summary.js · ${new Date().toLocaleString("he-IL")}_
`;
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

function buildWhatsAppMsg(data) {
  const { totalCommits, dailyStats } = data;
  const topDay = dailyStats.reduce((a, b) => a.commits > b.commits ? a : b, { commits: 0, date: "-" });

  return [
    `📊 *MIPO — סיכום שבועי ${isoWeekStr()}*`,
    "",
    `📝 סה"כ קומיטים: ${totalCommits}`,
    `🏆 יום שיא: ${topDay.date} (${topDay.commits} קומיטים)`,
    `📅 ימי עבודה: ${dailyStats.length}`,
    "",
    "🐾 _MIPO Work Journal_",
  ].join("\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(JOURNAL_DIR)) mkdirSync(JOURNAL_DIR, { recursive: true });

  const data = aggregateWeek();
  if (!data) {
    console.log("⚠️  אין קבצים יומיים לשבוע הנוכחי");
    process.exit(0);
  }

  const content   = buildWeeklyMd(data);
  const weekFile  = join(JOURNAL_DIR, `${isoWeekStr()}.md`);
  writeFileSync(weekFile, content, "utf8");

  console.log(`\n✅ סיכום שבועי נשמר: ${weekFile}`);
  console.log(`📊 סה"כ קומיטים השבוע: ${data.totalCommits}`);

  const msg  = buildWhatsAppMsg(data);
  const sent = await sendNotification(msg);
  if (sent) console.log("📲 הודעת WhatsApp נשלחה");

  console.log("\nשבוע טוב! 🐾\n");
}

main().catch(e => { console.error("שגיאה:", e.message); process.exit(1); });
