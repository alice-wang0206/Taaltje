import Link from 'next/link';
import { getWords } from '@/lib/queries/words';
import { getSession } from '@/lib/auth/session';
import { WordGrid } from '@/components/vocabulary/WordGrid';
import { LevelSelector } from '@/components/vocabulary/LevelSelector';
import { Target } from 'lucide-react';

export const metadata = { title: 'Vocabulary – Taaltje' };

export default async function VocabularyPage() {
  const session = await getSession();
  const { words, total } = getWords({ language: 'nl', limit: 40, userId: session?.userId });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vocabulary</h1>
          <p className="mt-2 text-gray-500">{total} words across all levels. Click a card to reveal the translation.</p>
        </div>
        <Link
          href="/placement-test"
          className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors shrink-0"
        >
          <Target className="h-4 w-4" />
          Not sure where to start?
          <span className="font-bold">Take the placement test →</span>
        </Link>
      </div>
      <LevelSelector />
      <WordGrid initialWords={words} loggedIn={!!session} />
    </div>
  );
}
