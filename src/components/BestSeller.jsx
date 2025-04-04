import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { moveToTop } from "../lib/moveToTop";
import ProductItemSkeleton from "./ProductItemSkeleton";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getBestSellers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/products`,
          {
            params: {
              sortBy: "sold",
              sortOrder: "desc",
              limit: 10,
            },
          }
        );
        setBestSeller(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
        setLoading(false);
      }
    };
    getBestSellers();
  }, []);

  return (
    <div className="my-16 px-4 max-w-7xl mx-auto">
      <div className="text-center py-8">
        <div className="text-2xl sm:text-3xl">
          <Title text1="BEST" text2="SELLERS" />
        </div>
        <p className="w-full md:w-3/4 lg:w-1/2 mx-auto text-sm md:text-base text-gray-600 mt-4">
          Explore our top-performing products loved by customers worldwide.
          These best-selling items combine quality, style, and value that keep
          shoppers coming back for more.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <ProductItemSkeleton />
      ) : (
        <>
          {/* Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {bestSeller.map((product) => (
              <ProductItem
                key={product._id}
                productId={product._id}
                image={product.image[0]?.url}
                name={product.name}
                price={product.price}
                sold={product.sold}
              />
            ))}
          </div>

          {/* Empty State */}
          {bestSeller.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-gray-500">
                No best sellers available at the moment. Check back soon!
              </p>
            </div>
          )}
        </>
      )}

      {/* View All Button */}
      <div className="flex items-center justify-center mt-12">
        <button
          className="flex items-center justify-center gap-2 border border-gray-400 p-2 h-fit text-sm rounded hover:bg-gray-50 transition"
          onClick={() => {
            navigate("/collection?sortBy=sold");
            moveToTop();
          }}
        >
          View All Collection
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        </button>
      </div>
    </div>
  );
};

export default BestSeller;