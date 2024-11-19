import { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonDemo } from "@/app/(home)/home/skeleton";

export const metadata: Metadata = {
  title: "TonAcads Query | New?",
  description: "New user has found.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="h-screen w-full flex justify-center items-center">
        <Suspense fallback={<SkeletonDemo />}>{children}</Suspense>
      </main>
    </>
  );
};

export default Layout;
