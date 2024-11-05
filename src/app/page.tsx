import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Devs from "@/components/devs";
export default function Home() {
  return (
    <>
      <Nav />
      <main
        style={{ backgroundImage: "url(/background.avif)" }}
        className="w-full h-screen bg-cover"
      >
        <Hero />
      </main>
      <Devs />
    </>
  );
}
