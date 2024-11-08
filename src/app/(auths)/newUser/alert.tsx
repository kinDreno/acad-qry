import React from "react";
import { PiNotePencilFill } from "react-icons/pi";
const Alert = ({ close }: { close: () => void }) => {
  return (
    <>
      <main className="transition-all duration-500 absolute h-screen w-full flex justify-center items-center bg-black bg-opacity-45 z-50">
        <section className="flex justify-center items-center border-2 rounded-lg bg-black h-[20%] w-[40%] space-x-3">
          <div className="text-3xl">
            <PiNotePencilFill color="white" />
          </div>
          <h4 className="font-bold text-white text-4xl">
            Please fill in all the fields.
          </h4>
          <button
            onClick={close}
            className="text-white p-4 bg-slate-800 rounded-md"
          >
            Close
          </button>
        </section>
      </main>
    </>
  );
};

export default Alert;
