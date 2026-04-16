'use client';
import { useState, useCallback } from 'react';
import { WordCard } from './WordCard';
import { type WordWithProgress } from '@/lib/queries/words';

interface WordGridProps {
  initialWords: WordWithProgress[];
  loggedIn?: boolean;
}

export function WordGrid({ initialWords, loggedIn }: WordGridProps) {
  const [words, setWords] = useState(initialWords);

  const handleStatusChange = useCallback(async (wordId: number, status: string) => {
    setWords(prev => prev.map(w => w.id === wordId ? { ...w, status } : w));
    await fetch('/api/progress/words', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wordId, status }),
    });
  }, []);

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
