// src/types/evals.ts — AI Evals types

export type EvalScore = 1 | 2 | 3 | 4 | 5;

export interface AgentEval {
  id: string;
  created_at: string;
  user_id?: string | null;
  session_id?: string | null;
  agent_id: string;
  prompt: string;
  response: string;
  score: EvalScore;
  feedback?: string | null;
  latency_ms?: number | null;
  model?: string | null;
  metadata: Record<string, unknown>;
}

export interface AgentEvalInsert {
  user_id?: string;
  session_id?: string;
  agent_id?: string;
  prompt: string;
  response: string;
  score: EvalScore;
  feedback?: string;
  latency_ms?: number;
  model?: string;
  metadata?: Record<string, unknown>;
}

export interface AgentEvalStats {
  agent_id: string;
  total_evals: number;
  avg_score: number;
  high_scores: number;  // score >= 4
  low_scores: number;   // score <= 2
  avg_latency_ms: number | null;
  last_eval_at: string;
}

export interface DailyAverage {
  date: string;       // YYYY-MM-DD
  avg_score: number;
  count: number;
}

export const ALERT_THRESHOLD = 3.5;
export const SCORE_LABELS: Record<EvalScore, string> = {
  1: 'גרוע מאוד',
  2: 'גרוע',
  3: 'בינוני',
  4: 'טוב',
  5: 'מצוין',
};
