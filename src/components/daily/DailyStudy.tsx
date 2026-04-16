'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Flame, RotateCcw, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { WordCard } from './WordCard';
import { GrammarPhase } from './GrammarPhase';
import { SessionSummary } from './SessionSummary';
import type { DailySessionFull } from '@/lib/queries/daily';

type Phase = 'loading' | 'error' | 'intro' | 'review' | 'new' | 'grammar' | 'completing' | 'summary';

interface SummaryStats {
  knownCount: number;
  learningCount: number;
  reviewCount: number;
  newCount: number;
}

export function DailyStudy() {
  const [data, setData] = useState<DailySessionFull | null>(null);
  const [phase, setPhase] = useState<Phase>('loading');
  const [wordIndex, setWordIndex] = useState(0);
  const [summaryStats, setSummaryStats] = useState<SummaryStats | null>(null);
  const [finalStreak, setFinalStreak] = useState(0);

  useEffect(() => {
    fetch('/api/daily')
      .then(r => r.json())
      .then((d: DailySessionFull) => {
        setData(d);
        setPhase('intro');
      })
      .catch(() => setPhase('error'));
  }, []);

  const saveWordResult = useCallback(
    (wordId: number, wordPhase: 'review' | 'new', result: 'known' | 'learning') => {
      if (!data) return;
      fetch('/api/daily/word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: data.session.id,
          wordId,
          phase: wordPhase,
          result,
        }),
      }).catch(() => {});
    },
    [data]
  );

  const handleWordResult = useCallback(
    (result: 'known' | 'learning') => {
      if (!data) return;

      if (phase === 'review') {
        saveWordResult(data.reviewWords[wordIndex].id, 'review', result);
        const next = wordIndex + 1;
        if (next >= data.reviewWords.length) {
          // Move to new words phase (or grammar if no new words)
          setWordIndex(0);
          setPhase(data.newWords.length > 0 ? 'new' : data.grammarTopic && !data.session.grammar_done ? 'grammar' : 'completing');
        } else {
          setWordIndex(next);
        }
      } else if (phase === 'new') {
        saveWordResult(data.newWords[wordIndex].id, 'new', result);
        const next = wordIndex + 1;
        if (next >= data.newWords.length) {
          setWordIndex(0);
          setPhase(data.grammarTopic && !data.session.grammar_done ? 'grammar' : 'completing');
        } else {
          setWordIndex(next);
        }
      }
    },
    [data, phase, wordIndex, saveWordResult]
  );

  const handleGrammarDone = useCallback(() => {
    setPhase('completing');
  }, []);

  // Trigger session completion whenever we enter 'completing'
  useEffect(() => {
    if (phase !== 'completing' || !data) return;

    fetch('/api/daily/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: data.session.id }),
    })
      .then(r => r.json())
      .then(({ stats }) => {
        setSummaryStats(stats);
        setFinalStreak(data.streak + 1);
        setPhase('summary');
      })
      .catch(() => {
        // Show summary anyway with zeroed stats
        setSummaryStats({ knownCount: 0, learningCount: 0, reviewCount: 0, newCount: 0 });
        setFinalStreak(data.streak);
        setPhase('summary');
      });
  }, [phase, data]);

  const startSession = () => {
    if (!data) return;
    if (data.reviewWords.length > 0) setPhase('review');
    else if (data.newWords.length > 0) setPhase('new');
    else if (data.grammarTopic && !data.session.grammar_done) setPhase('grammar');
    else setPhase('completing');
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="h-8 w-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-500">Preparing your session…</p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────
  if (phase === 'error' || !data) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        <p className="font-semibold">Could not load today's session.</p>
        <p className="text-sm mt-1 text-red-500">Please refresh the page to try again.</p>
      </div>
    );
  }

  // ── Intro ──────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const { reviewWords, newWords, grammarTopic, streak, session } = data;
    const totalWords = reviewWords.length + newWords.length;
    const hasGrammar = !!grammarTopic && !session.grammar_done;

    return (
      <div className="space-y-6 max-w-lg mx-auto">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Today's session</h1>
          <p className="text-gray-500">~10 minutes to keep your Dutch sharp.</p>
        </div>

        {streak > 0 && (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-orange-50 border border-orange-200 py-3">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-bold text-orange-700">{streak}-day streak — keep it up!</span>
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
          {reviewWords.length > 0 && (
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                <RotateCcw className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Review</p>
                <p className="text-sm text-gray-500">{reviewWords.length} words to reinforce</p>
              </div>
              <span className="text-lg font-bold text-orange-600">{reviewWords.length}</span>
            </div>
          )}

          {newWords.length > 0 && (
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">New words</p>
                <p className="text-sm text-gray-500">{newWords.length} words to learn</p>
              </div>
              <span className="text-lg font-bold text-blue-600">{newWords.length}</span>
            </div>
          )}

          {hasGrammar && grammarTopic && (
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Grammar</p>
                <p className="text-sm text-gray-500 truncate">{grammarTopic.title}</p>
              </div>
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                {grammarTopic.cefr_level}
              </span>
            </div>
          )}

          {totalWords === 0 && !hasGrammar && (
            <div className="px-5 py-6 text-center text-gray-500 text-sm">
              Nothing new for today — you're all caught up!
            </div>
          )}
        </div>

        <button
          onClick={startSession}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          Start session
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  // ── Review phase ──────────────────────────────────────────────────────
  if (phase === 'review') {
    const word = data.reviewWords[wordIndex];
    return (
      <div className="max-w-lg mx-auto">
        <WordCard
          word={word}
          index={wordIndex}
          total={data.reviewWords.length}
          phase="review"
          onResult={handleWordResult}
        />
      </div>
    );
  }

  // ── New words phase ───────────────────────────────────────────────────
  if (phase === 'new') {
    const word = data.newWords[wordIndex];
    return (
      <div className="max-w-lg mx-auto">
        <WordCard
          word={word}
          index={wordIndex}
          total={data.newWords.length}
          phase="new"
          onResult={handleWordResult}
        />
      </div>
    );
  }

  // ── Grammar phase ─────────────────────────────────────────────────────
  if (phase === 'grammar' && data.grammarTopic) {
    return (
      <div className="max-w-2xl mx-auto">
        <GrammarPhase
          topic={data.grammarTopic}
          sessionId={data.session.id}
          alreadyDone={!!data.session.grammar_done}
          onDone={handleGrammarDone}
        />
      </div>
    );
  }

  // ── Completing (brief spinner while POSTing complete) ─────────────────
  if (phase === 'completing') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="h-8 w-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-500">Saving your progress…</p>
      </div>
    );
  }

  // ── Summary ───────────────────────────────────────────────────────────
  if (phase === 'summary' && summaryStats) {
    return (
      <div className="max-w-lg mx-auto">
        <SessionSummary stats={summaryStats} streak={finalStreak} />
      </div>
    );
  }

  return null;
}
