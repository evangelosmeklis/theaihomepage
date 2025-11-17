import Parser from 'rss-parser';
import { NewsItem } from '../types';

const parser = new Parser();

export async function fetchStartupperPosts(limit: number = 15): Promise<NewsItem[]> {
  try {
    // Try the standard RSS feed URL
    const feed = await parser.parseURL('https://startupper.gr/feed/');

    const newsItems: NewsItem[] = feed.items.slice(0, limit).map((item, index) => ({
      id: `startupper-${item.guid || index}`,
      title: item.title || 'Untitled',
      url: item.link || '',
      source: 'startupper',
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      author: item.creator || item.author,
      excerpt: item.contentSnippet?.substring(0, 200) || item.content?.substring(0, 200),
      thumbnail: item.enclosure?.url
    }));

    return newsItems;
  } catch (error) {
    console.error('Error fetching startupper.gr RSS:', error);
    return [];
  }
}
