import Link from 'next/link';
import { BookOpen, GraduationCap, Users, ArrowRight, Target, Zap } from 'lucide-react';
import { CEFR_LEVELS, CEFR_DESCRIPTIONS } from '@/lib/utils/constants';

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: 'Daily Study',
      description: 'A focused 10-minute session every day: review words, learn new ones, and study one grammar topic.',
      href: '/daily',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: BookOpen,
      title: 'Vocabulary',
      description: 'Master thousands of words organized by CEFR level — from absolute beginner to near-native.',
      href: '/vocabulary',
      color: 'bg-teal-50 text-teal-600',
    },
    {
      icon: GraduationCap,
      title: 'Grammar',
      description: 'Clear explanations with examples for every grammar rule, grouped by proficiency level.',
      href: '/grammar',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Ask questions, share tips, and practice with learners from around the world.',
      href: '/community',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const levelColors: Record<string, string> = {
    A1: 'border-green-300 bg-green-50',
    A2: 'border-teal-300 bg-teal-50',
    B1: 'border-blue-300 bg-blue-50',
    B2: 'border-indigo-300 bg-indigo-50',
    C1: 'border-purple-300 bg-purple-50',
    C2: 'border-rose-300 bg-rose-50',
  };

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Learn languages,{' '}
          <span className="text-blue-600">your way</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
          Taaltje gives you structured vocabulary lists, grammar lessons, and a supportive community —
          everything you need to go from beginner to fluent.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/placement-test"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Target className="h-5 w-5" />
            Find my level
          </Link>
          <Link
            href="/vocabulary"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Browse vocabulary <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Join community
          </Link>
        </div>

        {/* Placement test callout */}
        <div className="mt-6 mx-auto max-w-md rounded-xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm text-blue-700">
          <strong>New here?</strong> Take our 5-minute placement test to jump straight to your level.
        </div>
      </section>

      {/* Feature cards */}
      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, href, color }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {title}
              </h2>
              <p className="mt-2 text-gray-500">{description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CEFR levels overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learn at your level</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CEFR_LEVELS.map(level => (
            <Link
              key={level}
              href={`/vocabulary/${level}`}
              className={`rounded-xl border-2 p-4 text-center hover:shadow-md transition-all ${levelColors[level]}`}
            >
              <p className="text-2xl font-bold text-gray-900">{level}</p>
              <p className="mt-1 text-xs text-gray-600">{CEFR_DESCRIPTIONS[level]}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
