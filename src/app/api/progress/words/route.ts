import { NextResponse, type NextRequest } from 'next/server';
import { updateWordProgress, getUserWordProgress } from '@/lib/queries/words';

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const progress = getUserWordProgress(parseInt(userId));
  return NextResponse.json(progress);
}

export async function PATCH(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { wordId, status } = body;
  if (!wordId || !['new', 'learning', 'known'].includes(status)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  updateWordProgress(parseInt(userId), wordId, status);
  return NextResponse.json({ success: true });
}
