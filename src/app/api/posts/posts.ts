import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { supabase } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, tag } = body;

  if (!title || !content || !tag) {
    return NextResponse.json(
      { message: "Please fill out all fields!" },
      { status: 400 },
    );
  }

  try {
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

    return NextResponse.json(createdPost, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}