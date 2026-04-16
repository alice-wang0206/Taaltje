'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';
import { CEFR_LEVELS } from '@/lib/utils/constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBotProps {
  initialLevel: string | null;
}

const LEVEL_UPDATE_RE = /<level_update>([A-C][12])<\/level_update>/i;

export function ChatBot({ initialLevel }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<string | null>(initialLevel);
  const [levelFlash, setLevelFlash] = useState(false);
  const [levelJustUpdated, setLevelJustUpdated] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  const saveLevel = useCallback(async (level: string) => {
    try {
      await fetch('/api/placement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: level, answers: [] }),
      });
      setCurrentLevel(level);
      setLevelJustUpdated(level);
      setLevelFlash(true);
      setTimeout(() => setLevelFlash(false), 2000);
      setTimeout(() => setLevelJustUpdated(null), 5000);
    } catch {
      // best-effort
    }
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMessage: Message = { role: 'user', content: text };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    // Add placeholder for assistant reply
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) throw new Error('Request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        // Check for level update tag
        const match = accumulated.match(LEVEL_UPDATE_RE);
        if (match) {
          const newLevel = match[1].toUpperCase();
          if (CEFR_LEVELS.includes(newLevel as typeof CEFR_LEVELS[number])) {
            saveLevel(newLevel);
          }
        }

        // Strip the tag from the displayed text
        const displayText = accumulated.replace(LEVEL_UPDATE_RE, '').trimEnd();
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: displayText };
          return updated;
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        };
        return updated;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  }, [input, messages, streaming, saveLevel]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Taal</p>
            <p className="text-xs text-gray-400">Dutch language tutor</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentLevel ? (
            <div className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1 transition-all duration-500',
              levelFlash
                ? 'border-green-300 bg-green-50 scale-110'
                : 'border-gray-200 bg-gray-50'
            )}>
              {levelFlash && <Sparkles className="h-3 w-3 text-green-500" />}
              <Badge level={currentLevel} />
              <span className="text-xs text-gray-500">current level</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400 rounded-full border border-dashed border-gray-300 px-3 py-1">
              Level not set
            </span>
          )}
        </div>
      </div>

      {/* Level updated banner */}
      {levelJustUpdated && (
        <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-2.5 text-sm text-green-800 animate-in slide-in-from-top-2">
          <Sparkles className="h-4 w-4 text-green-500 shrink-0" />
          <span>
            Your level has been updated to <strong>{levelJustUpdated}</strong> based on this conversation!
          </span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Start a conversation</p>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">
                Taal will chat with you in Dutch and adjust your level automatically as you go.
              </p>
            </div>
            <button
              onClick={() => {
                setInput('Hallo! Ik wil mijn Nederlands verbeteren.');
                inputRef.current?.focus();
              }}
              className="mt-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Hallo! Ik wil mijn Nederlands verbeteren. →
            </button>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            {msg.role === 'assistant' && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 mt-1">
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
              )}
            >
              {msg.content}
              {/* Typing cursor for the last assistant message while streaming */}
              {streaming && i === messages.length - 1 && msg.role === 'assistant' && (
                <span className="inline-block w-0.5 h-3.5 bg-gray-400 ml-0.5 animate-pulse align-middle" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-3 rounded-b-2xl">
        <div className="flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type in Dutch or English…"
            rows={1}
            disabled={streaming}
            className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none transition-colors disabled:opacity-50 max-h-32"
            style={{ height: 'auto' }}
            onInput={e => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || streaming}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1.5 text-center text-xs text-gray-400">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
