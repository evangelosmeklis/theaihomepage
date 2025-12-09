import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be signed in to vote' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { value } = await request.json();

    if (value !== 1 && value !== -1) {
      return NextResponse.json(
        { error: 'Vote value must be 1 or -1' },
        { status: 400 }
      );
    }

    // Check if user already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: id,
        },
      },
    });

    if (existingVote) {
      if (existingVote.value === value) {
        // Remove vote if clicking same button
        await prisma.$transaction([
          prisma.vote.delete({
            where: { id: existingVote.id },
          }),
          prisma.post.update({
            where: { id },
            data: {
              points: {
                decrement: value,
              },
            },
          }),
        ]);
      } else {
        // Change vote
        await prisma.$transaction([
          prisma.vote.update({
            where: { id: existingVote.id },
            data: { value },
          }),
          prisma.post.update({
            where: { id },
            data: {
              points: {
                increment: value * 2, // Need to change by 2 (from -1 to 1 or vice versa)
              },
            },
          }),
        ]);
      }
    } else {
      // Create new vote
      await prisma.$transaction([
        prisma.vote.create({
          data: {
            userId: session.user.id,
            postId: id,
            value,
          },
        }),
        prisma.post.update({
          where: { id },
          data: {
            points: {
              increment: value,
            },
          },
        }),
      ]);
    }

    // Fetch updated post
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        votes: {
          where: {
            userId: session.user.id,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error voting:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}
