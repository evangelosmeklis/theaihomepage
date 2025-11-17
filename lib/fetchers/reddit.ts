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

async function fetchSubredditRSS(subreddit: string, sortType: 'hot' | 'top', limit: number): Promise<NewsItem[]> {
  try {
    // Build RSS URL based on sort type
    const rssUrl = sortType === 'hot' 
      ? `https://www.reddit.com/r/${subreddit}/hot.rss?limit=${limit}`
      : `https://www.reddit.com/r/${subreddit}/top.rss?t=day&limit=${limit}`;
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; theaihomepage.com/1.0)',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      console.error(`Reddit RSS error for r/${subreddit} (${sortType}): ${response.status} ${response.statusText}`);
      return [];
    }

    const rssText = await response.text();
    const feed = await parser.parseString(rssText);

    return feed.items.map((item): NewsItem => {
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
        id: `reddit-${sortType}-${postId}`,
        title: item.title || '',
        url: item.link || '',
        source: 'reddit',
        sourceDetail: `r/${subreddit}`,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        author,
        excerpt,
        score,
        commentsCount,
        thumbnail: thumbnail?.startsWith('http') ? thumbnail : undefined,
        redditSortType: sortType // Track which feed this came from
      };
    });
  } catch (error) {
    console.error(`Error fetching from r/${subreddit} (${sortType}):`, error);
    return [];
  }
}

export async function fetchRedditPosts(limit: number = 10): Promise<NewsItem[]> {
  const allPosts: NewsItem[] = [];
  const postsPerSubreddit = Math.ceil(limit / SUBREDDITS.length);

  // Fetch both hot and top posts for each subreddit in parallel
  const fetchPromises = SUBREDDITS.flatMap(subreddit => [
    fetchSubredditRSS(subreddit, 'hot', postsPerSubreddit),
    fetchSubredditRSS(subreddit, 'top', postsPerSubreddit)
  ]);

  const results = await Promise.all(fetchPromises);
  allPosts.push(...results.flat());

  // Remove duplicates (same post might appear in both hot and top)
  const uniquePosts = new Map<string, NewsItem>();
  for (const post of allPosts) {
    // Use the base post ID (without the sort type prefix) for deduplication
    const baseId = post.id.replace(/^reddit-(hot|top)-/, 'reddit-');
    
    // Keep the post with the higher score (usually from 'top' feed)
    if (!uniquePosts.has(baseId) || (post.score || 0) > (uniquePosts.get(baseId)?.score || 0)) {
      uniquePosts.set(baseId, { ...post, id: baseId });
    }
  }

  return Array.from(uniquePosts.values()).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
