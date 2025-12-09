'use client';

import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface PostListProps {
  posts: any[];
  onVote: () => void;
}

export default function PostList({ posts, onVote }: PostListProps) {
  const { data: session } = useSession();

  const handleVote = async (postId: string, value: number) => {
    if (!session) {
      window.location.href = '/signin';
      return;
    }

    try {
      await fetch(`/api/posts/${postId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });
      onVote();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const getUserVote = (post: any) => {
    if (!session) return null;
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

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No posts yet. Be the first to submit!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post, index) => {
        const userVote = getUserVote(post);
        return (
          <div
            key={post.id}
            className="flex gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <button
                onClick={() => handleVote(post.id, 1)}
                className={`w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  userVote === 1 ? 'text-blue-500' : 'text-gray-400'
                }`}
                aria-label="Upvote"
              >
                ▲
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {post.points}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {index + 1}.
                </span>
                {post.url ? (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-blue-500 transition-colors"
                  >
                    {post.title}
                  </a>
                ) : (
                  <Link
                    href={`/posts/${post.id}`}
                    className="font-medium hover:text-blue-500 transition-colors"
                  >
                    {post.title}
                  </Link>
                )}
                {post.url && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({getDomain(post.url)})
                  </span>
                )}
              </div>

              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 flex-wrap">
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
                <Link
                  href={`/posts/${post.id}`}
                  className="hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {post._count?.comments || 0} comments
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
