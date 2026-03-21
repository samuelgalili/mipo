// src/pages/AdminEvalsDashboard.tsx
// דשבורד AI Evals — ציוני סוכן, ממוצעים, alert מתחת ל-3.5

import React, { useState } from 'react';
import { useEvals } from '../hooks/useEvals';
import { ALERT_THRESHOLD, SCORE_LABELS, type EvalScore } from '../types/evals';

// ─── צבע לפי ציון ─────────────────────────────────────────────
function scoreColor(score: number): string {
  if (score >= 4.5) return 'text-emerald-600';
  if (score >= 3.5) return 'text-green-600';
  if (score >= 2.5) return 'text-amber-500';
  return 'text-red-500';
}
function scoreBg(score: number): string {
  if (score >= 4.5) return 'bg-emerald-50 border-emerald-200';
  if (score >= 3.5) return 'bg-green-50 border-green-200';
  if (score >= 2.5) return 'bg-amber-50 border-amber-200';
  return 'bg-red-50 border-red-200';
}

// ─── כוכבים ────────────────────────────────────────────────────
const Stars = ({ score }: { score: number }) => (
  <span className="flex gap-0.5" aria-label={`ציון ${score} מתוך 5`}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={s <= score ? 'text-amber-400' : 'text-gray-200'}>
        ★
      </span>
    ))}
  </span>
);

// ─── גרף עמודות יומי ──────────────────────────────────────────
const SparkBar = ({
  date,
  avg,
  count,
  max = 5,
}: {
  date: string;
  avg: number;
  count: number;
  max?: number;
}) => {
  const pct = (avg / max) * 100;
  const color = avg >= ALERT_THRESHOLD ? 'bg-violet-400' : 'bg-red-400';
  const label = date.slice(5); // MM-DD
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <span className={`text-xs font-semibold ${scoreColor(avg)}`}>
        {avg.toFixed(1)}
      </span>
      <div className="w-full h-20 bg-purple-50 rounded-lg flex items-end overflow-hidden">
        <div
          className={`w-full ${color} rounded-t-lg transition-all duration-500`}
          style={{ height: `${pct}%` }}
          title={`${label}: ממוצע ${avg.toFixed(1)}, ${count} evals`}
        />
      </div>
      <span className="text-[10px] text-gray-400">{label}</span>
    </div>
  );
};

