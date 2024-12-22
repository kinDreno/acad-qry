"use client";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPostBySlug } from "@/utils/querying/posts";
import { MainContent } from "@/types/here";
import { format } from "date-fns";
import { SkeletonDemo } from "../skeleton";
import CommentSection from "./commentSection";
import { DeletePostPrompt } from "./deletePostPrompt";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const PostPage = () => {
  const route = useRouter();
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading: isLd,
    error: foundErr,
  } = useQuery<MainContent, Error>({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug as string),
    enabled: !!slug,
  });

  const { mutate: deletePost, status: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to delete post!");
        }

        return response.json();
      } catch (error) {
        throw new Error("Network error or failed to contact server.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      route.push("/home");
      toast.success("Post Deleted", {
        position: "bottom-left",
        duration: 1200,
      });
    },
    onError: () => {
      toast.error("An error has occurred while deleting the post", {
        position: "bottom-left",
        duration: 2000,
      });
    },
  });

  const deleteFunction = () => {
    deletePost();
  };

  if (isLd) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <SkeletonDemo />
      </div>
    );
  } else if (foundErr instanceof Error) {
    if (foundErr.message.includes("404")) {
      return (
        <div className="flex-col justify-center items-center h-full text-gray-600 bg-gray-900">
          Post not found or post is already deleted.
        </div>
      );
    }
    return (
      <div className="flex justify-center items-center h-screen text-red-500 bg-gray-900">
        {foundErr.message || "Failed to load the post"}
      </div>
    );
  } else if (!post) {
    return (
      <div className="flex-col justify-center items-center h-full text-gray-600 bg-gray-900">
        Post not found or post is already deleted by the owner.
      </div>
    );
  }

  const formattedDate = format(new Date(post.postedAt), "MMMM dd, yyyy");

  return (
    <>
      <main className=" w-full h-full flex flex-col justify-start items-center py-6 px-4">
        <div className="mt-36 max-w-screen-lg w-full lg:ml-28 border-2 p-10 rounded-lg shadow-lg">
          <div className="mb-6 text-gray-300 flex justify-evenly">
            <section>
              <span className="font-semibold text-lg">
                {post.User.firstName} {post.User.lastName}
              </span>{" "}
              &#8226; {formattedDate}
            </section>
            <section>
              {post.isOwner && (
                <DeletePostPrompt
                  disableButton={isDeleting === "pending"}
                  deleteText={
                    isDeleting === "pending" ? "Deleting..." : "Delete"
                  }
                  deleteFn={deleteFunction}
                />
              )}
            </section>
            <hr className="my-2 border-gray-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-6">
            {post.title}
          </h1>
          <div className="text-lg leading-relaxed text-gray-200">
            {post.content}
          </div>
        </div>

        <article className="max-w-screen-lg w-full mt-10">
          <h2 className="text-2xl text-white font-semibold mb-4">Comments</h2>
          {post.Comment.map((comment, index) => {
            const formatDate = format(
              new Date(comment.createdAt),
              "MMMM dd, yyyy"
            );
            return (
              <section
                key={index}
                className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md"
              >
                <h5>
                  {comment.User.firstName} {comment.User.lastName}
                </h5>
                <p className="text-sm text-gray-400">{formatDate}</p>
                <p className="text-lg text-white mt-2">{comment.text}</p>
              </section>
            );
          })}
        </article>

        <CommentSection id={post.id} userId={post.userId} slug={slug} />
      </main>
    </>
  );
};

export default PostPage;
