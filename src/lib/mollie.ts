import createMollieClient, { type MollieClient } from '@mollie/api-client';
import { getDb } from '@/lib/db';

// Lazy-initialize so missing MOLLIE_API_KEY during build doesn't throw
let _mollie: MollieClient | null = null;
export function getMollie(): MollieClient {
  if (!_mollie) {
    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) throw new Error('MOLLIE_API_KEY is not set');
    _mollie = createMollieClient({ apiKey });
  }
  return _mollie;
}
/** @deprecated use getMollie() */
export const mollie = new Proxy({} as MollieClient, {
  get(_t, prop) {
    return getMollie()[prop as keyof MollieClient];
  },
});

export const PLAN = {
  amount: { currency: 'EUR', value: '4.99' } as const,
  interval: '1 month' as const,
  description: 'Taaltje Premium – maandelijks',
};

// ─── DB helpers ──────────────────────────────────────────────────────────────

export function isProUser(userId: number): boolean {
  const db = getDb();
  const row = db
    .prepare('SELECT subscription_status, subscription_ends_at FROM users WHERE id = ?')
    .get(userId) as { subscription_status: string; subscription_ends_at: number | null } | undefined;

  if (!row) return false;
  if (row.subscription_status === 'active') return true;
  // Grace period: still pro if ends_at is in the future
  if (
    row.subscription_status === 'cancelled' &&
    row.subscription_ends_at &&
    row.subscription_ends_at > Math.floor(Date.now() / 1000)
  ) {
    return true;
  }
  return false;
}

export function getSubscription(userId: number) {
  const db = getDb();
  return db
    .prepare(
      'SELECT mollie_customer_id, mollie_subscription_id, subscription_status, subscription_ends_at FROM users WHERE id = ?'
    )
    .get(userId) as {
      mollie_customer_id: string | null;
      mollie_subscription_id: string | null;
      subscription_status: string;
      subscription_ends_at: number | null;
    } | undefined;
}

export function setMollieCustomer(userId: number, mollieCustomerId: string) {
  getDb()
    .prepare('UPDATE users SET mollie_customer_id = ? WHERE id = ?')
    .run(mollieCustomerId, userId);
}

export function activateSubscription(
  userId: number,
  mollieSubscriptionId: string,
  endsAt: number
) {
  getDb()
    .prepare(
      `UPDATE users
       SET subscription_status = 'active',
           mollie_subscription_id = ?,
           subscription_ends_at = ?
       WHERE id = ?`
    )
    .run(mollieSubscriptionId, endsAt, userId);
}

export function cancelSubscription(userId: number, endsAt: number) {
  getDb()
    .prepare(
      `UPDATE users
       SET subscription_status = 'cancelled',
           subscription_ends_at = ?
       WHERE id = ?`
    )
    .run(endsAt, userId);
}

export function logSubscriptionEvent(
  userId: number,
  eventType: string,
  payload?: unknown
) {
  getDb()
    .prepare(
      'INSERT INTO subscription_events (user_id, event_type, payload) VALUES (?, ?, ?)'
    )
    .run(userId, eventType, payload ? JSON.stringify(payload) : null);
}
