import React from "react";
import { motion } from "framer-motion";

const Alert = ({
  close,
  errorDesc,
}: {
  close: () => void;
  errorDesc: string;
}) => {
  return (
    <>
      <main className="absolute h-screen w-full flex justify-center items-center bg-black bg-opacity-45 z-50">
        <motion.section
          initial={{ scale: 0, opacity: 0 }} // Start from 0 scale and invisible
          animate={{ scale: 1, opacity: 1 }} // Grow to full size and visible
          exit={{ scale: 0, opacity: 0 }} // Animate out with reverse effect
          transition={{ duration: 0.3, ease: "easeInOut" }} // Control timing
          className="flex justify-center items-center border-2 rounded-lg bg-black h-[20%] w-[40%] space-x-3"
        >
          <h4 className="font-bold text-white text-4xl">{errorDesc}</h4>
          <button
            onClick={close}
            className="text-white p-4 bg-slate-800 rounded-md"
          >
            Close
          </button>
        </motion.section>
      </main>
    </>
  );
};

export default Alert;
