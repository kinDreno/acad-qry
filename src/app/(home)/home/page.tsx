"use client";
import { Button } from "@/components/ui/button";
import { IoMdStarOutline } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { FaComment } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { MainContent } from "@/types/here";
import { format } from "date-fns";
import Link from "next/link";
import { SkeletonDemo } from "./skeleton";
import { useFilter } from "./filterContext";

const Page = () => {
  const { filter } = useFilter();
  const { data, error, isLoading } = useQuery<MainContent[], Error>({
    queryKey: ["posts", filter],
    queryFn: async (): Promise<MainContent[]> => {
      const response = await fetch(
        `/api/posts${filter ? `?filter=${filter}` : ``.trim()}`,
        {
          method: "GET",
          next: { revalidate: 0 },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      return response.json();
    },
  });

  if (isLoading)
    return (
      <section className="h-screen w-full">
        <SkeletonDemo />
      </section>
    );

  if (error as Error)
    return (
      <p>
        {error?.message || "Failed to refetch the post."}.. Trying to refetch
        it...
      </p>
    );

  return (
    <>
      <main className="max-w-screen-sm mt-[9em] w-full h-full mx-auto space-y-3 flex-col justify-center items-center">
        {data?.map((post, index) => {
          const formattedDate = format(
            new Date(post.postedAt),
            "MMMM dd, yyyy"
          );
          return (
            <article
              key={index}
              className="h-[20%] w-full md:w-3/4 lg:w-2/3 border-b-2 p-6 space-y-4"
            >
              <div className="text-sm text-gray-500">
                {post.User.firstName} {post.User.lastName} &#8226;{" "}
                {formattedDate} {post.collegeYear} &#8226; {post.tag}
              </div>
              <section className="text-left space-y-3">
                <h4 className="font-bold text-lg">{post.title}</h4>
                <h6 className="leading-relaxed">{post.content}</h6>
                <section className="space-x-4 flex items-center">
                  <Button className="flex hover:bg-gray-200 transition-colors">
                    {post.charisma ? <IoMdStarOutline /> : <MdOutlineStar />}{" "}
                    {post.charisma || 0} Charisma
                  </Button>
                  <Link
                    href={`home/${post.slug}`}
                    className="flex items-center space-x-2 hover:text-blue-500"
                  >
                    <FaComment /> <span>Comment</span>
                  </Link>
                  <h5>{post.Comment?.length || 0} Comments</h5>
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
