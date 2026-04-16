import { PlacementTest } from '@/components/placement/PlacementTest';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Placement Test – Taaltje',
  description: 'Take a short adaptive test to find your Dutch level before you start learning.',
};

export default function PlacementTestPage() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Find your level</h1>
        <p className="mt-2 text-gray-500">
          30 questions across 6 levels. The test adapts — as soon as you struggle, we stop and tell you where to start.
          Takes about 5–8 minutes.
        </p>
        <div className="mt-4 flex justify-center gap-3 text-sm text-gray-400">
          <span>● 5 questions per level</span>
          <span>●</span>
          <span>● Vocabulary, grammar & reading</span>
          <span>●</span>
          <span>● No registration required</span>
        </div>
      </div>

      <PlacementTest />
    </div>
  );
}
