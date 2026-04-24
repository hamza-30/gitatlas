import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineCode } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    width: "auto",
    transition: {
      opacity: { duration: 0.1 },
      width: { duration: 0.02 },
    },
  },
};

function Home() {
  const line = "See the developer behind the code.";
  const [username, setUsername] = useState(null)

  return (
    <div className="flex-1 flex flex-col items-center mt-40 md:mt-52 gap-y-9 px-5">
      <motion.h1
        className="text-[1.2rem] md:text-[1.4rem] font-medium font-[georgia] flex items-center"
        variants={sentenceVariants}
        initial="hidden"
        animate="visible"
      >
        {line.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block overflow-hidden whitespace-pre"
          >
            {char}
          </motion.span>
        ))}

        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            opacity: { repeat: Infinity, duration: 0.8, ease: "linear" },
          }}
          className="inline-block w-[2.2px] h-6 mb-1 bg-black ml-0.5"
        />
      </motion.h1>

      <div
        className={`w-full md:w-[30rem] lg:w-[40rem] h-fit bg-white border border-gray-200 rounded-sm px-5 py-5`}
      >
        <div className={`w-full flex flex-col md:flex-row md:h-10 gap-y-3 md:gap-x-5`}>
          <div className={`relative flex-1`}>
            <input
              className={`border border-gray-200 h-10 outline-none focus:border-transparent focus:ring-1 w-full pl-10 text-sm transition-all ease-in-out duration-150`}
              type="text"
              placeholder="Enter a GitHub username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <AiOutlineCode
              className={`absolute text-2xl left-2 bottom-[0.47rem]`}
            />
          </div>

          <button
            className={`group h-10 w-full md:w-30 bg-black text-white flex items-center justify-center gap-x-1`}
          >
            <p className={`text-sm`}>Search</p>
            <FiArrowRight className={`group-hover:translate-x-2 group-active:translate-x-2 transition-transform ease-in-out duration-200`}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
