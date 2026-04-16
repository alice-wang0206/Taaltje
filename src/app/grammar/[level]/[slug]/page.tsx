import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTopicBySlug, getExamplesByTopicId } from '@/lib/queries/grammar';
import { getSession } from '@/lib/auth/session';
import { getDb } from '@/lib/db';
import { Badge } from '@/components/ui/Badge';
import { ExamplesTable } from '@/components/grammar/ExamplesTable';
import { CompleteButton } from '@/components/grammar/CompleteButton';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ level: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  return { title: topic ? `${topic.title} – Taaltje` : 'Lesson – Taaltje' };
}

export default async function GrammarLessonPage({ params }: PageProps) {
  const { level, slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic || topic.cefr_level !== level) notFound();

  const examples = getExamplesByTopicId(topic.id);
  const session = await getSession();

  let initialCompleted = false;
  if (session) {
    const row = getDb()
      .prepare('SELECT completed FROM grammar_progress WHERE user_id = ? AND topic_id = ?')
      .get(session.userId, topic.id) as { completed: number } | undefined;
    initialCompleted = row?.completed === 1;
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/grammar" className="hover:text-blue-600 transition-colors">Grammar</Link>
        <span>/</span>
        <Link href={`/grammar/${level}`} className="hover:text-blue-600 transition-colors">{level}</Link>
        <span>/</span>
        <span className="text-gray-700">{topic.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge level={topic.cefr_level} className="mb-3" />
          <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
          <p className="mt-2 text-lg text-gray-500">{topic.summary}</p>
        </div>
        {session && (
          <CompleteButton topicId={topic.id} initialCompleted={initialCompleted} />
        )}
      </div>

      {/* Lesson body */}
      <div
        className="prose prose-blue max-w-none rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        dangerouslySetInnerHTML={{ __html: topic.body }}
      />

      {/* Examples table */}
      {examples.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Examples</h2>
          <ExamplesTable examples={examples} />
        </section>
      )}

      {!session && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center">
          <p className="text-sm text-blue-800">
            <Link href="/register" className="font-semibold underline">Create an account</Link> to track your progress and mark lessons as complete.
          </p>
        </div>
      )}
    </div>
  );
}
