'use client';

import { useState } from 'react';
import { CheckCircle, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { GrammarTopic } from '@/lib/queries/grammar';

interface GrammarPhaseProps {
  topic: GrammarTopic;
  sessionId: number;
  alreadyDone: boolean;
  onDone: () => void;
}

export function GrammarPhase({ topic, sessionId, alreadyDone, onDone }: GrammarPhaseProps) {
  const [marking, setMarking] = useState(false);
  const [done, setDone] = useState(alreadyDone);

  const handleDone = async () => {
    if (done) { onDone(); return; }
    setMarking(true);
    try {
      await fetch('/api/daily/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, topicId: topic.id }),
      });
      setDone(true);
    } catch {
      // best-effort
    } finally {
      setMarking(false);
      onDone();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-500">Grammar lesson</span>
        </div>
        <Badge level={topic.cefr_level} />
        <h2 className="text-2xl font-bold text-gray-900">{topic.title}</h2>
        <p className="text-gray-500">{topic.summary}</p>
      </div>

      {/* Body */}
      <div
        className="prose prose-blue max-w-none rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        dangerouslySetInnerHTML={{ __html: topic.body }}
      />

      {/* Done button */}
      <button
        onClick={handleDone}
        disabled={marking}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
      >
        <CheckCircle className="h-4 w-4" />
        {marking ? 'Saving…' : done ? 'Continue →' : 'Done — continue'}
      </button>
    </div>
  );
}
