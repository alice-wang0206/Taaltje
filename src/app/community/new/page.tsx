import { PostForm } from '@/components/community/PostForm';

export const metadata = { title: 'New Post – Taaltje' };

export default function NewPostPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create a new post</h1>
        <p className="mt-1 text-gray-500">Share a question, resource, or tip with the community.</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <PostForm />
      </div>
    </div>
  );
}
