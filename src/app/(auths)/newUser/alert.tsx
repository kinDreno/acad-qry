import React from "react";
const Alert = ({
  close,
  errorDesc,
}: {
  close: () => void;
  errorDesc: string | null;
}) => {
  return (
    <>
      <main className="transition-all duration-500 absolute h-screen w-full flex justify-center items-center bg-black bg-opacity-45 z-50">
        <section className="flex justify-center items-center border-2 rounded-lg bg-black h-[20%] w-[40%] space-x-3">
          <h4 className="font-bold text-white text-4xl">{errorDesc}</h4>
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
