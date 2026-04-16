import { getDb } from '@/lib/db';

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  category: string;
  likes_count: number;
  reply_count: number;
  is_pinned: number;
  created_at: number;
  updated_at: number;
  username: string;
  avatar_url: string | null;
  user_liked?: number;
}

export interface Reply {
  id: number;
  post_id: number;
  user_id: number;
  body: string;
  likes_count: number;
  created_at: number;
  username: string;
  avatar_url: string | null;
  user_liked?: number;
}

export function getPosts(opts: {
  category?: string;
  page?: number;
  limit?: number;
  userId?: number;
}): { posts: Post[]; total: number } {
  const db = getDb();
  const { category, page = 1, limit = 20, userId } = opts;

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (category && category !== 'all') {
    conditions.push('p.category = ?');
    params.push(category);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const offset = (page - 1) * limit;

  const totalRow = db
    .prepare(`SELECT COUNT(*) as count FROM posts p ${where}`)
    .get(...params) as { count: number };

  const likedJoin = userId
    ? `LEFT JOIN likes ul ON ul.post_id = p.id AND ul.user_id = ${userId}`
    : '';
  const likedSelect = userId ? ', CASE WHEN ul.id IS NOT NULL THEN 1 ELSE 0 END as user_liked' : ', 0 as user_liked';

  const query = `
    SELECT p.*, u.username, u.avatar_url ${likedSelect}
    FROM posts p
    JOIN users u ON u.id = p.user_id
    ${likedJoin}
    ${where}
    ORDER BY p.is_pinned DESC, p.created_at DESC
    LIMIT ? OFFSET ?
  `;

  const posts = db.prepare(query).all(...params, limit, offset) as Post[];
  return { posts, total: totalRow.count };
}

export function getPostById(postId: number, userId?: number): Post | undefined {
  const db = getDb();
  const likedJoin = userId
    ? `LEFT JOIN likes ul ON ul.post_id = p.id AND ul.user_id = ${userId}`
    : '';
  const likedSelect = userId ? ', CASE WHEN ul.id IS NOT NULL THEN 1 ELSE 0 END as user_liked' : ', 0 as user_liked';

  return db.prepare(`
    SELECT p.*, u.username, u.avatar_url ${likedSelect}
    FROM posts p
    JOIN users u ON u.id = p.user_id
    ${likedJoin}
    WHERE p.id = ?
  `).get(postId) as Post | undefined;
}

export function createPost(data: { userId: number; title: string; body: string; category: string }): Post {
  const db = getDb();
  const result = db.prepare(`
    INSERT INTO posts (user_id, title, body, category) VALUES (?, ?, ?, ?)
  `).run(data.userId, data.title, data.body, data.category);
  return getPostById(result.lastInsertRowid as number)!;
}

export function getReplies(postId: number, userId?: number): Reply[] {
  const db = getDb();
  const likedJoin = userId
    ? `LEFT JOIN likes ul ON ul.reply_id = r.id AND ul.user_id = ${userId}`
    : '';
  const likedSelect = userId ? ', CASE WHEN ul.id IS NOT NULL THEN 1 ELSE 0 END as user_liked' : ', 0 as user_liked';

  return db.prepare(`
    SELECT r.*, u.username, u.avatar_url ${likedSelect}
    FROM replies r
    JOIN users u ON u.id = r.user_id
    ${likedJoin}
    WHERE r.post_id = ?
    ORDER BY r.created_at ASC
  `).all(postId) as Reply[];
}

export function createReply(data: { postId: number; userId: number; body: string }): Reply {
  const db = getDb();
  const insertReply = db.prepare('INSERT INTO replies (post_id, user_id, body) VALUES (?, ?, ?)');
  const incrementCount = db.prepare('UPDATE posts SET reply_count = reply_count + 1 WHERE id = ?');

  const transact = db.transaction(() => {
    const result = insertReply.run(data.postId, data.userId, data.body);
    incrementCount.run(data.postId);
    return result.lastInsertRowid as number;
  });

  const replyId = transact();
  return db.prepare(`
    SELECT r.*, u.username, u.avatar_url, 0 as user_liked
    FROM replies r JOIN users u ON u.id = r.user_id WHERE r.id = ?
  `).get(replyId) as Reply;
}

export function togglePostLike(userId: number, postId: number): { liked: boolean; likes_count: number } {
  const db = getDb();
  const existing = db.prepare('SELECT id FROM likes WHERE user_id = ? AND post_id = ?').get(userId, postId);

  const transact = db.transaction(() => {
    if (existing) {
      db.prepare('DELETE FROM likes WHERE user_id = ? AND post_id = ?').run(userId, postId);
      db.prepare('UPDATE posts SET likes_count = likes_count - 1 WHERE id = ?').run(postId);
      return false;
    } else {
      db.prepare('INSERT INTO likes (user_id, post_id) VALUES (?, ?)').run(userId, postId);
      db.prepare('UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?').run(postId);
      return true;
    }
  });

  const liked = transact();
  const post = db.prepare('SELECT likes_count FROM posts WHERE id = ?').get(postId) as { likes_count: number };
  return { liked, likes_count: post.likes_count };
}

export function toggleReplyLike(userId: number, replyId: number): { liked: boolean; likes_count: number } {
  const db = getDb();
  const existing = db.prepare('SELECT id FROM likes WHERE user_id = ? AND reply_id = ?').get(userId, replyId);

  const transact = db.transaction(() => {
    if (existing) {
      db.prepare('DELETE FROM likes WHERE user_id = ? AND reply_id = ?').run(userId, replyId);
      db.prepare('UPDATE replies SET likes_count = likes_count - 1 WHERE id = ?').run(replyId);
      return false;
    } else {
      db.prepare('INSERT INTO likes (user_id, reply_id) VALUES (?, ?)').run(userId, replyId);
      db.prepare('UPDATE replies SET likes_count = likes_count + 1 WHERE id = ?').run(replyId);
      return true;
    }
  });

  const liked = transact();
  const reply = db.prepare('SELECT likes_count FROM replies WHERE id = ?').get(replyId) as { likes_count: number };
  return { liked, likes_count: reply.likes_count };
}
