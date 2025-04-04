import React from "react";

const LazyLoadingHome = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="animate-pulse text-violet-600 text-sm font-medium">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default LazyLoadingHome;