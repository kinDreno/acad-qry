"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message); //error handles instead of redirecting
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user || !user.firstName || !user.lastName || !user.course) {
    redirect("/newUser");
  } //this logic is for users who went in login/newUser page
  //but.. they didnt finish maybe its because they exit or something happened on the webpage
  //now their email and password are stored in the database but..
  // they still dont have a name, and course so they will be redirected to /login/newUser

  return true; // Indicate success
}

//

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user || !user.firstName || !user.lastName || !user.course) {
    redirect("/newUser");
  }
}
