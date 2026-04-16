import { NextResponse, type NextRequest } from 'next/server';
import { completeSession, getSessionStats } from '@/lib/queries/daily';

export async function POST(request: NextRequest) {
  const userId = Number(request.headers.get('x-user-id'));
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { sessionId } = await request.json() as { sessionId: number };
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

    completeSession(sessionId);
    const stats = getSessionStats(sessionId);
    return NextResponse.json({ ok: true, stats });
  } catch (err) {
    console.error('[daily/complete POST]', err);
    return NextResponse.json({ error: 'Failed to complete session' }, { status: 500 });
  }
}
