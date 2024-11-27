"use client";
import { useRouter } from "next/navigation";
import { IoMdLogIn } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";

const Hero = () => {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: "url(wave.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black to-transparent z-0" />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
        <div className="w-[80%] flex h-[80%] max-md:h-[100%] rounded-lg mt-[15em]">
          <section className="flex-col justify-center items-center break-words text-left w-full h-full">
            <h1
              style={{ textShadow: "0 0 12px black" }}
              className="text-slate-200 dark:text-slate-200 mb-2 text-5xl max-sm:text-xl text-center"
            >
              <b>
                Welcome to Akedemiko RIA! <br />
                The Web to Report, Inquire, and Answer
              </b>
            </h1>
            <hr />
            <br />
            <p
              style={{ textShadow: "0 0 12px black" }}
              className="text-center text-3xl max-sm:text-2xl mt-2 text-slate-200 dark:text-slate-200"
            >
              A web application where students from different schools <br /> and
              courses can inquire about{" "}
              <b>
                <span className="text-indigo-700 dark:text-indigo-600">
                  academic matters.
                </span>
              </b>{" "}
            </p>
            <br />
            <br />
            <div className="w-full flex justify-center space-x-3">
              <button
                onClick={() => router.push("/login")}
                className="duration-500 flex items-center max-sm:p-3 px-8 p-4 hover:bg-slate-400 hover:text-slate-200 rounded-lg font-bold text-md bg-slate-200 text-slate-800"
              >
                <IoMdLogIn size={25} className="mr-3" /> Log In
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="duration-500  flex items-center  px-8 p-4 max-sm:p-3 hover:bg-slate-900 hover:text-slate-400 rounded-lg font-bold text-md bg-slate-800 text-slate-200"
              >
                <FaCircleCheck size={25} className="mr-3" /> Register
              </button>
            </div>
            <br />
            <p className="text-md text-center text-slate-200 text-2xl">
              <span style={{ textShadow: "0 0 12px black" }}>
                Would like to enter?{" "}
                <Link href={"signup"} className="hover:underline">
                  Register Now!
                </Link>
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;
