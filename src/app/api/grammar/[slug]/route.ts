import { NextResponse } from 'next/server';
import { getTopicBySlug, getExamplesByTopicId } from '@/lib/queries/grammar';
import { getSession } from '@/lib/auth/session';
import { getDb } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const examples = getExamplesByTopicId(topic.id);
  const session = await getSession();

  let progress: { completed: boolean } | null = null;
  if (session) {
    const row = getDb()
      .prepare('SELECT completed FROM grammar_progress WHERE user_id = ? AND topic_id = ?')
      .get(session.userId, topic.id) as { completed: number } | undefined;
    progress = row ? { completed: row.completed === 1 } : null;
  }

  return NextResponse.json({ topic, examples, progress });
}
