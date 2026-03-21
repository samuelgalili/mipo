// src/hooks/useEpisodic.ts
// Hook לניהול זיכרון שיחות (Episodic Memory)

import { useState, useCallback } from 'react';
import {
  loadSession,
  saveSession,
  appendMessage,
  listSessions,
  deleteSession,
} from '../services/episodicMemory';
import type { AgentMemory, AgentMemorySession, ConversationContext } from '../types/memory';

interface UseEpisodicOptions {
  userId: string;
  sessionId: string;
  agentId?: string;
  petId?: string;
}

interface UseEpisodicReturn {
  session:        AgentMemory | null;
  sessions:       AgentMemorySession[];
  loading:        boolean;
  error:          string | null;
  loadCurrent:    () => Promise<void>;
  loadAll:        () => Promise<void>;
  addMessage:     (role: 'user' | 'assistant', content: string) => Promise<void>;
  updateContext:  (context: ConversationContext, summary?: string) => Promise<void>;
  removeSession:  () => Promise<void>;
}

export function useEpisodic({
  userId,
  sessionId,
  agentId = 'mipo',
  petId,
}: UseEpisodicOptions): UseEpisodicReturn {
  const [session, setSession]   = useState<AgentMemory | null>(null);
  const [sessions, setSessions] = useState<AgentMemorySession[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const wrap = useCallback(async (fn: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'שגיאה לא ידועה');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCurrent = useCallback(
    () => wrap(async () => {
      const data = await loadSession(userId, sessionId, agentId);
      setSession(data);
    }),
    [userId, sessionId, agentId, wrap],
  );

  const loadAll = useCallback(
    () => wrap(async () => {
      const data = await listSessions(userId, agentId);
      setSessions(data);
    }),
    [userId, agentId, wrap],
  );

  const addMessage = useCallback(
    (role: 'user' | 'assistant', content: string) =>
      wrap(async () => {
        const updated = await appendMessage(userId, sessionId, role, content, agentId);
        setSession(updated);
      }),
    [userId, sessionId, agentId, wrap],
  );

  const updateContext = useCallback(
    (context: ConversationContext, summary?: string) =>
      wrap(async () => {
        const updated = await saveSession(userId, sessionId, context, agentId, petId, summary);
        setSession(updated);
      }),
    [userId, sessionId, agentId, petId, wrap],
  );

  const removeSession = useCallback(
    () => wrap(async () => {
      await deleteSession(sessionId, userId);
      setSession(null);
    }),
    [sessionId, userId, wrap],
  );

  return {
    session,
    sessions,
    loading,
    error,
    loadCurrent,
    loadAll,
    addMessage,
    updateContext,
    removeSession,
  };
}
