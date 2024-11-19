"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import NavHome from "@/components/nav.home";
import MobileHomeNav from "@/components/mobile-home-nav";
import SidebarHome from "@/components/sidebar-home";
import { SkeletonDemo } from "./skeleton";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <SkeletonDemo />
      </div>
    );
  }

  return (
    <>
      <NavHome />
      <MobileHomeNav />
      <section className="flex w-screen h-full">
        <SidebarHome />
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
