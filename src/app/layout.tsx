import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/layout/NavBar';

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
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
        <footer className="mt-16 border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-400">
          Taaltje © {new Date().getFullYear()} · Learn any language, your way.
        </footer>
      </body>
    </html>
  );
}
