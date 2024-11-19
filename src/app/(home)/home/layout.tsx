import NavHome from "@/components/nav.home";
import SidebarHome from "@/components/sidebar-home";
import MobileHomeNav from "@/components/mobile-home-nav";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const { data: data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return redirect("/");
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

export default Layout;
