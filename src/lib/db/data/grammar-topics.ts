// New grammar topics to complement the inline topics in seed.ts.
// Slugs here must NOT overlap with the existing ones:
//   de-het-een, present-tense, plural-nouns, separable-verbs,
//   perfect-tense, word-order, passive-voice, subjunctive,
//   nominalization, stylistic-register

export interface GrammarTopicData {
  title: string;
  slug: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  summary: string;
  body: string;
  sort: number;
  examples: { s: string; t: string; n: string | null }[];
}

export const grammarTopics: GrammarTopicData[] = [

  // ═══════════════════════════════════════════════════════════════
  // A1
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Personal Pronouns',
    slug: 'personal-pronouns',
    level: 'A1',
    summary: 'Learn ik, jij, hij, zij, wij, jullie, zij — subject and object forms.',
    body: `<h2>Personal Pronouns (Persoonlijke Voornaamwoorden)</h2>
<p>Dutch personal pronouns have both a <strong>subject form</strong> (used as the doer of an action) and an <strong>object form</strong> (used as the receiver).</p>
<table><thead><tr><th>Subject</th><th>Stressed</th><th>Object</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>ik</td><td>ik</td><td>mij / me</td><td>I / me</td></tr>
<tr><td>jij / je</td><td>jij</td><td>jou / je</td><td>you (sg.)</td></tr>
<tr><td>hij</td><td>hij</td><td>hem</td><td>he / him</td></tr>
<tr><td>zij / ze</td><td>zij</td><td>haar</td><td>she / her</td></tr>
<tr><td>het</td><td>het</td><td>het</td><td>it</td></tr>
<tr><td>wij / we</td><td>wij</td><td>ons</td><td>we / us</td></tr>
<tr><td>jullie</td><td>jullie</td><td>jullie</td><td>you (pl.)</td></tr>
<tr><td>zij / ze</td><td>zij</td><td>hen / ze</td><td>they / them</td></tr>
<tr><td>u</td><td>u</td><td>u</td><td>you (formal)</td></tr>
</tbody></table>
<h3>Reduced forms</h3>
<p>In casual speech, <em>ik → 'k</em>, <em>jij → je</em>, <em>wij → we</em>, <em>zij → ze</em>. Stressed forms are used for contrast or emphasis.</p>`,
    sort: 3,
    examples: [
      { s: 'Ik zie hem elke dag.', t: 'I see him every day.', n: 'ik = subject, hem = object' },
      { s: 'Zij helpt ons graag.', t: 'She helps us gladly.', n: 'zij = subject, ons = object' },
      { s: 'Jij doet het, niet hij!', t: 'You are doing it, not him!', n: 'stressed forms for contrast' },
    ],
  },

  {
    title: 'Negation: niet and geen',
    slug: 'negation',
    level: 'A1',
    summary: 'Use niet to negate verbs and adjectives; gebruik geen to negate nouns.',
    body: `<h2>Negation (Ontkenning)</h2>
<p>Dutch has two main negation words: <strong>niet</strong> and <strong>geen</strong>.</p>
<h3>Geen</h3>
<p>Use <em>geen</em> to negate a noun that would otherwise take <em>een</em> or no article.</p>
<p><em>Ik heb een auto.</em> → <em>Ik heb geen auto.</em></p>
<h3>Niet</h3>
<p>Use <em>niet</em> for everything else: verbs, adjectives, adverbs, and definite noun phrases.</p>
<p>Position: <em>niet</em> goes <strong>before</strong> adjectives and predicate phrases, and <strong>at the end</strong> of a simple sentence.</p>
<ul>
<li>Before an adjective: <em>Het is niet mooi.</em></li>
<li>Before a prepositional phrase: <em>Ik ga niet naar school.</em></li>
<li>End of sentence: <em>Ik slaap niet.</em></li>
</ul>`,
    sort: 4,
    examples: [
      { s: 'Ik heb geen tijd.', t: 'I have no time.', n: 'geen negates noun without definite article' },
      { s: 'Hij komt niet vandaag.', t: 'He is not coming today.', n: 'niet negates the verb phrase' },
      { s: 'De film is niet interessant.', t: 'The film is not interesting.', n: 'niet before predicate adjective' },
    ],
  },

  {
    title: 'Forming Questions',
    slug: 'question-formation',
    level: 'A1',
    summary: 'Form yes/no questions by inverting subject and verb, and use question words.',
    body: `<h2>Forming Questions (Vragen Stellen)</h2>
<h3>Yes/No Questions</h3>
<p>Invert the subject and the finite verb. The subject follows the verb immediately.</p>
<p><em>Jij werkt hier.</em> → <em>Werk jij hier?</em></p>
<p><strong>Note:</strong> when <em>jij/je</em> comes after the verb, the <em>-t</em> is dropped: <em>werk je?</em> not <em>werkt je?</em></p>
<h3>Question Words (Vraagwoorden)</h3>
<table><thead><tr><th>Dutch</th><th>English</th></tr></thead>
<tbody>
<tr><td>wie</td><td>who</td></tr>
<tr><td>wat</td><td>what</td></tr>
<tr><td>waar</td><td>where</td></tr>
<tr><td>wanneer</td><td>when</td></tr>
<tr><td>waarom</td><td>why</td></tr>
<tr><td>hoe</td><td>how</td></tr>
<tr><td>welk(e)</td><td>which</td></tr>
<tr><td>hoeveel</td><td>how many/much</td></tr>
</tbody></table>
<p>Question-word questions also invert: <em>Waar woont hij?</em></p>`,
    sort: 5,
    examples: [
      { s: 'Spreek je Nederlands?', t: 'Do you speak Dutch?', n: 'inversion; -t dropped after je' },
      { s: 'Waar is de supermarkt?', t: 'Where is the supermarket?', n: 'question word + inversion' },
      { s: 'Hoe heet jij?', t: 'What is your name?', n: 'hoe + verb + subject' },
    ],
  },

  {
    title: 'Possessive Pronouns',
    slug: 'possessive-pronouns',
    level: 'A1',
    summary: 'Express ownership with mijn, jouw, zijn, haar, ons/onze, jullie, hun.',
    body: `<h2>Possessive Pronouns (Bezittelijke Voornaamwoorden)</h2>
<table><thead><tr><th>Person</th><th>Possessive</th><th>Stressed</th></tr></thead>
<tbody>
<tr><td>I</td><td>mijn / m'n</td><td>mijn</td></tr>
<tr><td>you (sg.)</td><td>jouw / je</td><td>jouw</td></tr>
<tr><td>he</td><td>zijn / z'n</td><td>zijn</td></tr>
<tr><td>she</td><td>haar / d'r</td><td>haar</td></tr>
<tr><td>we</td><td>ons (het-noun) / onze (de-noun)</td><td>ons / onze</td></tr>
<tr><td>you (pl.)</td><td>jullie</td><td>jullie</td></tr>
<tr><td>they</td><td>hun / ze</td><td>hun</td></tr>
<tr><td>you (formal)</td><td>uw</td><td>uw</td></tr>
</tbody></table>
<h3>Ons vs Onze</h3>
<p>Use <em>ons</em> before het-nouns and <em>onze</em> before de-nouns: <em>ons huis</em>, <em>onze auto</em>.</p>`,
    sort: 6,
    examples: [
      { s: 'Dit is mijn boek.', t: 'This is my book.', n: 'mijn = my' },
      { s: 'Haar vader werkt in Rotterdam.', t: 'Her father works in Rotterdam.', n: 'haar = her' },
      { s: 'Ons huis is groot; onze tuin is klein.', t: 'Our house is big; our garden is small.', n: 'ons + het, onze + de' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // A2
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Modal Verbs',
    slug: 'modal-verbs',
    level: 'A2',
    summary: 'Use kunnen, mogen, moeten, willen, zullen and hoeven to express ability, permission and obligation.',
    body: `<h2>Modal Verbs (Modale Werkwoorden)</h2>
<p>Modal verbs combine with an infinitive at the end of the clause.</p>
<table><thead><tr><th>Verb</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td>kunnen</td><td>can / to be able to</td><td>Ik kan zwemmen.</td></tr>
<tr><td>mogen</td><td>may / to be allowed to</td><td>Mag ik binnenkomen?</td></tr>
<tr><td>moeten</td><td>must / to have to</td><td>Je moet werken.</td></tr>
<tr><td>willen</td><td>to want to</td><td>Ze wil studeren.</td></tr>
<tr><td>zullen</td><td>shall / will (future/promise)</td><td>Ik zal het doen.</td></tr>
<tr><td>hoeven (+ niet/geen)</td><td>not need to</td><td>Je hoeft niet te betalen.</td></tr>
</tbody></table>
<h3>Word order</h3>
<p>The modal is the finite (conjugated) verb in position 2; the dependent infinitive goes to the <strong>end</strong>.</p>
<p><em>Ik kan morgen niet komen.</em> (I cannot come tomorrow.)</p>`,
    sort: 3,
    examples: [
      { s: 'Kun jij me helpen?', t: 'Can you help me?', n: 'kunnen + infinitive at end' },
      { s: 'Hij moet vroeg opstaan.', t: 'He has to get up early.', n: 'moeten + separable infinitive' },
      { s: 'Je hoeft niet te betalen.', t: 'You do not need to pay.', n: 'hoeven requires te before infinitive' },
    ],
  },

  {
    title: 'Simple Past (Imperfect)',
    slug: 'simple-past',
    level: 'A2',
    summary: 'Form the Dutch imperfect tense for regular (-te/-de) and irregular verbs.',
    body: `<h2>Simple Past – Imperfect (Onvoltooid Verleden Tijd)</h2>
<p>The imperfect is used for past actions, stories, and descriptions. It is less common in speech than the perfect tense, but essential in written and narrative Dutch.</p>
<h3>Regular verbs</h3>
<p>Find the stem (infinitive minus -en). If the last consonant of the stem appears in <strong>'t kofschip</strong> (t, k, f, s, ch, p), add <strong>-te / -ten</strong>; otherwise add <strong>-de / -den</strong>.</p>
<table><thead><tr><th>Person</th><th>werken (stem: werk)</th><th>leven (stem: leef→ leef, but: leefde)</th></tr></thead>
<tbody>
<tr><td>ik</td><td>werkte</td><td>leefde</td></tr>
<tr><td>jij/hij/zij</td><td>werkte</td><td>leefde</td></tr>
<tr><td>wij/jullie/zij</td><td>werkten</td><td>leefden</td></tr>
</tbody></table>
<h3>Irregular verbs</h3>
<p>Common irregulars must be memorised: <em>zijn → was/waren</em>, <em>hebben → had/hadden</em>, <em>gaan → ging/gingen</em>, <em>komen → kwam/kwamen</em>.</p>`,
    sort: 4,
    examples: [
      { s: 'Ze werkte gisteren de hele dag.', t: 'She worked all day yesterday.', n: 'werken → werkte (-te ending)' },
      { s: 'Wij speelden als kinderen buiten.', t: 'We played outside as children.', n: 'spelen → speelden (-de ending)' },
      { s: 'Het was een mooie dag.', t: 'It was a beautiful day.', n: 'irregular: zijn → was' },
    ],
  },

  {
    title: 'Adjective Inflection',
    slug: 'adjective-inflection',
    level: 'A2',
    summary: 'Add -e to adjectives in most positions; learn when to leave them uninflected.',
    body: `<h2>Adjective Inflection (Bijvoeglijk Naamwoord)</h2>
<p>Attributive adjectives (before a noun) usually get an <strong>-e</strong> ending. The exception is a het-noun with an indefinite article (een) or no article.</p>
<table><thead><tr><th>Context</th><th>Inflected?</th><th>Example</th></tr></thead>
<tbody>
<tr><td>de-noun (any article)</td><td>+e</td><td>de grote man / een grote man</td></tr>
<tr><td>het-noun + definite article</td><td>+e</td><td>het grote huis</td></tr>
<tr><td>het-noun + een / no article</td><td>no -e</td><td>een groot huis / groot huis</td></tr>
<tr><td>Predicate (after zijn etc.)</td><td>no -e</td><td>Het huis is groot.</td></tr>
</tbody></table>
<h3>Spelling rules</h3>
<p>Double consonant before -e if vowel is short: <em>dik → dikke</em>. Drop double vowel: <em>groo- → grote</em>. Words ending in -f/-v: <em>lief → lieve</em>.</p>`,
    sort: 5,
    examples: [
      { s: 'Ik woon in een groot huis.', t: 'I live in a big house.', n: 'het-noun + een → no -e' },
      { s: 'De grote hond blaft hard.', t: 'The big dog barks loudly.', n: 'de-noun → +e' },
      { s: 'Ze draagt een nieuwe jas.', t: 'She wears a new coat.', n: 'de-noun + een → +e' },
    ],
  },

  {
    title: 'Prepositions of Place and Movement',
    slug: 'prepositions-place',
    level: 'A2',
    summary: 'Use in, op, aan, bij, voor, achter, naast, onder and more to describe location and direction.',
    body: `<h2>Prepositions of Place and Movement</h2>
<h3>Static location</h3>
<table><thead><tr><th>Dutch</th><th>English</th><th>Example</th></tr></thead>
<tbody>
<tr><td>in</td><td>in</td><td>in de kamer</td></tr>
<tr><td>op</td><td>on / at (surface, floor)</td><td>op de tafel / op straat</td></tr>
<tr><td>aan</td><td>at / on (attached)</td><td>aan de muur / aan tafel</td></tr>
<tr><td>bij</td><td>near / at (someone's place)</td><td>bij de deur / bij mij thuis</td></tr>
<tr><td>voor</td><td>in front of</td><td>voor de deur</td></tr>
<tr><td>achter</td><td>behind</td><td>achter het huis</td></tr>
<tr><td>naast</td><td>next to</td><td>naast de bank</td></tr>
<tr><td>onder</td><td>under</td><td>onder de brug</td></tr>
<tr><td>boven</td><td>above</td><td>boven de stad</td></tr>
<tr><td>tussen</td><td>between</td><td>tussen de bomen</td></tr>
</tbody></table>
<h3>Direction / movement</h3>
<p>Use <em>naar</em> (to), <em>uit</em> (out of), <em>van</em> (from), <em>door</em> (through): <em>Ik ga naar huis.</em></p>`,
    sort: 6,
    examples: [
      { s: 'Het boek ligt op de tafel.', t: 'The book is on the table.', n: 'op = on a surface' },
      { s: 'Ze woont naast de school.', t: 'She lives next to the school.', n: 'naast = next to' },
      { s: 'We rijden door de tunnel.', t: 'We drive through the tunnel.', n: 'door = through (movement)' },
    ],
  },

  {
    title: 'Demonstratives: deze, die, dit, dat',
    slug: 'demonstratives',
    level: 'A2',
    summary: 'Point to things near (deze/dit) or far (die/dat) depending on gender and distance.',
    body: `<h2>Demonstrative Pronouns (Aanwijzende Voornaamwoorden)</h2>
<p>Dutch demonstratives agree with the noun's grammatical gender and with distance.</p>
<table><thead><tr><th></th><th>Near (this)</th><th>Far (that)</th></tr></thead>
<tbody>
<tr><td><strong>de-noun</strong> (singular)</td><td>deze</td><td>die</td></tr>
<tr><td><strong>het-noun</strong> (singular)</td><td>dit</td><td>dat</td></tr>
<tr><td><strong>All nouns</strong> (plural)</td><td>deze</td><td>die</td></tr>
</tbody></table>
<h3>As pronouns (standalone)</h3>
<p>When used without a noun, <em>dit</em> and <em>dat</em> are neutral and very common: <em>Wat is dat?</em>, <em>Dit is mijn fiets.</em></p>
<h3>Die / dat as relative pronouns</h3>
<p><em>die</em> and <em>dat</em> also introduce relative clauses (see the Relative Clauses topic).</p>`,
    sort: 7,
    examples: [
      { s: 'Deze auto is van mij.', t: 'This car is mine.', n: 'deze + de-noun, near' },
      { s: 'Dat huis staat te koop.', t: 'That house is for sale.', n: 'dat + het-noun, far' },
      { s: 'Die mensen kennen we niet.', t: 'We do not know those people.', n: 'die + plural, far' },
    ],
  },

  {
    title: 'Reflexive Verbs',
    slug: 'reflexive-verbs',
    level: 'A2',
    summary: 'Use zich and other reflexive pronouns with verbs like zich wassen, zich voelen, zich vergissen.',
    body: `<h2>Reflexive Verbs (Reflexieve Werkwoorden)</h2>
<p>Reflexive verbs take a reflexive pronoun (the action reflects back to the subject).</p>
<table><thead><tr><th>Subject</th><th>Reflexive</th></tr></thead>
<tbody>
<tr><td>ik</td><td>me / mezelf</td></tr>
<tr><td>jij/je</td><td>je / jezelf</td></tr>
<tr><td>hij/zij/het</td><td>zich / zichzelf</td></tr>
<tr><td>wij/we</td><td>ons / onszelf</td></tr>
<tr><td>jullie</td><td>je / jezelf</td></tr>
<tr><td>zij/ze</td><td>zich / zichzelf</td></tr>
<tr><td>u</td><td>zich / uzelf</td></tr>
</tbody></table>
<h3>Common reflexive verbs</h3>
<p><em>zich wassen</em> (to wash oneself), <em>zich voelen</em> (to feel), <em>zich vergissen</em> (to be mistaken), <em>zich herinneren</em> (to remember), <em>zich schamen</em> (to be ashamed), <em>zich gedragen</em> (to behave).</p>`,
    sort: 8,
    examples: [
      { s: 'Ik vergis me.', t: 'I am mistaken.', n: 'zich vergissen → me for ik' },
      { s: 'Hij schaamt zich diep.', t: 'He is deeply ashamed.', n: 'zich for hij' },
      { s: 'We herinneren ons die dag.', t: 'We remember that day.', n: 'ons for wij' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // B1
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Subordinate Clauses',
    slug: 'subordinate-clauses',
    level: 'B1',
    summary: 'Connect clauses with dat, omdat, als, toen, wanneer, hoewel — verb moves to the end.',
    body: `<h2>Subordinate Clauses (Bijzinnen)</h2>
<p>In Dutch subordinate clauses (introduced by a conjunction), the <strong>finite verb moves to the end</strong> of the clause.</p>
<table><thead><tr><th>Conjunction</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>dat</td><td>that</td></tr>
<tr><td>omdat</td><td>because</td></tr>
<tr><td>als / wanneer</td><td>if / when</td></tr>
<tr><td>toen</td><td>when (past, one-time event)</td></tr>
<tr><td>terwijl</td><td>while</td></tr>
<tr><td>hoewel / ofschoon</td><td>although</td></tr>
<tr><td>zodat</td><td>so that</td></tr>
<tr><td>voordat / nadat</td><td>before / after</td></tr>
</tbody></table>
<h3>Verb order in subordinate clauses</h3>
<p>All verbs (auxiliary + participle, modal + infinitive) cluster at the end: <em>…omdat hij dit boek heeft gelezen.</em></p>
<p>When the subordinate clause comes first, the main clause inverts: <em>Omdat het regent, blijf ik thuis.</em></p>`,
    sort: 3,
    examples: [
      { s: 'Ik denk dat hij ziek is.', t: 'I think that he is sick.', n: 'dat-clause: verb to end' },
      { s: 'Ze blijft thuis omdat ze moe is.', t: 'She stays home because she is tired.', n: 'omdat: verb to end' },
      { s: 'Toen ik klein was, woonde ik in Utrecht.', t: 'When I was little, I lived in Utrecht.', n: 'toen-clause first → inversion in main clause' },
    ],
  },

  {
    title: 'Relative Clauses',
    slug: 'relative-clauses',
    level: 'B1',
    summary: 'Use die (de-nouns & plurals) and dat (het-nouns) to introduce relative clauses.',
    body: `<h2>Relative Clauses (Betrekkelijke Bijzinnen)</h2>
<p>Relative clauses modify a noun and are introduced by a relative pronoun. Like all subordinate clauses, the verb goes to the end.</p>
<h3>Die vs Dat</h3>
<ul>
<li><strong>die</strong> — refers to de-nouns (all genders, singular) and all plural nouns</li>
<li><strong>dat</strong> — refers to het-nouns (singular only)</li>
</ul>
<h3>With a preposition</h3>
<p>When the relative pronoun is the object of a preposition, Dutch prefers <em>waar + preposition</em> (together or split) over <em>die/dat</em>: <em>het boek waarover we spraken</em> or <em>het boek waar we over spraken</em>.</p>
<h3>Wat and wie</h3>
<p><em>wat</em> refers to indefinite things or entire clauses: <em>alles wat ik weet</em>. <em>wie</em> refers to people without an antecedent: <em>Wie dit leest, begrijpt het.</em></p>`,
    sort: 4,
    examples: [
      { s: 'De man die daar staat, is mijn broer.', t: 'The man who is standing there is my brother.', n: 'die for de-noun' },
      { s: 'Het huis dat we kochten, is groot.', t: 'The house that we bought is big.', n: 'dat for het-noun' },
      { s: 'Het probleem waarover ze praten is complex.', t: 'The problem they are talking about is complex.', n: 'waar + preposition' },
    ],
  },

  {
    title: 'Infinitive with om...te',
    slug: 'om-te-infinitive',
    level: 'B1',
    summary: 'Express purpose and complement clauses using om...te + infinitive.',
    body: `<h2>Infinitive Constructions with om…te</h2>
<p>Dutch uses <em>om…te</em> + infinitive in several constructions:</p>
<h3>Purpose (in order to)</h3>
<p><em>Ik studeer hard om te slagen.</em> (I study hard in order to pass.)</p>
<h3>After adjectives</h3>
<p><em>Het is moeilijk om Nederlands te leren.</em> (It is difficult to learn Dutch.)</p>
<h3>After nouns or verbs of intention</h3>
<p><em>Hij heeft de neiging om te laat te komen.</em> (He has a tendency to arrive late.)</p>
<h3>Word order</h3>
<p>The infinitive stays at the very end. Separable verbs split: <em>om vroeg op te staan</em>. Longer complements go between <em>om</em> and <em>te</em>.</p>
<h3>Plain te + infinitive</h3>
<p>After verbs like <em>proberen, beginnen, vergeten, weigeren</em>, use just <em>te</em> without <em>om</em>: <em>Ik probeer te slapen.</em></p>`,
    sort: 5,
    examples: [
      { s: 'Ze gaat naar de winkel om brood te kopen.', t: 'She goes to the shop to buy bread.', n: 'om...te = purpose' },
      { s: 'Het is belangrijk om op tijd te zijn.', t: 'It is important to be on time.', n: 'after adjective' },
      { s: 'Hij probeert elke dag te sporten.', t: 'He tries to exercise every day.', n: 'proberen + te, no om' },
    ],
  },

  {
    title: 'Comparative and Superlative',
    slug: 'comparative-superlative',
    level: 'B1',
    summary: 'Form comparatives with -er and superlatives with -st(e); use dan and als correctly.',
    body: `<h2>Comparative and Superlative (Vergrotende en Overtreffende Trap)</h2>
<h3>Comparative</h3>
<p>Add <strong>-er</strong> to the adjective: <em>groot → groter</em>, <em>klein → kleiner</em>.</p>
<p>Spelling changes: double consonant after short vowel (<em>dik → dikker</em>); -f → -v (<em>lief → liever</em>).</p>
<p>Use <strong>dan</strong> after a comparative: <em>Hij is groter dan zij.</em></p>
<h3>Superlative</h3>
<p>Add <strong>-st</strong> (predicative) or <strong>-ste</strong> (attributive): <em>groot → het grootst / de grootste</em>.</p>
<p>Use <em>het</em> before predicative superlatives: <em>Zij loopt het snelst.</em></p>
<h3>Irregular comparatives</h3>
<table><thead><tr><th>Adjective</th><th>Comparative</th><th>Superlative</th></tr></thead>
<tbody>
<tr><td>goed</td><td>beter</td><td>best(e)</td></tr>
<tr><td>veel</td><td>meer</td><td>meest(e)</td></tr>
<tr><td>weinig</td><td>minder</td><td>minst(e)</td></tr>
<tr><td>graag</td><td>liever</td><td>liefst</td></tr>
</tbody></table>
<h3>Als vs Dan</h3>
<p>Use <em>als</em> in equality comparisons (<em>zo groot als</em>) and <em>dan</em> in inequality comparisons (<em>groter dan</em>).</p>`,
    sort: 6,
    examples: [
      { s: 'Deze trein is sneller dan de bus.', t: 'This train is faster than the bus.', n: '-er + dan' },
      { s: 'Zij is de beste student van de klas.', t: 'She is the best student in the class.', n: 'attributive superlative -ste' },
      { s: 'Hij is even groot als zijn vader.', t: 'He is as tall as his father.', n: 'zo/even...als for equality' },
    ],
  },

  {
    title: "The Word 'Er' – All Uses",
    slug: 'er-usage',
    level: 'B1',
    summary: "Master all four uses of 'er': existential, locative, partitive, and pronominal.",
    body: `<h2>The Word <em>er</em></h2>
<p><em>Er</em> has four distinct functions in Dutch:</p>
<h3>1. Existential (er is / er zijn)</h3>
<p>Introduces existence or presence: <em>Er is een probleem.</em> (There is a problem.) <em>Er zijn drie opties.</em></p>
<h3>2. Locative (there)</h3>
<p>Replaces a location already known: <em>Hij woont in Amsterdam. — Ja, hij woont er al tien jaar.</em> (Yes, he has lived there for ten years.)</p>
<h3>3. Partitive (some of them)</h3>
<p>Replaces a noun with an indefinite quantity. Must use <em>er</em> when the object is quantified and pronominalized: <em>Hoeveel appels heb je? — Ik heb er drie.</em> (I have three of them.)</p>
<h3>4. Pronominal (er + preposition)</h3>
<p>Combines with a preposition to replace a thing (not a person): <em>Ik denk eraan.</em> (I think about it.) <em>We hebben er niet over gesproken.</em></p>
<h3>Position</h3>
<p><em>Er</em> is usually placed after the finite verb (position 2 in the clause), before other adverbs: <em>Er zijn veel mensen in de stad.</em></p>`,
    sort: 7,
    examples: [
      { s: 'Er staat een fiets voor de deur.', t: 'There is a bicycle in front of the door.', n: 'existential er' },
      { s: 'Ik heb er geen zin in.', t: 'I have no desire for it.', n: 'pronominal: er + in' },
      { s: 'Hoeveel koekjes wil je? — Ik wil er twee.', t: 'How many cookies do you want? — I want two of them.', n: 'partitive er' },
    ],
  },

  {
    title: 'Double Infinitive in Perfect',
    slug: 'double-infinitive',
    level: 'B1',
    summary: 'Learn why modals and perception verbs use an infinitive instead of a past participle in the perfect.',
    body: `<h2>Double Infinitive (Dubbel Infinitief)</h2>
<p>When a modal verb or a perception/causative verb is used with another verb in the <strong>perfect tense</strong>, the past participle of the modal is replaced by its <strong>infinitive form</strong>. This creates the "double infinitive" construction.</p>
<h3>Rule</h3>
<p>Instead of: <em>*Ik heb gemoeten werken</em> — say: <em>Ik heb moeten werken.</em></p>
<p>The <strong>dependent infinitive always follows</strong> the modal infinitive: <em>hulpwerkwoord + afhankelijk werkwoord</em>.</p>
<h3>Affected verbs</h3>
<p>All modals (<em>kunnen, mogen, moeten, willen, zullen, hoeven</em>) and perception/causative verbs (<em>zien, horen, laten, helpen</em>) trigger this construction.</p>
<h3>Word order</h3>
<p>In a subordinate clause: <em>…dat hij heeft moeten werken.</em> (The auxiliary <em>heeft</em> may also come after the double infinitive in formal writing: <em>…dat hij moeten werken heeft.</em>)</p>`,
    sort: 8,
    examples: [
      { s: 'Ze heeft lang moeten wachten.', t: 'She had to wait for a long time.', n: 'moeten stays as infinitive' },
      { s: 'Ik heb hem zien lopen.', t: 'I saw him walk.', n: 'zien (perception) + infinitive' },
      { s: 'Hij heeft zijn auto laten repareren.', t: 'He had his car repaired.', n: 'laten (causative) + infinitive' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // B2
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Indirect Speech',
    slug: 'indirect-speech',
    level: 'B2',
    summary: 'Report what someone said using dat-clauses and the correct tense shifts.',
    body: `<h2>Indirect Speech (Indirecte Rede)</h2>
<p>When you report what someone said, you usually introduce the reported clause with <em>dat</em> and may shift the tense backwards.</p>
<h3>Statements</h3>
<p>Direct: <em>"Ik ben moe," zei ze.</em><br>Indirect: <em>Ze zei dat ze moe was.</em></p>
<h3>Tense shift (backshifting)</h3>
<p>When the reporting verb is past, the reported clause typically shifts one tense back:</p>
<ul>
<li>Present → imperfect: <em>is → was</em></li>
<li>Perfect → past perfect: <em>heeft gedaan → had gedaan</em></li>
</ul>
<p>In informal Dutch, tense shift is often skipped: <em>Ze zei dat ze moe is.</em></p>
<h3>Questions in indirect speech</h3>
<p>Yes/no questions use <em>of</em>: <em>Hij vroeg of ik mee wilde gaan.</em><br>Wh-questions keep the question word: <em>Ze vroeg waar ik woonde.</em></p>
<h3>Commands</h3>
<p>Use <em>te + infinitive</em> or <em>dat + moeten</em>: <em>Hij zei me te wachten.</em> / <em>Hij zei dat ik moest wachten.</em></p>`,
    sort: 3,
    examples: [
      { s: 'Ze zei dat ze morgen zou komen.', t: 'She said she would come tomorrow.', n: 'tense shift: present → zou' },
      { s: 'Hij vroeg of ik honger had.', t: 'He asked whether I was hungry.', n: 'indirect yes/no question with of' },
      { s: 'De dokter zei me veel te rusten.', t: 'The doctor told me to rest a lot.', n: 'command: te + infinitive' },
    ],
  },

  {
    title: 'Concessive Clauses',
    slug: 'concessive-clauses',
    level: 'B2',
    summary: 'Express contrast and concession with hoewel, ofschoon, al, ook al and toch.',
    body: `<h2>Concessive Clauses (Toegevende Bijzinnen)</h2>
<p>Concessive clauses acknowledge a fact while asserting a contrasting one.</p>
<h3>Subordinating conjunctions</h3>
<ul>
<li><strong>hoewel / ofschoon / alhoewel</strong> — although (formal–neutral)</li>
<li><strong>al / ook al</strong> — even though (often with conditional flavour)</li>
</ul>
<p><em>Hoewel het koud was, gingen we zwemmen.</em></p>
<h3>Toch – the correlating adverb</h3>
<p>The main clause often contains <em>toch</em> (yet / still / nevertheless) to reinforce the contrast: <em>Hoewel ze moe was, ging ze toch naar het feest.</em></p>
<h3>Adversative coordination</h3>
<p>At clause level, <em>maar</em> (but) and <em>terwijl</em> (while/whereas) also express contrast without subordination: <em>Hij is rijk, maar hij is niet gelukkig.</em></p>`,
    sort: 4,
    examples: [
      { s: 'Hoewel hij ziek was, werkte hij door.', t: 'Although he was ill, he kept working.', n: 'hoewel + verb to end' },
      { s: 'Ook al regent het, we gaan toch fietsen.', t: 'Even though it is raining, we will still cycle.', n: 'ook al + toch in main clause' },
      { s: 'Ze is arm, maar toch gelukkig.', t: 'She is poor, but happy nonetheless.', n: 'maar + toch for contrast' },
    ],
  },

  {
    title: 'Past Perfect (Plusquamperfect)',
    slug: 'past-perfect',
    level: 'B2',
    summary: 'Describe an event that happened before another past event using had/was + past participle.',
    body: `<h2>Past Perfect (Plusquamperfectum)</h2>
<p>The past perfect describes an action that was completed <strong>before</strong> another past action or reference point.</p>
<h3>Formation</h3>
<p>Imperfect of <em>hebben</em> or <em>zijn</em> + past participle.</p>
<p><em>Ik had gegeten voordat hij aankwam.</em> (I had eaten before he arrived.)</p>
<h3>Hebben vs Zijn</h3>
<p>The same rules apply as for the perfect tense: movement/change of state verbs take <em>zijn</em>.</p>
<p><em>Toen we aankwamen, was hij al vertrokken.</em> (When we arrived, he had already left.)</p>
<h3>Usage</h3>
<p>Common in narrative, fiction, and formal writing. After <em>nadat</em> (after), the past perfect is required: <em>Nadat ze had gegeten, las ze een boek.</em></p>`,
    sort: 5,
    examples: [
      { s: 'Ze had de brief al geschreven toen hij belde.', t: 'She had already written the letter when he called.', n: 'had + participle (hebben)' },
      { s: 'Nadat hij was vertrokken, begon het te regenen.', t: 'After he had left, it started to rain.', n: 'was + vertrokken (zijn)' },
      { s: 'Ik wist niet dat ze al was aangekomen.', t: 'I did not know that she had already arrived.', n: 'past perfect in subordinate clause' },
    ],
  },

  {
    title: 'Word Formation: Prefixes and Suffixes',
    slug: 'word-formation',
    level: 'B2',
    summary: 'Expand vocabulary by recognising common Dutch prefixes (be-, ver-, ont-, her-) and suffixes (-lijk, -heid, -ing, -er).',
    body: `<h2>Word Formation (Woordvorming)</h2>
<h3>Common prefixes</h3>
<table><thead><tr><th>Prefix</th><th>Meaning / Effect</th><th>Example</th></tr></thead>
<tbody>
<tr><td>be-</td><td>transitifies an intransitive verb</td><td>kijken → bekijken (to view)</td></tr>
<tr><td>ver-</td><td>change of state; intensification</td><td>groot → vergroten (to enlarge)</td></tr>
<tr><td>ont-</td><td>reversal / beginning</td><td>dekken → ontdekken (to discover)</td></tr>
<tr><td>her-</td><td>repetition (re-)</td><td>schrijven → herschrijven (to rewrite)</td></tr>
<tr><td>ge-</td><td>collectivity; past participle marker</td><td>berg → gebergte (mountain range)</td></tr>
</tbody></table>
<h3>Common suffixes</h3>
<table><thead><tr><th>Suffix</th><th>Forms</th><th>Example</th></tr></thead>
<tbody>
<tr><td>-heid</td><td>abstract noun from adjective</td><td>eerlijk → eerlijkheid</td></tr>
<tr><td>-ing</td><td>noun from verb (process/result)</td><td>veranderen → verandering</td></tr>
<tr><td>-lijk</td><td>adjective from noun/verb</td><td>vriend → vriendelijk</td></tr>
<tr><td>-er / -aar</td><td>agent noun (person who does)</td><td>werken → werker; leren → leraar</td></tr>
<tr><td>-achtig</td><td>resemblance (-ish, -like)</td><td>kind → kinderachtig</td></tr>
</tbody></table>`,
    sort: 6,
    examples: [
      { s: 'De ontdekking veranderde de wetenschap.', t: 'The discovery changed science.', n: 'ont- + dekken → ontdekking' },
      { s: 'Zijn vriendelijkheid is opvallend.', t: 'His friendliness is striking.', n: 'vriend + -lijk + -heid' },
      { s: 'We moeten het contract herschrijven.', t: 'We have to rewrite the contract.', n: 'her- = repetition' },
    ],
  },

  {
    title: 'Focus Constructions',
    slug: 'focus-constructions',
    level: 'B2',
    summary: "Use 'het is … die/dat' cleft sentences and fronting to focus information.",
    body: `<h2>Focus Constructions (Focusconstructies)</h2>
<h3>Cleft sentences (Splitsing)</h3>
<p>To emphasise a particular element, Dutch uses a <em>het is … die/dat</em> cleft:</p>
<p><em>Het is Jan die de prijs heeft gewonnen.</em> (It is Jan who won the prize.)</p>
<p>Use <em>die</em> for people/de-nouns and <em>dat</em> for het-nouns and clauses.</p>
<h3>Fronting (Topicalisering)</h3>
<p>Any constituent can be placed in the first position (before the verb) to give it prominence, triggering inversion:</p>
<p><em>Dat boek heb ik al drie keer gelezen.</em> (That book I have read three times already.)</p>
<h3>Contrast with ook/wel/toch/juist</h3>
<p>Focus particles intensify a particular word: <em>Dát heeft hij gezegd</em> (stress on dát for contrast).</p>`,
    sort: 7,
    examples: [
      { s: 'Het is de directeur die dit besluit heeft genomen.', t: 'It is the director who made this decision.', n: 'cleft with het is...die' },
      { s: 'Gisteren heb ik hem eindelijk gesproken.', t: 'Yesterday I finally spoke to him.', n: 'time adverb fronted for emphasis' },
      { s: 'Dat wist ik al lang.', t: 'That I had known for a long time.', n: 'object fronted for topical focus' },
    ],
  },

  {
    title: 'Verb Clusters and Final Field',
    slug: 'verb-clusters',
    level: 'B2',
    summary: 'Master the Dutch final field: the order of multiple verbs at the end of a subordinate clause.',
    body: `<h2>Verb Clusters in the Final Field (Werkwoordscluster)</h2>
<p>In subordinate clauses, all verbal elements pile up at the end. The order within this cluster follows specific rules.</p>
<h3>Auxiliary + past participle</h3>
<p>The auxiliary precedes the participle: <em>…dat hij het boek heeft gelezen.</em></p>
<h3>Modal + infinitive</h3>
<p>Modal precedes dependent infinitive: <em>…dat hij moet werken.</em></p>
<h3>Double infinitive</h3>
<p>Dependent infinitive precedes modal infinitive: <em>…dat hij heeft moeten werken.</em> (worked–moeten–heeft)</p>
<h3>Complex clusters</h3>
<p>When both passive and modal combine: <em>…dat het rapport had moeten worden geschreven.</em><br>Order: participle → worden → moeten → had.</p>
<h3>Alternative orders</h3>
<p>Informal and regional Dutch frequently place the auxiliary after the participle (<em>dat hij gelezen heeft</em>). Both orders are widely accepted in speech.</p>`,
    sort: 8,
    examples: [
      { s: 'Ik weet dat ze al lang heeft gewacht.', t: 'I know that she has been waiting for a long time.', n: 'heeft + gewacht (aux before participle)' },
      { s: 'Hij zei dat hij niet had kunnen komen.', t: 'He said he had not been able to come.', n: 'had + kunnen + komen (double inf.)' },
      { s: 'Ze waren blij dat het probleem had kunnen worden opgelost.', t: 'They were glad the problem could have been solved.', n: 'complex passive + modal cluster' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C1
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Epistemic Modality',
    slug: 'epistemic-modality',
    level: 'C1',
    summary: "Use zullen, zouden, kunnen, and moeten to express degrees of certainty and inference.",
    body: `<h2>Epistemic Modality (Epistemische Modaliteit)</h2>
<p>Besides their deontic uses (obligation, permission), Dutch modal verbs can express the speaker's <strong>degree of certainty</strong> about a proposition.</p>
<h3>Zullen / Zouden</h3>
<p><em>Zullen</em> in the present expresses confident inference: <em>Dat zal wel zo zijn.</em> (That will probably be the case.)<br>
<em>Zouden</em> in past context or for distancing: <em>Hij zou ziek zijn.</em> (He is said to be / reportedly ill.)</p>
<h3>Kunnen</h3>
<p>Epistemic <em>kunnen</em> = possibility: <em>Het kan zijn dat ze vergeten is.</em> (It may be that she has forgotten.)</p>
<h3>Moeten</h3>
<p>Epistemic <em>moeten</em> = logical necessity: <em>Hij moet heel moe zijn.</em> (He must be very tired.)</p>
<h3>Hoeven</h3>
<p>Epistemic <em>hoeven</em> in negative: <em>Dat hoeft niet waar te zijn.</em> (That need not be true.)</p>`,
    sort: 2,
    examples: [
      { s: 'Ze zal zo wel komen — het is nog vroeg.', t: 'She will probably come soon — it is still early.', n: 'zullen = confident inference' },
      { s: 'Hij moet uitgeput zijn na die reis.', t: 'He must be exhausted after that journey.', n: 'moeten = logical deduction' },
      { s: 'Dat zou een vergissing kunnen zijn.', t: 'That could be a mistake.', n: 'zouden + kunnen = hedged possibility' },
    ],
  },

  {
    title: 'Complex Relative Clauses',
    slug: 'complex-relatives',
    level: 'C1',
    summary: "Use wat, wie, hetgeen and waar-compounds in advanced relative constructions.",
    body: `<h2>Complex Relative Clauses</h2>
<h3>Wat as relative pronoun</h3>
<p><em>Wat</em> refers to an indefinite or abstract antecedent, or to an entire preceding clause:</p>
<ul>
<li>After superlatives and indefinites: <em>het beste wat ik ooit heb gegeten</em></li>
<li>Clause antecedent: <em>Ze won de prijs, wat iedereen verraste.</em></li>
</ul>
<h3>Wie as relative pronoun</h3>
<p>Refers to an unspecified person: <em>Wie dit leest, zal het begrijpen.</em> (Whoever reads this will understand it.)</p>
<h3>Hetgeen (formal)</h3>
<p>Formal literary synonym for <em>wat</em>: <em>hetgeen wij wensen</em> (that which we desire).</p>
<h3>Waar-compounds</h3>
<p><em>waarover, waarmee, waarvan, waaronder</em> etc. replace <em>preposition + die/dat</em> for non-personal antecedents. Split forms (<em>waar … over</em>) are also common in speech.</p>`,
    sort: 3,
    examples: [
      { s: 'Dat is het mooiste wat ik ooit heb gezien.', t: 'That is the most beautiful thing I have ever seen.', n: 'wat after superlative' },
      { s: 'Ze slaagde voor het examen, waarover iedereen verrast was.', t: 'She passed the exam, about which everyone was surprised.', n: 'waar-compound for clause reference' },
      { s: 'Wie vroeg opstaat, kan meer bereiken.', t: 'Whoever gets up early can achieve more.', n: 'wie = unspecified person' },
    ],
  },

  {
    title: 'Discourse Markers and Text Cohesion',
    slug: 'discourse-markers',
    level: 'C1',
    summary: 'Link ideas and structure text with connectors for addition, contrast, cause, result, and exemplification.',
    body: `<h2>Discourse Markers (Discoursmarkeringen)</h2>
<p>Discourse markers signal the logical relationship between clauses and paragraphs. Using them correctly is essential for fluent, cohesive Dutch prose and speech.</p>
<h3>Addition</h3>
<p><em>bovendien, daarnaast, tevens, voorts, ook, zelfs</em></p>
<h3>Contrast / Concession</h3>
<p><em>echter, toch, desondanks, anderzijds, daarentegen, weliswaar…maar</em></p>
<h3>Cause and Reason</h3>
<p><em>immers, namelijk, want, omdat, doordat, aangezien, gezien het feit dat</em></p>
<h3>Result / Conclusion</h3>
<p><em>dus, daardoor, derhalve, bijgevolg, dientengevolge, als gevolg hiervan, kortom</em></p>
<h3>Exemplification / Specification</h3>
<p><em>bijvoorbeeld, zoals, met name, te weten, dat wil zeggen (d.w.z.)</em></p>
<h3>Position</h3>
<p>Most of these are adverbs and cause inversion when placed first in a main clause: <em>Bovendien heeft hij hard gewerkt.</em></p>`,
    sort: 4,
    examples: [
      { s: 'Het project was duur; bovendien duurde het langer dan gepland.', t: 'The project was expensive; moreover, it took longer than planned.', n: 'bovendien = moreover (addition)' },
      { s: 'De resultaten waren positief; toch bleven er vraagtekens.', t: 'The results were positive; yet questions remained.', n: 'toch = yet (contrast)' },
      { s: 'Hij slaagde, derhalve mag hij promoveren.', t: 'He passed; consequently, he may proceed to his doctorate.', n: 'derhalve = consequently (formal result)' },
    ],
  },

  {
    title: 'Inversion and Emphasis',
    slug: 'inversion-emphasis',
    level: 'C1',
    summary: 'Use fronting, cleft sentences, and particles like wel, juist, pas and toch for pragmatic emphasis.',
    body: `<h2>Inversion and Pragmatic Emphasis</h2>
<h3>Emphatic fronting</h3>
<p>Any phrase can be fronted (moved to position 1) for topical or contrastive focus, triggering inversion:</p>
<p><em>Dat plan steunen wij niet.</em> (That plan we do not support.)</p>
<h3>Emphatic particles</h3>
<ul>
<li><strong>wel</strong> — affirms or counters a negative expectation: <em>Ik wil het wel proberen.</em> (I am willing to try it.)</li>
<li><strong>juist</strong> — emphasises unexpectedness or contrast: <em>Juist hij was er niet.</em> (He, of all people, was not there.)</li>
<li><strong>pas</strong> — only (temporal, emphasising lateness): <em>Ze was pas om middernacht thuis.</em></li>
<li><strong>toch</strong> — concessive or reinforcing: <em>Kom toch binnen!</em> (Do come in!)</li>
<li><strong>maar</strong> — mildly urging: <em>Ga maar zitten.</em></li>
</ul>
<h3>Negation for emphasis</h3>
<p>Fronting a negative element creates very strong contrast: <em>Niemand heeft dit geweten.</em></p>`,
    sort: 5,
    examples: [
      { s: 'Zijn toewijding had ik nooit verwacht.', t: 'His dedication I had never expected.', n: 'fronted object for emphasis' },
      { s: 'Juist op dat moment begon het te regenen.', t: 'Just at that moment it began to rain.', n: 'juist for unexpected contrast' },
      { s: 'Ze heeft het wel geprobeerd, maar het lukte niet.', t: 'She did try, but it did not work.', n: 'wel counters negative expectation' },
    ],
  },

  {
    title: 'Reported Speech and Tense Shift',
    slug: 'reported-speech-tense',
    level: 'C1',
    summary: 'Report speech and thought accurately, applying backshifting and changing pronouns and time references.',
    body: `<h2>Reported Speech and Tense Shift</h2>
<p>In formal and written Dutch, reported speech systematically shifts tenses and adjusts deictic expressions.</p>
<h3>Tense backshifting</h3>
<table><thead><tr><th>Direct</th><th>Reported (formal)</th></tr></thead>
<tbody>
<tr><td>present: <em>is</em></td><td>imperfect: <em>was</em></td></tr>
<tr><td>perfect: <em>heeft gedaan</em></td><td>past perfect: <em>had gedaan</em></td></tr>
<tr><td>future: <em>zal doen</em></td><td>conditional: <em>zou doen</em></td></tr>
<tr><td>conditional: <em>zou doen</em></td><td>past conditional: <em>zou hebben gedaan</em></td></tr>
</tbody></table>
<h3>Deictic shift</h3>
<p>Time references shift: <em>morgen → de volgende dag, gisteren → de vorige dag, nu → toen</em>.<br>Place references: <em>hier → daar</em>.</p>
<h3>Pronouns</h3>
<p>First/second person pronouns in reported speech shift to third person unless the reporter is one of the original speakers.</p>
<h3>Zouden for reported future</h3>
<p><em>Hij zei dat hij zou komen.</em> The <em>zou</em> form is the hallmark of reported future in Dutch.</p>`,
    sort: 6,
    examples: [
      { s: '"Ik ben moe." → Ze zei dat ze moe was.', t: '"I am tired." → She said she was tired.', n: 'present → imperfect' },
      { s: '"Ik zal morgen komen." → Hij beloofde dat hij de volgende dag zou komen.', t: '"I will come tomorrow." → He promised he would come the next day.', n: 'future → zou + deictic shift' },
      { s: '"Heb je het gedaan?" → Ze vroeg of hij het had gedaan.', t: '"Have you done it?" → She asked whether he had done it.', n: 'perfect → past perfect; of for yes/no' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C2
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Rhetorical Structures',
    slug: 'rhetorical-structures',
    level: 'C2',
    summary: 'Analyse and deploy chiasmus, anaphora, polysyndeton, and other rhetorical figures in Dutch.',
    body: `<h2>Rhetorical Structures (Retorische Stijlfiguren)</h2>
<p>Mastery of Dutch includes recognising and using rhetorical devices found in literature, oratory, and high-quality journalism.</p>
<h3>Anaphora</h3>
<p>Repetition of a phrase at the start of successive clauses: <em>Wij willen rust, wij willen vrijheid, wij willen rechtvaardigheid.</em></p>
<h3>Chiasmus</h3>
<p>Reversed parallelism (A-B-B-A): <em>Men leeft om te werken, of men werkt om te leven.</em></p>
<h3>Polysyndeton vs Asyndeton</h3>
<p>Polysyndeton uses many conjunctions for a cumulative effect: <em>en zo en zo en zo…</em><br>Asyndeton omits them for speed and impact: <em>Ik zag hem, herkende hem, liep weg.</em></p>
<h3>Litotes</h3>
<p>Understatement via double negative: <em>Dat is niet onaardig.</em> (That is not unpleasant — meaning it is quite good.)</p>
<h3>Rhetorical question</h3>
<p>A question expecting no answer: <em>Is er iemand die dit niet begrijpt?</em></p>`,
    sort: 2,
    examples: [
      { s: 'Men leeft om te werken, of men werkt om te leven.', t: 'One lives to work, or one works to live.', n: 'chiasmus: reversed structure' },
      { s: 'Dat vind ik niet onverstandig.', t: 'I do not find that unwise.', n: 'litotes: double negative = mild praise' },
      { s: 'Wie kan dit nu ontkennen?', t: 'Who can now deny this?', n: 'rhetorical question' },
    ],
  },

  {
    title: 'Archaic and Literary Syntax',
    slug: 'archaic-syntax',
    level: 'C2',
    summary: 'Recognise inverted genitives, the formal subjunctive, archaic word order, and literary set phrases.',
    body: `<h2>Archaic and Literary Syntax</h2>
<p>High literature, religious texts, legal prose, and ceremonial language preserve structures absent from modern spoken Dutch.</p>
<h3>Formal subjunctive (Aanvoegende wijs)</h3>
<p>Surviving in fixed phrases: <em>Leve de Koningin!</em>, <em>Moge hij rusten in vrede.</em>, <em>Het zij zo.</em></p>
<h3>Inverted genitive</h3>
<p>Old-fashioned: <em>des konings wens</em> (the king's wish) rather than modern <em>de wens van de koning</em>. Still appears in names and formal titles.</p>
<h3>Van + genitive pronoun</h3>
<p>Archaic: <em>uwer, hunner, dier</em> — today replaced by <em>van u, van hen, van die</em>.</p>
<h3>Fronted past participle</h3>
<p>In literary style, the past participle may be fronted: <em>Gesproken heeft hij zelden.</em> (Seldom has he spoken.)</p>
<h3>Concessive infinitive</h3>
<p>Literary: <em>Zwijgen of spreken, het maakt geen verschil.</em> (To be silent or to speak, it makes no difference.)</p>`,
    sort: 3,
    examples: [
      { s: 'Moge vrede heersen in dit land.', t: 'May peace reign in this land.', n: 'formal subjunctive: moge + infinitive' },
      { s: 'Des tijds loop is onverbiddelijk.', t: 'The march of time is relentless.', n: 'inverted genitive with des' },
      { s: 'Vergeten is die dag nooit.', t: 'That day has never been forgotten.', n: 'fronted participle in literary style' },
    ],
  },

  {
    title: 'Complex Clause Combinations',
    slug: 'complex-clauses-c2',
    level: 'C2',
    summary: 'Build multi-clause sentences with embedded subordination, participial phrases, and absolute constructions.',
    body: `<h2>Complex Clause Combinations</h2>
<p>C2-level Dutch routinely combines multiple clause types in a single sentence.</p>
<h3>Embedded subordination</h3>
<p>Subordinate clauses within subordinate clauses: <em>Hij wist dat ze had gezegd dat ze zou komen.</em><br>
Verb clusters stack at the end and must be ordered correctly.</p>
<h3>Participial phrases (Deelwoordconstructies)</h3>
<p>Present and past participles can head an adverbial phrase, functioning like a subordinate clause:</p>
<ul>
<li>Present participle: <em>Lachend liep ze de kamer in.</em> (Laughing, she walked into the room.)</li>
<li>Past participle: <em>Uitgeput van de reis, ging hij slapen.</em> (Exhausted from the trip, he went to sleep.)</li>
</ul>
<h3>Absolute construction</h3>
<p>A noun phrase + participle used independently: <em>De vergadering afgelopen zijnde, vertrok iedereen.</em> (The meeting having ended, everyone left.) — very formal / literary.</p>
<h3>Nominative absolute</h3>
<p>Rare but found in legal texts: <em>Alles in aanmerking genomen, beslist de rechtbank…</em></p>`,
    sort: 4,
    examples: [
      { s: 'Ze beweerde dat hij had gezegd dat hij niet zou komen.', t: 'She claimed he had said he would not come.', n: 'double embedded subordination' },
      { s: 'Glimlachend nam hij de prijs in ontvangst.', t: 'Smiling, he accepted the prize.', n: 'present participle phrase as adverbial' },
      { s: 'Uitgeput maar tevreden, keerde ze naar huis terug.', t: 'Exhausted but satisfied, she returned home.', n: 'past participial phrase' },
    ],
  },

  {
    title: 'Stylistic Variation in Written Dutch',
    slug: 'stylistic-variation',
    level: 'C2',
    summary: 'Adapt your style across academic, journalistic, legal, and literary registers of written Dutch.',
    body: `<h2>Stylistic Variation in Written Dutch</h2>
<p>At C2 level, control over style means choosing not just correct but <em>optimal</em> structures for the communicative context.</p>
<h3>Academic writing</h3>
<p>Prefers: nominalisations, passive constructions, impersonal constructions (<em>men, er wordt</em>), hedging modals (<em>zou kunnen, lijkt te</em>), formal connectors (<em>derhalve, teneinde</em>).</p>
<h3>Journalistic style</h3>
<p>Prefers: short sentences, active voice, vivid verbs, direct quotes, present tense for immediacy (<em>historisch presens</em>).</p>
<h3>Legal language</h3>
<p>Prefers: full passive, inverted genitives (<em>des verzoekers</em>), precise quantifiers, conditionals with <em>indien</em> (not <em>als</em>), nominalised verbs.</p>
<h3>Literary prose</h3>
<p>Prefers: varied sentence length, rhetorical figures, participial phrases, archaic constructions for effect, expressive word order.</p>
<h3>Key principle</h3>
<p>A native-level writer can code-switch effortlessly among these registers. The choice is never arbitrary: it signals the writer's relationship to the audience, the topic, and the genre.</p>`,
    sort: 5,
    examples: [
      { s: 'Er dient rekening gehouden te worden met de gestelde termijnen.', t: 'Account must be taken of the stated deadlines. (legal)', n: 'full passive, nominalized, formal' },
      { s: 'De minister ontkent elk verband. (journalistic)', t: 'The minister denies any connection.', n: 'active, short, vivid verb' },
      { s: 'In de stilte van de avond drong het besef tot hem door.', t: 'In the silence of the evening, the realisation dawned on him.', n: 'literary: fronted phrase, poetic verb' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // A1 — additional topics
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Numbers and Counting',
    slug: 'numbers-counting',
    level: 'A1',
    summary: 'Learn Dutch cardinal numbers (1–1,000,000) and ordinal numbers (eerste, tweede …).',
    body: `<h2>Numbers (Getallen)</h2>
<h3>Cardinal numbers 1–20</h3>
<table><thead><tr><th>1–10</th><th>11–20</th></tr></thead>
<tbody>
<tr><td>1 één / een</td><td>11 elf</td></tr>
<tr><td>2 twee</td><td>12 twaalf</td></tr>
<tr><td>3 drie</td><td>13 dertien</td></tr>
<tr><td>4 vier</td><td>14 veertien</td></tr>
<tr><td>5 vijf</td><td>15 vijftien</td></tr>
<tr><td>6 zes</td><td>16 zestien</td></tr>
<tr><td>7 zeven</td><td>17 zeventien</td></tr>
<tr><td>8 acht</td><td>18 achttien</td></tr>
<tr><td>9 negen</td><td>19 negentien</td></tr>
<tr><td>10 tien</td><td>20 twintig</td></tr>
</tbody></table>
<h3>Tens and compounds</h3>
<p>30 dertig · 40 veertig · 50 vijftig · 60 zestig · 70 zeventig · 80 tachtig · 90 negentig · 100 honderd · 1 000 duizend · 1 000 000 een miljoen</p>
<p>Compound numbers (21–99): <strong>unit + en + ten</strong>: 21 = <em>eenentwintig</em>, 45 = <em>vijfenveertig</em>.</p>
<h3>Ordinal numbers</h3>
<p>Add <strong>-de</strong> to most numbers, <strong>-ste</strong> after stems ending in -t or after 8, 19, 20+.</p>
<p>eerste (1st) · tweede · derde · vierde · vijfde … achtste · negende … twintigste · eenentwintigste.</p>
<h3>Usage tip</h3>
<p><em>één</em> (with accent) is used when counting or to avoid ambiguity. <em>een</em> (no accent) is the indefinite article.</p>`,
    sort: 7,
    examples: [
      { s: 'Ik heb drie broers en twee zussen.', t: 'I have three brothers and two sisters.', n: 'cardinal numbers in a sentence' },
      { s: 'Ze woont op de vierde verdieping.', t: 'She lives on the fourth floor.', n: 'ordinal: vierde (4th)' },
      { s: 'Er zijn drieëndertig studenten in de klas.', t: 'There are thirty-three students in the class.', n: 'compound: 3 + en + 30' },
    ],
  },

  {
    title: 'Telling the Time and Dates',
    slug: 'time-and-dates',
    level: 'A1',
    summary: 'Say the time (hoe laat is het?), days of the week, months and dates in Dutch.',
    body: `<h2>Time and Dates (Tijd en Datum)</h2>
<h3>Telling the time</h3>
<p><em>Hoe laat is het?</em> — What time is it?</p>
<ul>
<li>Exact hour: <em>Het is drie uur.</em> (It is three o'clock.)</li>
<li>Half past: <em>half vier</em> = half past three (Dutch counts to the next hour!)</li>
<li>Quarter past: <em>kwart over twee</em> (quarter past two)</li>
<li>Quarter to: <em>kwart voor vijf</em> (quarter to five)</li>
<li>Minutes past: <em>tien over acht</em> (ten past eight)</li>
<li>Minutes to: <em>tien voor negen</em> (ten to nine)</li>
</ul>
<h3>Days of the week (Dagen)</h3>
<p>maandag · dinsdag · woensdag · donderdag · vrijdag · zaterdag · zondag</p>
<h3>Months (Maanden)</h3>
<p>januari · februari · maart · april · mei · juni · juli · augustus · september · oktober · november · december</p>
<h3>Dates</h3>
<p><em>Vandaag is het woensdag 3 mei.</em> (Today is Wednesday 3 May.) — Use cardinal numbers for dates, not ordinals in speech.</p>`,
    sort: 8,
    examples: [
      { s: 'Het is kwart over drie.', t: 'It is quarter past three.', n: 'kwart over = quarter past' },
      { s: 'De vergadering begint om half elf.', t: 'The meeting starts at half past ten.', n: 'half elf = 10:30 (half to eleven)' },
      { s: 'Ik ben geboren op 14 februari.', t: 'I was born on 14 February.', n: 'op + cardinal number for dates' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // A2 — additional topics
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Continuous Aspect: aan het + infinitive',
    slug: 'continuous-aspect',
    level: 'A2',
    summary: "Express ongoing actions using 'zijn + aan het + infinitive', Dutch's equivalent of the -ing form.",
    body: `<h2>Continuous Aspect (Duratieve Constructie)</h2>
<p>Dutch does not have a separate continuous tense, but it expresses ongoing action with the construction:</p>
<p><strong>zijn + aan het + infinitive</strong></p>
<p>This is equivalent to English "to be doing something" and is very common in spoken Dutch.</p>
<h3>Present continuous</h3>
<p><em>Ik ben aan het lezen.</em> (I am reading.) · <em>Ze zijn aan het koken.</em> (They are cooking.)</p>
<h3>Past continuous</h3>
<p>Use the imperfect of <em>zijn</em>: <em>Hij was aan het werken.</em> (He was working.)</p>
<h3>Position</h3>
<p>The infinitive always comes at the end. <em>Aan het</em> stays together as a unit — nothing comes between them.</p>
<h3>Separable verbs</h3>
<p>Separable verbs stay together in this construction (unlike in main clauses): <em>Ze is aan het opruimen.</em> (She is tidying up.)</p>
<h3>Stative verbs</h3>
<p>State verbs (<em>weten, hebben, zijn, houden van</em>) are not normally used in the continuous.</p>`,
    sort: 9,
    examples: [
      { s: 'Sst! De baby is aan het slapen.', t: 'Shh! The baby is sleeping.', n: 'present continuous: zijn + aan het + inf.' },
      { s: 'Wat ben jij aan het doen?', t: 'What are you doing?', n: 'question form' },
      { s: 'We waren aan het eten toen hij belde.', t: 'We were eating when he called.', n: 'past continuous: was/waren + aan het' },
    ],
  },

  {
    title: 'Coordinating Conjunctions',
    slug: 'coordinating-conjunctions',
    level: 'A2',
    summary: 'Join clauses with en, maar, of, want, dus and dus — word order stays the same after these.',
    body: `<h2>Coordinating Conjunctions (Nevenschikkende Voegwoorden)</h2>
<p>Unlike subordinating conjunctions, coordinating conjunctions join two main clauses. The word order in each clause remains <strong>normal</strong> (verb in position 2).</p>
<table><thead><tr><th>Conjunction</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td>en</td><td>and</td><td>Ik werk en zij studeert.</td></tr>
<tr><td>maar</td><td>but</td><td>Het regent, maar we gaan toch.</td></tr>
<tr><td>of</td><td>or</td><td>Wil je koffie of thee?</td></tr>
<tr><td>want</td><td>because / for</td><td>Ik blijf thuis, want ik ben ziek.</td></tr>
<tr><td>dus</td><td>so / therefore</td><td>Het is laat, dus ik ga slapen.</td></tr>
<tr><td>noch</td><td>neither…nor</td><td>Hij werkt noch studeert.</td></tr>
</tbody></table>
<h3>Want vs omdat</h3>
<p><em>Want</em> is a coordinating conjunction — normal word order follows.<br>
<em>Omdat</em> is subordinating — verb goes to the end: <em>Ik blijf thuis omdat ik ziek ben.</em></p>`,
    sort: 10,
    examples: [
      { s: 'Ze is slim maar ook lui.', t: 'She is clever but also lazy.', n: 'maar joins adjective phrases' },
      { s: 'Ik heb honger, want ik heb niet gegeten.', t: 'I am hungry, because I have not eaten.', n: 'want = because (coord.) → normal word order' },
      { s: 'Het is duur, dus koop ik het niet.', t: 'It is expensive, so I am not buying it.', n: 'dus = therefore' },
    ],
  },

  {
    title: 'Prepositions of Time',
    slug: 'prepositions-time',
    level: 'A2',
    summary: "Use op, in, aan, om, voor, na, over, geleden and binnen to express time relationships.",
    body: `<h2>Prepositions of Time (Tijdsvoorzetsels)</h2>
<table><thead><tr><th>Preposition</th><th>Use</th><th>Example</th></tr></thead>
<tbody>
<tr><td>op</td><td>days of the week; dates</td><td>op maandag · op 3 mei</td></tr>
<tr><td>in</td><td>months; seasons; years; parts of day</td><td>in juni · in de winter · in 2024 · in de ochtend</td></tr>
<tr><td>aan</td><td>parts of day (formal)</td><td>aan het begin van de avond</td></tr>
<tr><td>om</td><td>clock times</td><td>om negen uur · om half twee</td></tr>
<tr><td>voor</td><td>before</td><td>voor het eten · voor drie uur</td></tr>
<tr><td>na</td><td>after</td><td>na het werk · na vijf uur</td></tr>
<tr><td>over</td><td>in (from now)</td><td>over een week · over tien minuten</td></tr>
<tr><td>geleden</td><td>ago (follows the time span)</td><td>twee jaar geleden · een uur geleden</td></tr>
<tr><td>binnen</td><td>within (a time span)</td><td>binnen een uur · binnen drie dagen</td></tr>
<tr><td>tijdens</td><td>during</td><td>tijdens de vergadering</td></tr>
</tbody></table>`,
    sort: 11,
    examples: [
      { s: 'De les begint om negen uur.', t: 'The class starts at nine o\'clock.', n: 'om + clock time' },
      { s: 'Hij is twee weken geleden vertrokken.', t: 'He left two weeks ago.', n: 'time span + geleden' },
      { s: 'We zien elkaar over een maand.', t: 'We will see each other in a month.', n: 'over = in (future)' },
    ],
  },

  {
    title: 'Degree Words and Intensifiers',
    slug: 'degree-words',
    level: 'A2',
    summary: 'Strengthen or soften adjectives and adverbs with heel, erg, vrij, nogal, tamelijk, behoorlijk and zo.',
    body: `<h2>Degree Words and Intensifiers (Graadwoorden)</h2>
<p>Degree words modify adjectives and adverbs to indicate the strength of a quality.</p>
<h3>Intensifiers (stronger)</h3>
<table><thead><tr><th>Word</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td>heel / erg</td><td>very</td><td>heel mooi · erg moe</td></tr>
<tr><td>enorm / ontzettend</td><td>enormously / terribly</td><td>ontzettend leuk</td></tr>
<tr><td>buitengewoon</td><td>extraordinarily</td><td>buitengewoon interessant</td></tr>
<tr><td>zo</td><td>so</td><td>zo groot!</td></tr>
<tr><td>te</td><td>too (negative excess)</td><td>te duur · te laat</td></tr>
</tbody></table>
<h3>Downtoners (softer / moderate)</h3>
<table><thead><tr><th>Word</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>vrij</td><td>fairly / quite</td></tr>
<tr><td>nogal</td><td>rather / quite (often negative)</td></tr>
<tr><td>tamelijk / behoorlijk</td><td>fairly / reasonably</td></tr>
<tr><td>enigszins / een beetje</td><td>somewhat / a little</td></tr>
<tr><td>nauwelijks / amper</td><td>hardly / barely</td></tr>
</tbody></table>
<h3>Heel vs erg</h3>
<p>Both mean "very". <em>Heel</em> is slightly more neutral; <em>erg</em> can also mean "bad/terrible" as an adjective: <em>Dat is erg!</em> (That is terrible!)</p>`,
    sort: 12,
    examples: [
      { s: 'Het was erg koud gisteren.', t: 'It was very cold yesterday.', n: 'erg + adjective' },
      { s: 'De film was vrij lang maar behoorlijk goed.', t: 'The film was fairly long but reasonably good.', n: 'vrij and behoorlijk as downtoners' },
      { s: 'Dit is te moeilijk voor mij.', t: 'This is too difficult for me.', n: 'te = too (excess)' },
    ],
  },

  {
    title: 'Dutch Spelling Rules',
    slug: 'spelling-rules',
    level: 'A2',
    summary: 'Master the core spelling rules: short vs long vowels, consonant doubling and the open/closed syllable principle.',
    body: `<h2>Dutch Spelling Rules (Spellingregels)</h2>
<p>Dutch spelling is largely phonemic — it represents pronunciation. Two main rules govern most spellings.</p>
<h3>Open vs closed syllable</h3>
<p>A <strong>closed syllable</strong> ends in a consonant: <em>man, kat, bed</em> — the vowel is short.<br>
An <strong>open syllable</strong> ends in a vowel: <em>ma-ken, le-ven</em> — the vowel is long (and spelled single).</p>
<h3>Rule 1: Consonant doubling</h3>
<p>When a short-vowel syllable would become open (e.g. by adding an ending), double the consonant to keep it closed:</p>
<p><em>man → mannen</em> (not manen) · <em>kat → katten</em> · <em>zit → zitten</em></p>
<h3>Rule 2: Vowel simplification</h3>
<p>A long vowel written double (<em>aa, ee, oo, uu</em>) simplifies to single when the syllable becomes open:</p>
<p><em>maan → manen</em> · <em>boom → bomen</em> · <em>raam → ramen</em></p>
<h3>The v/f and z/s alternation</h3>
<p>Final devoicing: voiced fricatives become voiceless at the end of a word, but voice returns before a vowel ending:</p>
<p><em>brief → brieven</em> · <em>huis → huizen</em> · <em>grijs → grijze</em></p>
<h3>The -ij and -ei sounds</h3>
<p>Both spell the diphthong /ɛi/. <em>-ij</em> is more common in native Dutch words; <em>-ei</em> occurs in a fixed set of words. Must be memorised: <em>rijst, trein, klein</em> (ij) vs <em>ei, leider, feest</em> (ei).</p>`,
    sort: 13,
    examples: [
      { s: 'één man → twee mannen', t: 'one man → two men', n: 'short vowel: double n before -en' },
      { s: 'de boom → de bomen', t: 'the tree → the trees', n: 'long vowel: oo → o in open syllable' },
      { s: 'de brief → de brieven', t: 'the letter → the letters', n: 'f → v before vowel suffix' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // B1 — additional topics
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'The Imperative',
    slug: 'imperative',
    level: 'B1',
    summary: 'Give commands, instructions and invitations using the Dutch imperative (gebiedende wijs).',
    body: `<h2>The Imperative (Gebiedende Wijs)</h2>
<p>The Dutch imperative is used for commands, instructions, invitations and requests.</p>
<h3>Formation</h3>
<p>The imperative is simply the <strong>verb stem</strong> (infinitive minus -en):</p>
<p><em>werken → Werk!</em> · <em>komen → Kom!</em> · <em>luisteren → Luister!</em></p>
<h3>Plural / formal imperative</h3>
<p>For <em>jullie</em> (plural) or <em>u</em> (formal), use the full infinitive or add <em>u</em>:<br>
<em>Kom binnen.</em> / <em>Komt u binnen.</em> (Please come in. — formal)</p>
<h3>Softening the imperative</h3>
<p>Adding particles makes commands more polite or gentle:</p>
<ul>
<li><em>maar</em> — Go ahead: <em>Ga maar zitten.</em> (Please sit down.)</li>
<li><em>even</em> — Just: <em>Wacht even.</em> (Just wait.)</li>
<li><em>toch</em> — Please (urging): <em>Kom toch binnen!</em> (Do come in!)</li>
<li><em>eens</em> — Just once / if you would: <em>Vertel eens.</em> (Tell me.)</li>
</ul>
<h3>Separable verbs</h3>
<p>The prefix moves to the end: <em>Sta op!</em> (Stand up!) · <em>Bel me op.</em> (Call me.)</p>
<h3>Negative imperative</h3>
<p>Place <em>niet</em> after the verb: <em>Wacht niet zo lang.</em> (Don't wait so long.)</p>`,
    sort: 9,
    examples: [
      { s: 'Sluit de deur, alsjeblieft.', t: 'Close the door, please.', n: 'stem: sluiten → sluit' },
      { s: 'Ga maar zitten.', t: 'Please sit down.', n: 'maar softens the command' },
      { s: 'Sta op en doe het raam open.', t: 'Stand up and open the window.', n: 'two separable verb imperatives' },
    ],
  },

  {
    title: 'Conditional Sentences',
    slug: 'conditional-sentences',
    level: 'B1',
    summary: "Build real and hypothetical conditional sentences using als/indien...dan and the correct tense pairings.",
    body: `<h2>Conditional Sentences (Voorwaardelijke Zinnen)</h2>
<h3>Real / open conditionals (type 1)</h3>
<p>The condition is plausible. Use present tense in both clauses:</p>
<p><em>Als het morgen mooi is, gaan we naar het strand.</em><br>
(If it is nice tomorrow, we will go to the beach.)</p>
<h3>Hypothetical conditionals (type 2)</h3>
<p>The condition is imagined or unlikely. Use imperfect in the <em>als</em>-clause and <em>zou(den) + infinitive</em> in the main clause:</p>
<p><em>Als ik meer geld had, zou ik een huis kopen.</em><br>
(If I had more money, I would buy a house.)</p>
<h3>Counterfactual / impossible (type 3)</h3>
<p>The condition did not happen. Use past perfect in the <em>als</em>-clause and <em>zou(den) + have + participle</em> in the main clause:</p>
<p><em>Als ik harder had gewerkt, zou ik geslaagd zijn.</em><br>
(If I had worked harder, I would have passed.)</p>
<h3>Als vs indien</h3>
<p><em>Indien</em> is the formal written equivalent of <em>als</em>. It never means "when".</p>
<h3>Word order</h3>
<p>The <em>als</em>-clause is a subordinate clause (verb to end). If it comes first, the main clause inverts.</p>`,
    sort: 10,
    examples: [
      { s: 'Als je hard werkt, slaag je.', t: 'If you work hard, you will pass.', n: 'type 1: present + present' },
      { s: 'Als ik jou was, zou ik het niet doen.', t: 'If I were you, I would not do it.', n: 'type 2: imperfect + zou' },
      { s: 'Als ze eerder was gekomen, had ze hem gezien.', t: 'If she had come earlier, she would have seen him.', n: 'type 3: past perfect + zou hebben' },
    ],
  },

  {
    title: 'Adverbial Infinitives: door te, zonder te, in plaats van te',
    slug: 'adverbial-infinitives',
    level: 'B1',
    summary: 'Express manner, absence and substitution using door te, zonder te and in plaats van te + infinitive.',
    body: `<h2>Adverbial Infinitives</h2>
<p>Dutch has three important preposition + <em>te</em> + infinitive constructions that function as adverbial clauses.</p>
<h3>door te + infinitive — by doing</h3>
<p>Expresses means or manner:</p>
<p><em>Ze verbeterde haar Nederlands door elke dag te lezen.</em><br>
(She improved her Dutch by reading every day.)</p>
<h3>zonder te + infinitive — without doing</h3>
<p>Expresses the absence of an accompanying action:</p>
<p><em>Hij vertrok zonder afscheid te nemen.</em><br>
(He left without saying goodbye.)</p>
<h3>in plaats van te + infinitive — instead of doing</h3>
<p>Expresses substitution:</p>
<p><em>In plaats van te slapen, bleef ze lezen.</em><br>
(Instead of sleeping, she kept reading.)</p>
<h3>Word order rules</h3>
<p>The infinitive goes at the end. With separable verbs, the prefix attaches: <em>door vroeg op te staan</em>, <em>zonder op te staan</em>.</p>
<p>These constructions require that the implied subject is the <strong>same</strong> as the main clause subject.</p>`,
    sort: 11,
    examples: [
      { s: 'Je leert taal door veel te oefenen.', t: 'You learn a language by practising a lot.', n: 'door te = by doing' },
      { s: 'Ze ging weg zonder iets te zeggen.', t: 'She left without saying anything.', n: 'zonder te = without doing' },
      { s: 'In plaats van te wachten, belde hij.', t: 'Instead of waiting, he called.', n: 'in plaats van te = instead of doing' },
    ],
  },

  {
    title: 'Temporal Conjunctions: toen vs wanneer',
    slug: 'temporal-conjunctions',
    level: 'B1',
    summary: "Distinguish toen (past, one-time) from wanneer (habitual/future) and learn other temporal connectors.",
    body: `<h2>Temporal Conjunctions (Tijdsbijwoorden en Voegwoorden)</h2>
<h3>Toen vs Wanneer</h3>
<p>Both translate as "when" in English, but they are <strong>not interchangeable</strong> in Dutch.</p>
<table><thead><tr><th></th><th>Toen</th><th>Wanneer</th></tr></thead>
<tbody>
<tr><td>Use for</td><td>A specific past moment or event (one-time)</td><td>Habitual past events; present/future conditions; indirect questions</td></tr>
<tr><td>Example</td><td><em>Toen ik klein was…</em></td><td><em>Wanneer ik moe ben, slaap ik vroeg.</em></td></tr>
</tbody></table>
<h3>Other temporal conjunctions</h3>
<table><thead><tr><th>Conjunction</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>terwijl</td><td>while (simultaneous)</td></tr>
<tr><td>zodra</td><td>as soon as</td></tr>
<tr><td>nadat</td><td>after (requires past perfect in the nadat-clause)</td></tr>
<tr><td>voordat / voor</td><td>before</td></tr>
<tr><td>totdat / tot</td><td>until</td></tr>
<tr><td>zolang</td><td>as long as</td></tr>
<tr><td>sindsdien / sindsdien dat</td><td>since (= from that point)</td></tr>
</tbody></table>`,
    sort: 12,
    examples: [
      { s: 'Toen ik aankwam, was hij al weg.', t: 'When I arrived, he was already gone.', n: 'toen = specific past event' },
      { s: 'Wanneer ze ziek is, drinkt ze veel thee.', t: 'When(ever) she is sick, she drinks a lot of tea.', n: 'wanneer = habitual' },
      { s: 'Bel me zodra je klaar bent.', t: 'Call me as soon as you are done.', n: 'zodra = as soon as' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // B2 — additional topics
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Genitive Constructions',
    slug: 'genitive-constructions',
    level: 'B2',
    summary: "Express possession and relationships using van, the 's genitive and set genitive phrases.",
    body: `<h2>Genitive Constructions (Genitiefconstructies)</h2>
<p>Modern Dutch mostly uses <em>van</em> to express possession, but several other forms survive.</p>
<h3>Van + noun (most common)</h3>
<p><em>de auto van mijn vader</em> (my father's car) · <em>het einde van de film</em></p>
<h3>The 's genitive</h3>
<p>Used with <strong>proper names and personal nouns</strong> — append 's directly (no apostrophe before the s in Dutch):</p>
<p><em>Annas boek</em> · <em>moeders keuken</em> · <em>Nederlanders taal</em></p>
<p>If the name ends in s, x or z, use an apostrophe only: <em>Thomas' auto</em>.</p>
<h3>Formal and fixed genitives</h3>
<p>Genitive forms with <em>des / der / van het / van de</em> survive in official titles, set phrases and legal language:</p>
<ul>
<li><em>de minister des konings</em> (the king's minister — archaic/formal)</li>
<li><em>in het belang der gemeenschap</em> (in the interest of the community)</li>
<li><em>ten tijde van</em> (at the time of)</li>
</ul>
<h3>Genitive pronouns</h3>
<p>Possessive pronouns (<em>mijn, jouw, zijn, haar, ons/onze</em>) also express the genitive relationship.</p>`,
    sort: 9,
    examples: [
      { s: "Jans fiets staat voor de deur.", t: "Jan's bicycle is in front of the door.", n: "'s genitive with proper name" },
      { s: 'Het huis van de buurman is groot.', t: "The neighbour's house is big.", n: 'van + noun (most common)' },
      { s: 'In het belang van alle betrokkenen.', t: 'In the interest of all involved.', n: 'formal genitive phrase' },
    ],
  },

  {
    title: 'Verb + Preposition Collocations',
    slug: 'verb-preposition',
    level: 'B2',
    summary: 'Learn which preposition each common Dutch verb requires — these cannot be predicted from English.',
    body: `<h2>Verb + Preposition Collocations</h2>
<p>Many Dutch verbs require a fixed preposition that may differ from English. These must be memorised.</p>
<h3>Common collocations</h3>
<table><thead><tr><th>Verb</th><th>Preposition</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td>wachten</td><td>op</td><td>wait for</td><td>wachten op de bus</td></tr>
<tr><td>kijken</td><td>naar</td><td>look at / watch</td><td>kijken naar de televisie</td></tr>
<tr><td>luisteren</td><td>naar</td><td>listen to</td><td>luisteren naar muziek</td></tr>
<tr><td>denken</td><td>aan</td><td>think about / of</td><td>denken aan de vakantie</td></tr>
<tr><td>praten / spreken</td><td>over / met</td><td>talk about / with</td><td>praten over het werk</td></tr>
<tr><td>houden</td><td>van</td><td>like / love</td><td>houden van chocolade</td></tr>
<tr><td>zorgen</td><td>voor</td><td>take care of</td><td>zorgen voor de kinderen</td></tr>
<tr><td>geloven</td><td>in</td><td>believe in</td><td>geloven in jezelf</td></tr>
<tr><td>beginnen</td><td>met / aan</td><td>begin (an activity / a task)</td><td>beginnen met eten</td></tr>
<tr><td>stoppen</td><td>met</td><td>stop doing</td><td>stoppen met roken</td></tr>
<tr><td>bedanken</td><td>voor</td><td>thank for</td><td>bedanken voor de hulp</td></tr>
<tr><td>twijfelen</td><td>aan</td><td>doubt</td><td>twijfelen aan zijn keuze</td></tr>
</tbody></table>
<h3>Pronominal adverbs</h3>
<p>When the object is a non-person thing, replace <em>preposition + het/dat</em> with a <em>waar-</em> compound: <em>Ik wacht erop.</em> (I am waiting for it.)</p>`,
    sort: 10,
    examples: [
      { s: 'Ik hou van kaas en haring.', t: 'I love cheese and herring.', n: 'houden van = to love/like' },
      { s: 'Ben je gestopt met roken?', t: 'Have you stopped smoking?', n: 'stoppen met + infinitive' },
      { s: 'Luister jij ook naar klassieke muziek?', t: 'Do you also listen to classical music?', n: 'luisteren naar = listen to' },
    ],
  },

  {
    title: 'Numerals and Quantifiers',
    slug: 'numerals-quantifiers',
    level: 'B2',
    summary: 'Use fractions, percentages, collective numerals and vague quantifiers like tal van, enkele, een aantal.',
    body: `<h2>Numerals and Quantifiers (Telwoorden en Kwantoren)</h2>
<h3>Fractions</h3>
<p>½ = <em>een half / de helft</em> · ⅓ = <em>een derde</em> · ¾ = <em>drie kwart</em></p>
<p><em>De helft van de studenten slaagt.</em> (Half of the students pass.)</p>
<h3>Percentages</h3>
<p><em>procent</em> (percent): <em>Twintig procent van de bevolking</em>.</p>
<h3>Approximate numbers</h3>
<p><em>een stuk of tien</em> (about ten) · <em>tientallen</em> (tens of) · <em>honderden</em> (hundreds of) · <em>duizenden</em> (thousands of)</p>
<h3>Collective numerals</h3>
<p><em>beiden / allebei</em> (both) · <em>alle drie</em> (all three) · <em>met z'n tweeën</em> (the two of us)</p>
<h3>Vague quantifiers</h3>
<table><thead><tr><th>Quantifier</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>enkele / een paar</td><td>a few / a couple of</td></tr>
<tr><td>verscheidene / diverse</td><td>several / various</td></tr>
<tr><td>tal van / talrijke</td><td>numerous</td></tr>
<tr><td>een groot aantal</td><td>a large number of</td></tr>
<tr><td>de meeste</td><td>most (of)</td></tr>
<tr><td>weinig / een beetje</td><td>little / few (uncountable/countable)</td></tr>
</tbody></table>`,
    sort: 11,
    examples: [
      { s: 'Tweederde van de stemmen was voor.', t: 'Two-thirds of the votes were in favour.', n: 'fraction as subject' },
      { s: 'Ze heeft een stuk of vijf pogingen gedaan.', t: 'She made about five attempts.', n: 'approximate: een stuk of vijf' },
      { s: 'Tal van wetenschappers betwisten dit.', t: 'Numerous scientists dispute this.', n: 'tal van = numerous' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C1 — additional topics
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Modal Particles',
    slug: 'modal-particles',
    level: 'C1',
    summary: 'Master Dutch modal particles — wel, even, toch, maar, hoor, eens, gewoon — that add nuance to utterances.',
    body: `<h2>Modal Particles (Modale Partikels)</h2>
<p>Modal particles are small words that modify the <em>pragmatic force</em> of a sentence — expressing the speaker's attitude, managing expectations, or signalling social relationships. They are extremely common in spoken Dutch but largely absent from formal writing.</p>
<h3>Key particles and their effects</h3>
<table><thead><tr><th>Particle</th><th>Core effect</th><th>Example</th></tr></thead>
<tbody>
<tr><td>wel</td><td>affirms against expected negative; emphasis</td><td><em>Ik wil het wel proberen.</em> (I am willing to try.)</td></tr>
<tr><td>even</td><td>briefly; a quick action (softens requests)</td><td><em>Kun je even wachten?</em> (Could you wait just a moment?)</td></tr>
<tr><td>toch</td><td>against expectation; urging; concessive</td><td><em>Doe het toch!</em> (Just do it!) / <em>Je weet het toch?</em> (You do know, don't you?)</td></tr>
<tr><td>maar</td><td>go ahead; reassurance; mild urging</td><td><em>Ga maar zitten.</em> (Please sit down.)</td></tr>
<tr><td>hoor</td><td>reassurance; friendly emphasis (end of utterance)</td><td><em>Dat is prima, hoor.</em> (That is perfectly fine, don't worry.)</td></tr>
<tr><td>eens</td><td>tentative; one-time suggestion</td><td><em>Probeer eens kalm te blijven.</em> (Try to stay calm.)</td></tr>
<tr><td>gewoon</td><td>simply; it's obvious / no big deal</td><td><em>Doe het gewoon.</em> (Just do it / it's simple.)</td></tr>
<tr><td>eigenlijk</td><td>actually; expectation-contrary</td><td><em>Dat is eigenlijk best interessant.</em> (That is actually quite interesting.)</td></tr>
</tbody></table>`,
    sort: 7,
    examples: [
      { s: 'Ik snap het wel, maar ik ben het er niet mee eens.', t: 'I do understand it, but I do not agree with it.', n: 'wel affirms against expected negative' },
      { s: 'Dat wist je toch?', t: "You did know that, didn't you?", n: 'toch seeks confirmation of shared knowledge' },
      { s: 'Kom maar binnen, hoor.', t: 'Do come in, no problem.', n: 'maar urges; hoor reassures' },
    ],
  },

  {
    title: 'Advanced Negation',
    slug: 'advanced-negation',
    level: 'C1',
    summary: 'Express nuanced negation with nauwelijks, amper, geenszins, allerminst, niet meer and negative concord.',
    body: `<h2>Advanced Negation</h2>
<p>Beyond the basic <em>niet / geen</em>, Dutch has a rich set of negation words for precise, nuanced expression.</p>
<h3>Near-negatives (scalar)</h3>
<table><thead><tr><th>Word</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td>nauwelijks</td><td>hardly / scarcely</td><td><em>Ze kon nauwelijks lopen.</em></td></tr>
<tr><td>amper</td><td>barely (informal)</td><td><em>Hij heeft amper geslapen.</em></td></tr>
<tr><td>zelden / zelden of nooit</td><td>seldom / rarely if ever</td><td><em>Ze belt zelden.</em></td></tr>
<tr><td>nagenoeg niet</td><td>next to nothing / virtually not</td><td><em>Er is nagenoeg geen verschil.</em></td></tr>
</tbody></table>
<h3>Strong negatives</h3>
<table><thead><tr><th>Word</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>geenszins</td><td>by no means (formal)</td></tr>
<tr><td>allerminst</td><td>least of all / not at all</td></tr>
<tr><td>kosten noch moeite sparen</td><td>spare no effort (idiom)</td></tr>
<tr><td>noch…noch</td><td>neither…nor</td></tr>
</tbody></table>
<h3>Aspectual negation</h3>
<p><em>niet meer</em> = no longer · <em>nog niet</em> = not yet · <em>nooit meer</em> = never again · <em>geen…meer</em> = no more (noun)</p>
<h3>Negative concord</h3>
<p>Standard Dutch avoids double negation (<em>*Ik wil niks niet</em>), but informal/dialectal Dutch sometimes uses it for emphasis.</p>`,
    sort: 8,
    examples: [
      { s: 'Ze had nauwelijks tijd om te eten.', t: 'She had hardly any time to eat.', n: 'nauwelijks = hardly' },
      { s: 'Dit is geenszins wat we hadden verwacht.', t: 'This is by no means what we had expected.', n: 'geenszins = formal strong negative' },
      { s: 'Hij woont hier niet meer.', t: 'He no longer lives here.', n: 'niet meer = no longer (aspectual)' },
    ],
  },

  {
    title: 'Left-Dislocation and Hanging Topic',
    slug: 'left-dislocation',
    level: 'C1',
    summary: 'Use left-dislocation and the hanging topic construction to foreground information in spoken and informal Dutch.',
    body: `<h2>Left-Dislocation and Hanging Topic</h2>
<p>These constructions place a noun phrase at the very start of the sentence, outside the normal clause, and then resume with a pronoun inside the clause. They are very common in spoken Dutch.</p>
<h3>Left-dislocation (Linksdislocatie)</h3>
<p>A noun phrase is placed before the clause and resumed by a pronoun:</p>
<p><em>Die man, die ken ik wel.</em> (That man — I know him.)<br>
<em>Jan z'n auto, die staat buiten.</em> (Jan's car — it is outside.)</p>
<h3>Hanging topic (Hangend topic)</h3>
<p>The topic is introduced without case marking and the clause follows normally:</p>
<p><em>Mijn vader, die werkt in Rotterdam.</em> (My father, he works in Rotterdam.)</p>
<h3>Difference from topicalisation</h3>
<p>In topicalisation (fronting) the noun phrase is <em>inside</em> the clause in position 1 and causes inversion: <em>Die man ken ik wel.</em><br>
In left-dislocation it is <em>outside</em> the clause and is followed by a full clause including a resumptive pronoun.</p>
<h3>Function</h3>
<p>Both constructions signal that the fronted element is the topic the speaker is commenting on. Very common in informal conversation; less acceptable in formal written Dutch.</p>`,
    sort: 9,
    examples: [
      { s: 'Die film, die heb ik al drie keer gezien.', t: 'That film — I have already seen it three times.', n: 'left-dislocation: NP + resumptive die' },
      { s: 'Het boek, dat snap ik niet.', t: 'The book — I do not understand it.', n: 'dat resumes het-noun' },
      { s: 'Amsterdam, dat is een fantastische stad.', t: 'Amsterdam — that is a fantastic city.', n: 'hanging topic with resumptive dat' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // C2 — additional topics
  // ═══════════════════════════════════════════════════════════════
  {
    title: 'Bureaucratic and Official Language',
    slug: 'bureaucratic-language',
    level: 'C2',
    summary: 'Decode and produce the formulaic, passive-heavy language of Dutch official documents, letters and regulations.',
    body: `<h2>Bureaucratic and Official Language (Ambtelijke Taal)</h2>
<p>Dutch official writing — government letters, legal documents, regulations, official correspondence — follows conventions that differ sharply from everyday language.</p>
<h3>Key features</h3>
<ul>
<li><strong>Full passive constructions:</strong> <em>Er dient rekening gehouden te worden met…</em> (Account must be taken of…)</li>
<li><strong>Nominalised verbs:</strong> <em>de vaststelling van de feiten</em> (the establishment of the facts) rather than <em>de feiten vaststellen</em></li>
<li><strong>Impersonal constructions:</strong> <em>men, er wordt, door de betrokkene</em></li>
<li><strong>Stacked prepositional phrases:</strong> <em>in het kader van de uitvoering van het beleid</em></li>
<li><strong>Modal auxiliaries for obligation:</strong> <em>dienen te, dient te, teneinde te</em></li>
<li><strong>Formal connectors:</strong> <em>derhalve, bijgevolg, teneinde, ingevolge, overeenkomstig</em></li>
</ul>
<h3>Common formulaic expressions</h3>
<p><em>Naar aanleiding van uw brief van…</em> (Further to your letter of…)<br>
<em>Hierbij bevestig ik dat…</em> (I hereby confirm that…)<br>
<em>Gaarne uw reactie tegemoet ziend…</em> (Awaiting your reply…)<br>
<em>Hoogachtend</em> (Yours sincerely — formal closing)</p>
<h3>Plain language movement</h3>
<p>The Dutch government promotes <em>Duidelijke Taal</em> (Plain Language). Knowing bureaucratic language lets you both decode it and rewrite it more clearly.</p>`,
    sort: 6,
    examples: [
      { s: 'Ingevolge artikel 3 dient u de formulieren in te dienen.', t: 'Pursuant to Article 3, you are required to submit the forms.', n: 'ingevolge = pursuant to; dienen te = must' },
      { s: 'Naar aanleiding van uw verzoek delen wij u mede dat…', t: 'Further to your request, we inform you that…', n: 'formulaic opening of official letter' },
      { s: 'Teneinde de procedure te bespoedigen, verzoeken wij u…', t: 'In order to expedite the procedure, we request you to…', n: 'teneinde = in order to (very formal)' },
    ],
  },

  {
    title: 'Dutch Sentence Rhythm and Prosody',
    slug: 'sentence-rhythm',
    level: 'C2',
    summary: 'Understand sentence stress, information structure, and how Dutch prosody signals given vs new information.',
    body: `<h2>Sentence Rhythm and Prosody (Zinsritme en Prosodie)</h2>
<p>At C2 level, awareness of prosody — how stress, rhythm and intonation shape meaning — distinguishes a near-native speaker from a fluent one.</p>
<h3>Dutch stress patterns</h3>
<p>Dutch words have one primary stressed syllable: <em>BE-grip, ver-AN-der-ing, on-der-ZOEK</em>.<br>
Compounds stress the first element: <em>HUIS-werk, BOOM-gaard</em>.</p>
<h3>Sentence accent: new information</h3>
<p>The most prominent stress in a sentence falls on the <strong>new information</strong> (focus), typically near the end:</p>
<p><em>Ik heb dat BOEK gelezen.</em> (neutral) vs <em>ÍK heb dat boek gelezen.</em> (contrast: I, not someone else)</p>
<h3>Given vs new information</h3>
<p>Given (known) information is de-accented and often reduced; new information gets nuclear stress. This explains why <em>er</em> is used for new subjects:</p>
<p><em>Er staat een FIETS voor de deur.</em> — new information (the bicycle).</p>
<h3>Intonation</h3>
<p>Statements fall at the end. Yes/no questions often rise (in informal Dutch). Tag questions (<em>…, toch? …, hè? …, of niet?</em>) are frequent and prosodically important.</p>`,
    sort: 7,
    examples: [
      { s: 'Ik heb dat boek GELEZEN. (neutral focus)', t: 'I have READ that book.', n: 'nuclear stress on verb = neutral' },
      { s: 'ÍK heb dat boek gelezen. (contrastive)', t: 'I have read that book (not you).', n: 'stress on subject = contrastive focus' },
      { s: 'Je komt toch wel, hè?', t: "You are coming though, aren't you?", n: 'toch + hè = tag seeking confirmation' },
    ],
  },
];
