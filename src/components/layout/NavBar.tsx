import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { BookOpen, Users, GraduationCap, Zap, MessageCircle, Library } from 'lucide-react';

export async function NavBar() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <GraduationCap className="h-6 w-6" />
          <span>Taaltje</span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <Link
            href="/daily"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Zap className="h-4 w-4" />
            Daily
          </Link>
          <Link
            href="/vocabulary"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Vocabulary
          </Link>
          <Link
            href="/grammar"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <GraduationCap className="h-4 w-4" />
            Grammar
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Tutor
          </Link>
          <Link
            href="/books"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Library className="h-4 w-4" />
            Books
          </Link>
          <Link
            href="/community"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Users className="h-4 w-4" />
            Community
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {session.username}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
