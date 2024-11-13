import React from "react";
import { IoMdAlert } from "react-icons/io";

const Rules = () => {
  return (
    <>
      <nav className="h-full w-[40%] p-6 max-lg:hidden">
        <article className="h-full w-full border-2 p-4 rounded-lg bg-slate-950">
          <ul className="space-y-5">
            <li className="flex items-center space-x-2">
              <IoMdAlert size={25} color="white" />
              <h4 className="text-white">Rules on Posting</h4>
            </li>
            <li className="text-white">
              &#8226; All posts, comments and discussions here must be academics
              related. If they aren&apos;t, they will be removed. This rule also
              covers irrelevant posts.
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
    </>
  );
};

export default Rules;
