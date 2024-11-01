"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Hero = () => {
  const router = useRouter();
  return (
    <>
      <main className="h-[70vh] w-full flex justify-center items-center">
        <div className="bg-slate-800 w-[90%] flex h-[90%] rounded-lg">
          <section className="break-words text-left w-2/4 h-full p-8">
            <h1 className="text-slate-200 mb-2">
              <b>Welcome to AcadQry!</b>
            </h1>
            <hr />
            <p className="text-3xl mt-2 text-slate-200">
              A web application where students from different schools and
              courses can inquire about{" "}
              <b>
                <span className="text-indigo-500">academic matters.</span>
              </b>{" "}
            </p>
            <br />
            <p className="text-md text-slate-200 text-xl">
              Would like to enter? Register Now!
            </p>
            <br />
            <button
              onClick={() => router.push("/login")}
              className="duration-500 border-2 px-6 p-4 hover:bg-slate-800 hover:text-slate-200 rounded-lg font-bold text-md bg-slate-200 text-slate-800"
            >
              Sign Up
            </button>
          </section>
          <section className="w-2/4 h-full flex justify-center items-center">
            <Image
              alt="Hero Image"
              src={"/hero.svg"}
              priority={true}
              width={600}
              height={0}
            />
          </section>
        </div>
      </main>
    </>
  );
};

export default Hero;
