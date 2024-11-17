import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { prisma } from "@/utils/prisma";
import { supabase } from "@/lib/utils";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({message: "Method invalid."})
  }
  const {title, content, tag, userId} = req.body;

  if (!title || !content || !tag) {
    return res.status(400).json({message: "All fields are required"})
  }
  try {
    const {data, error} = await supabase.auth.getUser()
    if (error || !data?.user || data.user.id !== userId) {
      return res.status(401).json({message: "Unauthorized."})
    }

    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        tag,
        userId
      }
    })
    return res.status(201).json(createdPost)
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }

}