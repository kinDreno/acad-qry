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
    redirect("/login/newUser");
  }

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
    redirect("/login/newUser");
  }

  // will add a logic that if a user has no first name, last name, or courses yet
  //which is required in the database, will be redirected to the /login/newUser to fill up a form
  // to fill up first name, last name, and courses.
}
