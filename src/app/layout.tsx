import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/layout/NavBar';
import { MobileNav } from '@/components/layout/NavLinks';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taaltje – Language Learning',
  description: 'Learn languages at your own pace with vocabulary, grammar lessons, and a community of learners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <NavBar />
        {/* pb-16 reserves space for the mobile bottom nav bar */}
        <main className="mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6 sm:pb-8">{children}</main>
        <footer className="mt-16 mb-16 sm:mb-0 border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-400">
          Taaltje © {new Date().getFullYear()} · Learn any language, your way.
        </footer>
        <MobileNav />
      </body>
    </html>
  );
}
