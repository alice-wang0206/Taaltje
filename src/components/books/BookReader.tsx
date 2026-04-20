'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, BookOpen, Loader2, Languages, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Book } from '@/lib/db/data/alice-wonderland';

interface SelectionPopup {
  text: string;
  context: string;
  left: number;
  top: number;
}

interface AnalysisResult {
  selectedText: string;
  translation: string | null;
  dbWord: {
    word: string;
    translation: string;
    pos: string;
    level: string;
    category: string;
    example: string | null;
    exampleTranslation: string | null;
  } | null;
  grammarTopics: {
    title: string;
    slug: string;
    level: string;
    summary: string;
  }[];
}

interface BookReaderProps {
  book: Book;
}

export function BookReader({ book }: BookReaderProps) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [popup, setPopup] = useState<SelectionPopup | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const chapter = book.chapters[chapterIndex];

  // Close popup on click/tap outside
  useEffect(() => {
    if (!popup) return;
    const handler = (e: PointerEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopup(null);
        setAnalysis(null);
        setError(null);
      }
    };
    const t = setTimeout(() => document.addEventListener('pointerdown', handler), 100);
    return () => {
      clearTimeout(t);
      document.removeEventListener('pointerdown', handler);
    };
  }, [popup]);

  const showPopup = useCallback((text: string, context: string, rect: DOMRect) => {
    const popupWidth = 340;
    const left = Math.max(8, Math.min(
      rect.left + rect.width / 2 - popupWidth / 2,
      window.innerWidth - popupWidth - 8
    ));
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow > 220 ? rect.bottom + 8 : rect.top - 8;

    setPopup({ text, context, left, top });
    setAnalysis(null);
    setError(null);
  }, []);

  const handlePointerUp = useCallback(() => {
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

      const text = sel.toString().trim();
      if (!text || text.length < 2 || text.length > 400) return;

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      const container = range.commonAncestorContainer;
      const para = container.nodeType === Node.TEXT_NODE
        ? container.parentElement
        : (container as Element);
      const context = para?.textContent ?? '';

      showPopup(text, context, rect);
    }, 50);
  }, [showPopup]);

  const handleWordTap = useCallback((e: React.MouseEvent<HTMLSpanElement>, word: string, context: string) => {
    if (window.getSelection()?.toString().trim()) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    showPopup(word, context, rect);
  }, [showPopup]);

  const analyze = useCallback(async () => {
    if (!popup || loading) return;
    setLoading(true);
    setAnalysis(null);
    setError(null);

    try {
      const res = await fetch('/api/books/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedText: popup.text, context: popup.context }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? 'Could not analyze text. Please try again.');
        return;
      }

      const data: AnalysisResult = await res.json();
      setAnalysis(data);
    } catch {
      setError('Could not reach the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [popup, loading]);

  const levelColors: Record<string, string> = {
    A1: 'bg-green-100 text-green-700',
    A2: 'bg-teal-100 text-teal-700',
    B1: 'bg-blue-100 text-blue-700',
    B2: 'bg-indigo-100 text-indigo-700',
    C1: 'bg-purple-100 text-purple-700',
    C2: 'bg-rose-100 text-rose-700',
  };

  function renderParagraph(text: string, paraIndex: number) {
    const words = text.split(/(\s+)/);
    return (
      <p key={paraIndex} className="leading-relaxed text-gray-800 mb-4 font-serif text-base sm:text-lg">
        {words.map((token, i) => {
          if (/^\s+$/.test(token)) return token;
          const word = token.replace(/[.,!?;:'"()\[\]{}«»„"‚']+/g, '');
          if (!word) return <span key={i}>{token}</span>;
          return (
            <span
              key={i}
              className="cursor-pointer rounded hover:bg-yellow-100 transition-colors"
              onClick={(e) => handleWordTap(e, word, text)}
            >
              {token}
            </span>
          );
        })}
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Chapter navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { setChapterIndex(i => Math.max(0, i - 1)); setPopup(null); setAnalysis(null); }}
          disabled={chapterIndex === 0}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Chapter {chapter.number} of {book.chapters.length}
          </p>
          <p className="text-sm font-semibold text-gray-700">{chapter.title}</p>
        </div>

        <button
          onClick={() => { setChapterIndex(i => Math.min(book.chapters.length - 1, i + 1)); setPopup(null); setAnalysis(null); }}
          disabled={chapterIndex === book.chapters.length - 1}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Hint banner */}
      <div className="mb-6 flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">
        <Languages className="h-4 w-4 shrink-0" />
        <span>
          <strong>Desktop:</strong> select text. <strong>Mobile:</strong> tap any word.
        </span>
      </div>

      {/* Chapter heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">
        {chapter.number}. {chapter.title}
      </h2>

      {/* Book text */}
      <div className="select-text" onPointerUp={handlePointerUp}>
        {chapter.paragraphs.map((para, i) => renderParagraph(para, i))}
      </div>

      {/* Selection popup */}
      {popup && (
        <div
          ref={popupRef}
          style={{
            position: 'fixed',
            left: popup.left,
            top: popup.top > window.innerHeight / 2 ? undefined : popup.top,
            bottom: popup.top > window.innerHeight / 2
              ? window.innerHeight - popup.top + 8
              : undefined,
            width: 340,
            zIndex: 9999,
          }}
          className="rounded-2xl border border-gray-200 bg-white shadow-xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-gray-100 px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">Selected</p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                &ldquo;{popup.text}&rdquo;
              </p>
            </div>
            <button
              onClick={() => { setPopup(null); setAnalysis(null); setError(null); }}
              className="shrink-0 rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-3 max-h-80 overflow-y-auto">
            {!analysis && !loading && !error && (
              <button
                onClick={analyze}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Translate &amp; Explain
              </button>
            )}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                <span>Translating…</span>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                {error}
                <button
                  onClick={() => { setError(null); }}
                  className="ml-2 text-red-400 hover:text-red-600 underline"
                >
                  Try again
                </button>
              </div>
            )}

            {analysis && (
              <div className="space-y-3 text-sm">
                {/* Translation */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Translation</p>
                  <p className="text-gray-900 font-medium">
                    {analysis.translation ?? analysis.dbWord?.translation ?? '—'}
                  </p>
                </div>

                {/* Dictionary entry */}
                {analysis.dbWord && (
                  <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-blue-800">{analysis.dbWord.word}</span>
                      <span className="text-xs text-gray-500 capitalize">{analysis.dbWord.pos}</span>
                      <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded', levelColors[analysis.dbWord.level] ?? 'bg-gray-100 text-gray-600')}>
                        {analysis.dbWord.level}
                      </span>
                      {analysis.dbWord.category && (
                        <span className="text-xs text-gray-400">{analysis.dbWord.category}</span>
                      )}
                    </div>
                    {analysis.dbWord.example && (
                      <p className="text-xs text-gray-600 italic">&ldquo;{analysis.dbWord.example}&rdquo;</p>
                    )}
                    {analysis.dbWord.exampleTranslation && (
                      <p className="text-xs text-gray-400">{analysis.dbWord.exampleTranslation}</p>
                    )}
                  </div>
                )}

                {/* Related grammar */}
                {analysis.grammarTopics.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Related Grammar</p>
                    <div className="space-y-1.5">
                      {analysis.grammarTopics.map(t => (
                        <a
                          key={t.slug}
                          href={`/grammar/${t.level}/${t.slug}`}
                          className="flex items-start justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-800 group-hover:text-blue-700 truncate">{t.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{t.summary}</p>
                          </div>
                          <ExternalLink className="h-3 w-3 shrink-0 text-gray-300 group-hover:text-blue-400 mt-0.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Retry / no data fallback */}
                {!analysis.translation && !analysis.dbWord && (
                  <p className="text-xs text-gray-400 text-center py-2">
                    No dictionary entry found for this selection.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
