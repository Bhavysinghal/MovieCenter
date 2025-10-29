import React from "react";
import Notfound from "/Notfound.gif";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-center px-4">
      {/* GIF */}
      <img
        className="w-[90%] sm:w-[60%] md:w-[40%] object-contain mb-6"
        src={Notfound}
        alt="Page Not Found"
      />

      {/* Message */}
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
        Oops! Page Not Found
      </h1>
      <p className="text-zinc-400 text-sm sm:text-base">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
    </div>
  );
};

export default NotFound;
