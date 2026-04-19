import { getDb } from './index';
import { wordsA1 } from './data/words-a1';
import { wordsA2 } from './data/words-a2';
import { wordsB1 } from './data/words-b1';
import { wordsB2 } from './data/words-b2';
import { wordsC1 } from './data/words-c1';
import { wordsC2 } from './data/words-c2';
import { grammarTopics as extraGrammarTopics } from './data/grammar-topics';

const db = getDb();

// ─── Migrations (add new columns to existing DBs) ────────────────────────────
// Add category column to words table (safe if already exists)
try { db.exec("ALTER TABLE words ADD COLUMN category TEXT NOT NULL DEFAULT 'General'"); } catch { /* already exists */ }

const subscriptionCols = [
  'ALTER TABLE users ADD COLUMN mollie_customer_id TEXT',
  'ALTER TABLE users ADD COLUMN mollie_subscription_id TEXT',
  "ALTER TABLE users ADD COLUMN subscription_status TEXT NOT NULL DEFAULT 'free'",
  'ALTER TABLE users ADD COLUMN subscription_ends_at INTEGER',
];
for (const sql of subscriptionCols) {
  try { db.exec(sql); } catch { /* column already exists */ }
}
db.exec(`
  CREATE TABLE IF NOT EXISTS subscription_events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type  TEXT    NOT NULL,
    payload     TEXT,
    created_at  INTEGER NOT NULL DEFAULT (unixepoch())
  )
`);

