import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-full min-h-screen bg-[#1F1E24] text-white px-3 sm:px-6 lg:px-[10%] overflow-x-hidden">
      {/* Navigation */}
      <nav className="w-full flex justify-between sm:justify-start items-center gap-4 sm:gap-6 lg:gap-10 py-4 text-lg sm:text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line text-2xl sm:text-xl"
        />
      </nav>

      {/* Layout Wrapper */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Left Panel - Profile Info */}
        <div className="w-full lg:w-[28%] flex flex-col items-center lg:items-start">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start w-full">
            <img
              className="rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] sm:h-[45vh] lg:h-[55vh] w-[250px] sm:w-[300px] lg:w-[90%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
              alt={info.detail.name}
            />
          </div>

          <hr className="bg-zinc-700 border-none w-[90%] my-6" />

          {/* Social Links */}
          <div className="flex gap-6 text-2xl justify-center lg:justify-start mb-6">
            {info.externalid.wikidata_id && (
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                className="hover:text-[#6556CD] transition-colors"
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info.externalid.facebook_id && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                className="hover:text-[#6556CD]"
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info.externalid.instagram_id && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                className="hover:text-[#6556CD]"
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {info.externalid.twitter && (
              <a
                target="_blank"
                href={`https://www.twitter.com/${info.externalid.twitter}`}
                className="hover:text-[#6556CD]"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          {/* Personal Info */}
          <div className="w-full text-center lg:text-left space-y-4 px-2">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-300 mb-3">
              Person Info
            </h1>

            {[
              { label: "Known For", value: info.detail.known_for_department },
              {
                label: "Gender",
                value: info.detail.gender === 2 ? "Male" : "Female",
              },
              { label: "Birthday", value: info.detail.birthday },
              {
                label: "Deathday",
                value: info.detail.deathday
                  ? info.detail.deathday
                  : "Still Alive",
              },
              { label: "Place of Birth", value: info.detail.place_of_birth },
              {
                label: "Also Known As",
                value: info.detail.also_known_as.join(", "),
              },
            ].map((item, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-zinc-400">
                  {item.label}
                </h2>
                <p className="text-sm sm:text-base text-zinc-500 break-words">
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Details */}
        <div className="w-full lg:w-[70%]">
          {/* Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-zinc-100 text-center lg:text-left mb-6 leading-tight">
            {info.detail.name}
          </h1>

          {/* Biography */}
          {info.detail.biography && (
            <div className="mb-10">
              <h2 className="text-lg sm:text-xl font-semibold text-zinc-300 mb-3">
                Biography
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed text-justify">
                {info.detail.biography}
              </p>
            </div>
          )}

          {/* Known For */}
          {info.combinedCredits.cast &&
            info.combinedCredits.cast.length > 0 && (
              <div className="mb-10">
                <h2 className="text-lg sm:text-xl font-semibold text-zinc-300 mb-4">
                  Known For
                </h2>
                <HorizontalCards data={info.combinedCredits.cast} />
              </div>
            )}

          {/* Acting Credits */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-zinc-300">
                Acting Credits
              </h2>
              <Dropdown
                title="Category"
                options={["tv", "movie"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>

            <div className="list-disc text-zinc-400 border border-zinc-700 rounded-md shadow-[0_0_10px_rgba(255,255,255,0.1)] overflow-y-auto max-h-[50vh] sm:max-h-[55vh] p-4 sm:p-5">
              {info[category + "Credits"].cast.map((c, i) => (
                <li
                  key={i}
                  className="hover:bg-[#19191d] hover:text-white rounded-md px-4 py-3 mb-2 duration-300 cursor-pointer"
                >
                  <Link to={`/${category}/details/${c.id}`}>
                    <span className="text-sm sm:text-base font-medium">
                      {c.name || c.title || c.original_name || c.original_title}
                    </span>
                    {c.character && (
                      <span className="block ml-3 sm:ml-5 mt-1 text-xs sm:text-sm text-zinc-500">
                        Character: {c.character}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
