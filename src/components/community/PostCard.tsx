import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { MessageCircle, Heart, Pin } from 'lucide-react';
import { formatRelative } from '@/lib/utils/formatDate';
import { type Post } from '@/lib/queries/posts';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const categoryColors: Record<string, string> = {
    general: 'bg-gray-100 text-gray-700',
    grammar: 'bg-blue-100 text-blue-700',
    vocabulary: 'bg-teal-100 text-teal-700',
    culture: 'bg-amber-100 text-amber-700',
  };

  return (
    <Link
      href={`/community/${post.id}`}
      className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {post.is_pinned === 1 && <Pin className="h-4 w-4 text-amber-500" />}
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-700'}`}
            >
              {post.category}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{post.body}</p>

          <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
            <span className="font-medium text-gray-600">@{post.username}</span>
            <span>{formatRelative(post.created_at)}</span>
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {post.likes_count}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              {post.reply_count}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