// ─── Words ────────────────────────────────────────────────────────────────────
// Legacy inline words (kept for backwards compatibility - OR IGNORE deduplicates)
const words = [
  // A1 – Beginner
  { word: 'huis', translation: 'house', pos: 'noun', level: 'A1', ex: 'Ik woon in een huis.', ex_t: 'I live in a house.' },
  { word: 'eten', translation: 'to eat', pos: 'verb', level: 'A1', ex: 'Ik eet een appel.', ex_t: 'I eat an apple.' },
  { word: 'groot', translation: 'big', pos: 'adjective', level: 'A1', ex: 'De hond is groot.', ex_t: 'The dog is big.' },
  { word: 'goed', translation: 'good / well', pos: 'adverb', level: 'A1', ex: 'Ze spreekt goed Nederlands.', ex_t: 'She speaks Dutch well.' },
  { word: 'water', translation: 'water', pos: 'noun', level: 'A1', ex: 'Mag ik water?', ex_t: 'May I have water?' },
  { word: 'drinken', translation: 'to drink', pos: 'verb', level: 'A1', ex: 'Hij drinkt koffie.', ex_t: 'He drinks coffee.' },
  { word: 'klein', translation: 'small', pos: 'adjective', level: 'A1', ex: 'De kat is klein.', ex_t: 'The cat is small.' },
  { word: 'ja', translation: 'yes', pos: 'interjection', level: 'A1', ex: 'Ja, dat klopt.', ex_t: 'Yes, that is correct.' },
  { word: 'nee', translation: 'no', pos: 'interjection', level: 'A1', ex: 'Nee, ik wil niet.', ex_t: 'No, I do not want to.' },
  { word: 'werken', translation: 'to work', pos: 'verb', level: 'A1', ex: 'Ik werk in Amsterdam.', ex_t: 'I work in Amsterdam.' },
  { word: 'dag', translation: 'day / hello', pos: 'noun', level: 'A1', ex: 'Goede dag!', ex_t: 'Good day!' },
  { word: 'school', translation: 'school', pos: 'noun', level: 'A1', ex: 'De kinderen gaan naar school.', ex_t: 'The children go to school.' },
  { word: 'auto', translation: 'car', pos: 'noun', level: 'A1', ex: 'De auto is rood.', ex_t: 'The car is red.' },
  { word: 'mooi', translation: 'beautiful / nice', pos: 'adjective', level: 'A1', ex: 'Wat een mooi huis!', ex_t: 'What a beautiful house!' },
  { word: 'gaan', translation: 'to go', pos: 'verb', level: 'A1', ex: 'We gaan naar de markt.', ex_t: 'We go to the market.' },
  { word: 'kind', translation: 'child', pos: 'noun', level: 'A1', ex: 'Het kind speelt in de tuin.', ex_t: 'The child plays in the garden.' },
  { word: 'man', translation: 'man', pos: 'noun', level: 'A1', ex: 'De man werkt hard.', ex_t: 'The man works hard.' },
  { word: 'vrouw', translation: 'woman', pos: 'noun', level: 'A1', ex: 'De vrouw leest een boek.', ex_t: 'The woman reads a book.' },
  { word: 'nieuw', translation: 'new', pos: 'adjective', level: 'A1', ex: 'Ik heb een nieuw boek.', ex_t: 'I have a new book.' },
  { word: 'oud', translation: 'old', pos: 'adjective', level: 'A1', ex: 'De brug is oud.', ex_t: 'The bridge is old.' },

  // A2 – Elementary
  { word: 'begrijpen', translation: 'to understand', pos: 'verb', level: 'A2', ex: 'Ik begrijp je niet.', ex_t: 'I do not understand you.' },
  { word: 'misschien', translation: 'maybe / perhaps', pos: 'adverb', level: 'A2', ex: 'Misschien kom ik morgen.', ex_t: 'Maybe I will come tomorrow.' },
  { word: 'helpen', translation: 'to help', pos: 'verb', level: 'A2', ex: 'Kan je me helpen?', ex_t: 'Can you help me?' },
  { word: 'zeker', translation: 'certain / sure', pos: 'adjective', level: 'A2', ex: 'Dat is zeker waar.', ex_t: 'That is certainly true.' },
  { word: 'vroeg', translation: 'early', pos: 'adjective', level: 'A2', ex: 'Ze staat vroeg op.', ex_t: 'She gets up early.' },
  { word: 'laat', translation: 'late', pos: 'adjective', level: 'A2', ex: 'Hij komt altijd laat.', ex_t: 'He always comes late.' },
  { word: 'omdat', translation: 'because', pos: 'conjunction', level: 'A2', ex: 'Ik blijf thuis omdat ik ziek ben.', ex_t: 'I stay home because I am sick.' },
  { word: 'maar', translation: 'but', pos: 'conjunction', level: 'A2', ex: 'Ik wil gaan, maar ik kan niet.', ex_t: 'I want to go, but I cannot.' },
  { word: 'afspraak', translation: 'appointment', pos: 'noun', level: 'A2', ex: 'Ik heb een afspraak om drie uur.', ex_t: 'I have an appointment at three.' },
  { word: 'duur', translation: 'expensive', pos: 'adjective', level: 'A2', ex: 'Die jas is erg duur.', ex_t: 'That coat is very expensive.' },
  { word: 'goedkoop', translation: 'cheap', pos: 'adjective', level: 'A2', ex: 'De markt is goedkoop.', ex_t: 'The market is cheap.' },
  { word: 'altijd', translation: 'always', pos: 'adverb', level: 'A2', ex: 'Ze lacht altijd.', ex_t: 'She always laughs.' },
  { word: 'nooit', translation: 'never', pos: 'adverb', level: 'A2', ex: 'Hij rookt nooit.', ex_t: 'He never smokes.' },
  { word: 'praten', translation: 'to talk / chat', pos: 'verb', level: 'A2', ex: 'We praten over het weer.', ex_t: 'We talk about the weather.' },
  { word: 'vragen', translation: 'to ask', pos: 'verb', level: 'A2', ex: 'Mag ik iets vragen?', ex_t: 'May I ask something?' },
  { word: 'antwoorden', translation: 'to answer', pos: 'verb', level: 'A2', ex: 'Ze antwoordt snel.', ex_t: 'She answers quickly.' },
  { word: 'boodschappen', translation: 'groceries', pos: 'noun', level: 'A2', ex: 'Ik doe boodschappen op zaterdag.', ex_t: 'I do groceries on Saturday.' },
  { word: 'trein', translation: 'train', pos: 'noun', level: 'A2', ex: 'De trein vertrekt om negen uur.', ex_t: 'The train departs at nine.' },
  { word: 'fiets', translation: 'bicycle', pos: 'noun', level: 'A2', ex: 'Hij gaat op de fiets naar zijn werk.', ex_t: 'He cycles to work.' },
  { word: 'wachten', translation: 'to wait', pos: 'verb', level: 'A2', ex: 'Ik wacht op de bus.', ex_t: 'I am waiting for the bus.' },

  // B1 – Intermediate
  { word: 'gewoon', translation: 'ordinary / just', pos: 'adjective', level: 'B1', ex: 'Het is gewoon een dag.', ex_t: 'It is just an ordinary day.' },
  { word: 'behalve', translation: 'except', pos: 'conjunction', level: 'B1', ex: 'Iedereen komt, behalve Jan.', ex_t: 'Everyone is coming, except Jan.' },
  { word: 'sowieso', translation: 'anyway / in any case', pos: 'adverb', level: 'B1', ex: 'Ik ga sowieso mee.', ex_t: 'I will come along in any case.' },
  { word: 'verwachten', translation: 'to expect', pos: 'verb', level: 'B1', ex: 'Ik verwacht een pakket.', ex_t: 'I am expecting a package.' },
  { word: 'veranderen', translation: 'to change', pos: 'verb', level: 'B1', ex: 'De wereld verandert snel.', ex_t: 'The world changes quickly.' },
  { word: 'beslissen', translation: 'to decide', pos: 'verb', level: 'B1', ex: 'Ze heeft besloten te vertrekken.', ex_t: 'She has decided to leave.' },
  { word: 'hoewel', translation: 'although', pos: 'conjunction', level: 'B1', ex: 'Hoewel het regent, ga ik fietsen.', ex_t: 'Although it is raining, I will cycle.' },
  { word: 'ondanks', translation: 'despite', pos: 'preposition', level: 'B1', ex: 'Ondanks de regen genoten we.', ex_t: 'Despite the rain, we enjoyed it.' },
  { word: 'gelukkig', translation: 'fortunately / happy', pos: 'adverb', level: 'B1', ex: 'Gelukkig is alles goed.', ex_t: 'Fortunately, everything is fine.' },
  { word: 'stellen', translation: 'to pose / set', pos: 'verb', level: 'B1', ex: 'Hij stelt een vraag.', ex_t: 'He poses a question.' },
  { word: 'bijdragen', translation: 'to contribute', pos: 'verb', level: 'B1', ex: 'Zij draagt bij aan het project.', ex_t: 'She contributes to the project.' },
  { word: 'omgaan met', translation: 'to deal with', pos: 'phrase', level: 'B1', ex: 'Hij kan goed omgaan met stress.', ex_t: 'He deals well with stress.' },
  { word: 'tevens', translation: 'also / moreover', pos: 'adverb', level: 'B1', ex: 'Het is tevens goedkoper.', ex_t: 'It is also cheaper.' },
  { word: 'inmiddels', translation: 'by now / meanwhile', pos: 'adverb', level: 'B1', ex: 'Inmiddels is hij al weg.', ex_t: 'By now, he has already left.' },
  { word: 'opvallen', translation: 'to stand out / catch the eye', pos: 'verb', level: 'B1', ex: 'Ze valt op door haar rode haar.', ex_t: 'She stands out with her red hair.' },
  { word: 'mening', translation: 'opinion', pos: 'noun', level: 'B1', ex: 'Wat is jouw mening?', ex_t: 'What is your opinion?' },
  { word: 'oplossing', translation: 'solution', pos: 'noun', level: 'B1', ex: 'We hebben een oplossing gevonden.', ex_t: 'We found a solution.' },
  { word: 'invloed', translation: 'influence', pos: 'noun', level: 'B1', ex: 'Muziek heeft grote invloed op mij.', ex_t: 'Music has a great influence on me.' },
  { word: 'vergelijken', translation: 'to compare', pos: 'verb', level: 'B1', ex: 'Je moet de prijzen vergelijken.', ex_t: 'You should compare the prices.' },
  { word: 'herkennen', translation: 'to recognise', pos: 'verb', level: 'B1', ex: 'Ik herkende haar stem.', ex_t: 'I recognised her voice.' },

  // B2 – Upper Intermediate
  { word: 'aarzelen', translation: 'to hesitate', pos: 'verb', level: 'B2', ex: 'Ze aarzelde voordat ze antwoordde.', ex_t: 'She hesitated before answering.' },
  { word: 'twijfelen', translation: 'to doubt', pos: 'verb', level: 'B2', ex: 'Hij twijfelt aan zijn keuze.', ex_t: 'He doubts his choice.' },
  { word: 'benadrukken', translation: 'to emphasise', pos: 'verb', level: 'B2', ex: 'Ze benadrukte het belang van samenwerking.', ex_t: 'She emphasised the importance of cooperation.' },
  { word: 'desondanks', translation: 'nonetheless', pos: 'adverb', level: 'B2', ex: 'Desondanks bleef hij kalm.', ex_t: 'Nonetheless, he remained calm.' },
  { word: 'overwegen', translation: 'to consider', pos: 'verb', level: 'B2', ex: 'Ik overweeg een nieuwe baan.', ex_t: 'I am considering a new job.' },
  { word: 'veronderstellen', translation: 'to assume / presume', pos: 'verb', level: 'B2', ex: 'Ik veronderstel dat je het weet.', ex_t: 'I presume you know.' },
  { word: 'grondslag', translation: 'foundation / basis', pos: 'noun', level: 'B2', ex: 'Dit vormt de grondslag van de wet.', ex_t: 'This forms the basis of the law.' },
  { word: 'nadruk', translation: 'emphasis', pos: 'noun', level: 'B2', ex: 'De nadruk lag op samenwerking.', ex_t: 'The emphasis was on cooperation.' },
  { word: 'betreffende', translation: 'concerning / regarding', pos: 'preposition', level: 'B2', ex: 'Betreffende uw klacht...', ex_t: 'Regarding your complaint...' },
  { word: 'aanleiding', translation: 'reason / occasion / cause', pos: 'noun', level: 'B2', ex: 'Wat was de aanleiding voor uw vraag?', ex_t: 'What was the reason for your question?' },
  { word: 'verschijnsel', translation: 'phenomenon', pos: 'noun', level: 'B2', ex: 'Het is een interessant verschijnsel.', ex_t: 'It is an interesting phenomenon.' },
  { word: 'doorgaans', translation: 'generally / usually', pos: 'adverb', level: 'B2', ex: 'Hij is doorgaans vroeg.', ex_t: 'He is usually early.' },
  { word: 'evenwel', translation: 'however / yet', pos: 'adverb', level: 'B2', ex: 'Het is evenwel niet eenvoudig.', ex_t: 'It is however not easy.' },
  { word: 'aanpassen', translation: 'to adapt / adjust', pos: 'verb', level: 'B2', ex: 'Ze paste zich snel aan.', ex_t: 'She adapted quickly.' },
  { word: 'zinspelen', translation: 'to allude / hint', pos: 'verb', level: 'B2', ex: 'Waar zinspeel je op?', ex_t: 'What are you alluding to?' },
  { word: 'klaarblijkelijk', translation: 'apparently / obviously', pos: 'adverb', level: 'B2', ex: 'Hij is klaarblijkelijk vergeten.', ex_t: 'He has apparently forgotten.' },
  { word: 'betrekking', translation: 'relation / connection / job', pos: 'noun', level: 'B2', ex: 'In betrekking tot het voorstel...', ex_t: 'In relation to the proposal...' },
  { word: 'achteraf', translation: 'afterwards / in retrospect', pos: 'adverb', level: 'B2', ex: 'Achteraf was het een goede keuze.', ex_t: 'In retrospect, it was a good choice.' },
  { word: 'uitvoerig', translation: 'elaborate / detailed', pos: 'adjective', level: 'B2', ex: 'Geef een uitvoerig antwoord.', ex_t: 'Give an elaborate answer.' },
  { word: 'verfijnd', translation: 'refined / sophisticated', pos: 'adjective', level: 'B2', ex: 'Het is een verfijnde smaak.', ex_t: 'It is a refined taste.' },

  // C1 – Advanced
  { word: 'bedeesd', translation: 'timid / bashful', pos: 'adjective', level: 'C1', ex: 'Het bedeesd kind zweeg.', ex_t: 'The timid child was silent.' },
  { word: 'ontluiken', translation: 'to blossom / dawn', pos: 'verb', level: 'C1', ex: 'Een nieuw tijdperk ontluikt.', ex_t: 'A new era is dawning.' },
  { word: 'reiken', translation: 'to reach / extend', pos: 'verb', level: 'C1', ex: 'Haar invloed reikt ver.', ex_t: 'Her influence reaches far.' },
  { word: 'beschouwing', translation: 'consideration / contemplation', pos: 'noun', level: 'C1', ex: 'Na rijpe beschouwing koos hij.', ex_t: 'After careful consideration, he chose.' },
  { word: 'noodlot', translation: 'fate / doom', pos: 'noun', level: 'C1', ex: 'Het noodlot sloeg toe.', ex_t: 'Fate struck.' },
  { word: 'berusting', translation: 'resignation / acceptance', pos: 'noun', level: 'C1', ex: 'Ze aanvaardde het met berusting.', ex_t: 'She accepted it with resignation.' },
  { word: 'verontwaardigd', translation: 'indignant / outraged', pos: 'adjective', level: 'C1', ex: 'Hij was verontwaardigd over de beslissing.', ex_t: 'He was indignant about the decision.' },
  { word: 'nuanceren', translation: 'to nuance / qualify', pos: 'verb', level: 'C1', ex: 'Laat me mijn uitspraak nuanceren.', ex_t: 'Let me nuance my statement.' },
  { word: 'kwistig', translation: 'lavish / profuse', pos: 'adjective', level: 'C1', ex: 'Hij gaf kwistig met lof.', ex_t: 'He was lavish with praise.' },
  { word: 'vertolken', translation: 'to interpret / give voice to', pos: 'verb', level: 'C1', ex: 'De acteur vertolkte de rol meesterlijk.', ex_t: 'The actor interpreted the role masterfully.' },
  { word: 'ontvlammen', translation: 'to ignite / kindle', pos: 'verb', level: 'C1', ex: 'Haar passie ontvlamde de groep.', ex_t: 'Her passion ignited the group.' },
  { word: 'wederkerig', translation: 'mutual / reciprocal', pos: 'adjective', level: 'C1', ex: 'Het was een wederkerig gevoel.', ex_t: 'It was a mutual feeling.' },
  { word: 'bezinning', translation: 'reflection / contemplation', pos: 'noun', level: 'C1', ex: 'Na een periode van bezinning...', ex_t: 'After a period of reflection...' },
  { word: 'toedragen', translation: 'to bear / feel toward', pos: 'verb', level: 'C1', ex: 'Hij droeg haar genegenheid toe.', ex_t: 'He bore her affection.' },
  { word: 'verwezenlijken', translation: 'to realise / achieve', pos: 'verb', level: 'C1', ex: 'Ze verwezenlijkte haar droom.', ex_t: 'She realised her dream.' },
  { word: 'uitgesproken', translation: 'pronounced / outspoken', pos: 'adjective', level: 'C1', ex: 'Hij heeft een uitgesproken mening.', ex_t: 'He has a pronounced opinion.' },
  { word: 'versluieren', translation: 'to veil / obscure', pos: 'verb', level: 'C1', ex: 'Zijn taal versluiert de werkelijkheid.', ex_t: 'His language obscures reality.' },
  { word: 'ontglippen', translation: 'to slip away / escape', pos: 'verb', level: 'C1', ex: 'De kans ontglipte hem.', ex_t: 'The opportunity slipped away from him.' },
  { word: 'vergenoegd', translation: 'contented / pleased', pos: 'adjective', level: 'C1', ex: 'Hij keek vergenoegd om zich heen.', ex_t: 'He looked around contentedly.' },
  { word: 'behendig', translation: 'dexterous / agile', pos: 'adjective', level: 'C1', ex: 'Ze bewoog behendig door de menigte.', ex_t: 'She moved agilely through the crowd.' },

  // C2 – Mastery
  { word: 'palimpsest', translation: 'palimpsest (overwritten text)', pos: 'noun', level: 'C2', ex: 'De geschiedenis is een palimpsest van culturen.', ex_t: 'History is a palimpsest of cultures.' },
  { word: 'efemeer', translation: 'ephemeral / fleeting', pos: 'adjective', level: 'C2', ex: 'Roem is een efemeer verschijnsel.', ex_t: 'Fame is an ephemeral phenomenon.' },
  { word: 'paronomasie', translation: 'paronomasia / wordplay', pos: 'noun', level: 'C2', ex: 'Zijn woordspeling was een staaltje van paronomasie.', ex_t: 'His pun was an example of paronomasia.' },
  { word: 'sublimeren', translation: 'to sublimate', pos: 'verb', level: 'C2', ex: 'Hij sublimeerde zijn verdriet in kunst.', ex_t: 'He sublimated his grief into art.' },
  { word: 'lacuneus', translation: 'full of gaps / lacunose', pos: 'adjective', level: 'C2', ex: 'De redenering was lacuneus.', ex_t: 'The reasoning was full of gaps.' },
  { word: 'ontvoogding', translation: 'emancipation / liberation', pos: 'noun', level: 'C2', ex: 'De ontvoogding van de koloniën nam decennia.', ex_t: 'The emancipation of the colonies took decades.' },
  { word: 'apotheose', translation: 'apotheosis / culmination', pos: 'noun', level: 'C2', ex: 'Het concert was de apotheose van zijn carrière.', ex_t: 'The concert was the apotheosis of his career.' },
  { word: 'parrèsie', translation: 'parrhesia / fearless speech', pos: 'noun', level: 'C2', ex: 'Hij sprak met parrèsie voor de machthebbers.', ex_t: 'He spoke fearlessly before those in power.' },
  { word: 'verstrengeling', translation: 'entanglement / intertwining', pos: 'noun', level: 'C2', ex: 'De verstrengeling van politiek en economie.', ex_t: 'The entanglement of politics and economics.' },
  { word: 'casuïstiek', translation: 'casuistry / case study analysis', pos: 'noun', level: 'C2', ex: 'De professor behandelde de zaak als casuïstiek.', ex_t: 'The professor treated the case as casuistry.' },
  { word: 'deconstructie', translation: 'deconstruction', pos: 'noun', level: 'C2', ex: 'Deconstructie bevraagt vaste betekenissen.', ex_t: 'Deconstruction questions fixed meanings.' },
  { word: 'ontologisch', translation: 'ontological', pos: 'adjective', level: 'C2', ex: 'Het is een ontologisch vraagstuk.', ex_t: 'It is an ontological question.' },
  { word: 'axiomatisch', translation: 'axiomatic', pos: 'adjective', level: 'C2', ex: 'Dit principe is axiomatisch.', ex_t: 'This principle is axiomatic.' },
  { word: 'semiologie', translation: 'semiology / study of signs', pos: 'noun', level: 'C2', ex: 'Semiologie bestudeert tekens en symbolen.', ex_t: 'Semiology studies signs and symbols.' },
  { word: 'hermeneutiek', translation: 'hermeneutics / interpretation theory', pos: 'noun', level: 'C2', ex: 'De hermeneutiek zoekt naar tekstinterpretatie.', ex_t: 'Hermeneutics seeks textual interpretation.' },
  { word: 'propaedeutisch', translation: 'propaedeutic / introductory', pos: 'adjective', level: 'C2', ex: 'Dit is een propaedeutisch vak.', ex_t: 'This is an introductory subject.' },
  { word: 'palingenese', translation: 'palingenesis / rebirth', pos: 'noun', level: 'C2', ex: 'Zijn filosofie draait om palingenese.', ex_t: 'His philosophy revolves around rebirth.' },
  { word: 'ekpyrosis', translation: 'ekpyrosis / cosmic conflagration', pos: 'noun', level: 'C2', ex: 'De Stoïcijnen geloofden in ekpyrosis.', ex_t: 'The Stoics believed in ekpyrosis.' },
  { word: 'interpolatie', translation: 'interpolation', pos: 'noun', level: 'C2', ex: 'De tekst bevatte later interpolaties.', ex_t: 'The text contained later interpolations.' },
  { word: 'logomachie', translation: 'logomachy / dispute about words', pos: 'noun', level: 'C2', ex: 'Het debat ontaardde in logomachie.', ex_t: 'The debate degenerated into a dispute about words.' },
];

