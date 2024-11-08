"use server";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const course = formData.get("course") as string;
  const collegeYear = formData.get("collegeYear") as string;

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    course: formData.get("course") as string,
    collegeYear: formData.get("collegeYear") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
  }
  try {
    await prisma.user.create({
      data: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        course: course,
        collegeYear: collegeYear,
      },
    });

    return { success: true, redirectUrl: "/home" };
  } catch (e) {
    console.error("Error creating user:", e);
    throw new Error(
      "An error occurred while saving user data to the database."
    );
  }
}
