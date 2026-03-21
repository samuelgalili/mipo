-- ============================================================
-- 001_vector_memory.sql
-- Vector DB לזיכרון חיות — pgvector + cosine similarity
-- ============================================================

-- 1. הפעלת pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. טבלת זיכרונות לחיות
CREATE TABLE IF NOT EXISTS pet_memories (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   TIMESTAMPTZ NOT NULL    DEFAULT NOW(),
  pet_id       UUID        NOT NULL,
  user_id      UUID        NOT NULL    REFERENCES auth.users(id) ON DELETE CASCADE,
  content      TEXT        NOT NULL,           -- הטקסט המקורי שנשמר
  embedding    vector(1536),                   -- OpenAI text-embedding-3-small
  memory_type  TEXT        NOT NULL    DEFAULT 'event',  -- event | health | behavior | note
  metadata     JSONB       NOT NULL    DEFAULT '{}'
);

-- אינדקס לחיפוש וקטורי (cosine)
CREATE INDEX IF NOT EXISTS pet_memories_embedding_idx
  ON pet_memories USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE INDEX IF NOT EXISTS pet_memories_pet_id_idx    ON pet_memories(pet_id);
CREATE INDEX IF NOT EXISTS pet_memories_user_id_idx   ON pet_memories(user_id);
CREATE INDEX IF NOT EXISTS pet_memories_created_at_idx ON pet_memories(created_at DESC);

-- 3. RLS
ALTER TABLE pet_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_pet_memories"
  ON pet_memories FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. פונקציית RPC לחיפוש סמנטי
CREATE OR REPLACE FUNCTION match_pet_memories(
  p_pet_id        UUID,
  query_embedding vector(1536),
  match_count     INT DEFAULT 5
)
RETURNS TABLE (
  id           UUID,
  created_at   TIMESTAMPTZ,
  content      TEXT,
  memory_type  TEXT,
  metadata     JSONB,
  similarity   FLOAT
)
LANGUAGE sql STABLE
AS $$
  SELECT
    m.id,
    m.created_at,
    m.content,
    m.memory_type,
    m.metadata,
    1 - (m.embedding <=> query_embedding) AS similarity
  FROM pet_memories m
  WHERE m.pet_id = p_pet_id
    AND m.embedding IS NOT NULL
  ORDER BY m.embedding <=> query_embedding
  LIMIT match_count;
$$;
