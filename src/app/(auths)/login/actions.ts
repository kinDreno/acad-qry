"use server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return {
        status: "No account is created with this email.",
        success: false,
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        status: error.message || "An error occurred during login.",
        success: false,
      };
    }

    return { status: "Login successful!", success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      status: "An internal error occurred. Please try again.",
      success: false,
    };
  }
}
