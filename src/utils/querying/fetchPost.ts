import { MainContent } from "@/types/here";

export const fetchPostBySlug = async (slug: string): Promise<MainContent> => {
  const response = await fetch(`/api/posts/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
};
