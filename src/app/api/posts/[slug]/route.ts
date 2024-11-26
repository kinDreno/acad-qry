"use server";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required!" }, { status: 500 });
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
