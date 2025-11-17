import { NextResponse } from 'next/server';
import { fetchAllNews } from '@/lib/fetchers';
import { NewsItem } from '@/lib/types';

// In-memory cache to store news data
let cachedNews: NewsItem[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export async function GET() {
  try {
    const now = Date.now();

    // Check if cache is still valid
    if (cachedNews.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      console.log('Serving from cache');
      return NextResponse.json(cachedNews);
    }

    // Cache expired or empty, fetch new data
    console.log('Fetching fresh data from APIs');
    const news = await fetchAllNews();

    // Update cache
    cachedNews = news;
    lastFetchTime = now;

    return NextResponse.json(news);
  } catch (error) {
    console.error('API error:', error);

    // If fetch fails but we have cached data, return it
    if (cachedNews.length > 0) {
      console.log('API fetch failed, serving stale cache');
      return NextResponse.json(cachedNews);
    }

    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// Set revalidate to match cache duration for CDN caching
export const revalidate = 600; // 10 minutes
