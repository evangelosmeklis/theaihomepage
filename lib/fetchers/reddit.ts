import { NewsItem } from '../types';
import Parser from 'rss-parser';

const SUBREDDITS = [
  'artificial',
  'MachineLearning',
  'OpenAI',
  'ChatGPT',
  'LocalLLaMA',
  'StableDiffusion'
];

const parser = new Parser({
  customFields: {
    item: [
      ['author', 'author'],
      ['link', 'link'],
    ]
  }
});

export async function fetchRedditPosts(limit: number = 10): Promise<NewsItem[]> {
  const allPosts: NewsItem[] = [];
  const postsPerSubreddit = Math.ceil(limit / SUBREDDITS.length);

  for (const subreddit of SUBREDDITS) {
    try {
      // Use Reddit RSS feeds - no authentication required and less likely to be blocked
      const rssUrl = `https://www.reddit.com/r/${subreddit}/hot.rss?limit=${postsPerSubreddit}`;
      
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; theaihomepage.com/1.0)',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        console.error(`Reddit RSS error for r/${subreddit}: ${response.status} ${response.statusText}`);
        continue;
      }

      const rssText = await response.text();
      const feed = await parser.parseString(rssText);

      const newsItems = feed.items.map((item): NewsItem => {
        // Extract Reddit post ID from the link
        const postIdMatch = item.link?.match(/comments\/([^\/]+)/);
        const postId = postIdMatch ? postIdMatch[1] : item.guid || Math.random().toString();

        // Extract score and comments from the content
        const scoreMatch = item.content?.match(/(\d+) points?/);
        const commentsMatch = item.content?.match(/(\d+) comments?/);
        
        const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
        const commentsCount = commentsMatch ? parseInt(commentsMatch[1], 10) : 0;

        // Extract username from author string (format: "/u/username")
        const authorMatch = item.creator?.match(/\/u\/(.+)/);
        const author = authorMatch ? authorMatch[1] : (item.creator || 'unknown');

        // Extract thumbnail from content HTML if available
        let thumbnail: string | undefined;
        const thumbnailMatch = item.content?.match(/<img src="([^"]+)"/);
        if (thumbnailMatch) {
          thumbnail = thumbnailMatch[1];
        }

        // Extract excerpt from content (remove HTML tags)
        let excerpt: string | undefined;
        if (item.contentSnippet) {
          excerpt = item.contentSnippet.replace(/<[^>]*>/g, '').substring(0, 200);
        }

        return {
          id: `reddit-${postId}`,
          title: item.title || '',
          url: item.link || '',
          source: 'reddit',
          sourceDetail: `r/${subreddit}`,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          author,
          excerpt,
          score,
          commentsCount,
          thumbnail: thumbnail?.startsWith('http') ? thumbnail : undefined
        };
      });

      allPosts.push(...newsItems);
    } catch (error) {
      console.error(`Error fetching from r/${subreddit}:`, error);
    }
  }

  return allPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
