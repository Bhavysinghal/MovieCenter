import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full px-3 sm:px-5 lg:px-8">
      {/* ✅ Responsive grid with smoother scaling */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 lg:gap-6">
        {data.map((c, i) => (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            key={i}
            className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {/* ✅ Image container maintains consistent aspect ratio */}
            <div className="relative w-full aspect-[2/3]">
              <img
                className="w-full h-full object-cover"
                src={
                  c.poster_path || c.backdrop_path || c.profile_path
                    ? `https://image.tmdb.org/t/p/original${
                        c.poster_path || c.backdrop_path || c.profile_path
                      }`
                    : noimage
                }
                alt={c.name || c.title || c.original_name || c.original_title}
              />

              {/* ✅ Vote badge: readable and properly positioned */}
              {c.vote_average && (
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-yellow-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-[2px] sm:py-1 rounded-full shadow-md">
                  {(c.vote_average * 10).toFixed()}%
                </div>
              )}
            </div>

            {/* ✅ Title container with responsive padding & font sizes */}
            <div className="p-2 sm:p-3">
              <h1 className="text-white font-semibold text-xs sm:text-sm md:text-base leading-tight line-clamp-2">
                {c.name || c.title || c.original_name || c.original_title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
