import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostById, getReplies } from '@/lib/queries/posts';
import { getSession } from '@/lib/auth/session';
import { LikeButton } from '@/components/community/LikeButton';
import { ReplyForm } from '@/components/community/ReplyForm';
import { ReplyItem } from '@/components/community/ReplyItem';
import { formatDate } from '@/lib/utils/formatDate';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postId } = await params;
  const post = getPostById(parseInt(postId));
  return { title: post ? `${post.title} – Taaltje` : 'Post – Taaltje' };
}

export default async function PostPage({ params }: PageProps) {
  const { postId } = await params;
  const session = await getSession();
  const userId = session?.userId;

  const post = getPostById(parseInt(postId), userId);
  if (!post) notFound();

  const replies = getReplies(parseInt(postId), userId);

  const categoryColors: Record<string, string> = {
    general: 'bg-gray-100 text-gray-700',
    grammar: 'bg-blue-100 text-blue-700',
    vocabulary: 'bg-teal-100 text-teal-700',
    culture: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/community" className="hover:text-blue-600 transition-colors">Community</Link>
        <span>/</span>
        <span className="text-gray-700 line-clamp-1">{post.title}</span>
      </nav>

      {/* Post */}
      <article className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
              {post.category}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>

          <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
            <span>@{post.username}</span>
            <span>·</span>
            <span>{formatDate(post.created_at)}</span>
          </div>

          <p className="mt-5 text-gray-700 whitespace-pre-line leading-relaxed">{post.body}</p>

          <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-4">
            {session ? (
              <LikeButton
                postId={post.id}
                initialLiked={post.user_liked === 1}
                initialCount={post.likes_count}
              />
            ) : (
              <span className="flex items-center gap-1 text-sm text-gray-400">♥ {post.likes_count}</span>
            )}
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <MessageCircle className="h-4 w-4" />
              {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
            </span>
          </div>
        </div>
      </article>

      {/* Replies */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
        </h2>

        {replies.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm px-6 py-2 divide-y divide-gray-100">
            {replies.map(reply => (
              <ReplyItem key={reply.id} reply={reply} loggedIn={!!session} />
            ))}
          </div>
        )}

        {session ? (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <ReplyForm postId={post.id} />
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5 text-center">
            <p className="text-sm text-blue-800">
              <Link href="/login" className="font-semibold underline">Log in</Link> or{' '}
              <Link href="/register" className="font-semibold underline">create an account</Link> to reply.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
