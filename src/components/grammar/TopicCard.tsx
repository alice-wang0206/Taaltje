import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { type GrammarTopicWithProgress } from '@/lib/queries/grammar';

interface TopicCardProps {
  topic: GrammarTopicWithProgress;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={`/grammar/${topic.cefr_level}/${topic.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge level={topic.cefr_level} />
          {topic.completed === 1 && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
          {topic.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{topic.summary}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 shrink-0 transition-colors" />
    </Link>
  );
}
