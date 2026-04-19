import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { getUserById } from '@/lib/queries/users';
import { getUserWordProgress } from '@/lib/queries/words';
import { getDb } from '@/lib/db';
import { isProUser, getSubscription } from '@/lib/mollie';
import { formatDate } from '@/lib/utils/formatDate';
import { BookOpen, GraduationCap, MessageCircle, Zap } from 'lucide-react';

export const metadata = { title: 'Profile – Taaltje' };

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = getUserById(session.userId);
  if (!user) redirect('/login');

  const wordProgress = getUserWordProgress(session.userId);
  const isPro = isProUser(session.userId);
  const sub = getSubscription(session.userId);

  const grammarCompleted = (
    getDb()
      .prepare('SELECT COUNT(*) as count FROM grammar_progress WHERE user_id = ? AND completed = 1')
      .get(session.userId) as { count: number }
  ).count;

  const postCount = (
    getDb()
      .prepare('SELECT COUNT(*) as count FROM posts WHERE user_id = ?')
      .get(session.userId) as { count: number }
  ).count;

  const replyCount = (
    getDb()
      .prepare('SELECT COUNT(*) as count FROM replies WHERE user_id = ?')
      .get(session.userId) as { count: number }
  ).count;

  const stats = [
    {
      icon: BookOpen,
      label: 'Words known',
      value: wordProgress.known,
      sub: `${wordProgress.learning} learning`,
      color: 'bg-teal-50 text-teal-600',
    },
    {
      icon: GraduationCap,
      label: 'Lessons completed',
      value: grammarCompleted,
      sub: 'grammar topics',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: MessageCircle,
      label: 'Community posts',
      value: postCount + replyCount,
      sub: `${postCount} posts, ${replyCount} replies`,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      {/* Avatar + name */}
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-2xl font-bold text-white">
          {user.username[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">@{user.username}</h1>
          <p className="text-sm text-gray-500">{user.email} · Member since {formatDate(user.created_at)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className={`mb-3 inline-flex rounded-lg p-2 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Subscription status */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`inline-flex rounded-lg p-2 ${isPro ? 'bg-amber-50 text-amber-500' : 'bg-gray-100 text-gray-400'}`}>
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {isPro ? 'Taaltje Premium' : 'Free plan'}
              </p>
              {isPro && sub?.subscription_ends_at && (
                <p className="text-xs text-gray-400">
                  {sub.subscription_status === 'cancelled'
                    ? `Access until ${new Date(sub.subscription_ends_at * 1000).toLocaleDateString('nl-NL')}`
                    : `Renews ${new Date(sub.subscription_ends_at * 1000).toLocaleDateString('nl-NL')}`}
                </p>
              )}
              {!isPro && <p className="text-xs text-gray-400">Upgrade to unlock all features</p>}
            </div>
          </div>
          <Link
            href="/upgrade"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              isPro
                ? 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                : 'bg-amber-500 text-white hover:bg-amber-600'
            }`}
          >
            {isPro ? 'Manage' : 'Upgrade'}
          </Link>
        </div>
      </div>

      {wordProgress.total === 0 && grammarCompleted === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
          <p className="font-medium">Your learning journey starts here.</p>
          <p className="text-sm mt-1">Visit Vocabulary or Grammar to begin tracking your progress.</p>
        </div>
      )}
    </div>
  );
}
