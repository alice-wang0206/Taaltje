'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Circle } from 'lucide-react';

interface CompleteButtonProps {
  topicId: number;
  initialCompleted: boolean;
}

export function CompleteButton({ topicId, initialCompleted }: CompleteButtonProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const next = !completed;
    setCompleted(next);
    await fetch('/api/progress/grammar', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, completed: next }),
    });
    setLoading(false);
  }

  return (
    <Button
      variant={completed ? 'secondary' : 'primary'}
      onClick={toggle}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {completed ? (
        <>
          <CheckCircle className="h-4 w-4 text-green-600" />
          Completed
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" />
          Mark as complete
        </>
      )}
    </Button>
  );
}
