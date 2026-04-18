import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { GraduationCap } from 'lucide-react';
import { NavLinks } from './NavLinks';

export async function NavBar() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <GraduationCap className="h-6 w-6" />
          <span>Taaltje</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 sm:flex">
          <NavLinks />
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
