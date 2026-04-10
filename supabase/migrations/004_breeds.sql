-- ============================================================
-- 004_breeds.sql
-- טבלת גזעי כלבים עם ציוני תכונות (סקאלה 1-5)
-- מקור: petid-breeds-2026-03-14.csv
-- ============================================================

CREATE TABLE IF NOT EXISTS breeds (
  id                   SERIAL       PRIMARY KEY,
  name                 TEXT         NOT NULL UNIQUE,
  family_affection     SMALLINT     NOT NULL CHECK (family_affection     BETWEEN 1 AND 5),
  good_with_children   SMALLINT     NOT NULL CHECK (good_with_children   BETWEEN 1 AND 5),
  good_with_dogs       SMALLINT     NOT NULL CHECK (good_with_dogs       BETWEEN 1 AND 5),
  shedding_level       SMALLINT     NOT NULL CHECK (shedding_level       BETWEEN 1 AND 5),
  grooming_frequency   SMALLINT     NOT NULL CHECK (grooming_frequency   BETWEEN 1 AND 5),
  drooling_level       SMALLINT     NOT NULL CHECK (drooling_level       BETWEEN 1 AND 5),
  openness_to_strangers SMALLINT    NOT NULL CHECK (openness_to_strangers BETWEEN 1 AND 5),
  playfulness          SMALLINT     NOT NULL CHECK (playfulness          BETWEEN 1 AND 5),
  guarding_instinct    SMALLINT     NOT NULL CHECK (guarding_instinct    BETWEEN 1 AND 5),
  trainability         SMALLINT     NOT NULL CHECK (trainability         BETWEEN 1 AND 5),
  energy_level         SMALLINT     NOT NULL CHECK (energy_level         BETWEEN 1 AND 5),
  barking_level        SMALLINT     NOT NULL CHECK (barking_level        BETWEEN 1 AND 5),
  mental_stimulation   SMALLINT     NOT NULL CHECK (mental_stimulation   BETWEEN 1 AND 5),
  created_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE breeds IS 'גזעי כלבים עם ציוני תכונות בסקאלה 1-5';
COMMENT ON COLUMN breeds.family_affection      IS 'אהבה למשפחה';
COMMENT ON COLUMN breeds.good_with_children    IS 'טוב עם ילדים';
COMMENT ON COLUMN breeds.good_with_dogs        IS 'טוב עם כלבים';
COMMENT ON COLUMN breeds.shedding_level        IS 'רמת נשירה';
COMMENT ON COLUMN breeds.grooming_frequency    IS 'תדירות טיפוח';
COMMENT ON COLUMN breeds.drooling_level        IS 'רמת ריור';
COMMENT ON COLUMN breeds.openness_to_strangers IS 'פתיחות לזרים';
COMMENT ON COLUMN breeds.playfulness           IS 'רמת שובבות';
COMMENT ON COLUMN breeds.guarding_instinct     IS 'יצר שמירה';
COMMENT ON COLUMN breeds.trainability          IS 'קלות אילוף';
COMMENT ON COLUMN breeds.energy_level          IS 'רמת אנרגיה';
COMMENT ON COLUMN breeds.barking_level         IS 'רמת נבחנות';
COMMENT ON COLUMN breeds.mental_stimulation    IS 'גירוי מנטלי';

CREATE INDEX IF NOT EXISTS breeds_name_idx ON breeds (name);

-- RLS
ALTER TABLE breeds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "breeds_public_read"
  ON breeds FOR SELECT
  USING (true);

-- ============================================================
-- נתונים — 94 גזעים
-- סדר עמודות: name, family_affection, good_with_children,
--   good_with_dogs, shedding_level, grooming_frequency,
--   drooling_level, openness_to_strangers, playfulness,
--   guarding_instinct, trainability, energy_level,
--   barking_level, mental_stimulation
-- ============================================================

INSERT INTO breeds (name, family_affection, good_with_children, good_with_dogs, shedding_level, grooming_frequency, drooling_level, openness_to_strangers, playfulness, guarding_instinct, trainability, energy_level, barking_level, mental_stimulation) VALUES
  ('Afghan Hound',                        2, 3, 3, 3, 3, 3, 3, 5, 4, 3, 3, 3, 3),
  ('Aidi',                                3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 4, 3, 3),
  ('Akita',                               5, 3, 3, 3, 3, 3, 3, 3, 4, 2, 3, 3, 4),
  ('Alaskan Malamute',                    5, 3, 4, 3, 3, 3, 4, 2, 3, 2, 3, 2, 4),
  ('American Cocker Spaniel',             3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
  ('American Eskimo',                     4, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3),
  ('Appenzeller Sennenhund',              4, 3, 4, 3, 3, 3, 2, 3, 3, 3, 5, 3, 4),
  ('Australian Cattle Dog',               3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4),
  ('Australian Shepherd',                 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3),
  ('Barbet',                              3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4),
  ('Basenji',                             2, 3, 3, 3, 3, 2, 3, 3, 5, 2, 4, 4, 3),
  ('Beagle',                              3, 3, 4, 3, 2, 4, 4, 3, 3, 3, 3, 3, 3),
  ('Beauceron',                           5, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 4),
  ('Bedlington Terrier',                  3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3),
  ('Bergamasco',                          2, 3, 4, 3, 3, 3, 4, 3, 3, 2, 3, 3, 4),
  ('Berger Picard',                       5, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 2, 4),
  ('Bernese Mountain Dog',                4, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 3, 4),
  ('Black Russian Terrier',               3, 3, 3, 3, 3, 3, 2, 3, 4, 4, 3, 3, 4),
  ('Bloodhound',                          4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
  ('Border Collie',                       3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 5),
  ('Borzoi',                              4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3),
  ('Boston Terrier',                      4, 3, 4, 3, 3, 3, 4, 4, 3, 4, 3, 2, 4),
  ('Bouvier des Flandres',                3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3),
  ('Brazilian Terrier',                   3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4),
  ('Broholmer',                           3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 2, 4, 3),
  ('Bull Terrier',                        3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 3, 3),
  ('Canaan Dog',                          1, 3, 3, 3, 3, 3, 2, 3, 4, 3, 3, 3, 4),
  ('Carolina Dog',                        4, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 2, 3),
  ('Catahoula Cur',                       3, 3, 3, 3, 3, 3, 3, 2, 5, 3, 4, 3, 4),
  ('Chihuahua',                           3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 3, 3),
  ('Chinese Crested',                     4, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3),
  ('Chow Chow',                           4, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 4),
  ('Cirneco dell''Etna',                  4, 3, 4, 3, 3, 3, 4, 3, 3, 3, 4, 3, 4),
  ('Dachshund',                           4, 3, 4, 3, 3, 3, 4, 5, 3, 3, 3, 3, 3),
  ('Dalmatian',                           3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 3, 3),
  ('Danish Swedish Farmdog',              3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3),
  ('Doberman Pinscher',                   4, 3, 3, 3, 2, 3, 3, 3, 3, 4, 5, 3, 4),
  ('English Bulldog',                     4, 3, 4, 3, 3, 3, 4, 3, 4, 3, 2, 3, 3),
  ('Finnish Spitz',                       4, 3, 5, 3, 3, 3, 4, 3, 3, 3, 4, 4, 4),
  ('German Shepherd',                     4, 3, 3, 3, 3, 3, 2, 3, 5, 4, 3, 3, 4),
  ('Glen of Imaal Terrier',               3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3),
  ('Golden Retriever',                    3, 3, 3, 3, 3, 3, 3, 2, 3, 4, 5, 3, 4),
  ('Great Pyrenees',                      2, 3, 4, 3, 3, 3, 4, 3, 3, 2, 3, 3, 4),
  ('Groenendael',                         3, 3, 3, 3, 3, 3, 3, 3, 5, 4, 3, 3, 5),
  ('Havanese',                            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
  ('Hungarian Puli',                      3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 4, 3, 4),
  ('Irish Wolfhound',                     3, 3, 4, 3, 3, 3, 4, 2, 4, 3, 5, 3, 3),
  ('Japanese Spitz',                      5, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 4, 4),
  ('Jindo',                               5, 3, 3, 3, 3, 3, 2, 3, 4, 2, 3, 3, 4),
  ('Kai Ken',                             3, 3, 3, 3, 3, 3, 2, 3, 4, 3, 3, 3, 4),
  ('Karelian Bear Dog',                   2, 3, 4, 3, 3, 3, 4, 3, 3, 2, 3, 3, 4),
  ('Keeshond',                            3, 4, 3, 3, 3, 3, 3, 4, 3, 4, 3, 3, 3),
  ('Kerry Blue Terrier',                  4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3),
  ('Komondor',                            3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3),
  ('Kooikerhondje',                       3, 3, 4, 3, 3, 3, 4, 3, 3, 4, 3, 2, 3),
  ('Labrador Retriever',                  3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3),
  ('Laekenois',                           3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3),
  ('Landseer',                            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
  ('Leonberger',                          3, 3, 4, 4, 3, 3, 4, 3, 3, 4, 4, 3, 3),
  ('Lundehund',                           4, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3),
  ('Malinois',                            4, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 4),
  ('Maltese',                             4, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 3),
  ('Mudi',                                3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 3, 3),
  ('New Guinea Singing Dog',              4, 3, 3, 3, 3, 3, 3, 3, 4, 2, 4, 4, 4),
  ('Newfoundland',                        5, 3, 3, 3, 4, 3, 3, 3, 3, 4, 2, 3, 3),
  ('Norrbottenspets',                     3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4),
  ('Norwegian Lundehund',                 4, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3),
  ('Norwich Terrier',                     3, 4, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4),
  ('Nova Scotia Duck Tolling Retriever',  3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4),
  ('Papillon',                            3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3),
  ('Pekingese',                           4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4),
  ('Pharaoh Hound',                       3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3),
  ('Poodle',                              3, 3, 4, 4, 3, 3, 4, 3, 3, 3, 4, 3, 4),
  ('Portuguese Podengo',                  4, 3, 3, 3, 3, 3, 3, 4, 3, 3, 5, 3, 4),
  ('Pug',                                 4, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3),
  ('Pyrenean Shepherd',                   5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3, 4),
  ('Rafeiro do Alentejo',                 3, 3, 3, 3, 3, 3, 2, 3, 4, 2, 2, 3, 3),
  ('Rat Terrier',                         3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4),
  ('Rhodesian Ridgeback',                 3, 3, 3, 3, 3, 3, 3, 3, 4, 1, 3, 3, 3),
  ('Rottweiler',                          3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4),
  ('Saluki',                              3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3),
  ('Samoyed',                             3, 3, 5, 3, 3, 3, 5, 3, 5, 3, 3, 4, 3),
  ('Schipperke',                          3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 3, 3),
  ('Shar-Pei',                            3, 3, 3, 3, 3, 2, 2, 3, 4, 2, 2, 3, 3),
  ('Siberian Husky',                      3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3),
  ('St. Bernard',                         4, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3),
  ('Swedish Vallhund',                    3, 3, 3, 3, 3, 3, 3, 3, 5, 4, 4, 3, 4),
  ('Tamaskan Dog',                        4, 3, 5, 3, 3, 3, 4, 3, 3, 3, 4, 4, 4),
  ('Tervuren',                            4, 3, 3, 3, 3, 3, 3, 3, 5, 3, 3, 3, 3),
  ('Tosa',                                3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
  ('Vizsla',                              5, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 3),
  ('Volpino Italiano',                    3, 3, 4, 3, 3, 3, 4, 4, 5, 3, 4, 4, 4),
  ('White Swiss Shepherd',                4, 3, 5, 3, 3, 3, 4, 3, 4, 3, 3, 3, 4),
  ('Xoloitzcuintli',                      4, 3, 3, 3, 3, 3, 3, 3, 4, 3, 2, 3, 4)
ON CONFLICT (name) DO NOTHING;
