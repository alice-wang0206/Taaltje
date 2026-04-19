-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  username               TEXT    NOT NULL UNIQUE,
  email                  TEXT    NOT NULL UNIQUE,
  password               TEXT    NOT NULL,
  avatar_url             TEXT,
  role                   TEXT    NOT NULL DEFAULT 'user',
  created_at             INTEGER NOT NULL DEFAULT (unixepoch()),
  -- Subscription (Mollie)
  mollie_customer_id     TEXT,
  mollie_subscription_id TEXT,
  subscription_status    TEXT    NOT NULL DEFAULT 'free',
  subscription_ends_at   INTEGER
);

-- ============================================================
-- SUBSCRIPTION EVENTS  (audit trail)
-- ============================================================
CREATE TABLE IF NOT EXISTS subscription_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type  TEXT    NOT NULL,   -- 'checkout_started' | 'payment_paid' | 'subscription_created' | 'subscription_cancelled' | 'payment_failed'
  payload     TEXT,               -- JSON blob from Mollie
  created_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

-- ============================================================
-- VOCABULARY
-- ============================================================
CREATE TABLE IF NOT EXISTS words (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  word                TEXT    NOT NULL,
  translation         TEXT    NOT NULL,
  language            TEXT    NOT NULL DEFAULT 'nl',
  part_of_speech      TEXT    NOT NULL,
  cefr_level          TEXT    NOT NULL,
  category            TEXT    NOT NULL DEFAULT 'General',
  example_sentence    TEXT,
  example_translation TEXT,
  created_at          INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_words_level    ON words(cefr_level);
CREATE INDEX IF NOT EXISTS idx_words_language ON words(language);

-- ============================================================
-- GRAMMAR LESSONS
-- ============================================================
CREATE TABLE IF NOT EXISTS grammar_topics (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT    NOT NULL,
  slug        TEXT    NOT NULL UNIQUE,
  language    TEXT    NOT NULL DEFAULT 'nl',
  cefr_level  TEXT    NOT NULL,
  summary     TEXT    NOT NULL,
  body        TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_grammar_level    ON grammar_topics(cefr_level);
CREATE INDEX IF NOT EXISTS idx_grammar_language ON grammar_topics(language);

CREATE TABLE IF NOT EXISTS grammar_examples (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id    INTEGER NOT NULL REFERENCES grammar_topics(id) ON DELETE CASCADE,
  sentence    TEXT    NOT NULL,
  translation TEXT    NOT NULL,
  note        TEXT
);

-- ============================================================
-- COMMUNITY
-- ============================================================
CREATE TABLE IF NOT EXISTS posts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT    NOT NULL,
  body        TEXT    NOT NULL,
  category    TEXT    NOT NULL DEFAULT 'general',
  likes_count INTEGER NOT NULL DEFAULT 0,
  reply_count INTEGER NOT NULL DEFAULT 0,
  is_pinned   INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_posts_user     ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created  ON posts(created_at DESC);

CREATE TABLE IF NOT EXISTS replies (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id     INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body        TEXT    NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_replies_post ON replies(post_id);

CREATE TABLE IF NOT EXISTS likes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id    INTEGER,
  reply_id   INTEGER,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE(user_id, post_id),
  UNIQUE(user_id, reply_id),
  CHECK (
    (post_id IS NOT NULL AND reply_id IS NULL) OR
    (post_id IS NULL AND reply_id IS NOT NULL)
  )
);

-- ============================================================
-- USER PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS word_progress (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  word_id     INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  status      TEXT    NOT NULL DEFAULT 'new',
  next_review INTEGER,
  updated_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE(user_id, word_id)
);

CREATE TABLE IF NOT EXISTS grammar_progress (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id    INTEGER NOT NULL REFERENCES grammar_topics(id) ON DELETE CASCADE,
  completed   INTEGER NOT NULL DEFAULT 0,
  updated_at  INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE(user_id, topic_id)
);

-- ============================================================
-- DAILY STUDY SESSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS daily_sessions (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date             TEXT    NOT NULL,           -- 'YYYY-MM-DD'
  grammar_topic_id INTEGER REFERENCES grammar_topics(id),
  new_word_ids     TEXT    NOT NULL DEFAULT '[]',    -- JSON array
  review_word_ids  TEXT    NOT NULL DEFAULT '[]',    -- JSON array
  grammar_done     INTEGER NOT NULL DEFAULT 0,
  completed_at     INTEGER,
  created_at       INTEGER NOT NULL DEFAULT (unixepoch()),
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS daily_word_results (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES daily_sessions(id) ON DELETE CASCADE,
  word_id    INTEGER NOT NULL REFERENCES words(id),
  phase      TEXT    NOT NULL,   -- 'review' | 'new'
  result     TEXT    NOT NULL,   -- 'known' | 'learning'
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
