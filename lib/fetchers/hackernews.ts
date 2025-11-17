import { NewsItem } from '../types';

interface HNItem {
  id: number;
  title: string;
  url?: string;
  by: string;
  time: number;
  score: number;
  descendants?: number;
  text?: string;
}

export async function fetchHackerNewsPosts(limit: number = 30): Promise<NewsItem[]> {
  try {
    // Fetch top story IDs
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    const storyIds: number[] = await response.json();

    // Fetch individual stories (limited)
    const stories = await Promise.all(
      storyIds.slice(0, limit).map(async (id) => {
        try {
          const itemResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
            { next: { revalidate: 300 } }
          );
          return await itemResponse.json() as HNItem;
        } catch {
          return null;
        }
      })
    );

    // Filter and map to NewsItem, only include items with URLs and AI-related content
    const newsItems: NewsItem[] = stories
      .filter((story): story is HNItem =>
        story !== null &&
        story.title !== undefined &&
        (story.url !== undefined || story.text !== undefined)
      )
      .map((story) => ({
        id: `hn-${story.id}`,
        title: story.title,
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        source: 'hackernews',
        publishedAt: new Date(story.time * 1000),
        author: story.by,
        score: story.score,
        commentsCount: story.descendants
      }));

    return newsItems;
  } catch (error) {
    console.error('Error fetching Hacker News:', error);
    return [];
  }
}
