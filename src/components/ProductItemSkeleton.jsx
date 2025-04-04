import React from "react";

const ProductItemSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg">
          {/* Image skeleton */}
          <div className="w-full h-48 bg-gray-200"></div>
          
          {/* Content skeleton */}
          <div className="p-3 md:p-4 space-y-3">
            {/* Name skeleton */}
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            
            {/* Price and sold skeleton */}
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            
            {/* Admin controls skeleton */}
            <div className="flex border-t border-gray-200">
              <div className="w-1/2 h-8 bg-gray-200 border-r border-gray-200"></div>
              <div className="w-1/2 h-8 bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItemSkeleton;