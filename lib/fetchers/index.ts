import { fetchRedditPosts } from './reddit';
import { fetchTechCrunchPosts } from './techcrunch';
import { fetchHackerNewsPosts } from './hackernews';
import { fetchStartupperPosts } from './startupper';
import { NewsItem } from '../types';

export async function fetchAllNews(): Promise<NewsItem[]> {
  try {
    // Fetch from all sources in parallel
    const [reddit, techcrunch, hackernews, startupper] = await Promise.all([
      fetchRedditPosts(30),
      fetchTechCrunchPosts(20),
      fetchHackerNewsPosts(30),
      fetchStartupperPosts(15)
    ]);

    // Combine and sort by date
    const allNews = [...reddit, ...techcrunch, ...hackernews, ...startupper];
    return allNews.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  } catch (error) {
    console.error('Error fetching all news:', error);
    return [];
  }
}
