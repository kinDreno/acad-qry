"use client";
import { PiHandshakeFill } from "react-icons/pi";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Headroom from "react-headroom";
import { ModeToggle } from "./mode-toggle";
import MobileNav from "./mobile-nav";

const Nav: React.FC = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [open, isOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <Headroom
        style={{ zIndex: 50 }}
        onPin={() => setIsPinned(false)}
        onUnpin={() => setIsPinned(true)}
      >
        <nav
          className={`flex justify-between p-8 md:min-h-11 fixed items-center w-full h-24 transition-all duration-300 ease-in-out ${
            isPinned
              ? "transition-all duration-500 -translate-y-44"
              : "backdrop-blur-sm"
          }`}
        >
          <section className="flex items-center space-x-5">
            <Link href="/" className="flex items-center">
              <PiHandshakeFill size={50} />
              <h3 className="ml-2 text-lg  font-bold">AcadQry!</h3>
            </Link>{" "}
            <h4 style={{ fontSize: "20px" }}>|</h4>
            <div className="max-md:block hidden">
              <ModeToggle />
            </div>
          </section>

          <ul className="flex space-x-6 items-center max-md:hidden">
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
          <MobileNav state={() => isOpen(!open)} />
        </nav>
      </Headroom>

      {/* Sidebar and overlay */}
      <div
        className={`fixed z-50 inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => isOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-black z-50 transform transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="w-full h-full flex flex-col text-right p-6 space-y-4">
          <button
            onClick={() => isOpen(false)}
            className="text-white p-3 rounded-md border-2"
          >
            Close | &#10006;
          </button>
          <hr />
          {[
            ["About", "#about"],
            ["Developers", "#developers"],
            ["Features", "#features"],
          ].map(([label, href], index) => (
            <li key={index}>
              <Link
                href={href}
                className="text-lg text-white hover:text-blue-500 hover:underline transition duration-300"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Nav;
