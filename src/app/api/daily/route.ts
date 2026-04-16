import { NextResponse, type NextRequest } from 'next/server';
import { getOrCreateDailySession } from '@/lib/queries/daily';

export async function GET(request: NextRequest) {
  const userId = Number(request.headers.get('x-user-id'));
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const session = getOrCreateDailySession(userId);
    return NextResponse.json(session);
  } catch (err) {
    console.error('[daily GET]', err);
    return NextResponse.json({ error: 'Failed to load session' }, { status: 500 });
  }
}
