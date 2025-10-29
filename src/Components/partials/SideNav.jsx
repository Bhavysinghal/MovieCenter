import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Button (Mobile Only) */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 text-white text-3xl focus:outline-none"
      >
        <i className={`${open ? "ri-close-fill" : "ri-menu-line"}`}></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen md:h-full w-[70%] md:w-[20%] 
        bg-[#1F1E24] md:bg-transparent border-r-2 border-zinc-400 md:translate-x-0 
        transform ${open ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out 
        p-8 md:p-10 z-40 flex flex-col overflow-y-auto`}
      >
        {/* Logo */}
        <h1 className="text-2xl text-white font-bold mb-6 flex items-center">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span>Movies Center</span>
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col text-zinc-400 text-lg md:text-xl gap-2 md:gap-3">
          <h1 className="text-white font-semibold text-lg md:text-xl mt-4 md:mt-8 mb-3">
            New Feeds
          </h1>

          <Link
            to="/trending"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 md:p-5"
          >
            <i className="mr-1 ri-fire-fill"></i> Trending
          </Link>
          <Link
            to="/popular"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 md:p-5"
          >
            <i className="mr-1 ri-bard-fill"></i> Popular
          </Link>
          <Link
            to="/movie"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 md:p-5"
          >
            <i className="mr-2 ri-movie-2-fill"></i> Movies
          </Link>
          <Link
            to="/tv"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 md:p-5"
          >
            <i className="mr-2 ri-tv-2-fill"></i> TV Shows
          </Link>
          <Link
            to="/people"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 md:p-5"
          >
            <i className="mr-2 ri-team-fill"></i> People
          </Link>
        </nav>

        <hr className="border-none h-[1px] bg-zinc-400 my-6" />

        <nav className="flex flex-col text-zinc-400 text-lg md:text-xl gap-2 md:gap-3">
          <h1 className="text-white font-semibold text-lg md:text-xl mt-4 md:mt-8 mb-3">
            Website Information
          </h1>

          <Link
            to="/about"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-3 md:p-5"
          >
            <i className="mr-1 ri-information-2-fill"></i> About
          </Link>
          <Link
            to="/contactus"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-3 md:p-5"
          >
            <i className="mr-1 ri-phone-fill"></i> Contact Us
          </Link>
        </nav>
      </div>

      {/* Background Overlay when Sidebar open (Mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
        ></div>
      )}
    </>
  );
};

export default SideNav;
