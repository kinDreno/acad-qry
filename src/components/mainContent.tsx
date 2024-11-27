"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AccordionDemo } from "./accordion";

const MainContent = () => {
  const [inView, setInView] = useState(false);
  const visibleElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries[0]);

        setInView(entries[0].isIntersecting);
      },
      { root: null, threshold: 0.4 }
    );
    const el = visibleElement.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={visibleElement}
      id="about"
      className={`transition-all duration-400 ease-in ${
        inView ? "opacity-100" : "opacity-0"
      } h-[100vh] max-lg:h-[200vh] w-full flex justify-center items-center p-4 md:p-16`}
    >
      <main className="flex flex-col lg:flex-row p-6 gap-4 backdrop-blur-md rounded-lg h-full w-full border-2">
        <article
          id="header"
          className="flex flex-col justify-center items-center lg:w-[50%] w-full h-full"
        >
          <div className="flex flex-col space-y-20 justify-center  items-center w-full max-sm:h-[50%] min-h-[70%] lg:h-auto">
            <Image
              src={"/faq.svg"}
              alt="Illustration of people having a work discussion"
              width={500}
              height={760}
              className="object-contain max-lg:h-[14em]"
              priority
            />
            <h3 className="font-bold text-center text-3xl">FAQ</h3>
          </div>
        </article>
        <article
          id="accordion"
          className="lg:w-[50%] w-full p-6 lg:border-2 h-full rounded-lg flex flex-col"
        >
          <section id="whatIs?">
            <h4>
              What is <b>Akademiko RIA&#63;</b>
              <hr />
            </h4>
            <article className="w-full max-sm:main-h-[6em] border-b-2 h-30 rounded-md text-left p-2">
              <p className="max-sm:text-md">
                &#8226; <b>Akademiko RIA</b> is a comprehensive web application
                designed to foster a supportive community where students can
                connect with their peers or knowledgeable individuals to seek
                assistance.
              </p>
            </article>
            <h5 className="mt-4 text-lg max-sm:text-md">
              Questions and Answers &#124; <b>{"Q & A"}</b>
            </h5>
            <AccordionDemo />
          </section>
        </article>
      </main>
    </div>
  );
};

export default MainContent;
