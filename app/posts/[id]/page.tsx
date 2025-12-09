'use client';

import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import CommentSection from '@/components/CommentSection';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleVote = async (value: number) => {
    if (!session) {
      window.location.href = '/signin';
      return;
    }

    try {
      await fetch(`/api/posts/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      fetchPost();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const getUserVote = () => {
    if (!session || !post) return null;
    const vote = post.votes?.find((v: any) => v.userId === session.user.id);
    return vote?.value || null;
  };

  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Post not found
        </div>
      </div>
    );
  }

  const userVote = getUserVote();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/posts"
        className="text-sm text-blue-500 hover:text-blue-600 mb-4 inline-block"
      >
        ← Back to posts
      </Link>

      <div className="flex gap-3 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded mb-6">
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <button
            onClick={() => handleVote(1)}
            className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              userVote === 1 ? 'text-blue-500' : 'text-gray-400'
            }`}
            aria-label="Upvote"
          >
            ▲
          </button>
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {post.points}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold mb-2">
            {post.title}
          </h1>

          {post.url ? (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-600 mb-3 inline-block"
            >
              {getDomain(post.url)} ↗
            </a>
          ) : post.content ? (
            <div className="mt-4 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {post.content}
            </div>
          ) : null}

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span>
              by {post.user.username}
            </span>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
            <span>•</span>
            <span>
              {post._count?.comments || 0} comments
            </span>
          </div>
        </div>
      </div>

      <CommentSection postId={id} comments={post.comments || []} onCommentAdded={fetchPost} />
    </div>
  );
}
