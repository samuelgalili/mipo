// src/services/episodicMemory.ts
// Episodic Memory — זיכרון שיחות לסוכן בין sessions, TTL 90 ימים

import { supabase } from '../lib/supabase';
import type { AgentMemory, AgentMemorySession, ConversationContext } from '../types/memory';

const TTL_DAYS = 90;

function expiresAt(): string {
  return new Date(Date.now() + TTL_DAYS * 86_400_000).toISOString();
}

// ─── טעינת session ────────────────────────────────────────────

/**
 * טוען את ה-session הפעיל של המשתמש.
 * מחזיר null אם לא קיים או פג תוקף.
 */
export async function loadSession(
  userId: string,
  sessionId: string,
  agentId = 'mipo',
): Promise<AgentMemory | null> {
  const { data, error } = await supabase
    .from('agent_memories')
    .select('*')
    .eq('user_id', userId)
    .eq('session_id', sessionId)
    .eq('agent_id', agentId)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error?.code === 'PGRST116') return null; // אין שורה
  if (error) throw error;
  return data;
}

// ─── שמירת session ────────────────────────────────────────────

/**
 * שומר / מעדכן context לשיחה.
 * אם ה-session קיים — מעדכן. אם לא — יוצר חדש.
 */
export async function saveSession(
  userId: string,
  sessionId: string,
  context: ConversationContext,
  agentId = 'mipo',
  petId?: string,
  summary?: string,
): Promise<AgentMemory> {
  const existing = await loadSession(userId, sessionId, agentId);

  const payload = {
    user_id:       userId,
    session_id:    sessionId,
    agent_id:      agentId,
    pet_id:        petId ?? null,
    context,
    summary:       summary ?? existing?.summary ?? null,
    expires_at:    expiresAt(),
    last_activity: new Date().toISOString(),
    turn_count:    (existing?.turn_count ?? 0) + 1,
  };

  if (existing) {
    const { data, error } = await supabase
      .from('agent_memories')
      .update(payload)
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from('agent_memories')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── הוספת הודעה ──────────────────────────────────────────────

/**
 * מוסיף הודעה בודדת ל-session קיים (או יוצר session חדש).
 *
 * @example
 * await appendMessage(userId, sessionId, 'user', 'מה מקס אכל היום?');
 * await appendMessage(userId, sessionId, 'assistant', 'מקס אכל 200 גרם אוכל יבש בבוקר.');
 */
export async function appendMessage(
  userId: string,
  sessionId: string,
  role: 'user' | 'assistant',
  content: string,
  agentId = 'mipo',
): Promise<AgentMemory> {
  const existing = await loadSession(userId, sessionId, agentId);
  const messages = existing?.context?.messages ?? [];

  const updatedContext: ConversationContext = {
    ...existing?.context,
    messages: [
      ...messages,
      { role, content, timestamp: new Date().toISOString() },
    ],
  };

  return saveSession(
    userId,
    sessionId,
    updatedContext,
    agentId,
    existing?.pet_id ?? undefined,
  );
}

// ─── רשימת sessions ───────────────────────────────────────────

/**
 * מחזיר את כל ה-sessions הפעילים של המשתמש.
 */
export async function listSessions(
  userId: string,
  agentId = 'mipo',
  limit = 10,
): Promise<AgentMemorySession[]> {
  const { data, error } = await supabase
    .from('agent_memories')
    .select('id, session_id, summary, turn_count, last_activity, pet_id')
    .eq('user_id', userId)
    .eq('agent_id', agentId)
    .gt('expires_at', new Date().toISOString())
    .order('last_activity', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

// ─── מחיקת session ────────────────────────────────────────────

export async function deleteSession(sessionId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('agent_memories')
    .delete()
    .eq('session_id', sessionId)
    .eq('user_id', userId);
  if (error) throw error;
}
