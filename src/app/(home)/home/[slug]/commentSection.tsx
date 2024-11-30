"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addComment } from "@/utils/querying/posts";
import { Button } from "@/components/ui/button";

const CommentSection = ({
  id,
  userId,
  slug,
}: {
  id: number;
  userId: string;
  slug: string | string[] | undefined;
}) => {
  const [text, setComment] = useState<string>("");

  const mutation = useMutation({
    mutationFn: ({
      text,
      id,
      userId,
      slug,
    }: {
      text: string;
      id: number;
      userId: string;
      slug: string | string[] | undefined;
    }) => addComment({ text, id, userId, slug }),
    onSuccess: (newComment) => {
      console.log(`Added new comment! ${newComment}`);
      setComment("");
    },
    onError: (error: Error) => {
      console.error(`Error adding comment! ${error.message}`);
    },
  });
  function setSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!text.trim()) return;
    mutation.mutate({ text, id, userId, slug });
  }

  return (
    <div className="fixed bottom-4 ">
      <form onSubmit={setSubmit} className="h-11 w-[20em] flex items-center">
        <textarea
          style={{ resize: "none" }}
          placeholder="Write a Comment: "
          value={text}
          onChange={(e) => setComment(e.target.value)}
          className="h-full w-full rounded-md"
          rows={4}
        />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  );
};

export default CommentSection;
