import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { moveToTop } from "../lib/moveToTop";
import ProductItemSkeleton from "./ProductItemSkeleton";

const LatestCollection = () => {
  const [latestProduct, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getLatest = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/products`,
          {
            params: {
              limit: 10,
            },
          }
        );
        setLatestProduct(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching latest products:", error);
        setLoading(false);
      }
    };
    getLatest();
  }, []);

  return (
    <div className="my-16 px-4 max-w-7xl mx-auto">
      <div className="text-center py-8">
        <div className="text-2xl sm:text-3xl">
          <Title text1="LATEST" text2="COLLECTION" />
        </div>
        <p className="w-full md:w-3/4 lg:w-1/2 mx-auto text-sm md:text-base text-gray-600 mt-4">
          Discover our newest arrivals featuring this season's must-have styles.
          From casual everyday wear to elegant statement pieces, we've curated
          the perfect collection for the modern fashion enthusiast.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <ProductItemSkeleton />
      ) : (
        <>
          {/* Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {latestProduct.map((product) => (
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
          {latestProduct.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-gray-500">
                No products available at the moment. Check back soon!
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
            navigate("/collection");
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

export default LatestCollection;
