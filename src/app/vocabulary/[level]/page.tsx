import { notFound } from 'next/navigation';
import { getWords } from '@/lib/queries/words';
import { getSession } from '@/lib/auth/session';
import { WordGrid } from '@/components/vocabulary/WordGrid';
import { LevelSelector } from '@/components/vocabulary/LevelSelector';
import { CEFR_LEVELS, CEFR_DESCRIPTIONS, type CefrLevel } from '@/lib/utils/constants';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ level: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level } = await params;
  return { title: `${level} Vocabulary – Taaltje` };
}

export default async function LevelVocabularyPage({ params }: PageProps) {
  const { level } = await params;

  if (!CEFR_LEVELS.includes(level as CefrLevel)) notFound();

  const session = await getSession();
  const { words, total } = getWords({
    level,
    language: 'nl',
    limit: 100,
    userId: session?.userId,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {level} – {CEFR_DESCRIPTIONS[level as CefrLevel]} Vocabulary
        </h1>
        <p className="mt-2 text-gray-500">{total} words at this level. Click a card to flip it.</p>
      </div>
      <LevelSelector />
      {words.length === 0 ? (
        <div className="py-16 text-center text-gray-400">No words at this level yet. Check back soon!</div>
      ) : (
        <WordGrid initialWords={words} loggedIn={!!session} />
      )}
    </div>
  );
}
