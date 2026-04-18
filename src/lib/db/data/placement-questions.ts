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
    options: ['dog', 'car', 'tree', 'house'],
    answer: 3,
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
    options: ['honden', 'honds', 'hondes', 'hondjes'],
    answer: 0,
    explanation: '"Hond" → "honden" with the standard -en plural. "Hondjes" is a diminutive form.',
  },
  {
    id: 5, level: 'A1', type: 'reading',
    prompt: '"De kat zit op de tafel." What is sitting on the table?',
    options: ['The dog', 'The cat', 'The child', 'The bird'],
    answer: 1,
    explanation: '"De kat" means the cat. "Zit op de tafel" means sits on the table.',
  },

  // ── A2 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 6, level: 'A2', type: 'vocabulary',
    prompt: 'What does "afspraak" mean?',
    options: ['appointment', 'breakfast', 'receipt', 'gift'],
    answer: 0,
    explanation: '"Afspraak" means appointment or agreement.',
  },
  {
    id: 7, level: 'A2', type: 'grammar',
    prompt: 'Complete: "Gisteren ___ ik naar het park gegaan." (Yesterday I went to the park.)',
    options: ['heb', 'zijn', 'heeft', 'ben'],
    answer: 3,
    explanation: '"Gaan" (to go) takes "zijn" as auxiliary. With "ik", that is "ben" — "ben gegaan".',
  },
  {
    id: 8, level: 'A2', type: 'vocabulary',
    prompt: 'Which sentence uses "goedkoop" correctly?',
    options: [
      'De trein is goedkoop laat.',
      'Hij goedkoopt de winkel.',
      'Die schoenen zijn heel goedkoop.',
      'Goedkoop, hij loopt snel.',
    ],
    answer: 2,
    explanation: '"Goedkoop" is an adjective meaning cheap. "Die schoenen zijn heel goedkoop" = Those shoes are very cheap.',
  },
  {
    id: 9, level: 'A2', type: 'grammar',
    prompt: 'Where does the separable verb prefix go in a main clause? "opstaan" (to get up): "Ik ___ vroeg ___."',
    options: ['op...sta', 'sta...op', 'staat...op', 'opsta...'],
    answer: 1,
    explanation: 'In a main clause, the prefix moves to the end: "Ik sta vroeg op."',
  },
  {
    id: 10, level: 'A2', type: 'reading',
    prompt: '"Ze gaat elke zaterdag naar de markt om boodschappen te doen." How often does she go to the market?',
    options: ['Every day', 'Every Saturday', 'Every Sunday', 'Twice a week'],
    answer: 1,
    explanation: '"Elke zaterdag" means every Saturday. "Boodschappen doen" means to do the shopping.',
  },

  // ── B1 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 11, level: 'B1', type: 'vocabulary',
    prompt: 'What does "bijdragen aan" mean?',
    options: ['to look at', 'to complain about', 'to contribute to', 'to run away from'],
    answer: 2,
    explanation: '"Bijdragen aan" means to contribute to.',
  },
  {
    id: 12, level: 'B1', type: 'grammar',
    prompt: 'Choose the correct word order: "Yesterday I ate a pizza." (fronted time adverb)',
    options: [
      'Gisteren ik at een pizza.',
      'Ik at gisteren een pizza aan.',
      'Gisteren een pizza at ik.',
      'Gisteren at ik een pizza.',
    ],
    answer: 3,
    explanation: 'Dutch V2 rule: when a time adverb is fronted, the verb (at) comes second, then the subject (ik). "Gisteren at ik een pizza."',
  },
  {
    id: 13, level: 'B1', type: 'vocabulary',
    prompt: 'Which word means "although"?',
    options: ['omdat', 'hoewel', 'want', 'tenzij'],
    answer: 1,
    explanation: '"Hoewel" means although. "Omdat" = because, "want" = for/because, "tenzij" = unless.',
  },
  {
    id: 14, level: 'B1', type: 'grammar',
    prompt: '"Ze belt haar moeder ___." Which separable verb (opbellen) is used correctly?',
    options: [
      'Ze belt op haar moeder.',
      'Ze op belt haar moeder.',
      'Ze opbelt haar moeder.',
      'Ze belt haar moeder op.',
    ],
    answer: 3,
    explanation: '"Opbellen" (to call): prefix "op" goes to the end — "Ze belt haar moeder op."',
  },
  {
    id: 15, level: 'B1', type: 'reading',
    prompt: '"Ondanks de regen besloot hij toch te gaan fietsen." Why is this surprising?',
    options: [
      'He decided to cycle despite the rain.',
      'He usually hates cycling.',
      'He forgot his raincoat.',
      'He cannot cycle in summer.',
    ],
    answer: 0,
    explanation: '"Ondanks de regen" means despite the rain. "Toch" adds the sense of "still" or "nevertheless".',
  },

  // ── B2 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 16, level: 'B2', type: 'vocabulary',
    prompt: 'What does "klaarblijkelijk" mean?',
    options: ['barely', 'gradually', 'apparently / obviously', 'consequently'],
    answer: 2,
    explanation: '"Klaarblijkelijk" means apparently or obviously. Often used when something is evident from context.',
  },
  {
    id: 17, level: 'B2', type: 'grammar',
    prompt: 'Which passive sentence is correctly formed?',
    options: [
      'De brief door hem wordt verstuurd.',
      'De brief wordt verstuurd door hem.',
      'De brief is verstuurd wordt door hem.',
      'Door hem de brief verstuurd wordt.',
    ],
    answer: 1,
    explanation: 'Present passive: worden + past participle + (optionally) "door + agent". "De brief wordt verstuurd door hem."',
  },
  {
    id: 18, level: 'B2', type: 'vocabulary',
    prompt: 'Choose the most appropriate word: "The new policy has ___ consequences for education."',
    options: ['goedkoop', 'vroeg', 'vergaande', 'zachtjes'],
    answer: 2,
    explanation: '"Vergaande" means far-reaching. "Vergaande gevolgen" = far-reaching consequences.',
  },
  {
    id: 19, level: 'B2', type: 'grammar',
    prompt: '"Als ik meer geld had, ___ ik reizen." (If I had more money, I would travel.)',
    options: ['zal', 'heb', 'zou', 'was'],
    answer: 2,
    explanation: '"Zou" is the conditional form of "zullen". Used for hypothetical statements: "zou reizen" = would travel.',
  },
  {
    id: 20, level: 'B2', type: 'reading',
    prompt: '"Enerzijds biedt de technologie kansen, anderzijds brengt ze risico\'s met zich mee." What structure is being used?',
    options: [
      'A cause and effect structure',
      'An on-the-one-hand / on-the-other-hand contrast',
      'A before and after comparison',
      'A list of three examples',
    ],
    answer: 1,
    explanation: '"Enerzijds...anderzijds" means "on the one hand...on the other hand" — a typical B2 contrast structure.',
  },

  // ── C1 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 21, level: 'C1', type: 'vocabulary',
    prompt: 'What does "berusting" most closely mean?',
    options: ['enthusiasm', 'clarity', 'indignation', 'resignation / acceptance'],
    answer: 3,
    explanation: '"Berusting" is a feeling of calm resignation or acceptance of something unavoidable.',
  },
  {
    id: 22, level: 'C1', type: 'grammar',
    prompt: 'Which form correctly nominalises the adjective "eerlijk" (honest)?',
    options: ['eerlijking', 'het eerlijken', 'eerlijkheid', 'eerlijknis'],
    answer: 2,
    explanation: 'Adjectives → nouns with suffix "-heid": eerlijk → eerlijkheid (honesty).',
  },
  {
    id: 23, level: 'C1', type: 'vocabulary',
    prompt: '"Zijn betoog was ___, maar ik bleef mijn eigen mening trouw." Which word fits best?',
    options: ['lacuneus', 'vluchtig', 'goedkoop', 'overtuigend'],
    answer: 3,
    explanation: '"Overtuigend" means convincing. The speaker acknowledges the argument was convincing but didn\'t change their mind.',
  },
  {
    id: 24, level: 'C1', type: 'grammar',
    prompt: 'What is the correct use of "derhalve" in a sentence?',
    options: [
      'De wet is gewijzigd; derhalve zijn nieuwe procedures noodzakelijk.',
      'Ze sprong derhalve het zwembad in.',
      'Hij liep derhalve en zong daarna.',
      'Derhalve is een gewone jongen.',
    ],
    answer: 0,
    explanation: '"Derhalve" is a formal adverb meaning "therefore / hence", used to connect a logical conclusion.',
  },
  {
    id: 25, level: 'C1', type: 'reading',
    prompt: '"Tot mijn verbijstering zweeg hij. Zijn ogenschijnlijke kalmte versluierde slechts de storm die binnenin raasde." What does this suggest?',
    options: [
      'He was genuinely calm about the situation.',
      'His outer calm hid inner turmoil.',
      'He had forgotten how to speak.',
      'He was angry at the speaker.',
    ],
    answer: 1,
    explanation: '"Versluieren" = to veil. His apparent ("ogenschijnlijke") calm was a mask for inner storms — inner conflict hidden behind exterior composure.',
  },

  // ── C2 (5 questions) ────────────────────────────────────────────────────────
  {
    id: 26, level: 'C2', type: 'vocabulary',
    prompt: 'What is a "litotes"?',
    options: [
      'A figure of speech using extreme exaggeration',
      'A repetition of the same word at the start of lines',
      'An understatement using negation of the opposite',
      'A substitution of a related concept for the original',
    ],
    answer: 2,
    explanation: '"Litotes" is an understatement using negation of the opposite, e.g. "niet onaantrekkelijk" (not unattractive = quite attractive).',
  },
  {
    id: 27, level: 'C2', type: 'grammar',
    prompt: 'Which formal connective correctly introduces a logical conclusion in legal/academic Dutch?',
    options: ['want', 'ook al', 'zoals', 'mitsdien'],
    answer: 3,
    explanation: '"Mitsdien" is a formal/legal Dutch adverb meaning "therefore / consequently". Standard in legal documents and formal writing.',
  },
  {
    id: 28, level: 'C2', type: 'vocabulary',
    prompt: '"De historicus beschreef hoe de taal een ___ van vroegere betekenissen draagt." Which word fits the metaphor of layered meanings written over older ones?',
    options: ['palimpsest', 'synecdoche', 'catachrese', 'zeugma'],
    answer: 0,
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
      'Truth is only relevant to things that last.',
      'Impermanence makes truthfulness less important.',
      'Despite the transience of things, truthfulness retains its inviolability.',
    ],
    answer: 3,
    explanation: '"Onverminderd" = notwithstanding/despite. "Vergankelijkheid" = transience. "Onaantastbaarheid" = inviolability. The sentence argues truth remains inviolable despite everything being transient.',
  },
];
