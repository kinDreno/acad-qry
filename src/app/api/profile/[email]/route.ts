import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData) {
    return NextResponse.json(
      { message: "User is not authenticated" },
      { status: 401 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { message: "Email is required for this dynamic route!" },
      { status: 400 }
    );
  }

  try {
    const getUniqueProfile = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!getUniqueProfile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(getUniqueProfile, { status: 200 });
  } catch (err: any) {
    console.error("An error occurred:", err.message);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