const insertWord = db.prepare(`
  INSERT OR IGNORE INTO words (word, translation, language, part_of_speech, cefr_level, example_sentence, example_translation)
  VALUES (?, ?, 'nl', ?, ?, ?, ?)
`);

const insertWords = db.transaction(() => {
  for (const w of words) {
    insertWord.run(w.word, w.translation, w.pos, w.level, w.ex, w.ex_t);
  }
});

insertWords();
console.log(`✓ Inserted ${words.length} legacy words`);

// ─── Expanded word lists (grouped format) ────────────────────────────────────
type WordGroup = { category: string; entries: [string, string, string, string, string][] };
const flattenGroups = (groups: WordGroup[], level: string) =>
  groups.flatMap(g =>
    g.entries.map(([word, translation, pos, ex, ex_t]) => ({
      word, translation, pos, level, category: g.category, ex, ex_t,
    }))
  );

const allExpandedWords = [
  ...flattenGroups(wordsA1, 'A1'),
  ...flattenGroups(wordsA2, 'A2'),
  ...flattenGroups(wordsB1, 'B1'),
  ...flattenGroups(wordsB2, 'B2'),
  ...flattenGroups(wordsC1, 'C1'),
  ...flattenGroups(wordsC2, 'C2'),
];

const insertExpandedWords = db.transaction(() => {
  for (const w of allExpandedWords) {
    insertWord.run(w.word, w.translation, w.pos, w.level, w.ex, w.ex_t);
    // Update category for newly inserted or existing word
    db.prepare('UPDATE words SET category = ? WHERE word = ? AND language = \'nl\'')
      .run(w.category, w.word);
  }
});

