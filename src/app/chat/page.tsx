import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { getDb } from '@/lib/db';
import { ChatBot } from '@/components/chat/ChatBot';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Chat Tutor – Taaltje' };

function getUserLevel(userId: number): string | null {
  const db = getDb();
  const hasCol = (db.prepare('PRAGMA table_info(users)').all() as { name: string }[])
    .some(c => c.name === 'placement_level');
  if (!hasCol) return null;
  const row = db.prepare('SELECT placement_level FROM users WHERE id = ?').get(userId) as
    { placement_level: string | null } | undefined;
  return row?.placement_level ?? null;
}

export default async function ChatPage() {
  const session = await getSession();
  if (!session) redirect('/login?from=/chat');

  const currentLevel = getUserLevel(session.userId);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Chat Tutor</h1>
        <p className="text-sm text-gray-500 mt-1">
          Have a conversation in Dutch. Taal will assess your level and update it automatically.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <ChatBot initialLevel={currentLevel} />
      </div>
    </div>
  );
}
