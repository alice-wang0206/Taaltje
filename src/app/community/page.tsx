import Link from 'next/link';
import { getPosts } from '@/lib/queries/posts';
import { getSession } from '@/lib/auth/session';
import { PostCard } from '@/components/community/PostCard';
import { CategoryFilter } from '@/components/community/CategoryFilter';
import { Button } from '@/components/ui/Button';
import { PenSquare } from 'lucide-react';
import { Suspense } from 'react';

export const metadata = { title: 'Community – Taaltje' };

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function CommunityPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const category = sp.category;
  const page = parseInt(sp.page ?? '1', 10);

  const session = await getSession();
  const { posts, total } = getPosts({ category, page, userId: session?.userId });

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <p className="mt-1 text-gray-500">{total} posts · Ask questions, share tips, connect.</p>
        </div>
        <Link href="/community/new">
          <Button className="flex items-center gap-2">
            <PenSquare className="h-4 w-4" />
            New post
          </Button>
        </Link>
      </div>

      <Suspense>
        <CategoryFilter />
      </Suspense>

      <div className="flex flex-col gap-3">
        {posts.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            No posts yet. Be the first to start a conversation!
          </div>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link
              key={p}
              href={`/community?${category ? `category=${category}&` : ''}page=${p}`}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                p === page ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
