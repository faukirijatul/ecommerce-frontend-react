import React from "react";
import heroimage from "../assets/images/heroimage.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden">
      {/* Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-16 md:py-20 px-6 md:px-10 bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center sm:text-left max-w-md">
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
            <p className="w-8 md:w-12 h-[2px] bg-pink-400"></p>
            <p className="font-medium text-sm md:text-base text-gray-600">
              Fashion & Style
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-violet-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
            Elevate Your Wardrobe
          </h1>

          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Discover our curated collection of timeless pieces designed for the
            modern fashion enthusiast
          </p>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <button
              className="bg-gradient-to-r from-violet-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition duration-300 text-sm md:text-base"
              onClick={() => navigate("/collection")}
            >
              Shop Collection
            </button>
            <div
              className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition cursor-pointer group"
              onClick={() => navigate("/collection?sortBy=sold")}
            >
              <p className="font-medium text-sm md:text-base">Trending Now</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="w-full sm:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
        <img
          src={heroimage}
          alt="Fashion collection showcase"
          className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
        />
        <div className="absolute bottom-4 right-4 bg-white/60 hover:bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full z-20 text-sm font-medium text-gray-800 cursor-pointer">
          New Season Collection
        </div>
      </div>
    </div>
  );
};

export default Hero;
