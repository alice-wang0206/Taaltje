'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { placementQuestions, type PlacementQuestion } from '@/lib/db/data/placement-questions';
import { CEFR_LEVELS, CEFR_DESCRIPTIONS } from '@/lib/utils/constants';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, XCircle, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type QuestionState = 'unanswered' | 'correct' | 'incorrect';

interface Answer {
  questionId: number;
  chosen: number;
  correct: boolean;
}

// Adaptive logic: 5 questions per level. If you get ≥3 correct, move up.
// As soon as you fail a level (< 3/5), that's your result level.
const QUESTIONS_PER_LEVEL = 5;
const PASS_THRESHOLD = 3; // out of 5

function getQuestionsForLevel(level: string): PlacementQuestion[] {
  return placementQuestions.filter(q => q.level === level);
}

function computeResult(answers: Answer[]): string {
  for (const level of CEFR_LEVELS) {
    const levelQs = placementQuestions.filter(q => q.level === level);
    const levelAnswers = answers.filter(a => levelQs.some(q => q.id === a.questionId));
    const correct = levelAnswers.filter(a => a.correct).length;
    if (correct < PASS_THRESHOLD) {
      return level;
    }
  }
  return 'C2'; // passed everything
}

export function PlacementTest() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [questionIndexInLevel, setQuestionIndexInLevel] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [state, setState] = useState<QuestionState>('unanswered');
  const [phase, setPhase] = useState<'quiz' | 'result'>('quiz');
  const [result, setResult] = useState<string>('');

  const currentLevel = CEFR_LEVELS[currentLevelIndex];
  const levelQuestions = getQuestionsForLevel(currentLevel);
  const currentQuestion = levelQuestions[questionIndexInLevel];

  const totalAnswered = answers.length;
  const totalQuestions = CEFR_LEVELS.length * QUESTIONS_PER_LEVEL;
  const progress = (totalAnswered / totalQuestions) * 100;

  const handleSelect = useCallback((optionIndex: number) => {
    if (state !== 'unanswered') return;
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuestion.answer;
    setState(isCorrect ? 'correct' : 'incorrect');
  }, [state, currentQuestion]);

  const handleNext = useCallback(() => {
    if (selectedOption === null) return;

    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, chosen: selectedOption, correct: selectedOption === currentQuestion.answer },
    ];
    setAnswers(newAnswers);
    setSelectedOption(null);
    setState('unanswered');

    const nextIndexInLevel = questionIndexInLevel + 1;

    if (nextIndexInLevel >= QUESTIONS_PER_LEVEL) {
      // Finished this level — check if user passed
      const levelAnswersForThisLevel = newAnswers.filter(a =>
        levelQuestions.some(q => q.id === a.questionId)
      );
      const correctCount = levelAnswersForThisLevel.filter(a => a.correct).length;

      if (correctCount < PASS_THRESHOLD || currentLevelIndex >= CEFR_LEVELS.length - 1) {
        // Failed or last level → show result
        const finalResult = computeResult(newAnswers);
        setResult(finalResult);
        setPhase('result');

        // Save result to API if session available
        fetch('/api/placement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ result: finalResult, answers: newAnswers }),
        }).catch(() => {}); // best-effort
      } else {
        // Passed → move to next level
        setCurrentLevelIndex(i => i + 1);
        setQuestionIndexInLevel(0);
      }
    } else {
      setQuestionIndexInLevel(nextIndexInLevel);
    }
  }, [selectedOption, answers, currentQuestion, questionIndexInLevel, currentLevelIndex, levelQuestions]);

  if (phase === 'result') {
    return <PlacementResult result={result} answers={answers} />;
  }

  const levelCorrect = answers
    .filter(a => levelQuestions.some(q => q.id === a.questionId))
    .filter(a => a.correct).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
          <span>Question {totalAnswered + 1} of {totalQuestions}</span>
          <span className="flex items-center gap-2">
            <Badge level={currentLevel} />
            <span>{CEFR_DESCRIPTIONS[currentLevel]}</span>
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {CEFR_LEVELS.map((level, i) => (
            <div
              key={level}
              className={cn(
                'flex-1 h-1 rounded-full transition-colors',
                i < currentLevelIndex ? 'bg-green-400' :
                i === currentLevelIndex ? 'bg-blue-400' :
                'bg-gray-200'
              )}
            />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2">
          <span className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
            currentQuestion.type === 'vocabulary' ? 'bg-teal-100 text-teal-700' :
            currentQuestion.type === 'grammar' ? 'bg-blue-100 text-blue-700' :
            'bg-purple-100 text-purple-700'
          )}>
            {currentQuestion.type}
          </span>
          <span className="text-xs text-gray-400">
            {questionIndexInLevel + 1} / {QUESTIONS_PER_LEVEL} at {currentLevel}
          </span>
          {state !== 'unanswered' && (
            <span className="ml-auto text-xs font-semibold text-gray-500">
              {levelCorrect} / {questionIndexInLevel + 1} correct this level
            </span>
          )}
        </div>

        <p className="text-lg font-semibold text-gray-900 leading-snug">{currentQuestion.prompt}</p>

        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, i) => {
            let style = 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50';
            if (state !== 'unanswered') {
              if (i === currentQuestion.answer) {
                style = 'border-green-400 bg-green-50 text-green-800';
              } else if (i === selectedOption && i !== currentQuestion.answer) {
                style = 'border-red-400 bg-red-50 text-red-800';
              } else {
                style = 'border-gray-100 bg-gray-50 text-gray-400';
              }
            } else if (selectedOption === i) {
              style = 'border-blue-500 bg-blue-50 text-blue-800';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={state !== 'unanswered'}
                className={cn(
                  'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all text-sm font-medium',
                  style
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
                {state !== 'unanswered' && i === currentQuestion.answer && (
                  <CheckCircle className="ml-auto h-4 w-4 text-green-600" />
                )}
                {state !== 'unanswered' && i === selectedOption && i !== currentQuestion.answer && (
                  <XCircle className="ml-auto h-4 w-4 text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {state !== 'unanswered' && (
          <div className={cn(
            'rounded-xl p-4 text-sm',
            state === 'correct' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          )}>
            <span className="font-semibold">{state === 'correct' ? 'Correct! ' : 'Not quite. '}</span>
            {currentQuestion.explanation}
          </div>
        )}
      </div>

      {state !== 'unanswered' && (
        <div className="sticky bottom-4 z-10">
          <Button onClick={handleNext} size="lg" className="w-full flex items-center gap-2 shadow-lg">
            {totalAnswered + 1 >= totalQuestions ? 'See my result' : 'Next question'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Result panel ─────────────────────────────────────────────────────────────
interface PlacementResultProps {
  result: string;
  answers: Answer[];
}

function PlacementResult({ result, answers }: PlacementResultProps) {
  const router = useRouter();

  const scoreByLevel = CEFR_LEVELS.map(level => {
    const levelQs = placementQuestions.filter(q => q.level === level);
    const levelAnswers = answers.filter(a => levelQs.some(q => q.id === a.questionId));
    const correct = levelAnswers.filter(a => a.correct).length;
    return { level, correct, total: levelAnswers.length };
  });

  const levelColors: Record<string, string> = {
    A1: 'from-green-400 to-teal-400',
    A2: 'from-teal-400 to-cyan-400',
    B1: 'from-blue-400 to-indigo-400',
    B2: 'from-indigo-400 to-violet-400',
    C1: 'from-purple-400 to-pink-400',
    C2: 'from-rose-400 to-red-400',
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Hero result */}
      <div className="text-center space-y-4">
        <div className={cn(
          'inline-flex items-center justify-center w-28 h-28 rounded-full text-white text-4xl font-bold shadow-lg bg-gradient-to-br',
          levelColors[result] ?? 'from-blue-400 to-indigo-500'
        )}>
          {result}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your level: {result}</h1>
          <p className="text-lg text-gray-500 mt-1">{CEFR_DESCRIPTIONS[result as keyof typeof CEFR_DESCRIPTIONS]}</p>
        </div>
        <p className="text-gray-500 max-w-md mx-auto">
          Based on your answers, we recommend starting with the {result} vocabulary and grammar materials.
        </p>
      </div>

      {/* Level breakdown */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">Score breakdown</h2>
        {scoreByLevel.map(({ level, correct, total }) => {
          if (total === 0) return null;
          const pct = (correct / total) * 100;
          const passed = correct >= PASS_THRESHOLD;
          return (
            <div key={level} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge level={level} />
                  <span className="text-gray-600">{CEFR_DESCRIPTIONS[level as keyof typeof CEFR_DESCRIPTIONS]}</span>
                </div>
                <span className={cn('font-semibold', passed ? 'text-green-600' : 'text-red-500')}>
                  {correct}/{total} {passed ? '✓' : '✗'}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100">
                <div
                  className={cn('h-2 rounded-full transition-all', passed ? 'bg-green-400' : 'bg-red-400')}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          onClick={() => router.push(`/vocabulary/${result}`)}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Start {result} Vocabulary
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => router.push(`/grammar/${result}`)}
          className="flex-1"
        >
          Go to {result} Grammar
        </Button>
      </div>

      <p className="text-center text-sm text-gray-400">
        You can always browse other levels from the Vocabulary and Grammar pages.
      </p>
    </div>
  );
}
