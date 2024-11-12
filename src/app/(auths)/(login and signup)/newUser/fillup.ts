"use server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = (formData.get("email") as string).trim();
  const firstName = (formData.get("firstName") as string).trim();
  const lastName = (formData.get("lastName") as string).trim();
  const course = (formData.get("course") as string).trim();
  const collegeYear = (formData.get("collegeYear") as string).trim();
  const password = (formData.get("password") as string).trim();

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(`An error has occurred: ${error.message}`);
  }

  const user = data?.user;
  if (!user || !user.id) {
    throw new Error("Could not retrieve user ID from Supabase.");
  }

  const uid = user.id;

  try {
    await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        course: course,
        uid: uid,
        collegeYear: collegeYear,
      },
    });

    return {
      success: true,
      status:
        "Account created. An email confirmation has been sent to your email.",
    };
  } catch (e) {
    console.error("Error creating user:", e);
    return {
      success: false,
      status: "Error creating user in the database.",
    };
  }
}
