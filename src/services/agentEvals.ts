// src/services/agentEvals.ts
// AI Evals — מדידת ביצועי סוכן, ציון 1-5, alert מתחת ל-3.5

import { supabase } from '../lib/supabase';
import type { AgentEval, AgentEvalInsert, AgentEvalStats, DailyAverage } from '../types/evals';
import { ALERT_THRESHOLD } from '../types/evals';

// ─── רישום eval ───────────────────────────────────────────────

/**
 * רושם תגובת סוכן עם ציון.
 *
 * @example
 * await recordEval({
 *   prompt: 'מה מקס צריך לאכול?',
 *   response: 'מומלץ להאכיל 200 גרם ביום...',
 *   score: 4,
 *   latency_ms: 1200,
 *   model: 'claude-sonnet-4-6',
 *   session_id: 'sess_abc123',
 * });
 */
export async function recordEval(evalData: AgentEvalInsert): Promise<AgentEval> {
  const { data, error } = await supabase
    .from('agent_evals')
    .insert({ agent_id: 'mipo', ...evalData })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── סטטיסטיקות ───────────────────────────────────────────────

/**
 * מחזיר נתוני סיכום מ-view agent_evals_stats.
 */
export async function fetchStats(agentId = 'mipo'): Promise<AgentEvalStats | null> {
  const { data, error } = await supabase
    .from('agent_evals_stats')
    .select('*')
    .eq('agent_id', agentId)
    .single();

  if (error?.code === 'PGRST116') return null; // אין נתונים עדיין
  if (error) throw error;
  return data;
}

/**
 * מחזיר ממוצע יומי לתקופה נתונה — לגרף ב-dashboard.
 */
export async function fetchDailyAverages(
  agentId = 'mipo',
  days = 14,
): Promise<DailyAverage[]> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();

  const { data, error } = await supabase
    .from('agent_evals')
    .select('created_at, score')
    .eq('agent_id', agentId)
    .gte('created_at', since)
    .order('created_at', { ascending: true });

  if (error) throw error;

  // קיבוץ לפי תאריך בצד הלקוח
  const byDate: Record<string, number[]> = {};
  for (const row of data ?? []) {
    const date = row.created_at.slice(0, 10);
    (byDate[date] ??= []).push(row.score);
  }

  return Object.entries(byDate).map(([date, scores]) => ({
    date,
    avg_score: scores.reduce((a, b) => a + b, 0) / scores.length,
    count:     scores.length,
  }));
}

// ─── evals אחרונים ────────────────────────────────────────────

export async function fetchRecentEvals(
  agentId = 'mipo',
  limit = 50,
): Promise<AgentEval[]> {
  const { data, error } = await supabase
    .from('agent_evals')
    .select('*')
    .eq('agent_id', agentId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

// ─── בדיקת alert ──────────────────────────────────────────────

/**
 * מחזיר true אם הממוצע ירד מתחת ל-ALERT_THRESHOLD (3.5).
 * מחייב לפחות 5 evals כדי להפעיל.
 */
export async function checkAlert(agentId = 'mipo'): Promise<boolean> {
  const stats = await fetchStats(agentId);
  if (!stats || stats.total_evals < 5) return false;
  return stats.avg_score < ALERT_THRESHOLD;
}
