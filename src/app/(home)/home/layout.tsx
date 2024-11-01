import { Metadata } from "next";
import Head from "next/head";
export const metadata: Metadata = {
  title: "TonAcads Query | Main",
  description: "HELOW",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/hero.svg" type="image/svg+xml" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
