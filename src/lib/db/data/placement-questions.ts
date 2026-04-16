export interface PlacementQuestion {
  id: number;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  type: 'vocabulary' | 'grammar' | 'reading';
  prompt: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3; // index of correct option
  explanation: string;
}

export const placementQuestions: PlacementQuestion[] = [
  // ── A1 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 1, level: 'A1', type: 'vocabulary',
    prompt: 'What does "huis" mean?',
    options: ['dog', 'house', 'car', 'tree'],
    answer: 1,
    explanation: '"Huis" means house — a very basic A1 word.',
  },
  {
    id: 2, level: 'A1', type: 'grammar',
    prompt: 'Choose the correct sentence: "I am tired."',
    options: ['Ik ben moe.', 'Ik zijn moe.', 'Ik hebt moe.', 'Ik ben moes.'],
    answer: 0,
    explanation: 'With "ik" (I), the verb "zijn" (to be) becomes "ben" — Ik ben moe.',
  },
  {
    id: 3, level: 'A1', type: 'vocabulary',
    prompt: 'Which word means "to eat"?',
    options: ['drinken', 'slapen', 'eten', 'lopen'],
    answer: 2,
    explanation: '"Eten" means to eat. "Drinken" = drink, "slapen" = sleep, "lopen" = walk.',
  },
  {
    id: 4, level: 'A1', type: 'grammar',
    prompt: 'What is the plural of "hond" (dog)?',
    options: ['honds', 'honden', 'hondes', 'hondjes'],
    answer: 1,
    explanation: '"Hond" → "honden" with the standard -en plural. "Hondjes" is a diminutive form.',
  },
  {
    id: 5, level: 'A1', type: 'reading',
    prompt: '"De kat zit op de tafel." What is sitting on the table?',
    options: ['The dog', 'The child', 'The cat', 'The bird'],
    answer: 2,
    explanation: '"De kat" means the cat. "Zit op de tafel" means sits on the table.',
  },

  // ── A2 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 6, level: 'A2', type: 'vocabulary',
    prompt: 'What does "afspraak" mean?',
    options: ['breakfast', 'appointment', 'receipt', 'gift'],
    answer: 1,
    explanation: '"Afspraak" means appointment or agreement.',
  },
  {
    id: 7, level: 'A2', type: 'grammar',
    prompt: 'Complete: "Gisteren ___ ik naar het park gegaan." (Yesterday I went to the park.)',
    options: ['ben', 'heb', 'zijn', 'heeft'],
    answer: 0,
    explanation: '"Gaan" (to go) takes "zijn" as auxiliary. With "ik", that is "ben" — "ben gegaan".',
  },
  {
    id: 8, level: 'A2', type: 'vocabulary',
    prompt: 'Which sentence uses "goedkoop" correctly?',
    options: [
      'De trein is goedkoop laat.',
      'Die schoenen zijn heel goedkoop.',
      'Hij goedkoopt de winkel.',
      'Goedkoop, hij loopt snel.',
    ],
    answer: 1,
    explanation: '"Goedkoop" is an adjective meaning cheap. "Die schoenen zijn heel goedkoop" = Those shoes are very cheap.',
  },
  {
    id: 9, level: 'A2', type: 'grammar',
    prompt: 'Where does the separable verb prefix go in a main clause? "opstaan" (to get up): "Ik ___ vroeg ___."',
    options: ['sta...op', 'op...sta', 'staat...op', 'opsta...'],
    answer: 0,
    explanation: 'In a main clause, the prefix moves to the end: "Ik sta vroeg op."',
  },
  {
    id: 10, level: 'A2', type: 'reading',
    prompt: '"Ze gaat elke zaterdag naar de markt om boodschappen te doen." How often does she go to the market?',
    options: ['Every day', 'Every Sunday', 'Every Saturday', 'Twice a week'],
    answer: 2,
    explanation: '"Elke zaterdag" means every Saturday. "Boodschappen doen" means to do the shopping.',
  },

  // ── B1 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 11, level: 'B1', type: 'vocabulary',
    prompt: 'What does "bijdragen aan" mean?',
    options: ['to look at', 'to contribute to', 'to complain about', 'to run away from'],
    answer: 1,
    explanation: '"Bijdragen aan" means to contribute to.',
  },
  {
    id: 12, level: 'B1', type: 'grammar',
    prompt: 'Choose the correct word order: "Yesterday I ate a pizza." (fronted time adverb)',
    options: [
      'Gisteren ik at een pizza.',
      'Gisteren at ik een pizza.',
      'Ik at gisteren een pizza aan.',
      'Gisteren een pizza at ik.',
    ],
    answer: 1,
    explanation: 'Dutch V2 rule: when a time adverb is fronted, the verb (at) comes second, then the subject (ik). "Gisteren at ik een pizza."',
  },
  {
    id: 13, level: 'B1', type: 'vocabulary',
    prompt: 'Which word means "although"?',
    options: ['omdat', 'want', 'hoewel', 'tenzij'],
    answer: 2,
    explanation: '"Hoewel" means although. "Omdat" = because, "want" = for/because, "tenzij" = unless.',
  },
  {
    id: 14, level: 'B1', type: 'grammar',
    prompt: '"Ze belt haar moeder ___." Which separable verb (opbellen) is used correctly?',
    options: ['Ze belt op haar moeder.', 'Ze op belt haar moeder.', 'Ze belt haar moeder op.', 'Ze opbelt haar moeder.'],
    answer: 2,
    explanation: '"Opbellen" (to call): prefix "op" goes to the end — "Ze belt haar moeder op."',
  },
  {
    id: 15, level: 'B1', type: 'reading',
    prompt: '"Ondanks de regen besloot hij toch te gaan fietsen." Why is this surprising?',
    options: [
      'He usually hates cycling.',
      'He decided to cycle despite the rain.',
      'He forgot his raincoat.',
      'He cannot cycle in summer.',
    ],
    answer: 1,
    explanation: '"Ondanks de regen" means despite the rain. "Toch" adds the sense of "still" or "nevertheless".',
  },

  // ── B2 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 16, level: 'B2', type: 'vocabulary',
    prompt: 'What does "klaarblijkelijk" mean?',
    options: ['barely', 'apparently / obviously', 'gradually', 'consequently'],
    answer: 1,
    explanation: '"Klaarblijkelijk" means apparently or obviously. Often used when something is evident from context.',
  },
  {
    id: 17, level: 'B2', type: 'grammar',
    prompt: 'Which passive sentence is correctly formed?',
    options: [
      'De brief door hem wordt verstuurd.',
      'De brief is verstuurd wordt door hem.',
      'De brief wordt verstuurd door hem.',
      'Door hem de brief verstuurd wordt.',
    ],
    answer: 2,
    explanation: 'Present passive: worden + past participle + (optionally) "door + agent". "De brief wordt verstuurd door hem."',
  },
  {
    id: 18, level: 'B2', type: 'vocabulary',
    prompt: 'Choose the most appropriate word: "The new policy has ___ consequences for education."',
    options: ['goedkoop', 'vergaande', 'vroeg', 'zachtjes'],
    answer: 1,
    explanation: '"Vergaande" means far-reaching. "Vergaande gevolgen" = far-reaching consequences.',
  },
  {
    id: 19, level: 'B2', type: 'grammar',
    prompt: '"Als ik meer geld had, ___ ik reizen." (If I had more money, I would travel.)',
    options: ['zal', 'zou', 'heb', 'was'],
    answer: 1,
    explanation: '"Zou" is the conditional form of "zullen". Used for hypothetical statements: "zou reizen" = would travel.',
  },
  {
    id: 20, level: 'B2', type: 'reading',
    prompt: '"Enerzijds biedt de technologie kansen, anderzijds brengt ze risico\'s met zich mee." What structure is being used?',
    options: [
      'A cause and effect structure',
      'A before and after comparison',
      'An on-the-one-hand / on-the-other-hand contrast',
      'A list of three examples',
    ],
    answer: 2,
    explanation: '"Enerzijds...anderzijds" means "on the one hand...on the other hand" — a typical B2 contrast structure.',
  },

  // ── C1 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 21, level: 'C1', type: 'vocabulary',
    prompt: 'What does "berusting" most closely mean?',
    options: ['enthusiasm', 'resignation / acceptance', 'clarity', 'indignation'],
    answer: 1,
    explanation: '"Berusting" is a feeling of calm resignation or acceptance of something unavoidable.',
  },
  {
    id: 22, level: 'C1', type: 'grammar',
    prompt: 'Which form correctly nominalises the adjective "eerlijk" (honest)?',
    options: ['eerlijking', 'eerlijkheid', 'het eerlijken', 'eerlijknis'],
    answer: 1,
    explanation: 'Adjectives → nouns with suffix "-heid": eerlijk → eerlijkheid (honesty).',
  },
  {
    id: 23, level: 'C1', type: 'vocabulary',
    prompt: '"Zijn betoog was ___, maar ik bleef mijn eigen mening trouw." Which word fits best?',
    options: ['lacuneus', 'overtuigend', 'vluchtig', 'goedkoop'],
    answer: 1,
    explanation: '"Overtuigend" means convincing. The speaker acknowledges the argument was convincing but didn\'t change their mind.',
  },
  {
    id: 24, level: 'C1', type: 'grammar',
    prompt: 'What is the correct use of "derhalve" in a sentence?',
    options: [
      'Ze sprong derhalve het zwembad in.',
      'De wet is gewijzigd; derhalve zijn nieuwe procedures noodzakelijk.',
      'Hij liep derhalve en zong daarna.',
      'Derhalve is een gewone jongen.',
    ],
    answer: 1,
    explanation: '"Derhalve" is a formal adverb meaning "therefore / hence", used to connect a logical conclusion.',
  },
  {
    id: 25, level: 'C1', type: 'reading',
    prompt: '"Tot mijn verbijstering zweeg hij. Zijn ogenschijnlijke kalmte versluierde slechts de storm die binnenin raasde." What does this suggest?',
    options: [
      'He was genuinely calm about the situation.',
      'He had forgotten how to speak.',
      'His outer calm hid inner turmoil.',
      'He was angry at the speaker.',
    ],
    answer: 2,
    explanation: '"Versluieren" = to veil. His apparent ("ogenschijnlijke") calm was a mask for inner storms — inner conflict hidden behind exterior composure.',
  },

  // ── C2 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 26, level: 'C2', type: 'vocabulary',
    prompt: 'What is a "litotes"?',
    options: [
      'A figure of speech using extreme exaggeration',
      'An understatement using negation of the opposite',
      'A repetition of the same word at the start of lines',
      'A substitution of a related concept for the original',
    ],
    answer: 1,
    explanation: '"Litotes" is an understatement using negation of the opposite, e.g. "niet onaantrekkelijk" (not unattractive = quite attractive).',
  },
  {
    id: 27, level: 'C2', type: 'grammar',
    prompt: 'Which formal connective correctly introduces a logical conclusion in legal/academic Dutch?',
    options: ['want', 'mitsdien', 'ook al', 'zoals'],
    answer: 1,
    explanation: '"Mitsdien" is a formal/legal Dutch adverb meaning "therefore / consequently". Standard in legal documents and formal writing.',
  },
  {
    id: 28, level: 'C2', type: 'vocabulary',
    prompt: '"De historicus beschreef hoe de taal een ___ van vroegere betekenissen draagt." Which word fits the metaphor of layered meanings written over older ones?',
    options: ['synecdoche', 'palimpsest', 'catachrese', 'zeugma'],
    answer: 1,
    explanation: 'A "palimpsest" is a manuscript page where older writing is partially visible beneath newer writing — a metaphor for layered meanings.',
  },
  {
    id: 29, level: 'C2', type: 'grammar',
    prompt: 'Which sentence correctly uses "doch" (but/yet — archaic/formal)?',
    options: [
      'Doch hij de waarheid wist.',
      'Hij wist de waarheid, doch zweeg.',
      'Ze doch liep naar huis.',
      'Doch en hij was blij.',
    ],
    answer: 1,
    explanation: '"Doch" is an archaic/formal adversative conjunction meaning "but/yet", placed between two clauses: "Hij wist het, doch zweeg." = He knew, yet was silent.',
  },
  {
    id: 30, level: 'C2', type: 'reading',
    prompt: '"Onverminderd de vergankelijkheid der dingen, behoudt waarachtigheid haar onaantastbaarheid." What is the main claim?',
    options: [
      'Things are impermanent, and truth changes with them.',
      'Despite the transience of things, truthfulness retains its inviolability.',
      'Truth is only relevant to things that last.',
      'Impermanence makes truthfulness less important.',
    ],
    answer: 1,
    explanation: '"Onverminderd" = notwithstanding/despite. "Vergankelijkheid" = transience. "Onaantastbaarheid" = inviolability. The sentence argues truth remains inviolable despite everything being transient.',
  },
];
