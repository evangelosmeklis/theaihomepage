'use client';

import { NewsItem } from '../types';

const SUBREDDITS = [
  'artificial',
  'MachineLearning',
  'OpenAI',
  'ChatGPT',
  'LocalLLaMA',
  'StableDiffusion'
];

const CACHE_KEY = 'reddit_posts_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

interface CachedData {
  posts: NewsItem[];
  timestamp: number;
}

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

// Fetch Reddit from the browser (client-side) to avoid Vercel blocking
export async function fetchRedditPostsClient(limit: number = 10): Promise<NewsItem[]> {
  // Check cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { posts, timestamp }: CachedData = JSON.parse(cached);
        const age = Date.now() - timestamp;

        // Return cached data if less than 10 minutes old
        if (age < CACHE_DURATION) {
          console.log('Using cached Reddit data (age:', Math.round(age / 1000), 'seconds)');
          return posts;
        }
      }
    } catch (error) {
      console.warn('Failed to read Reddit cache:', error);
    }
  }

  console.log('Fetching fresh Reddit data...');
  const allPosts: NewsItem[] = [];

  // Fetch all subreddits in parallel for speed
  const promises = SUBREDDITS.map(async (subreddit) => {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/hot.json?limit=${Math.ceil(limit / SUBREDDITS.length)}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.warn(`Failed to fetch r/${subreddit}: ${response.status}`);
        return [];
      }

      const data = await response.json();
      const posts: RedditPost[] = data.data.children;

      return posts.map((post): NewsItem => ({
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
    } catch (error) {
      console.error(`Error fetching from r/${subreddit}:`, error);
      return [];
    }
  });

  const results = await Promise.all(promises);
  allPosts.push(...results.flat());

  const sortedPosts = allPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  // Cache the results
  if (typeof window !== 'undefined') {
    try {
      const cacheData: CachedData = {
        posts: sortedPosts,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      console.log('Reddit data cached');
    } catch (error) {
      console.warn('Failed to cache Reddit data:', error);
    }
  }

  return sortedPosts;
}
