'use client';

import { useEffect, useState } from 'react';
import { NewsItem } from '@/lib/types';
import { NewsCard } from '@/components/NewsCard';
import { Navigation } from '@/components/Navigation';
import { SourceFilter } from '@/components/SourceFilter';
import { Footer } from '@/components/Footer';
import { fetchRedditPostsClient } from '@/lib/fetchers/reddit-client';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'newest' | 'top'>('newest');
  const [loading, setLoading] = useState(true);
  const [redditLoading, setRedditLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        
        // Fetch server-side news (TechCrunch, HackerNews, Startupper)
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch news');
        const serverData = await response.json();
        setNews(serverData);
        setFilteredNews(serverData);
        setLoading(false);
        
        // Fetch Reddit client-side (to bypass Vercel IP blocks)
        setRedditLoading(true);
        try {
          const redditPosts = await fetchRedditPostsClient(30);
          const combinedNews = [...serverData, ...redditPosts];
          setNews(combinedNews);
          setFilteredNews(combinedNews);
        } catch (redditErr) {
          console.error('Failed to fetch Reddit posts:', redditErr);
          // Continue without Reddit posts
        } finally {
          setRedditLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
        setRedditLoading(false);
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
      // Sort by score (highest first)
      // For sources without scores, use date as fallback
      filtered = [...filtered].sort((a, b) => {
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;
        
        // If both have scores, sort by score
        if (scoreA > 0 && scoreB > 0) {
          return scoreB - scoreA;
        }
        
        // If only one has a score, prioritize it
        if (scoreA > 0) return -1;
        if (scoreB > 0) return 1;
        
        // If neither has a score, sort by date
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
    }

    setFilteredNews(filtered);
  }, [selectedSources, sortBy, news]);

  const handleToggleSource = (source: string) => {
    if (source === 'all') {
      // Clear all filters
      setSelectedSources(new Set());
    } else {
      // Single-select behavior: only one source at a time
      const newSelected = new Set<string>();

      // If clicking the already selected source, deselect it (go back to 'all')
      if (selectedSources.has(source)) {
        // Set is already empty, so all sources will show
      } else {
        // Select only this source
        newSelected.add(source);
      }

      setSelectedSources(newSelected);
    }
  };

  const handleSortChange = (sort: 'newest' | 'top') => {
    setSortBy(sort);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 flex-1">
        <div className="mb-6 sm:mb-8">
          <SourceFilter
            selectedSources={selectedSources}
            onToggleSource={handleToggleSource}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 absolute top-0 left-0"></div>
            </div>
          </div>
        )}

        {!loading && redditLoading && (
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
              <span className="text-sm">Loading Reddit posts...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredNews.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No articles found for the selected filters.
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
