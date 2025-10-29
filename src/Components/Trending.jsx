import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../utils/axios";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Trending " + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const refreshHandler = () => {
    setpage(1);
    settrending([]);
    sethasMore(true);
    GetTrending();
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-full">
      {/* ✅ Responsive header bar */}
      <div className="px-[5%] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-zinc-400 flex items-center">
          <i
            className="hover:text-[#6556CD] ri-arrow-left-s-line mr-3 sm:mr-5 cursor-pointer"
            onClick={() => navigate(-1)}
          ></i>
          Trending
        </h1>

        {/* ✅ Wrap dropdowns and nav for responsiveness */}
        <div className="flex flex-wrap items-center w-full sm:w-[80%] gap-3 sm:gap-4 mt-2 sm:mt-0">
          <TopNav />
          <Dropdown
            title="Category"
            options={["movies", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      {/* ✅ InfiniteScroll container */}
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        className="w-full px-[3%] sm:px-[5%] mt-4"
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
