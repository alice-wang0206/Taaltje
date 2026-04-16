import { getDb } from '@/lib/db';

export interface GrammarTopic {
  id: number;
  title: string;
  slug: string;
  language: string;
  cefr_level: string;
  summary: string;
  body: string;
  sort_order: number;
  created_at: number;
}

export interface GrammarExample {
  id: number;
  topic_id: number;
  sentence: string;
  translation: string;
  note: string | null;
}

export interface GrammarTopicWithProgress extends GrammarTopic {
  completed: number | null;
}

export function getTopics(opts: { level?: string; language?: string; userId?: number }): GrammarTopicWithProgress[] {
  const db = getDb();
  const { level, language = 'nl', userId } = opts;

  const conditions = ['t.language = ?'];
  const params: unknown[] = [language];

  if (level) {
    conditions.push('t.cefr_level = ?');
    params.push(level);
  }

  const where = `WHERE ${conditions.join(' AND ')}`;

  if (userId) {
    const query = `
      SELECT t.*, gp.completed
      FROM grammar_topics t
      LEFT JOIN grammar_progress gp ON gp.topic_id = t.id AND gp.user_id = ?
      ${where}
      ORDER BY t.sort_order, t.id
    `;
    return db.prepare(query).all(userId, ...params) as GrammarTopicWithProgress[];
  }

  const query = `
    SELECT t.*, NULL as completed
    FROM grammar_topics t
    ${where}
    ORDER BY t.sort_order, t.id
  `;
  return db.prepare(query).all(...params) as GrammarTopicWithProgress[];
}

export function getTopicBySlug(slug: string): GrammarTopic | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM grammar_topics WHERE slug = ?').get(slug) as GrammarTopic | undefined;
}

export function getExamplesByTopicId(topicId: number): GrammarExample[] {
  const db = getDb();
  return db.prepare('SELECT * FROM grammar_examples WHERE topic_id = ? ORDER BY id').all(topicId) as GrammarExample[];
}

export function updateGrammarProgress(userId: number, topicId: number, completed: boolean): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO grammar_progress (user_id, topic_id, completed, updated_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT(user_id, topic_id) DO UPDATE SET completed = excluded.completed, updated_at = unixepoch()
  `).run(userId, topicId, completed ? 1 : 0);
}
