export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

export const CEFR_DESCRIPTIONS: Record<CefrLevel, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Mastery',
};

export const LANGUAGES = [
  { code: 'nl', name: 'Dutch' },
  { code: 'de', name: 'German' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
] as const;

export const COMMUNITY_CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'grammar', label: 'Grammar' },
  { value: 'vocabulary', label: 'Vocabulary' },
  { value: 'culture', label: 'Culture' },
] as const;

export const PARTS_OF_SPEECH = [
  'noun', 'verb', 'adjective', 'adverb', 'phrase',
  'conjunction', 'preposition', 'pronoun', 'article', 'interjection',
] as const;
