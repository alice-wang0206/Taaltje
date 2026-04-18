import { getDb } from '@/lib/db';
import type { Word } from './words';
import type { GrammarTopic } from './grammar';

export interface DailySession {
  id: number;
  user_id: number;
  date: string;
  grammar_topic_id: number | null;
  new_word_ids: string;
  review_word_ids: string;
  grammar_done: number;
  completed_at: number | null;
  created_at: number;
}

export interface DailySessionFull {
  session: DailySession;
  reviewWords: Word[];
  newWords: Word[];
  grammarTopic: GrammarTopic | null;
  streak: number;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function getUserLevel(userId: number): string {
  const db = getDb();
  const hasCol = (db.prepare('PRAGMA table_info(users)').all() as { name: string }[])
    .some(c => c.name === 'placement_level');
  if (!hasCol) return 'A1';
  const row = db.prepare('SELECT placement_level FROM users WHERE id = ?').get(userId) as
    { placement_level: string | null } | undefined;
  return row?.placement_level ?? 'A1';
}

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function getWordsByIds(ids: number[]): Word[] {
  if (!ids.length) return [];
  const db = getDb();
  const placeholders = ids.map(() => '?').join(',');
  const rows = db.prepare(
    `SELECT * FROM words WHERE id IN (${placeholders})`
  ).all(...ids) as Word[];
  // preserve original order
  return ids.map(id => rows.find(r => r.id === id)!).filter(Boolean);
}

// ─── streak ──────────────────────────────────────────────────────────────────

export function getStreak(userId: number): number {
  const db = getDb();
  const sessions = db.prepare(`
    SELECT date FROM daily_sessions
    WHERE user_id = ? AND completed_at IS NOT NULL
    ORDER BY date DESC
    LIMIT 365
  `).all(userId) as { date: string }[];

  if (!sessions.length) return 0;

  const todayStr = today();
  const yesterdayStr = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];

  // Must have completed today or yesterday to have an active streak
  if (sessions[0].date !== todayStr && sessions[0].date !== yesterdayStr) return 0;

  let streak = 1;
  for (let i = 1; i < sessions.length; i++) {
    const expected = new Date(Date.now() - i * 86_400_000).toISOString().split('T')[0];
    if (sessions[i].date === expected) streak++;
    else break;
  }
  return streak;
}

// ─── session generation ───────────────────────────────────────────────────────

function pickGrammarTopic(userId: number, userLevel: string): GrammarTopic | null {
  const db = getDb();
  const levelIndex = LEVEL_ORDER.indexOf(userLevel);
  const levels = LEVEL_ORDER.slice(0, levelIndex + 2); // include one level ahead

  // Pick next uncompleted topic at user's level (or next level if all done)
  for (const level of levels) {
    const topic = db.prepare(`
      SELECT t.*
      FROM grammar_topics t
      LEFT JOIN grammar_progress gp ON gp.topic_id = t.id AND gp.user_id = ?
      WHERE t.language = 'nl' AND t.cefr_level = ?
        AND (gp.completed IS NULL OR gp.completed = 0)
      ORDER BY t.sort_order, t.id
      LIMIT 1
    `).get(userId, level) as GrammarTopic | undefined;
    if (topic) return topic;
  }
  return null;
}

function pickReviewWords(userId: number, limit = 15): Word[] {
  const db = getDb();
  return db.prepare(`
    SELECT w.*
    FROM words w
    JOIN word_progress wp ON wp.word_id = w.id
    WHERE wp.user_id = ? AND wp.status = 'learning'
    ORDER BY wp.updated_at ASC
    LIMIT ?
  `).all(userId, limit) as Word[];
}

function pickNewWords(userId: number, userLevel: string, limit = 20, excludeIds: number[] = []): Word[] {
  const db = getDb();
  const levelIndex = LEVEL_ORDER.indexOf(userLevel);

  // Try exact level first, then next level if not enough
  const levelsToTry = LEVEL_ORDER.slice(0, Math.min(levelIndex + 2, LEVEL_ORDER.length));
  const result: Word[] = [];
  const seen = new Set<number>(excludeIds);

  for (const level of levelsToTry) {
    if (result.length >= limit) break;
    const rows = db.prepare(`
      SELECT w.*
      FROM words w
      LEFT JOIN word_progress wp ON wp.word_id = w.id AND wp.user_id = ?
      WHERE w.language = 'nl' AND w.cefr_level = ?
        AND wp.id IS NULL
      ORDER BY w.id
      LIMIT ?
    `).all(userId, level, limit * 2) as Word[];

    for (const row of rows) {
      if (result.length >= limit) break;
      if (!seen.has(row.id)) {
        seen.add(row.id);
        result.push(row);
      }
    }
  }

  return result;
}

