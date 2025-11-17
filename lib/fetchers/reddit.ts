import { NewsItem } from '../types';

// Server-side Reddit fetching is disabled because Vercel's IPs are blocked by Reddit
// Reddit posts are fetched client-side instead (see reddit-client.ts)
export async function fetchRedditPosts(limit: number = 10): Promise<NewsItem[]> {
  console.log('⚠️  Skipping server-side Reddit fetch (blocked by Reddit on Vercel)');
  console.log('✅ Reddit posts will be fetched client-side from user browsers');
  
  // Return empty array - Reddit will be fetched client-side
  return [];
}
