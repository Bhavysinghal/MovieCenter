import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import TopNav from "./partials/TopNav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

function Popular() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Popular " + category.toUpperCase();

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
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
    setpopular([]);
    sethasMore(true);
    GetPopular();
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-full h-full">
      {/* Header Section */}
      <div className="px-[5%] w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-zinc-400 flex items-center">
          <i
            className="hover:text-[#6556CD] ri-arrow-left-s-line mr-3 cursor-pointer text-2xl md:text-3xl"
            onClick={() => navigate(-1)}
          ></i>
          Popular
        </h1>

        {/* Search + Dropdown Section */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-end w-full md:w-[80%] gap-3">
          <TopNav />
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      {/* Infinite Scroll Section */}
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        className="w-full mt-4"
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
