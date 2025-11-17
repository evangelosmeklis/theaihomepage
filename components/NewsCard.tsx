import { NewsItem } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  item: NewsItem;
}

const sourceColors = {
  reddit: 'bg-gradient-to-r from-orange-500 to-red-500',
  techcrunch: 'bg-gradient-to-r from-green-500 to-emerald-500',
  hackernews: 'bg-gradient-to-r from-orange-600 to-amber-600',
  startupper: 'bg-gradient-to-r from-blue-500 to-cyan-500'
};

const sourceLabels = {
  reddit: 'Reddit',
  techcrunch: 'TechCrunch',
  hackernews: 'Hacker News',
  startupper: 'Startupper.gr'
};

export function NewsCard({ item }: NewsCardProps) {
  const isNew = (Date.now() - new Date(item.publishedAt).getTime()) < 3600000; // Less than 1 hour

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full relative group">
      {isNew && (
        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse z-10">
          NEW
        </span>
      )}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full"
      >
        {/* Image on left if available */}
        {item.thumbnail && (
          <div className="flex-shrink-0 w-32 h-full rounded-l-lg overflow-hidden">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.parentElement!.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`${sourceColors[item.source]} text-white text-xs font-medium px-2 py-1 rounded`}>
              {sourceLabels[item.source]}
            </span>
            {item.sourceDetail && (
              <span className="text-xs text-gray-500 truncate">{item.sourceDetail}</span>
            )}
          </div>

          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
            {item.title}
          </h2>

          {item.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 flex-1">
              {item.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
            <span>{formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}</span>
            <div className="flex items-center gap-3">
              {item.score !== undefined && item.score > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  {item.score}
                </span>
              )}
              {item.commentsCount !== undefined && item.commentsCount > 0 && (
                <span>{item.commentsCount}</span>
              )}
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
