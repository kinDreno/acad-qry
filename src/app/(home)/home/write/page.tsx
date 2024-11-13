"use client";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { Post } from "@/types/here";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils";
import Rules from "./rules";
import Alert from "./alert";
export default function App() {
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
      const { data, error } = await supabase.auth.getUser();
      setClose(true);
      setMessage("Posting..");

      if (error) {
        setMessage("An error has occured.");
        throw new Error("An error has occured");
      }
      const userId = data?.user?.id;

      if (!userId) {
        console.error("User is not authenticated.");
        router.push("/");
        return;
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...writePost,
          userId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Post successfully created.");
      } else {
        setMessage(`Error creating post: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Unexpected error: ${error}`);
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
            {/* Select Category of post */}
            <h4 className="font-bold">
              Create Post | Read the rules before your post.
            </h4>
            <form className="h-full w-full" onSubmit={handleSubmit}>
              <section className="block">
                <label htmlFor="tag">Tag:</label>
                <select
                  name="tag"
                  onChange={handleChangeValues}
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
                  type="title"
                  name="title"
                  className="max-w-[100%] border-2 text-left rounded-sm"
                />
              </section>
              <br />
              <section>
                <label htmlFor="content">Content: </label>
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
