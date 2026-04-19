import { type NextRequest, NextResponse } from 'next/server';
import { aliceInWonderland } from '@/lib/db/data/alice-wonderland';

// Find sentences in Alice in Wonderland containing the query word
export async function GET(request: NextRequest) {
  const word = request.nextUrl.searchParams.get('word')?.toLowerCase().trim();
  if (!word || word.length < 2) return NextResponse.json({ sentences: [] });

  const results: { sentence: string; chapter: string }[] = [];
  const wordRegex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\w*`, 'i');

  for (const chapter of aliceInWonderland.chapters) {
    for (const paragraph of chapter.paragraphs) {
      // Split paragraph into sentences (roughly)
      const sentences = paragraph
        .split(/(?<=[.!?])\s+/)
        .filter(s => s.length > 10 && s.length < 250);

      for (const sentence of sentences) {
        if (wordRegex.test(sentence)) {
          results.push({ sentence: sentence.trim(), chapter: chapter.title });
          if (results.length >= 2) break;
        }
      }
      if (results.length >= 2) break;
    }
    if (results.length >= 2) break;
  }

  return NextResponse.json({ sentences: results });
}
