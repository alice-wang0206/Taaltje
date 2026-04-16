import Link from 'next/link';
import { getTopics } from '@/lib/queries/grammar';
import { getSession } from '@/lib/auth/session';
import { TopicCard } from '@/components/grammar/TopicCard';
import { CEFR_LEVELS, CEFR_DESCRIPTIONS, type CefrLevel } from '@/lib/utils/constants';

export const metadata = { title: 'Grammar – Taaltje' };

export default async function GrammarPage() {
  const session = await getSession();
  const topics = getTopics({ language: 'nl', userId: session?.userId });

  const byLevel = CEFR_LEVELS.reduce<Record<string, typeof topics>>((acc, lvl) => {
    acc[lvl] = topics.filter(t => t.cefr_level === lvl);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Grammar</h1>
        <p className="mt-2 text-gray-500">
          {topics.length} lessons across all levels. Follow the progression from A1 to C2.
        </p>
      </div>

      {/* Level filter links */}
      <div className="flex flex-wrap gap-2">
        {CEFR_LEVELS.map(level => (
          <Link
            key={level}
            href={`/grammar/${level}`}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-colors"
          >
            {level} · {CEFR_DESCRIPTIONS[level as CefrLevel]}
          </Link>
        ))}
      </div>

      {CEFR_LEVELS.map(level => {
        const levelTopics = byLevel[level];
        if (!levelTopics?.length) return null;
        return (
          <section key={level}>
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              {level} – {CEFR_DESCRIPTIONS[level as CefrLevel]}
            </h2>
            <div className="flex flex-col gap-3">
              {levelTopics.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        );
      })}

      {topics.length === 0 && (
        <div className="py-16 text-center text-gray-400">No grammar lessons yet. Check back soon!</div>
      )}
    </div>
  );
}
