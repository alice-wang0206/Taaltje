import { NextResponse, type NextRequest } from 'next/server';
import { getPostById, getReplies } from '@/lib/queries/posts';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const userId = request.headers.get('x-user-id');
  const post = getPostById(parseInt(postId), userId ? parseInt(userId) : undefined);

  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const replies = getReplies(parseInt(postId), userId ? parseInt(userId) : undefined);
  return NextResponse.json({ post, replies });
}
