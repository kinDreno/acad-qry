"use client";
import { useState } from "react";
import { Post } from "@/types/here";
import { IoMdAlert } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils";

export default function App() {
  const router = useRouter();
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

    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw new Error("An error has occured");
      }
      const userId = data?.user?.id ? parseInt(data.user.id, 10) : null;

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
        console.log("Post created:", result);
      } else {
        console.error("Error creating post:", result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <>
      <main className="flex max-h-[40%] w-full relative">
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
                  className="max-w-[100%] border-2 text-left rounded-sm"
                />
              </section>
              <Button type="submit">Post</Button>
            </form>
          </div>
        </div>
        {/* Right Side-Bar */}
        <nav className="h-full w-[40%] p-6">
          <article className="h-full w-full border-2 p-4 rounded-lg bg-slate-950">
            <ul className="space-y-5">
              <li className="flex items-center space-x-2">
                <IoMdAlert size={25} color="white" />
                <h4 className="text-white">Rules on Posting</h4>
              </li>
              <li className="text-white">
                &#8226; All posts, comments and discussions here must be
                academics related. If they aren't, they will be removed. This
                rule also covers irrelevant posts.
              </li>
              <li className="text-white">
                &#8226; Do not spam or promote anything here. Posts asking for
                something that is not connected with academics will be removed.
              </li>
              <li className="text-white">
                &#8226; Follow appropriate etiquette. This includes being nice,
                civil, and helpful to one another; disrespectful posts/comments
                will be removed. Do not make sexist or racist remarks.
              </li>
              <li className="text-white">
                &#8226; You are not allowed to use{" "}
                <b>
                  Racial slurs, inappropriate messages, or any messages that may
                  offend people.
                </b>{" "}
                Doing so will result in a ban.
              </li>
            </ul>
          </article>
        </nav>
      </main>
    </>
  );
}
