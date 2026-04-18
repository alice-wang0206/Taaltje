'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, BookOpen, Loader2, Languages, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Book } from '@/lib/db/data/alice-wonderland';

interface SelectionPopup {
  text: string;
  context: string;
  x: number;
  y: number;
}

interface BookReaderProps {
  book: Book;
}

export function BookReader({ book }: BookReaderProps) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [popup, setPopup] = useState<SelectionPopup | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const chapter = book.chapters[chapterIndex];

  // Close popup on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        analysisRef.current &&
        !analysisRef.current.contains(e.target as Node)
      ) {
        setPopup(null);
        setAnalysis('');
      }
    };
    if (popup) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [popup]);

  const handleTextSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

    const text = sel.toString().trim();
    if (!text || text.length < 2 || text.length > 400) return;

    // Get surrounding context (the paragraph text)
    let context = '';
    const range = sel.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const para =
      container.nodeType === Node.TEXT_NODE
        ? container.parentElement
        : (container as Element);
    if (para) context = para.textContent ?? '';

    // Position popup near selection
    const rect = range.getBoundingClientRect();
    const scrollY = window.scrollY;

    setPopup({
      text,
      context,
      x: Math.min(rect.left + rect.width / 2, window.innerWidth - 320),
      y: rect.bottom + scrollY + 8,
    });
    setAnalysis('');
  }, []);

  const analyze = useCallback(async () => {
    if (!popup || loading) return;
    setLoading(true);
    setAnalysis('');

    try {
      const res = await fetch('/api/books/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedText: popup.text,
          context: popup.context,
        }),
      });

      if (!res.ok || !res.body) {
        setAnalysis('Could not analyze text. Please try again.');
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setAnalysis(result);
      }
    } catch {
      setAnalysis('Could not analyze text. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [popup, loading]);

  // Render markdown-ish bold (**text**) simply
  function renderAnalysis(text: string) {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <p key={i} className={cn('text-sm leading-relaxed', i > 0 && 'mt-1')}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="font-semibold text-gray-900">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Chapter navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { setChapterIndex(i => Math.max(0, i - 1)); setPopup(null); setAnalysis(''); }}
          disabled={chapterIndex === 0}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Chapter {chapter.number} of {book.chapters.length}
          </p>
          <p className="text-sm font-semibold text-gray-700">{chapter.title}</p>
        </div>

        <button
          onClick={() => { setChapterIndex(i => Math.min(book.chapters.length - 1, i + 1)); setPopup(null); setAnalysis(''); }}
          disabled={chapterIndex === book.chapters.length - 1}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Hint banner */}
      <div className="mb-6 flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">
        <Languages className="h-4 w-4 shrink-0" />
        <span>Select any word or sentence to get an English translation and grammar explanation.</span>
      </div>

      {/* Chapter heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">
        {chapter.number}. {chapter.title}
      </h2>

      {/* Book text */}
      <div
        className="prose prose-lg max-w-none select-text"
        onMouseUp={handleTextSelection}
      >
        {chapter.paragraphs.map((para, i) => (
          <p
            key={i}
            className="leading-relaxed text-gray-800 mb-4 cursor-text font-serif"
          >
            {para}
          </p>
        ))}
      </div>

      {/* Selection analysis popup */}
      {popup && (
        <div
          ref={analysisRef}
          style={{
            position: 'absolute',
            left: Math.max(8, Math.min(popup.x - 160, (containerRef.current?.offsetWidth ?? 640) - 328)),
            top: popup.y - (containerRef.current?.getBoundingClientRect().top ?? 0) - window.scrollY,
          }}
          className="z-50 w-80 rounded-2xl border border-gray-200 bg-white shadow-xl"
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
              onClick={() => { setPopup(null); setAnalysis(''); }}
              className="shrink-0 rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-3">
            {!analysis && !loading && (
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
                <span>Analyzing…</span>
              </div>
            )}

            {analysis && (
              <div className="space-y-1 text-gray-700 max-h-72 overflow-y-auto">
                {renderAnalysis(analysis)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
