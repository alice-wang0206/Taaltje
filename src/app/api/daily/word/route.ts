import { NextResponse, type NextRequest } from 'next/server';
import { saveWordResult } from '@/lib/queries/daily';

export async function POST(request: NextRequest) {
  const userId = Number(request.headers.get('x-user-id'));
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { sessionId, wordId, phase, result } = await request.json() as {
      sessionId: number;
      wordId: number;
      phase: 'review' | 'new';
      result: 'known' | 'learning';
    };

    if (!sessionId || !wordId || !phase || !result) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    saveWordResult(sessionId, wordId, userId, phase, result);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[daily/word POST]', err);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}
