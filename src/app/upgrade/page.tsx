'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, Zap, BookOpen, MessageCircle, Globe } from 'lucide-react';

export default function UpgradePage() {
  return (
    <Suspense>
      <UpgradeContent />
    </Suspense>
  );
}

const FEATURES_FREE = [
  'A1 & A2 vocabulary (120 words)',
  '10 grammar lessons',
  'Daily study sessions',
  'Community forum',
];

const FEATURES_PRO = [
  'All 120+ words across A1–C2',
  '60 grammar topics (full A1–C2)',
  'Books section (Alice in Wonderland + more)',
  'AI chat tutor (unlimited)',
  'Priority support',
];

function UpgradeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get('status');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subStatus, setSubStatus] = useState<{ isPro: boolean; status: string; endsAt: number | null } | null>(null);

  useEffect(() => {
    fetch('/api/subscription/status')
      .then(r => r.json())
      .then(data => setSubStatus(data))
      .catch(() => null);
  }, []);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/subscription/checkout', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Something went wrong');
        return;
      }
      const { checkoutUrl } = await res.json();
      window.location.href = checkoutUrl;
    } catch {
      setError('Could not reach the payment service. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!confirm('Cancel your subscription? You keep access until the end of the current period.')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/subscription/cancel', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Something went wrong');
        return;
      }
      router.refresh();
      setSubStatus(prev => prev ? { ...prev, status: 'cancelled' } : prev);
    } catch {
      setError('Could not cancel. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-10">
      {/* Success banner */}
      {status === 'success' && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center text-green-800">
          <p className="font-semibold">Payment successful!</p>
          <p className="text-sm mt-1">Your Taaltje Premium subscription is now active. Enjoy all features!</p>
        </div>
      )}

      {/* Hero */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
          <Zap className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Taaltje Premium</h1>
        <p className="mt-2 text-gray-500">Everything you need to master Dutch, from A1 to C2.</p>
      </div>

      {/* Pricing cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Free */}
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Free</p>
          <p className="mt-2 text-4xl font-extrabold text-gray-900">€0</p>
          <p className="text-sm text-gray-400">forever</p>
          <ul className="mt-6 space-y-3">
            {FEATURES_FREE.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-lg border border-gray-200 py-2.5 text-center text-sm font-semibold text-gray-400">
            Current plan
          </div>
        </div>

        {/* Pro */}
        <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-50 to-white p-7 shadow-md">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">Premium</p>
          <p className="mt-2 text-4xl font-extrabold text-gray-900">€4.99</p>
          <p className="text-sm text-amber-600">per month · cancel anytime</p>
          <ul className="mt-6 space-y-3">
            {FEATURES_PRO.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            {subStatus?.isPro ? (
              <>
                <div className="rounded-lg bg-green-50 py-2.5 text-center text-sm font-semibold text-green-700">
                  Active subscription
                  {subStatus.endsAt && (
                    <span className="block text-xs font-normal text-green-500 mt-0.5">
                      Renews {new Date(subStatus.endsAt * 1000).toLocaleDateString('nl-NL')}
                    </span>
                  )}
                </div>
                {subStatus.status === 'active' && (
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-200 py-2 text-xs text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors disabled:opacity-50"
                  >
                    Cancel subscription
                  </button>
                )}
                {subStatus.status === 'cancelled' && subStatus.endsAt && (
                  <p className="text-center text-xs text-gray-400">
                    Access until {new Date(subStatus.endsAt * 1000).toLocaleDateString('nl-NL')}
                  </p>
                )}
              </>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Redirecting…' : 'Start with iDEAL or card'}
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">{error}</p>
      )}

      {/* Payment methods */}
      <div className="text-center">
        <p className="text-xs text-gray-400">
          Secure payments via Mollie · iDEAL · Mastercard · Visa · Bancontact
        </p>
      </div>

      {/* Feature detail */}
      <div className="grid gap-5 sm:grid-cols-3">
        {[
          { icon: BookOpen, title: 'Full vocabulary', body: 'Access all 600+ Dutch words from A1 to C2 with spaced repetition.' },
          { icon: Globe, title: 'Books reader', body: 'Read Dutch literature. Tap any word to get instant translation and grammar notes.' },
          { icon: MessageCircle, title: 'AI tutor', body: 'Chat with your personal Dutch tutor powered by Claude. Practice real conversations.' },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-amber-50 p-2">
              <Icon className="h-5 w-5 text-amber-500" />
            </div>
            <p className="font-semibold text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
