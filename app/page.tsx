'use client';

import { useEffect, useState } from 'react';
import { NewsItem } from '@/lib/types';
import { NewsCard } from '@/components/NewsCard';
import { SourceFilter } from '@/components/SourceFilter';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNews(data);
        setFilteredNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  useEffect(() => {
    if (selectedSources.size === 0) {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter(item => selectedSources.has(item.source)));
    }
  }, [selectedSources, news]);

  const handleToggleSource = (source: string) => {
    if (source === 'all') {
      setSelectedSources(new Set());
    } else {
      const newSelected = new Set(selectedSources);
      if (newSelected.has(source)) {
        newSelected.delete(source);
      } else {
        newSelected.add(source);
      }
      setSelectedSources(newSelected);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            The AI Homepage
          </h1>
          <p className="text-gray-600">
            Your daily dose of AI news from across the web
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by source:</h2>
          <SourceFilter
            selectedSources={selectedSources}
            onToggleSource={handleToggleSource}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredNews.length} articles
            </div>

            <div className="space-y-6">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No articles found for the selected filters.
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>Aggregating news from Reddit, TechCrunch, Hacker News, and Startupper.gr</p>
          <p className="text-sm mt-2">Updates every 5 minutes</p>
        </div>
      </footer>
    </div>
  );
}