insertExpandedWords();
const totalWords = (db.prepare('SELECT COUNT(*) as c FROM words').get() as { c: number }).c;
console.log(`✓ Expanded words inserted — total in DB: ${totalWords}`);

// ─── Grammar Topics ───────────────────────────────────────────────────────────
const topics = [
  {
    title: 'Articles: de, het and een',
    slug: 'de-het-een',
    level: 'A1',
    summary: 'Learn when to use de, het (definite) and een (indefinite) in Dutch.',
    body: `<h2>The Dutch Article System</h2>
<p>Dutch has two genders: <strong>common</strong> (de-words) and <strong>neuter</strong> (het-words). The indefinite article <em>een</em> is used for both.</p>
<h3>De-words</h3>
<p>Most nouns are de-words. Examples: <em>de man</em>, <em>de vrouw</em>, <em>de dag</em>.</p>
<h3>Het-words</h3>
<p>Diminutives (-tje, -je) are always het-words. Examples: <em>het kind</em>, <em>het huis</em>, <em>het boekje</em>.</p>
<h3>Een (indefinite)</h3>
<p>Use <em>een</em> for any noun: <em>een man</em>, <em>een kind</em>.</p>`,
    sort: 1,
    examples: [
      { s: 'De man leest het boek.', t: 'The man reads the book.', n: 'de = common, het = neuter' },
      { s: 'Ik heb een huis.', t: 'I have a house.', n: 'een = indefinite' },
      { s: 'Het meisje zingt een lied.', t: 'The girl sings a song.', n: 'meisje is diminutive → het' },
    ],
  },
  {
    title: 'Present Tense Conjugation',
    slug: 'present-tense',
    level: 'A1',
    summary: 'Conjugate regular Dutch verbs in the present tense.',
    body: `<h2>Present Tense (Tegenwoordige Tijd)</h2>
<p>To conjugate a regular verb, find the stem: remove <em>-en</em> from the infinitive. Then add the right ending.</p>
<table><thead><tr><th>Person</th><th>Ending</th><th>werken → stem: werk</th></tr></thead>
<tbody>
<tr><td>ik</td><td>(stem)</td><td>ik werk</td></tr>
<tr><td>jij/je</td><td>-t (unless inverted)</td><td>jij werkt</td></tr>
<tr><td>hij/zij/het</td><td>-t</td><td>hij werkt</td></tr>
<tr><td>wij/jullie/zij</td><td>infinitive form</td><td>wij werken</td></tr>
</tbody></table>`,
    sort: 2,
    examples: [
      { s: 'Ik werk elke dag.', t: 'I work every day.', n: null },
      { s: 'Werk jij ook?', t: 'Do you work too?', n: 'inverted: jij after verb → no -t' },
      { s: 'Wij werken samen.', t: 'We work together.', n: 'plural uses infinitive form' },
    ],
  },
  {
    title: 'Plural Nouns',
    slug: 'plural-nouns',
    level: 'A2',
    summary: 'Form plural nouns using -en, -s, or apostrophe-s in Dutch.',
    body: `<h2>Forming Plurals</h2>
<p>The two main plural endings are <strong>-en</strong> and <strong>-s</strong>.</p>
<h3>Adding -en</h3>
<p>Most nouns add -en. Watch for spelling changes: double consonant after short vowel, or drop double vowel before adding -en.</p>
<h3>Adding -s</h3>
<p>Nouns ending in unstressed -el, -em, -en, -er, -aar, or diminutives take -s: <em>tafels, bezems, jongens</em>.</p>
<h3>Apostrophe-s</h3>
<p>Words ending in a vowel (a, i, o, u) add 's: <em>auto's, foto's</em>.</p>`,
    sort: 1,
    examples: [
      { s: 'de boom → de bomen', t: 'the tree → the trees', n: '-en; vowel shortens: boom → bom + en' },
      { s: 'de tafel → de tafels', t: 'the table → the tables', n: '-s after -el' },
      { s: "de auto → de auto's", t: "the car → the cars", n: "apostrophe-s after final vowel" },
    ],
  },
  {
    title: 'Separable Verbs',
    slug: 'separable-verbs',
    level: 'A2',
    summary: 'Understand scheidbare werkwoorden — verbs that split in main clauses.',
    body: `<h2>Separable Verbs (Scheidbare Werkwoorden)</h2>
<p>Many Dutch verbs have a separable prefix (e.g., <em>op-, aan-, mee-, uit-</em>). In a main clause, the prefix moves to the end of the sentence.</p>
<p><strong>Infinitive:</strong> <em>opstaan</em> (to get up)</p>
<p><strong>Main clause:</strong> <em>Ik sta vroeg op.</em></p>
<p>In a subordinate clause introduced by a conjunction (zoals, omdat, dat), the verb stays together: <em>…omdat ik vroeg opsta.</em></p>`,
    sort: 2,
    examples: [
      { s: 'Ik sta om zes uur op.', t: 'I get up at six.', n: 'op moves to end' },
      { s: 'Ze belt haar moeder op.', t: 'She calls her mother.', n: 'opbellen → belt…op' },
      { s: 'Ik weet dat hij vroeg opstaat.', t: 'I know that he gets up early.', n: 'sub clause: verb together' },
    ],
  },
  {
    title: 'Perfect Tense',
    slug: 'perfect-tense',
    level: 'B1',
    summary: 'Form the Dutch perfect tense using hebben and zijn as auxiliary verbs.',
    body: `<h2>Perfect Tense (Voltooid Tegenwoordige Tijd)</h2>
<p>The Dutch perfect tense = auxiliary (<em>hebben</em> or <em>zijn</em>) + past participle.</p>
<h3>Past Participle</h3>
<p>Regular: <strong>ge-</strong> + stem + <strong>-t</strong> or <strong>-d</strong> (use the 't kofschip rule for -t vs -d).</p>
<h3>Hebben or Zijn?</h3>
<p>Use <em>zijn</em> with: movement toward a destination (gaan, komen, reizen), change of state (worden, sterven), and a few others (blijven, zijn, gebeuren).</p>`,
    sort: 1,
    examples: [
      { s: 'Ik heb gegeten.', t: 'I have eaten.', n: 'eten → gegeten (hebben)' },
      { s: 'Zij is naar Parijs gegaan.', t: 'She has gone to Paris.', n: 'gaan uses zijn' },
      { s: 'Het is gebeurd.', t: 'It has happened.', n: 'gebeuren uses zijn' },
    ],
  },
  {
    title: 'Word Order (V2 Rule)',
    slug: 'word-order',
    level: 'B1',
    summary: 'Dutch is a V2 language: the finite verb always occupies the second position.',
    body: `<h2>The V2 Rule</h2>
<p>In Dutch main clauses, the finite verb <strong>always</strong> comes second, regardless of what comes first.</p>
<p>If you front a time expression or adverb, the subject moves <em>after</em> the verb (inversion).</p>
<h3>Standard Order</h3>
<p>Subject – Verb – Object: <em>Ik lees een boek.</em></p>
<h3>Fronted Adverb (Inversion)</h3>
<p>Adverb – Verb – Subject: <em>Gisteren las ik een boek.</em></p>`,
    sort: 2,
    examples: [
      { s: 'Ik lees elke dag een boek.', t: 'I read a book every day.', n: 'standard SVO' },
      { s: 'Elke dag lees ik een boek.', t: 'Every day I read a book.', n: 'fronted adverb → inversion' },
      { s: 'Morgen gaan we naar Amsterdam.', t: 'Tomorrow we go to Amsterdam.', n: 'time adverb first' },
    ],
  },
  {
    title: 'The Passive Voice',
    slug: 'passive-voice',
    level: 'B2',
    summary: 'Construct passive sentences using worden (imperfect) or zijn (perfect).',
    body: `<h2>Passive Voice (Lijdende Vorm)</h2>
<p>Dutch uses <strong>worden</strong> for the present/imperfect passive and <strong>zijn</strong> for the result state (perfect passive).</p>
<p>Pattern: <em>worden/zijn</em> + past participle. The agent can be added with <em>door</em>.</p>`,
    sort: 1,
    examples: [
      { s: 'Het boek wordt gelezen.', t: 'The book is being read.', n: 'present passive with worden' },
      { s: 'De brief werd verstuurd.', t: 'The letter was sent.', n: 'past passive (imperfect)' },
      { s: 'De deur is geopend door hem.', t: 'The door has been opened by him.', n: 'result state: zijn + door' },
    ],
  },
  {
    title: 'Subjunctive & Conditional',
    slug: 'subjunctive',
    level: 'B2',
    summary: 'Use the conditional (zou + infinitive) and the formal subjunctive in Dutch.',
    body: `<h2>Conditional (Voorwaardelijke Wijs)</h2>
<p>Formed with <em>zou(den)</em> + infinitive. Used for hypothetical or polite statements.</p>
<p><em>Als ik meer geld had, zou ik reizen.</em> (If I had more money, I would travel.)</p>
<h2>Formal Subjunctive</h2>
<p>Rare in modern Dutch, appears in set phrases and formal writing: <em>moge, zij, leve</em>.</p>`,
    sort: 2,
    examples: [
      { s: 'Ik zou graag helpen.', t: 'I would gladly help.', n: 'polite conditional' },
      { s: 'Als het zou regenen, blijf ik thuis.', t: 'If it were to rain, I would stay home.', n: 'hypothetical' },
      { s: 'Leve de Koning!', t: 'Long live the King!', n: 'formal subjunctive set phrase' },
    ],
  },
  {
    title: 'Nominalization',
    slug: 'nominalization',
    level: 'C1',
    summary: 'Turn verbs and adjectives into nouns using -ing, -heid, -nis, and het + infinitive.',
    body: `<h2>Nominalization</h2>
<p>Dutch regularly converts verbs and adjectives into nouns.</p>
<ul>
<li><strong>Verb + -ing</strong>: <em>verbeteren → verbetering</em> (improvement)</li>
<li><strong>Adjective + -heid</strong>: <em>eerlijk → eerlijkheid</em> (honesty)</li>
<li><strong>Verb + -nis</strong>: <em>kennen → kennis</em> (knowledge)</li>
<li><strong>het + infinitive</strong>: <em>het lopen</em> (walking), <em>het reizen</em> (travelling)</li>
</ul>`,
    sort: 1,
    examples: [
      { s: 'De verbetering van het systeem kost tijd.', t: 'The improvement of the system takes time.', n: 'verb → -ing noun' },
      { s: 'Eerlijkheid duurt het langst.', t: 'Honesty lasts the longest.', n: 'adjective → -heid' },
      { s: 'Het reizen vermoeit me.', t: 'Travelling tires me.', n: 'het + infinitive as subject' },
    ],
  },
  {
    title: 'Formal vs Informal Register',
    slug: 'stylistic-register',
    level: 'C2',
    summary: 'Navigate the stylistic spectrum from casual spoken Dutch to formal written prose.',
    body: `<h2>Register in Dutch</h2>
<p>Dutch has a wide stylistic range. The informal register (spoken) uses contractions, colloquialisms, and simplified syntax. Formal register (official documents, academic writing) uses full forms, nominalizations, passive constructions, and complex sentence structures.</p>
<h3>Key contrasts</h3>
<ul>
<li>Informal: <em>dat is niet erg</em> / Formal: <em>dit vormt geen bezwaar</em></li>
<li>Informal: <em>ik snap het niet</em> / Formal: <em>dit ontsnapt aan mijn begrip</em></li>
<li>Informal: <em>We gaan dit aanpakken</em> / Formal: <em>Ter zake zal worden overgegaan tot nader onderzoek</em></li>
</ul>`,
    sort: 1,
    examples: [
      { s: 'Ik snap het niet.', t: 'I do not understand it. (informal)', n: 'colloquial verb snappen' },
      { s: 'Dit ontsnapt aan mijn begrip.', t: 'This escapes my understanding. (formal)', n: 'nominalization, formal verb' },
      { s: 'Ter zake zal worden overgegaan tot onderzoek.', t: 'The matter will be subject to investigation.', n: 'full passive, formal register' },
    ],
  },
  ...extraGrammarTopics,
];

