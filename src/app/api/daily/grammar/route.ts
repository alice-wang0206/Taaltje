import { NextResponse, type NextRequest } from 'next/server';
import { markGrammarDone } from '@/lib/queries/daily';

export async function POST(request: NextRequest) {
  const userId = Number(request.headers.get('x-user-id'));
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { sessionId, topicId } = await request.json() as {
      sessionId: number;
      topicId: number;
    };

    if (!sessionId || !topicId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    markGrammarDone(sessionId, userId, topicId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[daily/grammar POST]', err);
    return NextResponse.json({ error: 'Failed to mark grammar done' }, { status: 500 });
  }
}
