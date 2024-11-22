" use server"
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const requestUrl = req.url
  const { title, content, tag } = body;

  if (!title || !content || !tag) {
    return NextResponse.json(
      { message: "Please fill out all fields!" },
      { status: 400 },
    );
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user || !data.user.id) {
      return NextResponse.json(
        { message: "Unauthorized. Please check your token." },
        { status: 401 },
      );
    }

    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        tag,
        userId: data.user.id,
      },
    });

    return NextResponse.json({createdPost, request: requestUrl }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
