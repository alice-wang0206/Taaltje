import { NextResponse, type NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { result } = body;

    if (!result || !['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(result)) {
      return NextResponse.json({ error: 'Invalid result' }, { status: 400 });
    }

    const session = await getSession();
    if (session) {
      // Store the placement result on the user profile (add column if needed)
      const db = getDb();
      const hasColumn = (db.prepare("PRAGMA table_info(users)").all() as { name: string }[])
        .some(col => col.name === 'placement_level');

      if (!hasColumn) {
        db.exec('ALTER TABLE users ADD COLUMN placement_level TEXT');
      }

      db.prepare('UPDATE users SET placement_level = ? WHERE id = ?')
        .run(result, session.userId);
    }

    return NextResponse.json({ success: true, result });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
