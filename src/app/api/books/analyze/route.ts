import { type NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// MyMemory free translation API — no key required
async function translateMyMemory(text: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=nl|en`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`MyMemory ${res.status}`);
  const data = await res.json() as {
    responseStatus: number;
    responseData: { translatedText: string };
  };
  if (data.responseStatus !== 200) throw new Error('Translation failed');
  return data.responseData.translatedText;
}

function isSingleWord(text: string) {
  return text.trim().split(/\s+/).length === 1;
}

// Normalise Dutch word: strip punctuation, lower-case
function normalise(w: string) {
  return w.replace(/[.,!?;:'"()\[\]{}«»„"‚']+/g, '').toLowerCase().trim();
}

interface DbWord {
  word: string;
  translation: string;
  part_of_speech: string;
  cefr_level: string;
  category: string;
  example_sentence: string | null;
  example_translation: string | null;
}

interface DbGrammarTopic {
  title: string;
  slug: string;
  cefr_level: string;
  summary: string;
}

// POS-to-grammar-keyword mapping to find relevant topics
const POS_GRAMMAR_KEYWORDS: Record<string, string[]> = {
  verb: ['verb', 'tense', 'conjugat', 'separable', 'modal', 'zijn', 'hebben', 'perfect', 'imperfect'],
  noun: ['noun', 'plural', 'de/het', 'article', 'gender'],
  adjective: ['adjective', 'inflect', 'compar', 'superlat'],
  adverb: ['adverb', 'word order'],
  preposition: ['preposition'],
  pronoun: ['pronoun', 'personal'],
};

function findGrammarTopics(pos: string | null, word: string): DbGrammarTopic[] {
  const db = getDb();
  const keywords = pos ? (POS_GRAMMAR_KEYWORDS[pos.toLowerCase()] ?? []) : [];

  // Also search by the word itself in grammar bodies
  const wordClean = normalise(word);

  if (keywords.length === 0 && wordClean.length < 3) return [];

  // Build a LIKE query across title + summary
  const likeTerms = [...keywords, wordClean];
  const conditions = likeTerms
    .map(() => "(LOWER(title) LIKE ? OR LOWER(summary) LIKE ?)")
    .join(' OR ');
  const params = likeTerms.flatMap(t => [`%${t}%`, `%${t}%`]);

  const rows = db
    .prepare(
      `SELECT title, slug, cefr_level, summary FROM grammar_topics WHERE ${conditions} ORDER BY sort_order LIMIT 3`
    )
    .all(...params) as DbGrammarTopic[];

  return rows;
}

export async function POST(request: NextRequest) {
  let selectedText: string;

  try {
    const body = await request.json();
    selectedText = (body.selectedText ?? '').trim();
    if (!selectedText) throw new Error('selectedText required');
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const db = getDb();
  const normWord = normalise(selectedText);
  const single = isSingleWord(selectedText);

  // 1. Translate via MyMemory
  let translation = '';
  let translationError = false;
  try {
    translation = await translateMyMemory(selectedText);
    // MyMemory sometimes returns the same text if it fails quietly
    if (translation.toLowerCase() === selectedText.toLowerCase()) {
      translationError = true;
    }
  } catch {
    translationError = true;
  }

  // 2. DB vocabulary lookup (single word only)
  let dbWord: DbWord | null = null;
  if (single) {
    dbWord = (db
      .prepare(
        `SELECT word, translation, part_of_speech, cefr_level, category, example_sentence, example_translation
         FROM words WHERE LOWER(word) = ? AND language = 'nl' LIMIT 1`
      )
      .get(normWord) as DbWord | undefined) ?? null;

    // Try prefix match if exact fails
    if (!dbWord) {
      dbWord = (db
        .prepare(
          `SELECT word, translation, part_of_speech, cefr_level, category, example_sentence, example_translation
           FROM words WHERE LOWER(word) LIKE ? AND language = 'nl' ORDER BY LENGTH(word) LIMIT 1`
        )
        .get(`${normWord}%`) as DbWord | undefined) ?? null;
    }
  }

  // Use DB translation when available (more precise than MT for known words)
  if (dbWord && !translationError) {
    // prefer DB but also show MT if they differ meaningfully
  } else if (dbWord) {
    translation = dbWord.translation;
    translationError = false;
  }

  // 3. Related grammar topics
  const grammarTopics = findGrammarTopics(dbWord?.part_of_speech ?? null, normWord);

  return NextResponse.json({
    selectedText,
    translation: translationError ? (dbWord?.translation ?? null) : translation,
    dbWord: dbWord
      ? {
          word: dbWord.word,
          translation: dbWord.translation,
          pos: dbWord.part_of_speech,
          level: dbWord.cefr_level,
          category: dbWord.category,
          example: dbWord.example_sentence,
          exampleTranslation: dbWord.example_translation,
        }
      : null,
    grammarTopics: grammarTopics.map(t => ({
      title: t.title,
      slug: t.slug,
      level: t.cefr_level,
      summary: t.summary,
    })),
  });
}
