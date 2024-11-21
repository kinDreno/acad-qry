"use server"
import { cookies } from 'next/headers'; // Import the cookies utility
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

    // Store session in cookies
    const cookiesInstance = await cookies(); // Access cookies on the server
    cookiesInstance.set('supabase_session', JSON.stringify(data.session), {
      httpOnly: true, // Secure the cookie by making it httpOnly
      path: '/', // Cookie available across the entire site
      maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
    });

    return {
      status: "Login successful! Redirecting you in 4 seconds..",
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "An error occurred.",
      success: false,
    };
  }
}
