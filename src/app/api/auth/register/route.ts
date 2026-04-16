import { NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations/auth';
import { getUserByEmail, createUser } from '@/lib/queries/users';
import { hashPassword } from '@/lib/auth/password';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Validation error' }, { status: 400 });
    }

    const { username, email, password } = parsed.data;

    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    const user = createUser({ username, email, password: hashed });

    return NextResponse.json(
      { user: { id: user.id, username: user.username, email: user.email } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
