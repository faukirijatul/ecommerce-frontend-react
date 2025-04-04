import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="border-t pt-10 animate-pulse">
      <div className="flex gap-5 md:gap-12 flex-col sm:flex-row">
        {/* Product images skeleton */}
        <div className="w-full sm:w-1/2">
          <div className="w-full h-96 bg-gray-200 border rounded"></div>
          <div className="grid grid-cols-5 gap-1 mt-5 w-full">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-16 bg-gray-200 border border-gray-300 rounded"
              ></div>
            ))}
          </div>
        </div>

        {/* Product details skeleton */}
        <div className="w-full sm:w-1/2">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 p-2 py-2"></div>
          
          {/* Size selection skeleton */}
          <div className="flex flex-col gap-2 my-8">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div className="h-8 w-12 bg-gray-200 border rounded"></div>
                  <div className="h-3 w-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity skeleton */}
          <div className="flex flex-col gap-2 my-8">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 border rounded"></div>
              <div className="h-8 w-12 bg-gray-200 border rounded"></div>
              <div className="h-8 w-8 bg-gray-200 border rounded"></div>
            </div>
          </div>

          {/* Add to cart button skeleton */}
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Description skeleton */}
      <div className="mt-10">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>

      {/* Related products skeleton - using a simpler version */}
      <div className="mt-10">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-3 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;