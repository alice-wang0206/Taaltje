import { type GrammarExample } from '@/lib/queries/grammar';

interface ExamplesTableProps {
  examples: GrammarExample[];
}

export function ExamplesTable({ examples }: ExamplesTableProps) {
  if (!examples.length) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Example</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Translation</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-500 hidden sm:table-cell">Note</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {examples.map(ex => (
            <tr key={ex.id} className="bg-white hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 italic">{ex.sentence}</td>
              <td className="px-4 py-3 text-gray-600">{ex.translation}</td>
              <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">{ex.note ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
