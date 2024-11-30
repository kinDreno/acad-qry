import NavHome from "@/components/nav.home";
import SidebarHome from "@/components/sidebar-home";
import MobileHomeNav from "@/components/mobile-home-nav";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData) {
    redirect("/");
  }

  return (
    <>
      <NavHome />
      <MobileHomeNav />
      <SidebarHome emailUser={userData.user?.email || null} />
      {children}
    </>
  );
};

export default Layout;
