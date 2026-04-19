import { type NextRequest, NextResponse } from 'next/server';
import { PaymentMethod, SequenceType } from '@mollie/api-client';
import { mollie, PLAN, setMollieCustomer, logSubscriptionEvent, getSubscription } from '@/lib/mollie';
import { getUserById } from '@/lib/queries/users';

export async function POST(request: NextRequest) {
  const userId = Number(request.headers.get('x-user-id'));
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!process.env.MOLLIE_API_KEY) {
    return NextResponse.json({ error: 'Payment not configured' }, { status: 500 });
  }

  const sub = getSubscription(userId);
  if (sub?.subscription_status === 'active') {
    return NextResponse.json({ error: 'Already subscribed' }, { status: 400 });
  }

  const user = getUserById(userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  try {
    // Create or reuse Mollie customer
    let mollieCustomerId = sub?.mollie_customer_id ?? null;
    if (!mollieCustomerId) {
      const customer = await mollie.customers.create({
        name: user.username,
        email: user.email,
        metadata: { userId: String(userId) },
      });
      mollieCustomerId = customer.id;
      setMollieCustomer(userId, mollieCustomerId);
    }

    // First payment — sets up the mandate for recurring billing
    const payment = await mollie.payments.create({
      amount: PLAN.amount,
      description: PLAN.description,
      customerId: mollieCustomerId,
      sequenceType: SequenceType.first,
      redirectUrl: `${appUrl}/upgrade?status=success`,
      webhookUrl: `${appUrl}/api/webhooks/mollie`,
      method: [PaymentMethod.ideal, PaymentMethod.creditcard, PaymentMethod.bancontact],
      metadata: { userId: String(userId) },
    });

    logSubscriptionEvent(userId, 'checkout_started', { paymentId: payment.id });

    const checkoutUrl = payment._links.checkout?.href;
    if (!checkoutUrl) throw new Error('No checkout URL returned');

    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error('[subscription/checkout]', err);
    return NextResponse.json({ error: 'Could not create payment' }, { status: 500 });
  }
}
