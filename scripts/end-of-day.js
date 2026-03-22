#!/usr/bin/env node
// end-of-day.js — MIPO Daily Work Journal Generator

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import readline from "readline";
import {
  loadEnv, JOURNAL_DIR,
  todayStr, isoWeekStr,
  getGitLog, getWorkTime, getBranchName,
  getTasks, getAnthropicCost, sendNotification,
} from "./lib/utils.js";

loadEnv();

// ─── Interactive prompts ──────────────────────────────────────────────────────

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function collectInput() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n" + "═".repeat(55));
  console.log("  📓 MIPO Work Journal — סיכום יומי");
  console.log("═".repeat(55) + "\n");

  const nextStep   = await ask(rl, "➡️  השלב הבא (מה ממשיכים מחר?):\n   > ");
  const openIssues = await ask(rl, "\n🔴 בעיות פתוחות (Enter לדילוג):\n   > ");
  const decisions  = await ask(rl, "\n🧠 Decision Log (החלטות שהתקבלו, Enter לדילוג):\n   > ");
  const lessons    = await ask(rl, "\n💡 Lessons Learned (תובנות, Enter לדילוג):\n   > ");

  rl.close();
  return { nextStep, openIssues, decisions, lessons };
}

// ─── Markdown builder ─────────────────────────────────────────────────────────

function buildDailyMd(input, { commits, workTime, tasks, cost, branch }) {
  const today = todayStr();

  const fmtCommits = commits.length
    ? commits.map(c => `- \`${c.hash}\` ${c.subject}`).join("\n")
    : "_אין קומיטים היום_";

  const fmtDone = tasks.done.length
    ? tasks.done.map(t => `- [x] ${t}`).join("\n")
    : "_ללא tasks שהושלמו_";

  const fmtTodo = tasks.todo.length
    ? tasks.todo.map(t => `- [ ] ${t}`).join("\n")
    : "_ללא tasks פתוחים_";

  const fmtWork = workTime
    ? `${workTime.first} → ${workTime.last}  •  ${workTime.duration}  •  ${workTime.commits} קומיטים`
    : "_אין נתוני זמן (אין קומיטים)_";

  const fmtCost = cost ?? "_לא זמין — הוסף \`ANTHROPIC_API_KEY\` ל-.env.local_";

  return `# יומן עבודה — ${today}

> Branch: \`${branch}\` | שבוע: \`${isoWeekStr()}\`

## ⏱️ זמן עבודה
${fmtWork}

## 💰 עלות Anthropic API
${fmtCost}

## 📝 Git Log — קומיטים של היום
${fmtCommits}

## ✅ Tasks שהושלמו
${fmtDone}

## 📋 Tasks פתוחים
${fmtTodo}

## 🔴 בעיות פתוחות
${input.openIssues.trim() || "_ללא_"}

## ➡️ השלב הבא
${input.nextStep.trim() || "_לא צוין_"}

## 🧠 Decision Log
${input.decisions.trim() || "_ללא החלטות מיוחדות היום_"}

## 💡 Lessons Learned
${input.lessons.trim() || "_ללא_"}

---
_נוצר אוטומטית על ידי end-of-day.js · ${new Date().toLocaleString("he-IL")}_
`;
}

// ─── Weekly file update ───────────────────────────────────────────────────────

function appendToWeekly(today, input, commits) {
  const weekFile = join(JOURNAL_DIR, `${isoWeekStr()}.md`);
  const entry = [
    `\n## ${today}`,
    `- **קומיטים:** ${commits.length}`,
    `- **השלב הבא:** ${input.nextStep.trim() || "_ראה קובץ יומי_"}`,
    input.decisions.trim() ? `- **החלטות:** ${input.decisions.trim()}` : "",
    "",
  ].filter(l => l !== undefined).join("\n");

  if (existsSync(weekFile)) {
    const current = readFileSync(weekFile, "utf8");
    if (!current.includes(`## ${today}`)) {
      writeFileSync(weekFile, current + entry, "utf8");
    }
  } else {
    writeFileSync(weekFile, `# ${isoWeekStr()} — סיכום שבועי\n${entry}`, "utf8");
  }
}

// ─── WhatsApp message ─────────────────────────────────────────────────────────

function buildWhatsAppMsg(today, commits, workTime, input) {
  const lines = [
    `📓 *MIPO — סיכום יומי ${today}*`,
    "",
    `⏱️ זמן עבודה: ${workTime?.duration ?? "לא זמין"}`,
    `📝 קומיטים: ${commits.length}`,
  ];

  if (commits.length) {
    lines.push(...commits.slice(0, 3).map(c => `  • ${c.subject}`));
    if (commits.length > 3) lines.push(`  • ...ועוד ${commits.length - 3}`);
  }

  lines.push("");
  if (input.openIssues.trim()) lines.push(`🔴 בעיות: ${input.openIssues.trim()}`);
  lines.push(`➡️ מחר: ${input.nextStep.trim() || "לא צוין"}`);
  lines.push("", "🐾 _MIPO Work Journal_");

  return lines.join("\n");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(JOURNAL_DIR)) mkdirSync(JOURNAL_DIR, { recursive: true });

  const input    = await collectInput();
  const today    = todayStr();
  const commits  = getGitLog();
  const workTime = getWorkTime();
  const tasks    = getTasks();
  const cost     = await getAnthropicCost();
  const branch   = getBranchName();

  // Write daily file
  const dailyContent = buildDailyMd(input, { commits, workTime, tasks, cost, branch });
  const dailyFile = join(JOURNAL_DIR, `${today}.md`);
  writeFileSync(dailyFile, dailyContent, "utf8");

  // Update weekly file
  appendToWeekly(today, input, commits);

  console.log(`\n✅ יומי: ${dailyFile}`);
  console.log(`✅ שבועי: ${join(JOURNAL_DIR, isoWeekStr() + ".md")}`);

  // WhatsApp via OpenClaw
  const msg  = buildWhatsAppMsg(today, commits, workTime, input);
  const sent = await sendNotification(msg);
  if (sent) console.log("📲 הודעת WhatsApp נשלחה");

  console.log("\nלילה טוב 🐾\n");
}

main().catch(e => { console.error("שגיאה:", e.message); process.exit(1); });
