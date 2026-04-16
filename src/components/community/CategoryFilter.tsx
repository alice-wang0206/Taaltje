'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { COMMUNITY_CATEGORIES } from '@/lib/utils/constants';

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') ?? 'all';

  function setCategory(cat: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/community?${params.toString()}`);
  }

  const all = [{ value: 'all', label: 'All' }, ...COMMUNITY_CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map(cat => (
        <button
          key={cat.value}
          onClick={() => setCategory(cat.value)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            active === cat.value
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
