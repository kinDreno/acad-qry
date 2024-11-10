"use client";
import { Button } from "@/components/ui/button";
import { IoMdStarOutline } from "react-icons/io"; // unstarred
import { MdOutlineStar } from "react-icons/md"; // full colored star
import { FaComment } from "react-icons/fa6";
import { useState } from "react";

const Page = () => {
  // ALL POSTS ARE HERE AND NOT FILTERED. Will also add an infinite scroll feature with TanStack Query.
  // I am still working on the UI Designs right now in this project and will soon deploy this for beta testing
  // will work soon on database and querying!

  const [star, setStar] = useState<boolean>(false);
  let [char, setChar] = useState<number>(0);
  return (
    <>
      <main className="overflow-y-scroll h-full w-[80%] space-y-3 flex justify-center items-center">
        <article className="h-full w-[70%] border-b-2 p-4 space-y-4">
          <div>John Doe &#8226; 4 Days Ago &#8226; BSCS 1-1</div>
          <section className="h-full w-full text-left space-y-3">
            <h4 className="font-bold">Title Example Here</h4>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque culpa labore, ullam itaque dolore temporibus eius
              obcaecati sit sapiente praesentium iste dolorem est tenetur
              debitis laudantium maiores illo, ratione voluptate?
            </h6>
            <section className="space-x-4 flex items-center">
              <Button onClick={() => setStar(!star)}>
                {" "}
                {!star ? <IoMdStarOutline /> : <MdOutlineStar />}{" "}
                {star ? (char += 1) : (char = 0)} Charisma
              </Button>
              <Button>
                {" "}
                <FaComment /> Comment
              </Button>
            </section>
          </section>
        </article>
      </main>
    </>
  );
};

export default Page;
