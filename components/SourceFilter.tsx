'use client';

interface SourceFilterProps {
  selectedSources: Set<string>;
  onToggleSource: (source: string) => void;
  sortBy: 'newest' | 'top';
  onSortChange: (sort: 'newest' | 'top') => void;
}

const sources = [
  { id: 'all', label: 'all' },
  { id: 'reddit', label: 'reddit' },
  { id: 'techcrunch', label: 'techcrunch' },
  { id: 'hackernews', label: 'hacker news' },
  { id: 'startupper', label: 'startupper' }
];

const sortOptions = [
  { id: 'newest', label: 'newest' },
  { id: 'top', label: 'top today' }
];

export function SourceFilter({ selectedSources, onToggleSource, sortBy, onSortChange }: SourceFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {/* Source Filter */}
      <div className="flex items-center gap-1">
        <span className="text-gray-500 dark:text-gray-400 mr-2">filter:</span>
        {sources.map((source, index) => {
          const isSelected = source.id === 'all'
            ? selectedSources.size === 0
            : selectedSources.has(source.id);

          return (
            <span key={source.id} className="flex items-center">
              <button
                onClick={() => onToggleSource(source.id)}
                className={`px-2 py-1 rounded transition-colors ${
                  isSelected
                    ? 'text-gray-900 dark:text-gray-100 font-medium underline underline-offset-4'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {source.label}
              </button>
              {index < sources.length - 1 && (
                <span className="text-gray-300 dark:text-gray-600 mx-1">/</span>
              )}
            </span>
          );
        })}
      </div>

      {/* Divider */}
      <span className="text-gray-300 dark:text-gray-600">|</span>

      {/* Sort Filter */}
      <div className="flex items-center gap-1">
        <span className="text-gray-500 dark:text-gray-400 mr-2">sort:</span>
        {sortOptions.map((option, index) => (
          <span key={option.id} className="flex items-center">
            <button
              onClick={() => onSortChange(option.id as 'newest' | 'top')}
              className={`px-2 py-1 rounded transition-colors ${
                sortBy === option.id
                  ? 'text-gray-900 dark:text-gray-100 font-medium underline underline-offset-4'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {option.label}
            </button>
            {index < sortOptions.length - 1 && (
              <span className="text-gray-300 dark:text-gray-600 mx-1">/</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
