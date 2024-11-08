"use server";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const course = formData.get("course") as string;

  // Update the user profile
  await prisma.user.update({
    where: { email },
    data: {
      firstName,
      lastName,
      course,
    },
  });

  redirect("/home");
}
