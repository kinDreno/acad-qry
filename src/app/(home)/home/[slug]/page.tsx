"use client";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPostBySlug } from "@/utils/querying/fetchPost";
import { MainContent } from "@/types/here";
import { format } from "date-fns";
const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<MainContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const response = await fetchPostBySlug(slug as string);
          setPost(response);
        } catch (err) {
          setError("Failed to load the post");
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [slug]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }
  const formattedDate: ReactNode = format(
    new Date(post.postedAt),
    "MMMM dd, yyyy"
  );
  console.log(post);

  return (
    <div>
      <h4>{post.User.firstName}</h4>
      <h5>{post.User.lastName}</h5>
      <h4>{formattedDate}</h4>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Add other post details as needed */}
    </div>
  );
};

export default PostPage;
