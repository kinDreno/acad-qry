import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, tag, userId } = req.body;

  // Validate input data
  if (!title || !content || !tag || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { uid: userId },
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
}

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts created." });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching posts." });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return createPost(req, res);
    case "GET":
      return getPosts(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
