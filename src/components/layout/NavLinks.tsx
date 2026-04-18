'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Users, GraduationCap, Zap, MessageCircle, Library } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const links = [
  { href: '/daily', label: 'Daily', icon: Zap },
  { href: '/vocabulary', label: 'Vocabulary', icon: BookOpen },
  { href: '/grammar', label: 'Grammar', icon: GraduationCap },
  { href: '/books', label: 'Books', icon: Library },
  { href: '/chat', label: 'Tutor', icon: MessageCircle },
  { href: '/community', label: 'Community', icon: Users },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium transition-colors',
              active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </>
  );
}

/** Bottom navigation bar — shown only on small screens */
export function MobileNav() {
  const pathname = usePathname();

  const mobileLinks = [
    { href: '/daily', label: 'Daily', icon: Zap },
    { href: '/vocabulary', label: 'Vocab', icon: BookOpen },
    { href: '/grammar', label: 'Grammar', icon: GraduationCap },
    { href: '/books', label: 'Books', icon: Library },
    { href: '/chat', label: 'Tutor', icon: MessageCircle },
    { href: '/community', label: 'Community', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white sm:hidden">
      <div className="flex items-stretch">
        {mobileLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors',
                active ? 'text-blue-600' : 'text-gray-500'
              )}
            >
              <Icon className={cn('h-5 w-5', active && 'text-blue-600')} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
