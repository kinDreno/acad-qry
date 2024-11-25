import { MainContent } from "@/types/here";

export async function fetchPosts(): Promise<MainContent[]> {
  const response = await fetch("/api/posts", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}