const insertTopic = db.prepare(`
  INSERT OR IGNORE INTO grammar_topics (title, slug, language, cefr_level, summary, body, sort_order)
  VALUES (?, ?, 'nl', ?, ?, ?, ?)
`);
const insertExample = db.prepare(`
  INSERT INTO grammar_examples (topic_id, sentence, translation, note)
  VALUES (?, ?, ?, ?)
`);

const insertTopics = db.transaction(() => {
  for (const t of topics) {
    const topicExists = db.prepare('SELECT id FROM grammar_topics WHERE slug = ?').get(t.slug);
    if (topicExists) continue;
    const res = insertTopic.run(t.title, t.slug, t.level, t.summary, t.body, t.sort);
    const topicId = res.lastInsertRowid as number;
    for (const ex of t.examples) {
      insertExample.run(topicId, ex.s, ex.t, ex.n ?? null);
    }
  }
});

insertTopics();
console.log(`✓ Inserted ${topics.length} grammar topics`);

// ─── Demo users ───────────────────────────────────────────────────────────────
// Password: "password123" (bcrypt hashed)
const demoHash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBpj4hLKdXCjTW';

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (username, email, password, role)
  VALUES (?, ?, ?, ?)
`);

insertUser.run('admin', 'admin@taaltje.nl', demoHash, 'admin');
insertUser.run('nina', 'nina@example.com', demoHash, 'user');
console.log('✓ Inserted demo users (password: password123)');

// ─── Demo posts ───────────────────────────────────────────────────────────────
const adminUser = db.prepare('SELECT id FROM users WHERE username = ?').get('admin') as { id: number };
const ninaUser = db.prepare('SELECT id FROM users WHERE username = ?').get('nina') as { id: number };

const insertPost = db.prepare(`
  INSERT OR IGNORE INTO posts (user_id, title, body, category, is_pinned)
  VALUES (?, ?, ?, ?, ?)
