import { Metadata } from "next";
import { Suspense } from "react";
import MainSkeleton from "@/components/skeleton";

export const metadata: Metadata = {
  title: "TonAcads Query | New?",
  description: "New user has found.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="h-screen w-full flex justify-center items-center">
        <Suspense fallback={<MainSkeleton />}>{children}</Suspense>
      </main>
    </>
  );
};

export default Layout;
