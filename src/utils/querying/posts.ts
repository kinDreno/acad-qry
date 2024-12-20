import { MainContent } from "@/types/here";

//PUT request for comments in a specific post.
export const addComment = async ({
  id,
  text,
  userId,
  slug,
}: {
  id: number;
  text: string;
  userId: string;
  slug: string | string[] | undefined;
}) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, id, userId, slug }),
  });

  if (!response.ok) {
    throw new Error("Failed to add a new comment");
  }

  return response.json();
};

// for dynamic routes
export const fetchPostBySlug = async (slug: string): Promise<MainContent> => {
  const response = await fetch(`/api/posts/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
};
