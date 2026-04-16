import { NextResponse } from 'next/server';
import { getTopics } from '@/lib/queries/grammar';
import { getSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level') ?? undefined;
  const language = searchParams.get('lang') ?? 'nl';

  const session = await getSession();
  const topics = getTopics({ level, language, userId: session?.userId });

  return NextResponse.json({ topics });
}
