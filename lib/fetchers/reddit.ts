import { NewsItem } from '../types';

const SUBREDDITS = [
  'artificial',
  'MachineLearning',
  'OpenAI',
  'ChatGPT',
  'LocalLLaMA',
  'StableDiffusion'
];

interface RedditPost {
  data: {
    id: string;
    title: string;
    url: string;
    author: string;
    created_utc: number;
    selftext?: string;
    score: number;
    num_comments: number;
    thumbnail?: string;
    subreddit: string;
    permalink: string;
  };
}

export async function fetchRedditPosts(limit: number = 10): Promise<NewsItem[]> {
  const allPosts: NewsItem[] = [];

  for (const subreddit of SUBREDDITS) {
    try {
      // Use old.reddit.com which is less likely to block server requests
      const response = await fetch(
        `https://old.reddit.com/r/${subreddit}/hot.json?limit=${Math.ceil(limit / SUBREDDITS.length)}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; theaihomepage.com/1.0; +https://theaihomepage.com)',
            'Accept': 'application/json',
          },
          next: { revalidate: 300 } // Cache for 5 minutes
        }
      );

      if (!response.ok) {
        console.error(`Reddit API error for r/${subreddit}: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      const posts: RedditPost[] = data.data.children;

      const newsItems = posts.map((post): NewsItem => ({
        id: `reddit-${post.data.id}`,
        title: post.data.title,
        url: post.data.url.startsWith('/r/')
          ? `https://www.reddit.com${post.data.permalink}`
          : post.data.url,
        source: 'reddit',
        sourceDetail: `r/${subreddit}`,
        publishedAt: new Date(post.data.created_utc * 1000),
        author: post.data.author,
        excerpt: post.data.selftext?.substring(0, 200),
        score: post.data.score,
        commentsCount: post.data.num_comments,
        thumbnail: post.data.thumbnail?.startsWith('http') ? post.data.thumbnail : undefined
      }));

      allPosts.push(...newsItems);
    } catch (error) {
      console.error(`Error fetching from r/${subreddit}:`, error);
    }
  }

  return allPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
