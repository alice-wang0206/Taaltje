'use client';

import { useState } from 'react';
import { CheckCircle, RefreshCw, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Word } from '@/lib/queries/words';

interface WordCardProps {
  word: Word;
  index: number;
  total: number;
  phase: 'review' | 'new';
  onResult: (result: 'known' | 'learning') => void;
}

export function WordCard({ word, index, total, phase, onResult }: WordCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    if (!flipped) setFlipped(true);
  };

  const handleResult = (result: 'known' | 'learning') => {
    onResult(result);
    setFlipped(false);
  };

  const posColors: Record<string, string> = {
    noun: 'bg-teal-100 text-teal-700',
    verb: 'bg-blue-100 text-blue-700',
    adjective: 'bg-purple-100 text-purple-700',
    adverb: 'bg-orange-100 text-orange-700',
    preposition: 'bg-pink-100 text-pink-700',
    conjunction: 'bg-yellow-100 text-yellow-700',
    pronoun: 'bg-indigo-100 text-indigo-700',
    interjection: 'bg-rose-100 text-rose-700',
  };
  const posStyle = posColors[word.part_of_speech?.toLowerCase()] ?? 'bg-gray-100 text-gray-600';

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {phase === 'review' ? 'Review' : 'New'} · {index + 1} of {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 w-6 rounded-full transition-colors',
                i < index ? 'bg-green-400' : i === index ? 'bg-blue-400' : 'bg-gray-200'
              )}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div
        onClick={handleFlip}
        className={cn(
          'min-h-[240px] rounded-2xl border-2 bg-white shadow-sm transition-all duration-200 cursor-pointer select-none',
          flipped ? 'border-blue-200' : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
        )}
      >
        {!flipped ? (
          /* Front: Dutch word */
          <div className="flex flex-col items-center justify-center h-full min-h-[240px] gap-4 p-8">
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize', posStyle)}>
              {word.part_of_speech}
            </span>
            <p className="text-4xl font-bold text-gray-900 text-center">{word.word}</p>
            <p className="text-sm text-gray-400 mt-2">Tap to reveal</p>
          </div>
        ) : (
          /* Back: Translation + example */
          <div className="flex flex-col gap-4 p-8">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">Translation</p>
                <p className="text-2xl font-bold text-blue-700">{word.translation}</p>
              </div>
              <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize shrink-0', posStyle)}>
                {word.part_of_speech}
              </span>
            </div>
            {word.example_sentence && (
              <div className="rounded-xl bg-gray-50 p-4 space-y-1">
                <p className="text-sm font-medium text-gray-800">{word.example_sentence}</p>
                {word.example_translation && (
                  <p className="text-sm text-gray-500 italic">{word.example_translation}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action buttons (only after flip) */}
      {flipped && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleResult('learning')}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-orange-200 bg-orange-50 py-4 text-sm font-semibold text-orange-700 hover:bg-orange-100 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Still learning
          </button>
          <button
            onClick={() => handleResult('known')}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-200 bg-green-50 py-4 text-sm font-semibold text-green-700 hover:bg-green-100 transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            I knew it
          </button>
        </div>
      )}

      {!flipped && (
        <button
          onClick={handleFlip}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Reveal translation
        </button>
      )}
    </div>
  );
}
