import { NextResponse, type NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getDb } from '@/lib/db';

const client = new Anthropic();

function getUserLevel(userId: number): string {
  const db = getDb();
  const hasCol = (db.prepare('PRAGMA table_info(users)').all() as { name: string }[])
    .some(c => c.name === 'placement_level');
  if (!hasCol) return 'unknown';
  const row = db.prepare('SELECT placement_level FROM users WHERE id = ?').get(userId) as
    { placement_level: string | null } | undefined;
  return row?.placement_level ?? 'unknown';
}

function buildSystemPrompt(currentLevel: string): string {
  return `You are Taal, a friendly Dutch language tutor inside the Taaltje app. Your role is to chat with the learner and dynamically assess their Dutch proficiency level through natural conversation.

The user's current assessed level is: ${currentLevel === 'unknown' ? 'not yet determined' : currentLevel} (CEFR scale: A1=Beginner, A2=Elementary, B1=Intermediate, B2=Upper Intermediate, C1=Advanced, C2=Mastery).

Your goals:
1. Have a warm, encouraging conversation in Dutch (or about Dutch) calibrated to their level.
2. Naturally assess their true level by noticing:
   - Vocabulary range and accuracy in their Dutch responses
   - Grammar correctness and sentence complexity
   - How well they comprehend your Dutch text
   - Their confidence and fluency
3. After 3–5 meaningful exchanges where the user has responded in Dutch, form a confident estimate.
4. When confident, include the tag <level_update>X1</level_update> (e.g. <level_update>B1</level_update>) exactly once in your response, followed by a friendly one-sentence explanation of your assessment.

Guidelines:
- Open by warmly welcoming the user and asking them to write a few sentences in Dutch about themselves, their day, or why they're learning the language.
- Adjust the Dutch you use to their level — simple and slow for beginners, richer and faster for advanced learners.
- Gently correct mistakes and offer the right form naturally in your reply.
- Take your time — only emit <level_update> when you have solid evidence from multiple exchanges.
- You may update the level up or down from the current one if the evidence warrants it.
- Never emit <level_update> more than once per conversation.
- Keep responses concise and conversational (2–4 sentences typically).`;
}

export async function POST(request: NextRequest) {
  const userId = Number(request.headers.get('x-user-id'));
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
  }

  let messages: { role: 'user' | 'assistant'; content: string }[];
  try {
    const body = await request.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const currentLevel = getUserLevel(userId);
  const systemPrompt = buildSystemPrompt(currentLevel);

  try {
    const stream = client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages,
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
    console.error('[chat POST]', err);
    return NextResponse.json({ error: 'Failed to stream response' }, { status: 500 });
  }
}
