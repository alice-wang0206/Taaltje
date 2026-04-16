import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { DailyStudy } from '@/components/daily/DailyStudy';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Daily Study – Taaltje' };

export default async function DailyPage() {
  const session = await getSession();
  if (!session) redirect('/login?from=/daily');

  return (
    <div className="py-6">
      <DailyStudy />
    </div>
  );
}
