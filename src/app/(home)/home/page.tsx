"use client";
import { Button } from "@/components/ui/button";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { FaComment } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { MainContent } from "@/types/here";
import { format } from "date-fns";
import Link from "next/link";
import { fetchPosts } from "@/utils/querying/api";

const Page = () => {
  const { data, error, isLoading } = useQuery<MainContent[], Error>({
    queryKey: ["posts"], // Define the query key
    queryFn: fetchPosts, // Define the fetch function to get the data
  });
  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <>
      <main className="overflow-y-scroll h-full w-[80%] space-y-3 flex justify-center items-center">
        {data?.map((post, index) => {
          const formattedDate = format(
            new Date(post.postedAt),
            "MMMM dd, yyyy"
          );

          return (
            <article
              key={index}
              className="h-full w-[70%] border-b-2 p-6 space-y-4"
            >
              <div>
                {post.user.firstName} {post.user.lastName} &#8226;{" "}
                {formattedDate} &#8226; {post.collegeYear} &#8226; {post.tag}
              </div>
              <section className="h-full w-full text-left space-y-3">
                <h4 className="font-bold">{post.title}</h4>
                <h6>{post.content}</h6>
                <section className="space-x-4 flex items-center">
                  <Button>
                    {post.charisma ? <IoMdStarOutline /> : <MdOutlineStar />}{" "}
                    {post.charisma || 0} Charisma
                  </Button>
                  <Link href={`home/${post.slug}`}>
                    <FaComment /> Comment
                  </Link>
                  <h5>{post.comments?.length || 0} Comments</h5>
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
