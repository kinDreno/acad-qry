"use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const requestUrl = req.url;
  const { title, content, tag } = body;

  if (!title || !content || !tag) {
    return NextResponse.json(
      { message: "Please fill out all fields!" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user || !data.user.id) {
      return NextResponse.redirect(new URL("/", req.url), 302);
    }

    let slug: string = slugify(title, {
      lower: true,
      strict: true,
      replacement: "-",
    });
    let counter: number = 1;
    let uniqueSlug: string = slug;

    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    slug = uniqueSlug;

    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        tag,
        userId: data.user.id,
        slug: slug,
      },
    });

    return NextResponse.json(
      { createdPost, request: requestUrl },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        User: {
          select: {
            collegeYear: true,
            firstName: true,
            lastName: true,
            course: true,
          },
        },
        Comment: { select: { id: true } },
      },
    });

    const postFiltered = posts.map((post) => ({
      ...post,
      commentCount: post.Comment.length,
      Comment: undefined,
    }));

    return NextResponse.json(postFiltered, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "An error occured." }, { status: 500 });
  }
};
