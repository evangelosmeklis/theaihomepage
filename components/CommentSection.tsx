'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: () => void;
}

function CommentItem({
  comment,
  postId,
  onReply,
  depth = 0,
}: {
  comment: Comment;
  postId: string;
  onReply: () => void;
  depth?: number;
}) {
  const { data: session } = useSession();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
          parentId: comment.id,
        }),
      });

      if (res.ok) {
        setReplyContent('');
        setShowReplyForm(false);
        onReply();
      }
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 mt-4' : 'mt-4'}`}>
      <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {comment.user.username} •{' '}
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
          })}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {comment.content}
        </div>
        <div className="mt-2">
          {session ? (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {showReplyForm ? 'cancel' : 'reply'}
            </button>
          ) : (
            <Link
              href="/signin"
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              reply
            </Link>
          )}
        </div>

        {showReplyForm && (
          <form onSubmit={handleReply} className="mt-3">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a reply..."
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-xs font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Reply'}
            </button>
          </form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                onReply={onReply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentSection({
  postId,
  comments,
  onCommentAdded,
}: CommentSectionProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        setContent('');
        onCommentAdded();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      {session ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
          <Link href="/signin" className="text-blue-500 hover:text-blue-600">
            Sign in
          </Link>{' '}
          to comment
        </div>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              onReply={onCommentAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
