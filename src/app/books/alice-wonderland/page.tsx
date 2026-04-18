import { aliceInWonderland } from '@/lib/db/data/alice-wonderland';
import { BookReader } from '@/components/books/BookReader';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AlicePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Back link */}
      <Link
        href="/books"
        className="mb-8 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        All books
      </Link>

      {/* Book header */}
      <div className="mb-10 space-y-1 border-b border-gray-100 pb-8">
        <p className="text-sm text-gray-400 uppercase tracking-widest">Lewis Carroll</p>
        <h1 className="text-4xl font-bold text-gray-900 font-serif">Alice in Wonderland</h1>
        <p className="text-sm text-gray-500">
          Vertaald door Eelke de Jong &middot; Pantheon, 2015
        </p>
      </div>

      {/* Interactive reader */}
      <BookReader book={aliceInWonderland} />
    </main>
  );
}
