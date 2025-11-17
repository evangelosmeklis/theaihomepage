export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: 'reddit' | 'techcrunch' | 'hackernews' | 'startupper';
  sourceDetail?: string; // e.g., subreddit name
  publishedAt: Date;
  author?: string;
  excerpt?: string;
  score?: number;
  commentsCount?: number;
  thumbnail?: string;
  redditSortType?: 'hot' | 'top'; // Which Reddit feed this came from
}
