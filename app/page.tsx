'use client';

import { useEffect, useState } from 'react';
import { NewsItem } from '@/lib/types';
import { NewsCard } from '@/components/NewsCard';
import { Navigation } from '@/components/Navigation';
import { SourceFilter } from '@/components/SourceFilter';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'newest' | 'top'>('newest');
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
    let filtered = news;

    // Filter by source
    if (selectedSources.size > 0) {
      filtered = filtered.filter(item => selectedSources.has(item.source));
    }

    // Sort
    if (sortBy === 'newest') {
      // Sort by date, newest first
      filtered = [...filtered].sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sortBy === 'top') {
      // Filter for today and sort by score
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      filtered = [...filtered]
        .filter(item => new Date(item.publishedAt) >= today)
        .sort((a, b) => {
          const scoreA = a.score || 0;
          const scoreB = b.score || 0;
          return scoreB - scoreA;
        });
    }

    setFilteredNews(filtered);
  }, [selectedSources, sortBy, news]);

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

  const handleSortChange = (sort: 'newest' | 'top') => {
    setSortBy(sort);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <SourceFilter
            selectedSources={selectedSources}
            onToggleSource={handleToggleSource}
            sortBy={sortBy}
            onSortChange={handleSortChange}
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
            {filteredNews.length === 0 && sortBy === 'top' && (
              <div className="text-center py-20 text-gray-500">
                No articles from today with scores available. Try "newest" to see all articles.
              </div>
            )}
            {filteredNews.length === 0 && sortBy === 'newest' && (
              <div className="text-center py-20 text-gray-500">
                No articles found for the selected filters.
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
