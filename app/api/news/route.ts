import { NextResponse } from 'next/server';
import { fetchAllNews } from '@/lib/fetchers';

export async function GET() {
  try {
    const news = await fetchAllNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// Revalidate every 5 minutes
export const revalidate = 300;
