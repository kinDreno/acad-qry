"use client";
import { PiHandshakeFill } from "react-icons/pi";
import Link from "next/link";
import React, { useState } from "react";
import Headroom from "react-headroom";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";
const Nav: React.FC = () => {
  const [isPinned, setIsPinned] = useState(false);

  return (
    <Headroom
      style={{ zIndex: 50 }}
      onPin={() => setIsPinned(false)}
      onUnpin={() => setIsPinned(true)}
    >
      <nav
        className={`flex justify-between p-8 fixed items-center w-full h-24 transition-all duration-300 ease-in-out ${
          isPinned
            ? "transition-all duration-500 -translate-y-44"
            : "backdrop-blur-sm"
        }`}
      >
        <section className="flex items-center space-x-5">
          <Link href="/" className="flex items-center">
            <PiHandshakeFill size={50} />
            <h3 className="ml-2 text-lg text-white dark:text-slate-900 font-bold">
              AcadQry!
            </h3>
          </Link>{" "}
          <h4 style={{ fontSize: "20px" }}>|</h4>
          <Link href={"https://github.com/kinDreno/acad-qry"}>
            <FaGithub size={30} />
          </Link>
        </section>

        <ul className="flex space-x-6 items-center">
          {[
            ["About", "#about"],
            ["Developers", "#developers"],
            ["Features", "#features"],
          ].map(([label, href], index) => (
            <li key={index}>
              <Link
                href={href}
                className="text-lg hover:text-blue-500 hover:underline transition duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
          <ModeToggle />
        </ul>
      </nav>
    </Headroom>
  );
};

export default Nav;
