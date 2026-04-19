'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';

interface ProGateProps {
  feature?: string;
}

export function ProGate({ feature = 'this feature' }: ProGateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
        <Lock className="h-6 w-6 text-amber-600" />
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-900">Premium feature</p>
        <p className="mt-1 text-sm text-gray-500">
          Unlock {feature} with a Taaltje Premium subscription.
        </p>
      </div>
      <Link
        href="/upgrade"
        className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors"
      >
        Upgrade for €4.99/month
      </Link>
    </div>
  );
}
