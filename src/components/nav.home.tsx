"use client";
import { PiHandshakeFill } from "react-icons/pi";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { LuBellRing } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/logout/actions";

type NavItem = [string, string, React.ElementType];

const NavHome: React.FC = () => {
  const navItems: NavItem[] = [
    ["Home", "/home", FaHome],
    ["New Posts", "/newPosts", LuBellRing],
    ["Write a Post", "/write", BsPencilSquare],
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex justify-between p-8 items-center overflow-hidden w-full h-[15vh] border-2 border-slate-700">
      <Link href="/home" className="flex items-center">
        <PiHandshakeFill size={50} />
        <h3 className="ml-2 text-lg font-bold">TonAcads Query!</h3>
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
