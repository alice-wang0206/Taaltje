import { NextResponse } from 'next/server';
import { getWords } from '@/lib/queries/words';
import { getSession } from '@/lib/auth/session';
import { CEFR_LEVELS } from '@/lib/utils/constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level') ?? undefined;
  const language = searchParams.get('lang') ?? 'nl';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);

  if (level && !CEFR_LEVELS.includes(level as never)) {
    return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
  }

  const session = await getSession();
  const result = getWords({ level, language, page, limit, userId: session?.userId });

  return NextResponse.json({ ...result, page, level, language });
}
