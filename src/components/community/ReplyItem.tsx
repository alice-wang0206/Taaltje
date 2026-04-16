import { formatRelative } from '@/lib/utils/formatDate';
import { LikeButton } from './LikeButton';
import { type Reply } from '@/lib/queries/posts';

interface ReplyItemProps {
  reply: Reply;
  loggedIn?: boolean;
}

export function ReplyItem({ reply, loggedIn }: ReplyItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-sm font-bold text-white">
        {reply.username[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-900">@{reply.username}</span>
          <span className="text-xs text-gray-400">{formatRelative(reply.created_at)}</span>
        </div>
        <p className="text-sm text-gray-700 whitespace-pre-line">{reply.body}</p>
        <div className="mt-2">
          {loggedIn ? (
            <LikeButton
              replyId={reply.id}
              initialLiked={reply.user_liked === 1}
              initialCount={reply.likes_count}
            />
          ) : (
            <span className="flex items-center gap-1 text-sm text-gray-400">
              ♥ {reply.likes_count}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
