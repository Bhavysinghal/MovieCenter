import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      GetSearches();
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [query]);

  return (
    <nav
      className="w-full flex items-center justify-center px-4 sm:px-6 md:px-10 py-2 sm:py-3 
      bg-[#1F1E24]/95 backdrop-blur-md sticky top-0 z-40 shadow-sm transition-all duration-300"
    >
      <div className="w-full max-w-2xl relative">
        {/* 🔍 Search Icon */}
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
          <i className="text-base sm:text-lg md:text-xl text-zinc-400 ri-search-line" />
        </div>

        {/* 🧠 Search Input */}
        <input
          onChange={(e) => setquery(e.target.value)}
          value={query}
          className="text-white outline-none pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 text-sm sm:text-base 
          bg-[#1F1E24] w-full rounded-full placeholder:text-zinc-400 border border-zinc-700 focus:border-[#6556CD] 
          transition-colors duration-300"
          type="text"
          placeholder="Search anything"
        />

        {/* ❌ Clear Button */}
        {query.length > 0 && (
          <i
            onClick={() => setquery("")}
            className="text-lg sm:text-xl md:text-2xl text-zinc-400 ri-close-fill cursor-pointer 
            absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 hover:text-zinc-200 transition-colors"
          ></i>
        )}

        {/* 📋 Search Results Dropdown */}
        {showSearch && (
          <div
            className="absolute left-0 right-0 z-[60] max-h-[50vh] overflow-auto 
            bg-[#1F1E24]/98 border border-zinc-700 top-[110%] rounded-lg shadow-2xl backdrop-blur-md"
          >
            {searches.length > 0 ? (
              searches.map((s, i) => (
                <Link
                  to={`/${s.media_type}/details/${s.id}`}
                  key={i}
                  className="text-zinc-300 font-medium hover:text-white hover:bg-[#2A2930] duration-300 
                  w-full p-3 sm:p-4 flex justify-start items-center border-b border-zinc-800"
                >
                  <img
                    className="w-[6vh] h-[6vh] sm:w-[8vh] sm:h-[8vh] md:w-[10vh] md:h-[10vh] 
                    object-cover rounded mr-3 sm:mr-4 md:mr-5 shadow-md"
                    src={
                      s.backdrop_path || s.profile_path
                        ? `https://image.tmdb.org/t/p/original/${
                            s.backdrop_path || s.profile_path
                          }`
                        : noimage
                    }
                    alt=""
                  />
                  <span className="truncate text-sm sm:text-base leading-tight">
                    {s.name || s.title || s.original_name || s.original_title}
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-zinc-400 text-center p-4 text-sm">
                No results found
              </p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Topnav;
