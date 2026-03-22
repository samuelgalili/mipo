#!/usr/bin/env node
// context-snapshot.js — MIPO Start-of-Day Context Reader
// מציג: יומן אתמול + tasks פתוחים + קומיטים אחרונים

import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import {
  loadEnv, JOURNAL_DIR, TASKS_DIR,
  todayStr, yesterdayStr, isoWeekStr,
  getGitLog, getBranchName, getTasks, extractSection,
} from "./lib/utils.js";

loadEnv();

function findLastJournalFile() {
  if (!existsSync(JOURNAL_DIR)) return null;
  const files = readdirSync(JOURNAL_DIR)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse();
  return files[0] ? join(JOURNAL_DIR, files[0]) : null;
}

function printSection(title, content) {
  if (!content || content === "_ללא_" || content === "_לא צוין_") return;
  console.log(`\n${title}`);
  console.log(content
    .split("\n")
    .map(l => `  ${l}`)
    .join("\n"));
}

function main() {
  const today     = todayStr();
  const yesterday = yesterdayStr();
  const branch    = getBranchName();

  console.log("\n" + "═".repeat(55));
  console.log("  🌅 MIPO — Context Snapshot (start of day)");
  console.log("═".repeat(55));
  console.log(`  📅 היום:    ${today}`);
  console.log(`  🌿 Branch:  ${branch}`);
  console.log(`  📆 שבוע:    ${isoWeekStr()}`);
  console.log("─".repeat(55));

  // ── Yesterday's journal ──────────────────────────────────
  const yFile = existsSync(join(JOURNAL_DIR, `${yesterday}.md`))
    ? join(JOURNAL_DIR, `${yesterday}.md`)
    : findLastJournalFile();

  if (yFile && existsSync(yFile)) {
    const fname   = yFile.split("/").pop().replace(".md", "");
    const content = readFileSync(yFile, "utf8");

    console.log(`\n📓 יומן אחרון: ${fname}`);

    const nextStep = extractSection(content, "➡️ השלב הבא");
    const issues   = extractSection(content, "🔴 בעיות פתוחות");
    const lessons  = extractSection(content, "💡 Lessons Learned");

    printSection("➡️  השלב הבא:", nextStep);
    printSection("🔴 בעיות פתוחות:", issues);
    printSection("💡 Lessons Learned:", lessons);
  } else {
    console.log("\n📓 לא נמצא יומן קודם");
  }

  // ── Open tasks ───────────────────────────────────────────
  const { todo } = getTasks();
  if (todo.length) {
    console.log("\n📋 Tasks פתוחים:");
    todo.slice(0, 7).forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
    if (todo.length > 7) console.log(`  ... ועוד ${todo.length - 7} נוספים`);
  } else {
    console.log("\n📋 Tasks פתוחים: ✨ אין — Inbox ריק");
  }

  // ── Recent commits ────────────────────────────────────────
  const recent = getGitLog(yesterday, today);
  if (recent.length) {
    console.log("\n📝 קומיטים אחרונים:");
    recent.slice(0, 5).forEach(c =>
      console.log(`  • \`${c.hash}\` ${c.subject}`)
    );
  }

  console.log("\n" + "═".repeat(55));
  console.log("  בהצלחה היום! 🐾");
  console.log("═".repeat(55) + "\n");
}

main();
