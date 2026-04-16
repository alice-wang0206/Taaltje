import { NextResponse, type NextRequest } from 'next/server';
import { getPosts, createPost } from '@/lib/queries/posts';
import { createPostSchema } from '@/lib/validations/community';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? undefined;
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const userId = request.headers.get('x-user-id');
  const result = getPosts({ category, page, userId: userId ? parseInt(userId) : undefined });

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = createPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }

    const post = createPost({ userId: parseInt(userId), ...parsed.data });
    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