`);

const existingPosts = db.prepare('SELECT COUNT(*) as c FROM posts').get() as { c: number };

if (existingPosts.c === 0) {
  insertPost.run(
    adminUser.id,
    'Welcome to the Taaltje Community!',
    'Hello everyone!\n\nWelcome to Taaltje — the place to practice Dutch (or any language you\'re learning) together. Feel free to introduce yourself, ask questions about grammar, share vocabulary tips, or post interesting cultural facts.\n\nHappy learning! 🌍',
    'general', 1
  );

  const p2 = insertPost.run(
    ninaUser.id,
    'How do I remember de/het words?',
    'I keep mixing up de and het for new words. Does anyone have a reliable trick for remembering which article goes with which noun?\n\nI\'ve heard that diminutives are always het, and that most nouns are de — but beyond that I\'m struggling!',
    'grammar', 0
  );

  insertPost.run(
    ninaUser.id,
    'My favourite resources for learning Dutch',
    'After six months of studying, here are the resources I find most useful:\n\n1. Duolingo for daily habits (gamification helps!)\n2. "NT2 Totaal" course book for serious grammar\n3. Watching "SpangaS" on YouTube with subtitles\n4. Listening to NPO Radio 2\n\nWhat resources do you use?',
    'vocabulary', 0
  );

  // Replies to post 2
  db.prepare('INSERT INTO replies (post_id, user_id, body) VALUES (?, ?, ?)').run(
    p2.lastInsertRowid,
    adminUser.id,
    'Great question! A few tricks that help:\n\n• All diminutives (-tje, -je, -pje) → het\n• Words for people with natural gender → de (de man, de vrouw)\n• Colours, sports, languages → de\n\nBeyond that, unfortunately you often just have to memorise it. Using words in sentences rather than learning them in isolation really helps!'
  );
  db.prepare('UPDATE posts SET reply_count = 1 WHERE id = ?').run(p2.lastInsertRowid);

  console.log('✓ Inserted demo posts and replies');
}

console.log('\n🎉 Seed complete! Start the app with: npm run dev');
