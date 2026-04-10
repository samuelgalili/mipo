-- ============================================================
-- 006_chat_messages.sql
-- שיחות AI — שמירת הודעות לפי חיה ומשתמש
-- ============================================================

CREATE TABLE IF NOT EXISTS chat_messages (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pet_id         UUID        REFERENCES pets(id) ON DELETE SET NULL,
  conversation_id TEXT       NOT NULL,                        -- client-side UUID לקיבוץ שיחה
  role           TEXT        NOT NULL CHECK (role IN ('user', 'assistant')),
  content        TEXT        NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  chat_messages                  IS 'הודעות שיחת AI לפי משתמש וחיה';
COMMENT ON COLUMN chat_messages.conversation_id  IS 'UUID שנוצר בצד הלקוח לקיבוץ הודעות לשיחה אחת';
COMMENT ON COLUMN chat_messages.pet_id           IS 'NULL = שיחה כללית ללא חיה ספציפית';

-- Indexes
CREATE INDEX IF NOT EXISTS chat_messages_user_id_idx          ON chat_messages (user_id);
CREATE INDEX IF NOT EXISTS chat_messages_pet_id_idx           ON chat_messages (pet_id);
CREATE INDEX IF NOT EXISTS chat_messages_conversation_id_idx  ON chat_messages (conversation_id);
CREATE INDEX IF NOT EXISTS chat_messages_created_at_idx       ON chat_messages (created_at DESC);

-- RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_messages_owner_all"
  ON chat_messages FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
