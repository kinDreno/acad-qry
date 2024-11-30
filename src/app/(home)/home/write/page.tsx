"use client";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { Post } from "@/types/here";
import { Button } from "@/components/ui/button";
import Rules from "./rules";
import Alert from "./alert";
import { useRouter } from "next/navigation";
export default function Write() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [writePost, setWritePost] = useState<Post>({
    title: "",
    content: "",
    tag: "",
  });

  function handleChangeValues(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setWritePost((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!writePost.content || !writePost.tag || !writePost.title) {
      setClose(true);
      setMessage("All fields are required to fill up!");
      return;
    } else if (writePost.title.length > 40) {
      setClose(true);
      setMessage("Please limit the title to 40 Characters.");
      return;
    }

    try {
      setLoading(true);
      const response: Response = await fetch("/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: writePost.title,
          content: writePost.content,
          tag: writePost.tag,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setClose(true);

        setMessage("Post successfully created. Redirecting you..");
        router.push(`/home/${result.createdPost.slug}`);
        setWritePost({ title: "", content: "", tag: "" });
      } else {
        setClose(true);
        console.error(result.message);
        setMessage(
          `Error creating post: ${result?.message || response.statusText}`
        );
      }
    } catch (error: any) {
      setClose(true);
      setMessage(`Unexpected error: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="relative flex max-h-[40%] w-full">
        <Alert
          onClose={() => setClose(false)}
          message={message}
          hideDisplay={close}
        />
        <div className="flex justify-center items-center text-center h-full w-full">
          <div className="grid w-full p-12 grid-cols-1 space-y-4">
            <h4 className="font-bold">
              Create Post | Read the rules before your post.
            </h4>
            <form className="h-full w-full" onSubmit={handleSubmit}>
              <section className="block">
                <label htmlFor="tag">Tag:</label>
                <select
                  name="tag"
                  onChange={handleChangeValues}
                  value={writePost.tag}
                  className="p-2 border-2 border-slate-800 border-opacity-40 rounded-sm"
                >
                  <option value="">Add a Tag</option>
                  <option value="Casual">Casual</option>
                  <option value="Academic Related">Academic Related</option>
                  <option value="Report">Report</option>
                </select>
              </section>
              <section>
                <label htmlFor="title">Title:</label>
                <input
                  value={writePost.title}
                  onChange={handleChangeValues}
                  type="text"
                  name="title"
                  maxLength={40}
                  className="max-w-[100%] border-2 text-left rounded-sm"
                />
              </section>
              <br />
              <section>
                <label htmlFor="content">Content:</label>
                <textarea
                  name="content"
                  onChange={handleChangeValues}
                  value={writePost.content}
                  className="max-w-[100%] resize-y border-2 text-left rounded-sm"
                />
              </section>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <ThreeDots color="black" />
                    <span>Posting...</span>
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </form>
          </div>
        </div>
        {/* Right Side-Bar */}
        <Rules />
      </main>
    </>
  );
}
