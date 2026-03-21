-- ============================================================
-- 003_agent_evals.sql
-- AI Evals — מדידת ביצועי סוכן, ציון 1-5, alert מתחת ל-3.5
-- ============================================================

CREATE TABLE IF NOT EXISTS agent_evals (
  id          UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL  DEFAULT NOW(),
  user_id     UUID                  REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id  TEXT,
  agent_id    TEXT      NOT NULL    DEFAULT 'mipo',
  prompt      TEXT      NOT NULL,
  response    TEXT      NOT NULL,
  score       SMALLINT  NOT NULL    CHECK (score BETWEEN 1 AND 5),
  feedback    TEXT,                 -- הערת משתמש (אופציונלי)
  latency_ms  INT,                  -- זמן תגובה במילישניות
  model       TEXT,                 -- שם המודל (claude-sonnet-4-6 וכו')
  metadata    JSONB     NOT NULL    DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS agent_evals_agent_created_idx ON agent_evals(agent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS agent_evals_score_idx         ON agent_evals(score);
CREATE INDEX IF NOT EXISTS agent_evals_user_id_idx       ON agent_evals(user_id);

-- RLS
ALTER TABLE agent_evals ENABLE ROW LEVEL SECURITY;

-- כל אחד יכול להכניס (מגיע מ-backend / edge function)
CREATE POLICY "anyone_can_insert_evals"
  ON agent_evals FOR INSERT
  WITH CHECK (true);

-- משתמש רואה רק את ה-evals שלו (ו-admin רואה הכל)
CREATE POLICY "users_read_own_evals"
  ON agent_evals FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- View לסטטיסטיקות מצטברות לדשבורד
CREATE OR REPLACE VIEW agent_evals_stats AS
SELECT
  agent_id,
  COUNT(*)                                          AS total_evals,
  ROUND(AVG(score)::numeric, 2)                     AS avg_score,
  COUNT(*) FILTER (WHERE score >= 4)                AS high_scores,
  COUNT(*) FILTER (WHERE score <= 2)                AS low_scores,
  ROUND(AVG(latency_ms)::numeric)                   AS avg_latency_ms,
  MAX(created_at)                                   AS last_eval_at
FROM agent_evals
GROUP BY agent_id;

-- View לממוצע 7 ימים אחרונים (לאיתור ירידה)
CREATE OR REPLACE VIEW agent_evals_7d AS
SELECT
  agent_id,
  ROUND(AVG(score)::numeric, 2) AS avg_score_7d,
  COUNT(*)                       AS count_7d
FROM agent_evals
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY agent_id;
