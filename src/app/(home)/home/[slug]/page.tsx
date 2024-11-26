"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPostBySlug } from "@/utils/querying/posts";
import { MainContent } from "@/types/here";
import { format } from "date-fns";

const PostPage = () => {
  const { slug } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<MainContent>({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug as string),
    enabled: !!slug, //ensures it only runs when its availb
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{(error as Error).message || "Failed to load the post"}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const formattedDate = format(new Date(post.postedAt), "MMMM dd, yyyy");

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

export default PostPage;
