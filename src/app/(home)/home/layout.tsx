import NavHome from "@/components/nav.home";
import MobileHomeNav from "@/components/mobile-home-nav";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FilterProvider } from "./filterContext";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const { data: userData, error: err } = await supabase.auth.getUser();
  if (err || !userData) {
    redirect("/");
  }

  return (
    <>
      <FilterProvider>
        <NavHome />
        <MobileHomeNav />
        {children}
      </FilterProvider>
    </>
  );
};

export default Layout;
