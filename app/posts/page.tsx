'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import PostList from '@/components/PostList';
import SubmitPostForm from '@/components/SubmitPostForm';

type SortType = 'hot' | 'new';

export default function PostsPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortType>('hot');
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?sort=${sort}`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sort]);

  const handlePostCreated = () => {
    setShowSubmitForm(false);
    fetchPosts();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Posts
          </h1>
          {session ? (
            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              {showSubmitForm ? 'Cancel' : 'Submit'}
            </button>
          ) : (
            <Link
              href="/signin"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Sign in to submit
            </Link>
          )}
        </div>

        {showSubmitForm && (
          <SubmitPostForm onSuccess={handlePostCreated} />
        )}

        <div className="flex gap-4 text-sm">
          <button
            onClick={() => setSort('hot')}
            className={`${
              sort === 'hot'
                ? 'text-blue-500 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Top
          </button>
          <button
            onClick={() => setSort('new')}
            className={`${
              sort === 'new'
                ? 'text-blue-500 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            New
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <PostList posts={posts} onVote={fetchPosts} />
      )}
    </div>
  );
}
