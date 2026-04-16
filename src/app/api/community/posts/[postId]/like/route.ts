import { NextResponse, type NextRequest } from 'next/server';
import { togglePostLike } from '@/lib/queries/posts';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const result = togglePostLike(parseInt(userId), parseInt(postId));
  return NextResponse.json(result);
}
