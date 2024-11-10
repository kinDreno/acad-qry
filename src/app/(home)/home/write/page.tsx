"use client";
import { Textarea } from "@nextui-org/input";
import { IoMdAlert } from "react-icons/io";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Post } from "@/types/here";
export default function App() {
  const [writePost, setWritePost] = useState<Post>({
    title: "",
    content: "",
    tag: "",
  });

  function handleChangeValues(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setWritePost((formData) => ({
      ...formData,
      [name]: value,
    }));
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
            <form className="h-full w-full">
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
                <Input
                  value={writePost.title}
                  onChange={handleChangeValues}
                  isRequired
                  type="title"
                  name="title"
                  className="max-w-[100%] border-2 text-left rounded-sm"
                />
              </section>
              <br />
              <section>
                <label htmlFor="content">Content: </label>
                <Textarea
                  name="content"
                  onChange={handleChangeValues}
                  value={writePost.content}
                  className="max-w-[100%] border-2 text-left rounded-sm"
                  isRequired
                  labelPlacement="inside"
                />
              </section>
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
                rule also cover irrelevant posts.
              </li>
              <li className="text-white">
                &#8226; Do not spam or promote anything here. Posts asking for
                something that is not connected with academics will be removed.
              </li>
              <li className="text-white">
                &#8226; Follow appropriate etiquette. This includes being nice,
                civil and helpful to one another, disrespectful posts/comments
                will be removed. Do not make sexist or racist remarks.
              </li>
              <li className="text-white">
                &#8226; You are not allowed to use{" "}
                <b>
                  Racial slurs, Inappropriate Messages, or any messages that may
                  offend people.{" "}
                </b>
                Doing so will result in a ban.
              </li>
            </ul>
          </article>
        </nav>
      </main>
    </>
  );
}
