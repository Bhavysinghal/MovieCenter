import React, { useEffect, useState } from "react";
import SideNav from "./partials/SideNav";
import TopNav from "./partials/TopNav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "Movies Center"; // Page title

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
    // eslint-disable-next-line
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#1F1E24]">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 md:w-[80%] w-full h-full overflow-auto overflow-x-hidden">
        {/* Header Section */}
        <div className="relative w-full">
          <Header data={wallpaper} />
          <div className="absolute top-0 left-0 w-full z-40 hidden md:block">
            <TopNav />
          </div>
        </div>

        {/* Mobile Search / TopNav Below Header */}
        <div className="block md:hidden mt-3 px-3">
          <TopNav />
        </div>

        {/* Trending Section */}
        <div className="p-3 md:p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400">
            Trending
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        {/* Cards */}
        <HorizontalCards data={trending} />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
