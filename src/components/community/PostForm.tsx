'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { COMMUNITY_CATEGORIES } from '@/lib/utils/constants';

export function PostForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/community/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: fd.get('title'),
        body: fd.get('body'),
        category: fd.get('category'),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? 'Failed to create post');
      return;
    }

    router.push(`/community/${data.post.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input label="Title" id="title" name="title" required placeholder="What's your question or topic?" />

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          name="category"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {COMMUNITY_CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <Textarea
        label="Post content"
        id="body"
        name="body"
        required
        placeholder="Share your thoughts, questions, or resources..."
        className="min-h-[160px]"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading} size="lg">
        {loading ? 'Publishing…' : 'Publish post'}
      </Button>
    </form>
  );
}
