"use client";
import { IoIosMenu } from "react-icons/io";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Button } from "./ui/button";
import Link from "next/link";
import { logout } from "@/app/(auths)/login/action-logout";
const MobileHomeNav = () => {
  const [search, setSearch] = useState<string>("");
  const [view, setView] = useState<boolean>(false);

  return (
    <>
      {view && (
        <div
          className="backdrop-blur-md fixed top-0 inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setView(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-[80%] max-w-xs bg-white dark:bg-black border-l-2 z-50 transform transition-transform duration-300 ${
          view ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <section className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl font-bold underline"></h5>
            <button className="text-2xl" onClick={() => setView(false)}>
              &#10006;
            </button>
          </div>
          <hr className="border-t border-gray-300 dark:border-gray-600" />
          {/* Navigation Links */}
          <ul className="mt-6 space-y-6 text-lg font-bold">
            <Link href={"/home/write"}>
              <li className="hover:underline cursor-pointer">Write</li>
            </Link>
            <Link href={"/home/posts"}>
              <li className="hover:underline cursor-pointer">Your Posts</li>
            </Link>
            <hr />
          </ul>{" "}
          <button
            onClick={logout}
            className="hover:underline cursor-pointer text-lg font-bold mt-6"
          >
            Log Out
          </button>
        </section>
      </div>

      <main className="h-24 max-md:flex justify-around items-center hidden w-full border-b-2">
        <div className="flex items-center space-x-2">
          <h5 className="text-xl font-bold">Acad Query</h5>
          <span className="text-xl">|</span>
          <ModeToggle />
        </div>

        <form
          className="space-x-3 h-10 flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            placeholder="Search"
            type="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-300 dark:border-white/70 rounded-md p-2"
          />
          <button className="h-full" type="submit">
            <BsSearch size={25} />
          </button>
        </form>

        <Button onClick={() => setView(!view)}>
          <IoIosMenu size={30} />
        </Button>
      </main>
    </>
  );
};

export default MobileHomeNav;
