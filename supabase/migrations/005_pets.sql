-- ============================================================
-- 005_pets.sql
-- טבלת pets — פרופיל חיה עצמאי, מופרד מ-onboarding
-- ============================================================

CREATE TABLE IF NOT EXISTS pets (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT        NOT NULL,
  species       TEXT        NOT NULL,                         -- dog / cat / rabbit / parrot / other
  breed         TEXT,
  age           SMALLINT    CHECK (age >= 0 AND age <= 100),
  gender        TEXT        CHECK (gender IN ('male', 'female', 'unknown')),
  avatar_url    TEXT,
  persona_data  JSONB       NOT NULL DEFAULT '{}',           -- אישיות, העדפות, הרגלים
  health_score  SMALLINT    CHECK (health_score BETWEEN 1 AND 100),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  pets                IS 'פרופיל חיות מחמד';
COMMENT ON COLUMN pets.species        IS 'סוג החיה: dog / cat / rabbit / parrot / other';
COMMENT ON COLUMN pets.persona_data   IS 'JSON חופשי: אישיות, הרגלים, העדפות מזון, רפואי';
COMMENT ON COLUMN pets.health_score   IS 'ציון בריאות כללי 1-100 (מחושב / ידני)';

-- auto-update updated_at
CREATE OR REPLACE FUNCTION update_pets_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS pets_updated_at ON pets;
CREATE TRIGGER pets_updated_at
  BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE FUNCTION update_pets_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS pets_user_id_idx    ON pets (user_id);
CREATE INDEX IF NOT EXISTS pets_species_idx    ON pets (species);
CREATE INDEX IF NOT EXISTS pets_created_at_idx ON pets (created_at DESC);

-- RLS
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pets_owner_all"
  ON pets FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- העברת נתונים קיימים מ-onboarding → pets
-- ============================================================
INSERT INTO pets (user_id, name, species, breed, age, created_at)
SELECT
  user_id,
  pet_name  AS name,
  pet_type  AS species,
  pet_breed AS breed,
  pet_age   AS age,
  created_at
FROM onboarding
WHERE user_id IS NOT NULL
ON CONFLICT DO NOTHING;
