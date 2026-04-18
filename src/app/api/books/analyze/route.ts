import { type NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { lookupWord, formatGtbForPrompt } from '@/lib/gtb';

const client = new Anthropic();

function isSingleWord(text: string): boolean {
  return text.trim().split(/\s+/).length === 1;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  let selectedText: string;
  let context: string;

  try {
    const body = await request.json();
    selectedText = (body.selectedText ?? '').trim();
    context = (body.context ?? '').trim();
    if (!selectedText) throw new Error('selectedText required');
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // For single words, try GTB lookup first (runs in parallel with stream setup)
  let gtbSection = '';
  if (isSingleWord(selectedText)) {
    const gtbEntry = await lookupWord(selectedText);
    if (gtbEntry) {
      gtbSection = `\n\nHere is data from the GTB (Geïntegreerde Taalbank) Dutch dictionary:\n${formatGtbForPrompt(gtbEntry)}`;
    }
  }

  const systemPrompt = `You are a Dutch language expert and reading assistant embedded in Taaltje, a language learning app. Your job is to help learners understand Dutch text from Alice in Wonderland.

When given a selected Dutch word or sentence, provide a clear, structured analysis in English with these sections:

**Translation**
Give the English translation. For a word: give the main meaning(s). For a sentence: give a natural English translation.

**Grammar Explanation**
Explain the key grammar point(s) in the selected text. Be specific:
- For verbs: mention tense, conjugation, auxiliary verb if any (zijn/hebben), separable verbs, etc.
- For nouns: mention de/het, plural form, case
- For adjectives: explain inflection
- For sentences: explain word order (V2 rule, subordinate clauses, etc.)
Keep this beginner-friendly but precise.

**Vocabulary Notes**
Point out any interesting or difficult words, idioms, or fixed expressions. Mention register (formal/informal/archaic) when relevant.

Keep your response concise and educational — aim for ~150 words total.${gtbSection}`;

  const userMessage = context
    ? `Selected text: "${selectedText}"\n\nSurrounding context: "${context.slice(0, 300)}"`
    : `Selected text: "${selectedText}"`;

  try {
    const stream = client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    console.error('[books/analyze POST]', err);
    return NextResponse.json({ error: 'Failed to analyze text' }, { status: 500 });
  }
}
