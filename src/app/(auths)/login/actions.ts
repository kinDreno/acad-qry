"use server";
import { createClient } from "@/utils/supabase/server"; // Supabase client setup

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = (formData.get("email") as string).trim();
  const password = (formData.get("password") as string).trim();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.session) {
      return {
        status: error?.message || "Failed to log in.",
        success: false,
      };
    }

    return {
      status: "Login successful! Redirecting you in 3 seconds..",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "An error occurred.",
      success: false,
    };
  }
}
