import { type NextRequest, NextResponse } from 'next/server';
import { mollie, cancelSubscription, logSubscriptionEvent, getSubscription } from '@/lib/mollie';

export async function POST(request: NextRequest) {
  const userId = Number(request.headers.get('x-user-id'));
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const sub = getSubscription(userId);
  if (!sub || sub.subscription_status !== 'active') {
    return NextResponse.json({ error: 'No active subscription' }, { status: 400 });
  }

  try {
    // Cancel recurring subscription in Mollie (no more renewals)
    if (sub.mollie_customer_id && sub.mollie_subscription_id) {
      await mollie.customerSubscriptions.cancel(sub.mollie_subscription_id, {
        customerId: sub.mollie_customer_id,
      });
    }

    // Keep access until subscription_ends_at (already set), just mark as cancelled
    const endsAt = sub.subscription_ends_at ?? Math.floor(Date.now() / 1000);
    cancelSubscription(userId, endsAt);
    logSubscriptionEvent(userId, 'subscription_cancelled', {
      mollieSubscriptionId: sub.mollie_subscription_id,
    });

    return NextResponse.json({ ok: true, endsAt });
  } catch (err) {
    console.error('[subscription/cancel]', err);
    return NextResponse.json({ error: 'Could not cancel subscription' }, { status: 500 });
  }
}
