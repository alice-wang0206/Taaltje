import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(5).max(200),
  body: z.string().min(10).max(10000),
  category: z.enum(['general', 'grammar', 'vocabulary', 'culture']),
});

export const createReplySchema = z.object({
  body: z.string().min(1).max(5000),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreateReplyInput = z.infer<typeof createReplySchema>;
