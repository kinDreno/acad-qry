import { Textarea } from "@nextui-org/input";
import { IoMdAlert } from "react-icons/io";
import { Input } from "@nextui-org/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TonAcads Query | Write",
};

export default function App() {
  return (
    <>
      <main className="flex max-h-[40%] w-full relative">
        <div className="flex justify-center items-center text-center h-full w-full">
          <div className="grid w-full p-12 grid-cols-1 space-y-4">
            {/* Select Category of post */}
            <h4 className=" font-bold">
              Create Post | Read the rules before your post.
            </h4>
            <select
              name="category"
              className="p-2 border-2 border-slate-800 border-opacity-40 rounded-sm"
            >
              <option value="volvo">Casual</option>
              <option value="saab">Academic Related</option>
              <option value="mercedes">Report</option>
            </select>
            <Input
              isRequired
              type="email"
              label="Email"
              className="max-w-[100%] border-2 text-left rounded-sm"
            />
            <br />
            <Textarea
              label="Description"
              placeholder="Enter Description Here"
              className="max-w-[100%] border-2 text-left rounded-sm"
              isRequired
              labelPlacement="inside"
            />
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
                Doing so will auto delete your post.
              </li>
            </ul>
          </article>
        </nav>
      </main>
    </>
  );
}
