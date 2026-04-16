import { getDb } from '@/lib/db';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar_url: string | null;
  role: string;
  created_at: number;
}

export function getUserByEmail(email: string): User | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
}

export function getUserById(id: number): Omit<User, 'password'> | undefined {
  const db = getDb();
  return db
    .prepare('SELECT id, username, email, avatar_url, role, created_at FROM users WHERE id = ?')
    .get(id) as Omit<User, 'password'> | undefined;
}

export function createUser(data: { username: string; email: string; password: string }): User {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
  );
  const result = stmt.run(data.username, data.email, data.password);
  return getUserById(result.lastInsertRowid as number) as User;
}
