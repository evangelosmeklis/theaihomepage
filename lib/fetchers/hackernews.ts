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

// AI-related keywords to filter content
const AI_KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
  'neural network', 'gpt', 'llm', 'large language model', 'openai', 'anthropic',
  'chatgpt', 'claude', 'gemini', 'copilot', 'midjourney', 'stable diffusion',
  'transformer', 'bert', 'generative', 'diffusion', 'reinforcement learning',
  'computer vision', 'nlp', 'natural language', 'pytorch', 'tensorflow'
];

function isAIRelated(title: string): boolean {
  const lowerTitle = title.toLowerCase();
  return AI_KEYWORDS.some(keyword => lowerTitle.includes(keyword));
}

export async function fetchHackerNewsPosts(limit: number = 50): Promise<NewsItem[]> {
  try {
    // Fetch more stories since we'll filter them
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    const storyIds: number[] = await response.json();

    // Fetch individual stories (fetch more than limit to account for filtering)
    const stories = await Promise.all(
      storyIds.slice(0, limit * 2).map(async (id) => {
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

    // Filter for AI-related content and map to NewsItem
    const newsItems: NewsItem[] = stories
      .filter((story): story is HNItem =>
        story !== null &&
        story.title !== undefined &&
        (story.url !== undefined || story.text !== undefined) &&
        isAIRelated(story.title) // Filter for AI-related content
      )
      .slice(0, limit) // Limit after filtering
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
