// src/hooks/useEvals.ts
// Hook לניהול AI Evals — ציון, סטטיסטיקות, alert

import { useState, useCallback, useEffect } from 'react';
import {
  recordEval,
  fetchStats,
  fetchDailyAverages,
  fetchRecentEvals,
  checkAlert,
} from '../services/agentEvals';
import type { AgentEval, AgentEvalInsert, AgentEvalStats, DailyAverage } from '../types/evals';

interface UseEvalsReturn {
  stats:        AgentEvalStats | null;
  recentEvals:  AgentEval[];
  dailyAvgs:    DailyAverage[];
  alertActive:  boolean;
  loading:      boolean;
  error:        string | null;
  submitEval:   (data: AgentEvalInsert) => Promise<AgentEval | null>;
  refresh:      () => Promise<void>;
}

export function useEvals(agentId = 'mipo'): UseEvalsReturn {
  const [stats, setStats]           = useState<AgentEvalStats | null>(null);
  const [recentEvals, setRecent]    = useState<AgentEval[]>([]);
  const [dailyAvgs, setDailyAvgs]   = useState<DailyAverage[]>([]);
  const [alertActive, setAlert]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, evals, avgs, alert] = await Promise.all([
        fetchStats(agentId),
        fetchRecentEvals(agentId),
        fetchDailyAverages(agentId, 14),
        checkAlert(agentId),
      ]);
      setStats(s);
      setRecent(evals);
      setDailyAvgs(avgs);
      setAlert(alert);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'שגיאה בטעינת נתוני evals');
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  const submitEval = useCallback(
    async (data: AgentEvalInsert): Promise<AgentEval | null> => {
      try {
        const result = await recordEval(data);
        // רענון אחרי הגשה
        void refresh();
        return result;
      } catch (e) {
        setError(e instanceof Error ? e.message : 'שגיאה בשמירת eval');
        return null;
      }
    },
    [refresh],
  );

  // טעינה ראשונית
  useEffect(() => { void refresh(); }, [refresh]);

  return {
    stats,
    recentEvals,
    dailyAvgs,
    alertActive,
    loading,
    error,
    submitEval,
    refresh,
  };
}
