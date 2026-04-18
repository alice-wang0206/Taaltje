/**
 * Client for the GTB (Geïntegreerde Taalbank) Dutch vocabulary API
 * Base URL: https://gtb.ivdnt.org/iWDB
 * Documentation: https://gtb.ivdnt.org/iWDB
 */

export interface GtbEntry {
  lemma: string;
  partOfSpeech: string;
  definitions: string[];
  wordForms: string[];
  source: string;
}

/**
 * Look up a Dutch word in the GTB dictionary.
 * Returns null if the word is not found or the request fails.
 */
export async function lookupWord(word: string): Promise<GtbEntry | null> {
  const cleanWord = word.trim().toLowerCase();
  if (!cleanWord || cleanWord.length < 2) return null;

  try {
    const url = `https://gtb.ivdnt.org/iWDB/search?wf=${encodeURIComponent(cleanWord)}&beyond=true`;
    const response = await fetch(url, {
      headers: { Accept: 'application/xml, text/xml, */*' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return null;

    const xml = await response.text();
    return parseGtbXml(xml, cleanWord);
  } catch {
    return null;
  }
}

function parseGtbXml(xml: string, originalWord: string): GtbEntry | null {
  // Extract lemma (canonical form)
  const lemmaMatch = xml.match(/<lemma[^>]*>([^<]+)<\/lemma>/i) ||
    xml.match(/<modern_lemma[^>]*>([^<]+)<\/modern_lemma>/i);
  const lemma = lemmaMatch?.[1]?.trim() ?? originalWord;

  // Extract part of speech
  const posMatch = xml.match(/<wordclass[^>]*>([^<]+)<\/wordclass>/i) ||
    xml.match(/<part_of_speech[^>]*>([^<]+)<\/part_of_speech>/i) ||
    xml.match(/<pos[^>]*>([^<]+)<\/pos>/i);
  const partOfSpeech = posMatch?.[1]?.trim() ?? '';

  // Extract definitions
  const defMatches = [...xml.matchAll(/<definition[^>]*>([^<]+)<\/definition>/gi)];
  const definitions = defMatches
    .map(m => m[1]?.trim())
    .filter((d): d is string => !!d && d.length > 0)
    .slice(0, 3);

  // Extract word forms
  const formMatches = [...xml.matchAll(/<wordform[^>]*>([^<]+)<\/wordform>/gi)];
  const wordForms = formMatches
    .map(m => m[1]?.trim())
    .filter((f): f is string => !!f && f.length > 0)
    .slice(0, 5);

  // Extract source dictionary name
  const sourceMatch = xml.match(/<source[^>]*>([^<]+)<\/source>/i) ||
    xml.match(/<dictionary[^>]*>([^<]+)<\/dictionary>/i);
  const source = sourceMatch?.[1]?.trim() ?? 'GTB';

  // If we got nothing useful, return null
  if (!lemma && definitions.length === 0) return null;

  return { lemma, partOfSpeech, definitions, wordForms, source };
}

/**
 * Format GTB data into a concise string for inclusion in Claude prompts.
 */
export function formatGtbForPrompt(entry: GtbEntry): string {
  const parts: string[] = [`GTB Dictionary — "${entry.lemma}"`];
  if (entry.partOfSpeech) parts.push(`Part of speech: ${entry.partOfSpeech}`);
  if (entry.definitions.length > 0) {
    parts.push(`Definition(s): ${entry.definitions.join('; ')}`);
  }
  if (entry.wordForms.length > 0) {
    parts.push(`Word forms: ${entry.wordForms.join(', ')}`);
  }
  return parts.join('\n');
}
