import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Devs from "@/components/devs";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="w-full h-screen transition-colors duration-500 bg-gradient-to-bl from-slate-400 from-30% via-blue-600 via-75% to-indigo-500 to-20% dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        <Hero />
      </main>
      <Devs />
    </>
  );
}
