import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const allowedRedirects = ["/"]; //allowed routes

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      //validation of next redirect URL
      if (allowedRedirects.includes(next)) {
        redirect(next);
      } else {
        console.warn("Invalid redirect attempt:", next); //logging invalid redirect
        redirect("/"); //fallback to default route if error occured.. the default route is '/'
      }
    } else {
      console.error("OTP verification failed:", error);
      redirect(`/error?message=${encodeURIComponent(error.message)}`);
    }
  } else {
    console.error("Missing token or type");
    redirect(`/error?message=${encodeURIComponent("Missing token or type.")}`);
  }
}
