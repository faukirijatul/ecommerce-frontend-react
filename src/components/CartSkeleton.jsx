import React from "react";

const CartSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="py-4 border-t border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="flex items-center gap-5 mt-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-10">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-20 mt-1"></div>
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-32 ml-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;