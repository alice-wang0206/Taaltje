import { notFound } from 'next/navigation';
import { getTopics } from '@/lib/queries/grammar';
import { getSession } from '@/lib/auth/session';
import { TopicCard } from '@/components/grammar/TopicCard';
import { CEFR_LEVELS, CEFR_DESCRIPTIONS, type CefrLevel } from '@/lib/utils/constants';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ level: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { level } = await params;
  return { title: `${level} Grammar – Taaltje` };
}

export default async function GrammarLevelPage({ params }: PageProps) {
  const { level } = await params;
  if (!CEFR_LEVELS.includes(level as CefrLevel)) notFound();

  const session = await getSession();
  const topics = getTopics({ level, language: 'nl', userId: session?.userId });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/grammar" className="hover:text-blue-600 transition-colors">Grammar</Link>
        <span>/</span>
        <span>{level}</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {level} – {CEFR_DESCRIPTIONS[level as CefrLevel]} Grammar
        </h1>
        <p className="mt-2 text-gray-500">{topics.length} lessons at this level.</p>
      </div>

      <div className="flex flex-col gap-3">
        {topics.map(topic => <TopicCard key={topic.id} topic={topic} />)}
      </div>

      {topics.length === 0 && (
        <div className="py-16 text-center text-gray-400">No lessons at this level yet.</div>
      )}
    </div>
  );
}
