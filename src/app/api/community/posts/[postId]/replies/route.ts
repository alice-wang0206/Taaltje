import { NextResponse, type NextRequest } from 'next/server';
import { createReply } from '@/lib/queries/posts';
import { createReplySchema } from '@/lib/validations/community';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = createReplySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }

    const reply = createReply({ postId: parseInt(postId), userId: parseInt(userId), body: parsed.data.body });
    return NextResponse.json({ reply }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