// ─── public API ──────────────────────────────────────────────────────────────

export function getOrCreateDailySession(userId: number): DailySessionFull {
  const db = getDb();
  const dateStr = today();

  let session = db.prepare(
    'SELECT * FROM daily_sessions WHERE user_id = ? AND date = ?'
  ).get(userId, dateStr) as DailySession | undefined;

  if (!session) {
    const userLevel = getUserLevel(userId);
    const reviewWords = pickReviewWords(userId);
    const reviewIds = reviewWords.map(w => w.id);
    const newWords = pickNewWords(userId, userLevel, 20, reviewIds);
    const grammarTopic = pickGrammarTopic(userId, userLevel);

    const result = db.prepare(`
      INSERT INTO daily_sessions (user_id, date, grammar_topic_id, new_word_ids, review_word_ids)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      userId,
      dateStr,
      grammarTopic?.id ?? null,
      JSON.stringify(newWords.map(w => w.id)),
      JSON.stringify(reviewWords.map(w => w.id))
    );

    session = db.prepare('SELECT * FROM daily_sessions WHERE id = ?')
      .get(result.lastInsertRowid) as DailySession;
  }

  const newWordIds: number[] = JSON.parse(session.new_word_ids);
  const reviewWordIds: number[] = JSON.parse(session.review_word_ids);

  const grammarTopic = session.grammar_topic_id
    ? (db.prepare('SELECT * FROM grammar_topics WHERE id = ?').get(session.grammar_topic_id) as GrammarTopic)
    : null;

  return {
    session,
    reviewWords: getWordsByIds(reviewWordIds),
    newWords: getWordsByIds(newWordIds),
    grammarTopic,
    streak: getStreak(userId),
  };
}

export function saveWordResult(
  sessionId: number,
  wordId: number,
  userId: number,
  phase: 'review' | 'new',
  result: 'known' | 'learning'
): void {
  const db = getDb();

  // Upsert word progress
  db.prepare(`
    INSERT INTO word_progress (user_id, word_id, status, updated_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT(user_id, word_id)
    DO UPDATE SET status = excluded.status, updated_at = unixepoch()
  `).run(userId, wordId, result);

  // Record the result for session stats
  db.prepare(`
    INSERT INTO daily_word_results (session_id, word_id, phase, result)
    VALUES (?, ?, ?, ?)
  `).run(sessionId, wordId, phase, result);
}

export function markGrammarDone(sessionId: number, userId: number, topicId: number): void {
  const db = getDb();
  db.prepare('UPDATE daily_sessions SET grammar_done = 1 WHERE id = ?').run(sessionId);
  db.prepare(`
    INSERT INTO grammar_progress (user_id, topic_id, completed, updated_at)
    VALUES (?, ?, 1, unixepoch())
    ON CONFLICT(user_id, topic_id)
    DO UPDATE SET completed = 1, updated_at = unixepoch()
  `).run(userId, topicId);
}

export function completeSession(sessionId: number): void {
  const db = getDb();
  db.prepare('UPDATE daily_sessions SET completed_at = unixepoch() WHERE id = ?').run(sessionId);
}

export function getSessionStats(sessionId: number): {
  knownCount: number;
  learningCount: number;
  reviewCount: number;
  newCount: number;
} {
  const db = getDb();
  const rows = db.prepare(`
    SELECT phase, result, COUNT(*) as count
    FROM daily_word_results
    WHERE session_id = ?
    GROUP BY phase, result
  `).all(sessionId) as { phase: string; result: string; count: number }[];

  const get = (phase: string, result: string) =>
    rows.find(r => r.phase === phase && r.result === result)?.count ?? 0;

  return {
    knownCount: get('review', 'known') + get('new', 'known'),
    learningCount: get('review', 'learning') + get('new', 'learning'),
    reviewCount: get('review', 'known') + get('review', 'learning'),
    newCount: get('new', 'known') + get('new', 'learning'),
  };
}
