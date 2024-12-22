"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { Prisma } from "@prisma/client";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    return NextResponse.redirect(new URL("/", request.url), { status: 400 });
  }
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
    const response = {
      ...slugPost,
      isOwner: slugPost.userId === data?.user.id,
    };
    return NextResponse.json(response, { status: 200 });
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
    return NextResponse.json(
      { message: `An error has occured: ${e.message}` },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json(
      { error: "Post slug is required" },
      { status: 400 }
    );
  }

  try {
    const deletedPost = await prisma.post.delete({
      where: { slug },
      select: { id: true },
    });

    return NextResponse.json(
      { message: "Post deleted successfully", id: deletedPost.id },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
    }

    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
