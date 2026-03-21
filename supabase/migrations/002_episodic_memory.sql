-- ============================================================
-- 002_episodic_memory.sql
-- Episodic Memory — זיכרון שיחות לסוכן עם TTL 90 ימים
-- ============================================================

CREATE TABLE IF NOT EXISTS agent_memories (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL    DEFAULT NOW(),
  expires_at    TIMESTAMPTZ NOT NULL    DEFAULT (NOW() + INTERVAL '90 days'),
  last_activity TIMESTAMPTZ NOT NULL    DEFAULT NOW(),
  user_id       UUID        NOT NULL    REFERENCES auth.users(id) ON DELETE CASCADE,
  pet_id        UUID,                            -- חיה ספציפית (אופציונלי)
  session_id    TEXT        NOT NULL,            -- מזהה Session ייחודי
  agent_id      TEXT        NOT NULL DEFAULT 'mipo',
  context       JSONB       NOT NULL DEFAULT '{}', -- כל ה-messages של השיחה
  summary       TEXT,                            -- סיכום קצר של ה-session
  turn_count    INT         NOT NULL DEFAULT 0   -- מספר סיבובי שיחה
);

CREATE INDEX IF NOT EXISTS agent_memories_user_session_idx
  ON agent_memories(user_id, session_id, agent_id);
CREATE INDEX IF NOT EXISTS agent_memories_expires_at_idx
  ON agent_memories(expires_at);
CREATE INDEX IF NOT EXISTS agent_memories_last_activity_idx
  ON agent_memories(last_activity DESC);

-- RLS
ALTER TABLE agent_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_agent_memories"
  ON agent_memories FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ניקוי אוטומטי של זיכרונות שפגו תוקפם
-- (להפעיל ע"י Supabase pg_cron: SELECT cron.schedule('cleanup-memories', '0 3 * * *', 'SELECT cleanup_expired_agent_memories()'))
CREATE OR REPLACE FUNCTION cleanup_expired_agent_memories()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM agent_memories
  WHERE expires_at < NOW();
END;
$$;
