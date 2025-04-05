import React from "react";

const OrdersSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      {[1, 2].map((_, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-sm overflow-hidden"
        >
          {/* Skeleton header */}
          <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:justify-between gap-2">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-40"></div>
              <div className="h-3 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="space-y-2 md:items-end flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Skeleton details */}
          <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="flex gap-10">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-28"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>

            {/* Skeleton products */}
            <div className="border-t pt-4">
              {[1, 2].map((_, idx) => (
                <div
                  key={idx}
                  className="py-4 border-b last:border-b-0 flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 rounded"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="flex gap-3">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/4 flex justify-end">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSkeleton;