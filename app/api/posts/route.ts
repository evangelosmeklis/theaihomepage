import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sortByHot, sortByNewest } from '@/lib/ranking';

// GET /api/posts - List all posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'hot';

    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        votes: {
          select: {
            userId: true,
            value: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    // Sort posts based on the sort parameter
    const sortedPosts = sort === 'new'
      ? sortByNewest(posts)
      : sortByHot(posts);

    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be signed in to create a post' },
        { status: 401 }
      );
    }

    const { title, url, content } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!url && !content) {
      return NextResponse.json(
        { error: 'Either URL or content is required' },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        url: url || null,
        content: content || null,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
