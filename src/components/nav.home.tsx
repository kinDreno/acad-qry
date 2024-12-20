"use client";
import { PiHandshakeFill } from "react-icons/pi";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { LuBellRing } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/(auths)/login/action-logout";

type NavItem = [string, string, React.ElementType];

const NavHome: React.FC = () => {
  const navItems: NavItem[] = [
    ["Home", "/home", FaHome],
    ["Your Posts", "/home/yourPosts", LuBellRing],
    ["Write a Post", "/home/write", BsPencilSquare],
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="backdrop-blur-md flex fixed top-0 justify-between p-8 items-center max-md:hidden overflow-hidden w-full h-[15vh] border-b-2 border-slate-700">
      <Link href="/home" className="flex items-center">
        <PiHandshakeFill size={50} />
        <h3 className="ml-2 text-lg font-bold">Akademiko RIA</h3>
      </Link>
      <ul className="flex space-x-6 items-center">
        {navItems.map(([label, href, Icon], index) => {
          return (
            <li key={index}>
              <Link
                href={href}
                className="flex items-center text-lg hover:text-indigo-700 hover:underline transition duration-300"
                aria-label={label}
              >
                <Icon className="mr-1" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <Button onClick={handleLogout}>Sign Out</Button>
    </nav>
  );
};

export default NavHome;
