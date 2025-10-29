import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  const features = [
    { icon: "ri-search-line", text: "Search millions of movies and TV shows" },
    {
      icon: "ri-information-line",
      text: "Detailed information about cast and crew",
    },
    { icon: "ri-image-line", text: "High-quality movie posters and backdrops" },
    { icon: "ri-star-line", text: "User ratings and reviews" },
    { icon: "ri-fire-line", text: "Trending and popular content" },
    { icon: "ri-filter-line", text: "Genre-based filtering" },
    { icon: "ri-refresh-line", text: "Real-time data updates" },
    { icon: "ri-smartphone-line", text: "Mobile-responsive design" },
  ];

  const technologies = [
    "ReactJS",
    "JavaScript",
    "TMDB API",
    "CSS3",
    "HTML5",
    "Vite",
    "REST API",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden w-full">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 w-full py-6 px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-zinc-400 hover:text-[#6556CD] transition-all duration-300 group"
        >
          <i className="ri-arrow-left-line text-2xl mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
          <span className="text-lg font-medium">About Movies Center</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full pb-16 px-6">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-6 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#6556CD] via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Movies Center
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            Your ultimate destination for discovering movies, TV shows, and
            entertainment content. Powered by comprehensive data and built with
            modern web technologies.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 w-full">
          <div className="inline-flex bg-zinc-900 rounded-xl p-1 border border-zinc-800 overflow-x-auto">
            {["overview", "features", "tech"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all text-base whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#6556CD] text-white shadow-lg"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full animate-fadeIn">
          {activeTab === "overview" && (
            <div className="space-y-12 w-full">
              {/* Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-700">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#6556CD]/20 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-movie-2-line text-2xl text-[#6556CD]"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-200">
                      What is Movies Center?
                    </h2>
                  </div>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    Movies Center is a comprehensive movie and TV show discovery
                    platform that helps you explore, search, and learn about
                    your favorite entertainment content.
                  </p>
                  <p className="text-zinc-400 leading-relaxed">
                    Built with React and powered by The Movie Database (TMDB)
                    API, we provide up-to-date information about movies, TV
                    series, cast members, and much more.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-700">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-star-line text-2xl text-purple-400"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-200">
                      Key Features
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <i
                          className={`${feature.icon} text-[#6556CD] mr-3 mt-1`}
                        ></i>
                        <span className="text-zinc-400">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-[#6556CD] transition-all hover:scale-105"
                >
                  <div className="w-12 h-12 bg-[#6556CD]/20 rounded-lg flex items-center justify-center mb-4">
                    <i
                      className={`${feature.icon} text-2xl text-[#6556CD]`}
                    ></i>
                  </div>
                  <p className="text-zinc-300 font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "tech" && (
            <div className="space-y-12 w-full">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-700">
                <h2 className="text-2xl font-bold text-zinc-200 mb-4">
                  Built With Modern Technology
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Movies Center is built using cutting-edge web technologies to
                  ensure fast performance, responsive design, and a great user
                  experience across all devices.
                </p>

                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-300 font-medium hover:border-[#6556CD] hover:text-[#6556CD] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center space-y-6 w-full">
          <h2 className="text-3xl font-bold text-zinc-200">
            Start Exploring Today!
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Discover your next favorite movie or TV show. Search, explore, and
            dive into the world of entertainment.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/movie"
              onClick={handleLinkClick}
              // className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 md:p-5"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-[#6556CD] to-purple-600 hover:from-[#5a4bb8] hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-[#6556CD]/50">
                Browse Movies
              </button>
            </Link>
            <Link
              to="/tv"
              onClick={handleLinkClick}
              // className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-3 md:p-5"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-[#6556CD] to-purple-600 hover:from-[#5a4bb8] hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-[#6556CD]/50">
                Explore TV Shows
              </button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6556CD] to-purple-400 bg-clip-text text-transparent mb-2">
                Movies Center
              </h3>
              <p className="text-zinc-500 text-sm">
                Made with ❤️ for movie and TV show enthusiasts everywhere
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
