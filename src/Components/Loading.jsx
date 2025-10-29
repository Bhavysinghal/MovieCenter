import React from "react";
import loader from "/loading.gif";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-center px-4">
      {/* Loader GIF */}
      <img
        className="w-[100px] sm:w-[140px] md:w-[180px] object-contain animate-pulse mb-4"
        src={loader}
        alt="Loading..."
      />

      {/* Optional text */}
      <p className="text-zinc-400 text-sm sm:text-base tracking-wide">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