// ─── קומפוננטה ראשית ──────────────────────────────────────────
const AdminEvalsDashboard: React.FC = () => {
  const { stats, recentEvals, dailyAvgs, alertActive, loading, error, refresh } = useEvals();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 px-4 py-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        {/* כותרת */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              AI Evals Dashboard 🐾
            </h1>
            <p className="text-sm text-gray-400 mt-1">ביצועי סוכן Mipo — ציון 1–5</p>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <span>↻</span>
            )}
            רענון
          </button>
        </div>

        {/* שגיאה */}
        {error && (
          <div role="alert" className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4 text-sm flex gap-2 items-start">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* ALERT — ממוצע מתחת ל-3.5 */}
        {alertActive && (
          <div
            role="alert"
            className="bg-red-50 border-2 border-red-300 rounded-3xl px-6 py-5 flex items-start gap-4"
          >
            <div className="text-3xl">🚨</div>
            <div>
              <p className="font-bold text-red-700 text-lg">
                אזהרה: ביצועי הסוכן ירדו מתחת לסף!
              </p>
              <p className="text-red-600 text-sm mt-1">
                הממוצע הנוכחי נמוך מ-{ALERT_THRESHOLD} — יש לבדוק את תגובות הסוכן ולבצע אופטימיזציה.
              </p>
            </div>
          </div>
        )}

        {/* כרטיסי סטטיסטיקות */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* ממוצע */}
            <div className={`rounded-3xl border p-5 flex flex-col gap-2 ${scoreBg(stats.avg_score)}`}>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">ממוצע כללי</span>
              <span className={`text-4xl font-bold ${scoreColor(stats.avg_score)}`}>
                {stats.avg_score.toFixed(1)}
              </span>
              <Stars score={Math.round(stats.avg_score)} />
            </div>

            {/* סה"כ */}
            <div className="rounded-3xl border border-purple-100 bg-white p-5 flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">סה"כ Evals</span>
              <span className="text-4xl font-bold text-gray-800">{stats.total_evals.toLocaleString()}</span>
              <span className="text-xs text-gray-400">הערכות שנאספו</span>
            </div>

            {/* ציונים גבוהים */}
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">ציון 4–5</span>
              <span className="text-4xl font-bold text-emerald-600">{stats.high_scores}</span>
              <span className="text-xs text-gray-400">
                {stats.total_evals > 0
                  ? `${Math.round((stats.high_scores / stats.total_evals) * 100)}%`
                  : '—'}
              </span>
            </div>

            {/* ציונים נמוכים */}
            <div className="rounded-3xl border border-red-100 bg-red-50 p-5 flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">ציון 1–2</span>
              <span className="text-4xl font-bold text-red-500">{stats.low_scores}</span>
              <span className="text-xs text-gray-400">
                {stats.total_evals > 0
                  ? `${Math.round((stats.low_scores / stats.total_evals) * 100)}%`
                  : '—'}
              </span>
            </div>
          </div>
        )}

        {/* גרף יומי */}
        {dailyAvgs.length > 0 && (
          <div className="bg-white rounded-3xl border border-purple-100 shadow-sm shadow-purple-100/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">ממוצע יומי (14 ימים)</h2>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-violet-400" /> מעל סף
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-red-400" /> מתחת לסף
                </span>
                <span className="border-t-2 border-dashed border-amber-400 w-6" /> סף {ALERT_THRESHOLD}
              </div>
            </div>
            <div className="flex items-end gap-1.5">
              {dailyAvgs.map((d) => (
                <SparkBar key={d.date} date={d.date} avg={d.avg_score} count={d.count} />
              ))}
            </div>
          </div>
        )}

        {/* טבלת evals אחרונים */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-sm shadow-purple-100/40 overflow-hidden">
          <div className="px-6 py-4 border-b border-purple-50">
            <h2 className="font-semibold text-gray-800">
              הערכות אחרונות
              {recentEvals.length > 0 && (
                <span className="mr-2 text-xs text-gray-400 font-normal">
                  ({recentEvals.length} הערכות)
                </span>
              )}
            </h2>
          </div>

          {recentEvals.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400 text-sm">
              {loading ? 'טוען...' : 'אין הערכות עדיין 🐾'}
            </div>
          ) : (
            <div className="divide-y divide-purple-50">
              {recentEvals.map((ev) => (
                <div key={ev.id} className="px-6 py-4 hover:bg-purple-50/40 transition-colors duration-150">
                  <div className="flex items-start justify-between gap-4">
                    {/* תוכן */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
                      >
                        <span className="text-sm font-medium text-gray-700 truncate">
                          {ev.prompt}
                        </span>
                        <span className="text-gray-300 text-xs shrink-0">
                          {expandedId === ev.id ? '▲' : '▼'}
                        </span>
                      </div>

                      {expandedId === ev.id && (
                        <div className="mt-3 space-y-2">
                          <div className="bg-purple-50 rounded-xl p-3">
                            <p className="text-xs font-semibold text-purple-500 mb-1">שאלה</p>
                            <p className="text-sm text-gray-700">{ev.prompt}</p>
                          </div>
                          <div className="bg-fuchsia-50 rounded-xl p-3">
                            <p className="text-xs font-semibold text-fuchsia-500 mb-1">תגובה</p>
                            <p className="text-sm text-gray-700">{ev.response}</p>
                          </div>
                          {ev.feedback && (
                            <div className="bg-amber-50 rounded-xl p-3">
                              <p className="text-xs font-semibold text-amber-500 mb-1">משוב</p>
                              <p className="text-sm text-gray-700">{ev.feedback}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* מטא */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <Stars score={ev.score} />
                      <span className={`text-xs font-semibold ${scoreColor(ev.score)}`}>
                        {SCORE_LABELS[ev.score as EvalScore]}
                      </span>
                      {ev.latency_ms && (
                        <span className="text-xs text-gray-400">{ev.latency_ms}ms</span>
                      )}
                      <span className="text-xs text-gray-300">
                        {new Date(ev.created_at).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* אין נתונים */}
        {!loading && !stats && !error && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📊</p>
            <p className="text-sm">עדיין אין נתוני הערכה. הפעל את הסוכן ורשום את התגובות הראשונות.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvalsDashboard;
