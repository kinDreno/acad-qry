// app/posts/[slug]/page.tsx

import { fetchPosts, fetchPostBySlug } from "@/utils/querying/posts"; // Fetch utility functions
import { MainContent } from "@/types/here"; // Your types
import { format } from "date-fns"; // For formatting dates

// This function generates static params (slugs) for the dynamic route
export async function generateStaticParams() {
  const posts = await fetchPosts(); // Fetch all posts to get the slugs
  return posts.map((post: { slug: string }) => ({
    slug: post.slug, // Return each slug
  }));
}

// Revalidate the page every 60 seconds (ISR)
export const revalidate = 60;

("use client"); // This is a client-side component

import { useParams } from "next/navigation"; // Use for accessing the dynamic slug from the URL
import { useQuery } from "@tanstack/react-query"; // For fetching data with React Query

const PostPage = () => {
  const { slug } = useParams(); // Access the dynamic slug

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<MainContent>({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug as string), // Fetch post data by slug
    enabled: !!slug, // Ensures query runs only when slug is available
  });

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{(error as Error).message || "Failed to load the post"}</div>; // Handle error
  }

  if (!post) {
    return <div>Post not found</div>; // Handle if no post is found
  }

  const formattedDate = format(new Date(post.postedAt), "MMMM dd, yyyy"); // Format the date

  return (
    <div>
      <div>
        {post.User.firstName} {post.User.lastName}
      </div>
      <div>{formattedDate}</div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostPage; // Export the PostPage component
