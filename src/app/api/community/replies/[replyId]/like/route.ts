import { NextResponse, type NextRequest } from 'next/server';
import { toggleReplyLike } from '@/lib/queries/posts';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ replyId: string }> }
) {
  const { replyId } = await params;
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = toggleReplyLike(parseInt(userId), parseInt(replyId));
  return NextResponse.json(result);
}
