import NavHome from "@/components/nav.home";
import SidebarHome from "@/components/sidebar-home";
import MobileHomeNav from "@/components/mobile-home-nav";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const { data: data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }
  console.log(data);

  return (
    <>
      <NavHome />
      <MobileHomeNav />
      <section className="flex w-screen h-full">
        <SidebarHome emailUser={data.user.email || null} />
        {children}
      </section>
    </>
  );
};

export default Layout;
