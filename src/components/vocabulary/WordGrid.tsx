'use client';
import { useState, useCallback } from 'react';
import { WordCard } from './WordCard';
import { type WordWithProgress } from '@/lib/queries/words';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface WordGridProps {
  initialWords: WordWithProgress[];
  loggedIn?: boolean;
}

export function WordGrid({ initialWords, loggedIn }: WordGridProps) {
  const [words, setWords] = useState(initialWords);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const handleStatusChange = useCallback(async (wordId: number, status: string) => {
    setWords(prev => prev.map(w => w.id === wordId ? { ...w, status } : w));
    await fetch('/api/progress/words', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wordId, status }),
    });
  }, []);

  // Group words by category
  const grouped = words.reduce<Record<string, WordWithProgress[]>>((acc, word) => {
    const cat = word.category || 'General';
    (acc[cat] ??= []).push(word);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  // If all words share the same category (or have no category), show flat grid
  if (categories.length <= 1) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {words.map(word => (
          <WordCard
            key={word.id}
            word={word}
            loggedIn={loggedIn}
            onStatusChange={loggedIn ? handleStatusChange : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.map(category => {
        const isOpen = collapsed[category] !== true;
        const catWords = grouped[category];
        const knownCount = catWords.filter(w => w.status === 'known').length;

        return (
          <div key={category} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setCollapsed(prev => ({ ...prev, [category]: isOpen }))}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {isOpen
                  ? <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                  : <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                }
                <span className="font-semibold text-gray-900">{category}</span>
                <span className="text-sm text-gray-400">{catWords.length} words</span>
              </div>
              {loggedIn && knownCount > 0 && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  {knownCount} / {catWords.length} known
                </span>
              )}
            </button>

            {isOpen && (
              <div className="border-t border-gray-100 p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {catWords.map(word => (
                    <WordCard
                      key={word.id}
                      word={word}
                      loggedIn={loggedIn}
                      onStatusChange={loggedIn ? handleStatusChange : undefined}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
