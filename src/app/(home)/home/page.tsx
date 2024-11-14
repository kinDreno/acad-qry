"use client";
import { Button } from "@/components/ui/button";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { FaComment } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { MainContent } from "@/types/here";

const Page = () => {
  const [star, setStar] = useState<boolean>(false);
  const [char, setChar] = useState<number>(0);
  const [datas, setDatas] = useState<MainContent[]>([]);

  const toggleStar = () => {
    setStar((prevStar) => !prevStar);
    setChar((prevChar) => (star ? prevChar - 1 : prevChar + 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setDatas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="overflow-y-scroll h-full w-[80%] space-y-3 flex justify-center items-center">
        {datas.map((post, index) => (
          <article
            key={index}
            className="h-full w-[70%] border-b-2 p-4 space-y-4"
          >
            <div>
              {post.author} &#8226; {post.date} &#8226; {post.collegeYear}
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
        ))}
      </main>
    </>
  );
};

export default Page;
