import NavHome from "@/components/nav.home";
import { Metadata } from "next";
import SidebarHome from "@/components/sidebar-home";
export const metadata: Metadata = {
  title: "TonAcads Query | Main",
  description: "HELOW",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
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