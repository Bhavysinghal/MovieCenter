import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../utils/axios";

const TvShows = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tvShows, settvShows] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "TvShows ";

  const GetTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settvShows((prevState) => [...prevState, ...data.results]);
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
    settvShows([]);
    sethasMore(true);
    GetTvShows();
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category]);

  return tvShows.length > 0 ? (
    <div className="w-full h-full">
      {/* Header Section */}
      <div className="px-[5%] w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-zinc-400 flex items-center flex-wrap">
          <i
            className="hover:text-[#6556CD] ri-arrow-left-s-line mr-3 cursor-pointer text-2xl md:text-3xl"
            onClick={() => navigate(-1)}
          ></i>
          Tv Shows
          <small className="ml-2 text-sm text-zinc-500">({category})</small>
        </h1>

        {/* TopNav + Dropdown */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-end w-full md:w-[80%] gap-3">
          <TopNav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={tvShows.length}
        next={GetTvShows}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        className="w-full mt-4"
      >
        <Cards data={tvShows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
