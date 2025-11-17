'use client';

interface SourceFilterProps {
  selectedSources: Set<string>;
  onToggleSource: (source: string) => void;
}

const sources = [
  { id: 'all', label: 'All', color: 'bg-gray-600' },
  { id: 'reddit', label: 'Reddit', color: 'bg-orange-500' },
  { id: 'techcrunch', label: 'TechCrunch', color: 'bg-green-500' },
  { id: 'hackernews', label: 'Hacker News', color: 'bg-orange-600' },
  { id: 'startupper', label: 'Startupper', color: 'bg-blue-500' }
];

export function SourceFilter({ selectedSources, onToggleSource }: SourceFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source) => {
        const isSelected = source.id === 'all'
          ? selectedSources.size === 0
          : selectedSources.has(source.id);

        return (
          <button
            key={source.id}
            onClick={() => onToggleSource(source.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isSelected
                ? `${source.color} text-white shadow-md`
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {source.label}
          </button>
        );
      })}
    </div>
  );
}
