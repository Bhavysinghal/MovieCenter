import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movie from "./Components/Movie";
import TvShows from "./Components/TvShows";
import People from "./Components/People";
import TvDetails from "./Components/TvDetails";
import PersonDetails from "./Components/PersonDetails";
import MovieDetails from "./Components/MovieDetails";
import Trailer from "./Components/partials/Trailer";
import NotFound from "./Components/Notfound";
import About from "./Components/About";
import ContactUs from "./Components/ContactUs";

const App = () => {
  return (
    <div className="bg-[#1F1E24] w-screen h-full flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<TvShows />}></Route>

        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/people" element={<People />}>
          {" "}
        </Route>
        <Route path="/person/details/:id" element={<PersonDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
