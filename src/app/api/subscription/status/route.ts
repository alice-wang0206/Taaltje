import { type NextRequest, NextResponse } from 'next/server';
import { isProUser, getSubscription } from '@/lib/mollie';

export async function GET(request: NextRequest) {
  const userId = Number(request.headers.get('x-user-id'));
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sub = getSubscription(userId);
  const isPro = isProUser(userId);

  return NextResponse.json({
    isPro,
    status: sub?.subscription_status ?? 'free',
    endsAt: sub?.subscription_ends_at ?? null,
  });
}
