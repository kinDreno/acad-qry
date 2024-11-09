import NavHome from "@/components/nav.home";
import { Metadata } from "next";
import SidebarHome from "@/components/sidebar-home";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
export const metadata: Metadata = {
  title: "TonAcads Query | Main",
  description: "HELOW",
};
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <>
      <NavHome />
      <section className="flex w-screen h-full">
        <SidebarHome />
        {children}
      </section>
    </>
  );
};

export default Layout;
