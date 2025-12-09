'use client';

import { useState } from 'react';

interface SubmitPostFormProps {
  onSuccess: () => void;
}

export default function SubmitPostForm({ onSuccess }: SubmitPostFormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'url' | 'text'>('url');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          url: postType === 'url' ? url : null,
          content: postType === 'text' ? content : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create post');
        setLoading(false);
        return;
      }

      setTitle('');
      setUrl('');
      setContent('');
      onSuccess();
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded">
            {error}
          </div>
        )}

        <div className="flex gap-4 text-sm">
          <button
            type="button"
            onClick={() => setPostType('url')}
            className={`px-3 py-1 rounded ${
              postType === 'url'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setPostType('text')}
            className={`px-3 py-1 rounded ${
              postType === 'text'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Text
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What's this about?"
          />
        </div>

        {postType === 'url' ? (
          <div>
            <label className="block text-sm font-medium mb-2">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-2">
              Text
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your thoughts..."
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
