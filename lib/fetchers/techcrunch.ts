import Parser from 'rss-parser';
import { NewsItem } from '../types';

const parser = new Parser();

export async function fetchTechCrunchPosts(limit: number = 20): Promise<NewsItem[]> {
  try {
    // TechCrunch has specific RSS feeds - using the AI feed
    const feed = await parser.parseURL('https://techcrunch.com/category/artificial-intelligence/feed/');

    const newsItems: NewsItem[] = feed.items.slice(0, limit).map((item, index) => ({
      id: `techcrunch-${item.guid || index}`,
      title: item.title || 'Untitled',
      url: item.link || '',
      source: 'techcrunch',
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      author: item.creator || item.author,
      excerpt: item.contentSnippet?.substring(0, 200) || item.content?.substring(0, 200),
      thumbnail: item.enclosure?.url
    }));

    return newsItems;
  } catch (error) {
    console.error('Error fetching TechCrunch RSS:', error);
    return [];
  }
}
