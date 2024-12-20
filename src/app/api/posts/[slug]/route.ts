"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required!" }, { status: 400 });
  }
  try {
    const slugPost = await prisma.post.findUnique({
      where: { slug },
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
            course: true,
          },
        },
        Comment: {
          select: {
            createdAt: true,
            text: true,
            User: true,
          },
        },
      },
    });

    if (!slugPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(slugPost, { status: 200 });
  } catch (err: any) {
    console.error("An error has occured: ", err.message);
    return NextResponse.json(
      { error: `An error has occured` },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { id, userId, text, slug } = await req.json();

  if (!id || !userId || !text) {
    return NextResponse.json(
      { message: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        text: text,
        postId: id,
        userId: userId,
      },
    });

    revalidatePath(`/home/${slug}`);
    return NextResponse.json(newComment, { status: 201 });
  } catch (e: any) {
    console.error(`$An error has occured: ${e.message}`);
    return NextResponse.json({ message: `An error has occured: ${e.message}` });
  }
}
