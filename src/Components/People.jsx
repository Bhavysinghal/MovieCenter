import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/TopNav";

const People = () => {
  document.title = "People";

  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const refreshHandler = () => {
    setpage(1);
    setperson([]);
    sethasMore(true);
    GetPerson();
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category]);

  return person.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1F1E24] flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-4">
      {/* Header Section */}
      <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-4 mb-4">
        {/* Title + Back Button */}
        <div className="flex items-center w-full md:w-auto justify-center md:justify-start gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-zinc-400 hover:text-[#6556CD] focus:outline-none"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-zinc-400 text-center md:text-left">
            People
          </h1>
        </div>

        {/* TopNav + Dropdown */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end w-full md:w-auto gap-3">
          {/* Topnav appears inline on large screens */}
          <div className="hidden md:block w-full md:w-96">
            <Topnav />
          </div>
          <Dropdown
            title="Category"
            options={["popular"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile: Topnav below header */}
      <div className="w-full md:hidden">
        <Topnav />
      </div>

      {/* Cards Section */}
      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        className="w-full mt-4"
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
