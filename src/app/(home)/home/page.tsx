"use client";
import { Button } from "@/components/ui/button";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { FaComment } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MainContent } from "@/types/here";
import { format } from "date-fns";
const Page = () => {
  const [star, setStar] = useState<boolean>(false);
  const [char, setChar] = useState<number>(0);
  const [datas, setDatas] = useState<MainContent[]>([]);

  const toggleStar = () => {
    setStar((prevStar) => {
      const newStar = !prevStar;
      setChar((prevChar) => (newStar ? prevChar + 1 : prevChar - 1));
      return newStar;
    });
  };

  return (
    <>
      <main className="overflow-y-scroll h-full w-[80%] space-y-3 flex justify-center items-center">
        {datas.map((post, index) => {
          //
          const formattedDate = format(
            new Date(post.postedAt),
            "MMMM dd, yyyy"
          );
          return (
            <article
              key={index}
              className="h-full w-[70%] border-b-2 p-4 space-y-4"
            >
              <div>
                {post.User} &#8226; {formattedDate} &#8226; {post.collegeYear}
              </div>
              <section className="h-full w-full text-left space-y-3">
                <h4 className="font-bold">{post.title}</h4>
                <h6>{post.content}</h6>
                <section className="space-x-4 flex items-center">
                  <Button onClick={toggleStar}>
                    {!star ? <IoMdStarOutline /> : <MdOutlineStar />} {char}{" "}
                    Charisma
                  </Button>
                  <Button>
                    <FaComment /> Comment
                  </Button>
                </section>
              </section>
            </article>
          );
        })}
      </main>
    </>
  );
};

export default Page;
