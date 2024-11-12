import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, content, tag, userId } = req.body;

    // Validate input data
    if (!title || !content || !tag || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          tag,
          userId,
        },
      });

      return res.status(200).json({ post: newPost });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating post" });
    }
  } else {
    //if the method is not POST, return a 405 Method Not Allowed error
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
