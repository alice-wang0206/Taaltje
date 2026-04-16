import { NextResponse, type NextRequest } from 'next/server';
import { updateGrammarProgress } from '@/lib/queries/grammar';

export async function PATCH(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { topicId, completed } = body;
  if (typeof topicId !== 'number' || typeof completed !== 'boolean') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  updateGrammarProgress(parseInt(userId), topicId, completed);
  return NextResponse.json({ success: true });
}
