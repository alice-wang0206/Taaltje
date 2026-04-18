'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, BookOpen, Loader2, Languages, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Book } from '@/lib/db/data/alice-wonderland';

interface SelectionPopup {
  text: string;
  context: string;
  // viewport-relative coordinates for fixed positioning
  left: number;
  top: number;
}

interface BookReaderProps {
  book: Book;
}

export function BookReader({ book }: BookReaderProps) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [popup, setPopup] = useState<SelectionPopup | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const chapter = book.chapters[chapterIndex];

  // Close popup on click/tap outside
  useEffect(() => {
    if (!popup) return;
    const handler = (e: PointerEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopup(null);
        setAnalysis('');
      }
    };
    // slight delay so the pointer-up that opened the popup doesn't immediately close it
    const t = setTimeout(() => document.addEventListener('pointerdown', handler), 100);
    return () => {
      clearTimeout(t);
      document.removeEventListener('pointerdown', handler);
    };
  }, [popup]);

  const showPopup = useCallback((text: string, context: string, rect: DOMRect) => {
    const popupWidth = 320;
    const left = Math.max(8, Math.min(
      rect.left + rect.width / 2 - popupWidth / 2,
      window.innerWidth - popupWidth - 8
    ));
    // try to place below; if too close to bottom, place above selection
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow > 200 ? rect.bottom + 8 : rect.top - 8;

    setPopup({ text, context, left, top });
    setAnalysis('');
  }, []);

  // Works on desktop (mouse) and mobile (touch) via pointer events
  const handlePointerUp = useCallback(() => {
    // Small delay so browser has time to finalise selection after pointerup
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

      const text = sel.toString().trim();
      if (!text || text.length < 2 || text.length > 400) return;

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      // Surrounding paragraph for context
      const container = range.commonAncestorContainer;
      const para = container.nodeType === Node.TEXT_NODE
        ? container.parentElement
        : (container as Element);
      const context = para?.textContent ?? '';

      showPopup(text, context, rect);
    }, 50);
  }, [showPopup]);

  // Tap a word on mobile (single tap → select the tapped word)
  const handleWordTap = useCallback((e: React.MouseEvent<HTMLSpanElement>, word: string, context: string) => {
    if (window.getSelection()?.toString().trim()) return; // let drag selection take over
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    showPopup(word, context, rect);
  }, [showPopup]);

  const analyze = useCallback(async () => {
    if (!popup || loading) return;
    setLoading(true);
    setAnalysis('');

    try {
      const res = await fetch('/api/books/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedText: popup.text, context: popup.context }),
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

  function renderAnalysis(text: string) {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return null;
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <p key={i} className={cn('text-sm leading-relaxed', i > 0 && 'mt-1.5')}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="font-semibold text-gray-900">{part}</strong>
            ) : part
          )}
        </p>
      );
    });
  }

  // Render paragraph with individually tappable words (for mobile tap)
  function renderParagraph(text: string, paraIndex: number) {
    const words = text.split(/(\s+)/);
    return (
      <p key={paraIndex} className="leading-relaxed text-gray-800 mb-4 font-serif text-base sm:text-lg">
        {words.map((token, i) => {
          if (/^\s+$/.test(token)) return token;
          const word = token.replace(/[.,!?;:'"()[\]{}«»„"‚']+/g, '');
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
          onClick={() => { setChapterIndex(i => Math.max(0, i - 1)); setPopup(null); setAnalysis(''); }}
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
          onClick={() => { setChapterIndex(i => Math.min(book.chapters.length - 1, i + 1)); setPopup(null); setAnalysis(''); }}
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

      {/* Book text — desktop uses drag-select, mobile uses per-word tap */}
      <div
        className="select-text"
        onPointerUp={handlePointerUp}
      >
        {chapter.paragraphs.map((para, i) => renderParagraph(para, i))}
      </div>

      {/* Selection popup — position: fixed so it works everywhere */}
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
            width: 320,
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
              <div className="space-y-1 text-gray-700 max-h-64 overflow-y-auto">
                {renderAnalysis(analysis)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
