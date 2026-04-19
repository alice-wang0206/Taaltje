import { getDb } from '@/lib/db';

export interface Word {
  id: number;
  word: string;
  translation: string;
  language: string;
  part_of_speech: string;
  cefr_level: string;
  category: string;
  example_sentence: string | null;
  example_translation: string | null;
  created_at: number;
}

export interface WordWithProgress extends Word {
  status: string | null;
}

export function getWords(opts: {
  level?: string;
  language?: string;
  page?: number;
  limit?: number;
  userId?: number;
}): { words: WordWithProgress[]; total: number } {
  const db = getDb();
  const { level, language = 'nl', page = 1, limit = 20, userId } = opts;

  const conditions: string[] = ['w.language = ?'];
  const params: unknown[] = [language];

  if (level) {
    conditions.push('w.cefr_level = ?');
    params.push(level);
  }

  const where = `WHERE ${conditions.join(' AND ')}`;
  const offset = (page - 1) * limit;

  const totalRow = db
    .prepare(`SELECT COUNT(*) as count FROM words w ${where}`)
    .get(...params) as { count: number };

  let query: string;
  let queryParams: unknown[];

  if (userId) {
    query = `
      SELECT w.*, wp.status
      FROM words w
      LEFT JOIN word_progress wp ON wp.word_id = w.id AND wp.user_id = ?
      ${where}
      ORDER BY w.cefr_level, w.word
      LIMIT ? OFFSET ?
    `;
    queryParams = [userId, ...params, limit, offset];
  } else {
    query = `
      SELECT w.*, NULL as status
      FROM words w
      ${where}
      ORDER BY w.cefr_level, w.word
      LIMIT ? OFFSET ?
    `;
    queryParams = [...params, limit, offset];
  }

  const words = db.prepare(query).all(...queryParams) as WordWithProgress[];
  return { words, total: totalRow.count };
}

export function updateWordProgress(userId: number, wordId: number, status: string): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO word_progress (user_id, word_id, status, updated_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT(user_id, word_id) DO UPDATE SET status = excluded.status, updated_at = unixepoch()
  `).run(userId, wordId, status);
}

export function getUserWordProgress(userId: number): { total: number; known: number; learning: number } {
  const db = getDb();
  const rows = db.prepare(`
    SELECT status, COUNT(*) as count FROM word_progress WHERE user_id = ? GROUP BY status
  `).all(userId) as { status: string; count: number }[];

  const result = { total: 0, known: 0, learning: 0 };
  for (const row of rows) {
    result.total += row.count;
    if (row.status === 'known') result.known = row.count;
    if (row.status === 'learning') result.learning = row.count;
  }
  return result;
}
