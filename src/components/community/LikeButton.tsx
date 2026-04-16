'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface LikeButtonProps {
  postId?: number;
  replyId?: number;
  initialLiked: boolean;
  initialCount: number;
}

export function LikeButton({ postId, replyId, initialLiked, initialCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    if (loading) return;
    setLoading(true);

    const url = postId
      ? `/api/community/posts/${postId}/like`
      : `/api/community/replies/${replyId}/like`;

    // Optimistic update
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount(c => c + (nextLiked ? 1 : -1));

    const res = await fetch(url, { method: 'POST' });
    if (!res.ok) {
      // Revert on failure
      setLiked(liked);
      setCount(initialCount);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'flex items-center gap-1.5 text-sm transition-colors',
        liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
      )}
    >
      <Heart className={cn('h-4 w-4', liked && 'fill-current')} />
      <span>{count}</span>
    </button>
  );
}
