'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { CEFR_LEVELS, CEFR_DESCRIPTIONS } from '@/lib/utils/constants';

interface LevelSelectorProps {
  base?: string;
}

export function LevelSelector({ base = '/vocabulary' }: LevelSelectorProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={base}
        className={cn(
          'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          pathname === base
            ? 'bg-blue-600 text-white'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        )}
      >
        All Levels
      </Link>
      {CEFR_LEVELS.map(level => (
        <Link
          key={level}
          href={`${base}/${level}`}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            pathname === `${base}/${level}`
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          )}
        >
          {level} <span className="text-xs opacity-70">· {CEFR_DESCRIPTIONS[level]}</span>
        </Link>
      ))}
    </div>
  );
}
