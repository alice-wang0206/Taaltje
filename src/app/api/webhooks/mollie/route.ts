import { type NextRequest, NextResponse } from 'next/server';
import {
  mollie,
  PLAN,
  activateSubscription,
  logSubscriptionEvent,
} from '@/lib/mollie';

// Mollie sends POST with form-body: id=tr_xxxx
export async function POST(request: NextRequest) {
  let paymentId: string | null = null;

  try {
    const text = await request.text();
    const params = new URLSearchParams(text);
    paymentId = params.get('id');
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  if (!paymentId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const payment = await mollie.payments.get(paymentId);
    const userIdStr = (payment.metadata as Record<string, string> | null)?.userId;
    if (!userIdStr) return new Response('ok'); // not our payment

    const userId = Number(userIdStr);

    // ── Subscription renewal payment ─────────────────────────────────────────
    if (payment.subscriptionId) {
      if (payment.status === 'paid') {
        // Extend the subscription end date by one month
        const endsAt = Math.floor(Date.now() / 1000) + 31 * 24 * 60 * 60;
        // reuse activateSubscription to keep subscription_id intact
        const sub = await mollie.customerSubscriptions.get(payment.subscriptionId, {
          customerId: payment.customerId!,
        });
        activateSubscription(userId, sub.id, endsAt);
        logSubscriptionEvent(userId, 'payment_paid', { paymentId });
      } else if (payment.status === 'failed' || payment.status === 'expired') {
        logSubscriptionEvent(userId, 'payment_failed', { paymentId, status: payment.status });
      }
      return new Response('ok');
    }

    // ── First payment (sequenceType: 'first') ────────────────────────────────
    if (payment.sequenceType === 'first' && payment.status === 'paid') {
      const customerId = payment.customerId;
      if (!customerId) return new Response('ok');

      // Create the recurring subscription
      const endsAt = Math.floor(Date.now() / 1000) + 31 * 24 * 60 * 60;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

      const subscription = await mollie.customerSubscriptions.create({
        customerId,
        amount: PLAN.amount,
        interval: PLAN.interval,
        description: PLAN.description,
        webhookUrl: `${appUrl}/api/webhooks/mollie`,
        metadata: { userId: String(userId) },
      });

      activateSubscription(userId, subscription.id, endsAt);
      logSubscriptionEvent(userId, 'subscription_created', {
        paymentId,
        subscriptionId: subscription.id,
      });
    }
  } catch (err) {
    console.error('[webhooks/mollie]', err);
    // Return 200 so Mollie doesn't keep retrying on our DB errors
  }

  return new Response('ok');
}
