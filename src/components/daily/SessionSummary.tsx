'use client';

import Link from 'next/link';
import { Flame, CheckCircle, RotateCcw, BookOpen, Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Stats {
  knownCount: number;
  learningCount: number;
  reviewCount: number;
  newCount: number;
}

interface SessionSummaryProps {
  stats: Stats;
  streak: number;
}

export function SessionSummary({ stats, streak }: SessionSummaryProps) {
  const total = stats.knownCount + stats.learningCount;
  const pct = total > 0 ? Math.round((stats.knownCount / total) * 100) : 0;

  return (
    <div className="space-y-8 text-center">
      {/* Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg">
          <Star className="h-9 w-9 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Session complete!</h1>
        <p className="text-gray-500">Great work — you're building real momentum.</p>
      </div>

      {/* Streak banner */}
      {streak > 0 && (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-orange-50 border border-orange-200 py-4">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-bold text-orange-700 text-lg">{streak}-day streak</span>
          <Flame className="h-5 w-5 text-orange-500" />
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Known</span>
          </div>
          <p className="text-3xl font-bold text-green-700">{stats.knownCount}</p>
        </div>
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <RotateCcw className="h-4 w-4 text-orange-600" />
            <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Learning</span>
          </div>
          <p className="text-3xl font-bold text-orange-700">{stats.learningCount}</p>
        </div>
      </div>

      {/* Score bar */}
      {total > 0 && (
        <div className="space-y-2 text-left">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-600">Recall rate</span>
            <span className={cn(pct >= 70 ? 'text-green-600' : 'text-orange-600')}>{pct}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', pct >= 70 ? 'bg-green-400' : 'bg-orange-400')}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{stats.reviewCount} reviewed</span>
            <span>{stats.newCount} new words</span>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/vocabulary"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Browse vocabulary
        </Link>
        <Link
          href="/grammar"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          More grammar
        </Link>
      </div>

      <p className="text-xs text-gray-400">Come back tomorrow to keep your streak going!</p>
    </div>
  );
}
