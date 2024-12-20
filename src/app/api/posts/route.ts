"use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";
import slugify from "slugify";
export async function POST(req: NextRequest) {
  /*
   */
  const { title, content, tag } = await req.json();

  if (!title || !content || !tag) {
    return NextResponse.json(
      { message: "Please fill out all fields!" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user || !data.user.id) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }
  try {
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
      { createdPost, request: req.url },
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

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  try {
    const posts = await prisma.post.findMany({
      where: filter ? { tag: filter } : undefined,
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

    return NextResponse.json(posts, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "An error occured." }, { status: 500 });
  }
};
