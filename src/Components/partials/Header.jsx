import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.75),rgba(0,0,0,0.95)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-[45vh] sm:h-[55vh] md:h-[67vh] flex flex-col items-start justify-end
      px-4 sm:px-8 md:px-16 pb-8 sm:pb-12 md:pb-16 text-left mx-0 sm:mx-auto sm:rounded-xl sm:shadow-lg
      transition-all duration-300 mt-[4.5rem] sm:mt-0"
      // 👆 Changed mt-8 to mt-[4.5rem] for small screens to match navbar height
    >
      {/* Title */}
      <h1 className="w-full sm:w-[90%] md:w-[70%] text-lg sm:text-3xl md:text-5xl font-extrabold text-white leading-tight sm:leading-snug mb-2 sm:mb-3 md:mb-4 drop-shadow-lg">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>

      {/* Overview */}
      <p className="w-full sm:w-[90%] md:w-[70%] text-white text-[11px] sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 md:mb-5 opacity-90">
        {data.overview?.slice(0, 160)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400 hover:text-blue-500 transition-colors font-medium ml-1"
        >
          more
        </Link>
      </p>

      {/* Info Section */}
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-white text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-5">
        <span className="flex items-center gap-2">
          <i className="text-yellow-400 ri-megaphone-fill"></i>
          {data.release_date || "No Information"}
        </span>
        <span className="flex items-center gap-2">
          <i className="text-yellow-400 ri-album-fill"></i>
          {data.media_type?.toUpperCase()}
        </span>
      </div>

      {/* Watch Trailer Button */}
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-xs sm:text-sm md:text-base
        text-white font-semibold mt-2 sm:mt-4 rounded-lg bg-[#6556CD] hover:bg-[#5748b9] shadow-md transition-all duration-200"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
