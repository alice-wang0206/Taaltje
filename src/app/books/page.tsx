import Link from 'next/link';
import { BookOpen, GraduationCap } from 'lucide-react';
import { availableBooks } from '@/lib/db/data/alice-wonderland';

const levelColors: Record<string, string> = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-teal-100 text-teal-700',
  B1: 'bg-blue-100 text-blue-700',
  B2: 'bg-indigo-100 text-indigo-700',
  C1: 'bg-purple-100 text-purple-700',
  C2: 'bg-rose-100 text-rose-700',
};

export default function BooksPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Boeken</h1>
        <p className="text-lg text-gray-500">
          Read Dutch literature. Select any word or sentence for an instant English translation and grammar explanation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {availableBooks.map(book => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">{book.author}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Translated by {book.translator}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${levelColors[book.level] ?? 'bg-gray-100 text-gray-600'}`}>
                {book.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <GraduationCap className="h-3.5 w-3.5" />
                Dutch
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-500 line-clamp-2">
              Click any word or sentence while reading to get a translation and grammar explanation.
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
