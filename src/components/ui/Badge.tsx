import { cn } from '@/lib/utils/cn';

const levelColors: Record<string, string> = {
  A1: 'bg-green-100 text-green-800',
  A2: 'bg-teal-100 text-teal-800',
  B1: 'bg-blue-100 text-blue-800',
  B2: 'bg-indigo-100 text-indigo-800',
  C1: 'bg-purple-100 text-purple-800',
  C2: 'bg-rose-100 text-rose-800',
};

interface BadgeProps {
  level?: string;
  label?: string;
  className?: string;
}

export function Badge({ level, label, className }: BadgeProps) {
  const text = label ?? level ?? '';
  const color = level ? (levelColors[level] ?? 'bg-gray-100 text-gray-800') : 'bg-gray-100 text-gray-700';
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', color, className)}>
      {text}
    </span>
  );
}
