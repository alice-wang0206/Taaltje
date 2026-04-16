#!/bin/sh
# Production start script for Railway (or any Linux host).
# Seeds the database on first run only (INSERT OR IGNORE makes re-runs safe too).

DB_FILE="${DB_PATH:-./taaltje.db}"

if [ ! -f "$DB_FILE" ]; then
  echo "==> First run detected: seeding database..."
  npx ts-node --project tsconfig.seed.json src/lib/db/seed.ts
  echo "==> Seed complete."
else
  echo "==> Database already exists at $DB_FILE, skipping seed."
fi

exec node_modules/.bin/next start -p "${PORT:-3000}"
