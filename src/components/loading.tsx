import React from "react";
import Typewriter from "typewriter-effect";

const Loading = () => {
  return (
    <div className="flex justify-center items-center absolute bg-opacity-80 z-50 top-0 left-0 bg-black w-full h-full">
      <div className="h-[40%] flex justify-center rounded-lg items-center w-[40%] bg-gradient-to-tr from-zinc-700 from-10% via-sky-500 via-20% to-emerald-950 to-90% ">
        <svg
          className="animate-spin h-5 w-5 mr-3 bg-white"
          viewBox="0 0 24 24"
        />
        <span className="text-white text-3xl">
          <Typewriter
            options={{
              strings: ["Loading..."],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default Loading;
