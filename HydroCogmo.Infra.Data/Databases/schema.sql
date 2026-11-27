PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "stations" (
    "id"              TEXT PRIMARY KEY,
    "name"            TEXT NOT NULL,
    "river"           TEXT NOT NULL,
    "municipality"    TEXT NOT NULL,
    "active"          INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS "observations" (
    "id"              INTEGER PRIMARY KEY AUTOINCREMENT,
    "station_id"      TEXT NOT NULL,
    "metric"          TEXT NOT NULL,

    "observed_at"     TEXT NOT NULL,
    "value"           REAL NOT NULL,
    "unit"            TEXT NOT NULL,
    "source"          TEXT NOT NULL DEFAULT 'synthetic',

    CONSTRAINT observations_station_id_fk
        FOREIGN KEY ("station_id") REFERENCES "stations"("id")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    
    CONSTRAINT observations_unique_readings
        UNIQUE ("station_id", "metric", "observed_at"),

    CONSTRAINT observations_metric_type_check
        CHECK ("metric" IN ('level', 'rain')),

    CONSTRAINT observations_observed_at_format_check
        CHECK ("observed_at" GLOB '????-??-??T??:??:??*Z'),

    CONSTRAINT observations_unit_type_check
        CHECK ("unit" IN ('m', 'mm/h')),

    CONSTRAINT observations_metric_unit_pairing
        CHECK (
            ("metric" = 'level' AND "unit" = 'm') OR
            ("metric" = 'rain'  AND "unit" = 'mm/h')
        )
);

CREATE INDEX IF NOT EXISTS idx_observations_observed_at
    ON "observations" ("observed_at");
CREATE INDEX IF NOT EXISTS idx_observations_station_id
    ON "observations" ("station_id");
CREATE INDEX IF NOT EXISTS idx_observations_station_metric_observed
    ON "observations" ("station_id", "metric", "observed_at");
