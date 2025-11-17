import { NewsItem } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  item: NewsItem;
}

const sourceColors = {
  reddit: 'bg-orange-500',
  techcrunch: 'bg-green-500',
  hackernews: 'bg-orange-600',
  startupper: 'bg-blue-500'
};

const sourceLabels = {
  reddit: 'Reddit',
  techcrunch: 'TechCrunch',
  hackernews: 'Hacker News',
  startupper: 'Startupper.gr'
};

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start gap-4">
        {item.thumbnail && (
          <div className="flex-shrink-0 w-24 h-24 rounded overflow-hidden bg-gray-100">
            <img
              src={item.thumbnail}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`${sourceColors[item.source]} text-white text-xs font-semibold px-2 py-1 rounded`}>
              {sourceLabels[item.source]}
            </span>
            {item.sourceDetail && (
              <span className="text-xs text-gray-500">{item.sourceDetail}</span>
            )}
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {item.title}
            </a>
          </h2>

          {item.excerpt && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {item.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            {item.author && (
              <span>by {item.author}</span>
            )}
            <span>{formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}</span>
            {item.score !== undefined && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                {item.score}
              </span>
            )}
            {item.commentsCount !== undefined && item.commentsCount > 0 && (
              <span>{item.commentsCount} comments</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
