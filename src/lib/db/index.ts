import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DB_PATH ?? path.join(process.cwd(), 'taaltje.db');

let _db: Database.Database | null = null;

// ALTER TABLE migrations — safe to run on every startup; each is wrapped in
// try/catch so it becomes a no-op when the column already exists.
const MIGRATIONS = [
  // v2 – word categories
  "ALTER TABLE words ADD COLUMN category TEXT NOT NULL DEFAULT 'General'",
  // v2 – Mollie subscription fields on users
  'ALTER TABLE users ADD COLUMN mollie_customer_id TEXT',
  'ALTER TABLE users ADD COLUMN mollie_subscription_id TEXT',
  "ALTER TABLE users ADD COLUMN subscription_status TEXT NOT NULL DEFAULT 'free'",
  'ALTER TABLE users ADD COLUMN subscription_ends_at INTEGER',
];

const MIGRATION_TABLES = `
  CREATE TABLE IF NOT EXISTS subscription_events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type  TEXT    NOT NULL,
    payload     TEXT,
    created_at  INTEGER NOT NULL DEFAULT (unixepoch())
  )
`;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma('journal_mode = WAL');
    _db.pragma('foreign_keys = ON');
    _db.pragma('synchronous = NORMAL');

    // Create base schema (CREATE TABLE IF NOT EXISTS — safe on existing DBs)
    const schemaPath = path.join(process.cwd(), 'src', 'lib', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    _db.exec(schema);

    // Run ALTER TABLE migrations for existing DBs
    for (const sql of MIGRATIONS) {
      try { _db.exec(sql); } catch { /* column already exists — ignore */ }
    }
    _db.exec(MIGRATION_TABLES);
  }
  return _db;
}
