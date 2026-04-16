'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';
import { type WordWithProgress } from '@/lib/queries/words';
import { ChevronRight } from 'lucide-react';

const statusColors: Record<string, string> = {
  learning: 'border-l-yellow-400',
  known: 'border-l-green-500',
  new: 'border-l-gray-200',
};

interface WordCardProps {
  word: WordWithProgress;
  onStatusChange?: (wordId: number, status: string) => void;
  loggedIn?: boolean;
}

export function WordCard({ word, onStatusChange, loggedIn }: WordCardProps) {
  const [flipped, setFlipped] = useState(false);
  const status = word.status ?? 'new';
  const borderColor = statusColors[status] ?? 'border-l-gray-200';

  return (
    <div
      className={cn(
        'cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 p-5 flex flex-col gap-3',
        borderColor
      )}
      onClick={() => setFlipped(f => !f)}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          {!flipped ? (
            <p className="text-xl font-semibold text-gray-900">{word.word}</p>
          ) : (
            <p className="text-xl font-semibold text-blue-700">{word.translation}</p>
          )}
          <p className="text-xs text-gray-400 mt-0.5 capitalize">{word.part_of_speech}</p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Badge level={word.cefr_level} />
        </div>
      </div>

      {flipped && word.example_sentence && (
        <div className="border-t border-gray-100 pt-3">
          <p className="text-sm text-gray-700 italic">&ldquo;{word.example_sentence}&rdquo;</p>
          {word.example_translation && (
            <p className="text-xs text-gray-500 mt-1">{word.example_translation}</p>
          )}
        </div>
      )}

      {!flipped && (
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400">Click to flip</span>
          <ChevronRight className="h-4 w-4 text-gray-300" />
        </div>
      )}

      {flipped && loggedIn && (
        <div className="flex gap-2 mt-auto" onClick={e => e.stopPropagation()}>
          {(['learning', 'known'] as const).map(s => (
            <button
              key={s}
              onClick={() => onStatusChange?.(word.id, s)}
              className={cn(
                'flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors',
                status === s
                  ? s === 'known'
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-400 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {s === 'learning' ? 'Learning' : 'Known'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
