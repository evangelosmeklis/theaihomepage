import Parser from 'rss-parser';
import { NewsItem } from '../types';

const parser = new Parser();

// AI-related keywords to filter content (Greek and English)
const AI_KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
  'neural network', 'gpt', 'llm', 'large language model', 'openai', 'anthropic',
  'chatgpt', 'claude', 'gemini', 'copilot', 'midjourney', 'stable diffusion',
  'transformer', 'generative', 'nlp', 'natural language',
  // Greek keywords
  'τεχνητή νοημοσύνη', 'μηχανική μάθηση'
];

function isAIRelated(title: string, content?: string): boolean {
  const searchText = (title + ' ' + (content || '')).toLowerCase();
  return AI_KEYWORDS.some(keyword => searchText.includes(keyword));
}

export async function fetchStartupperPosts(limit: number = 30): Promise<NewsItem[]> {
  try {
    // Fetch more items than limit to account for filtering
    const feed = await parser.parseURL('https://startupper.gr/feed/');

    // Filter for AI-related content
    const aiItems = feed.items.filter(item =>
      isAIRelated(
        item.title || '',
        item.contentSnippet || item.content || ''
      )
    );

    const newsItems: NewsItem[] = aiItems.slice(0, limit).map((item, index) => ({
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
