import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { moveToTop } from "../lib/moveToTop";

const LatestCollection = () => {
  const [latestProduct, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getLatest = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/products`,
        {
          params: {
            limit: 10,
          },
        }
      );
      setLatestProduct(response.data.products);
    };

    getLatest();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quae dolores eum quibusdam expedita quia.
        </p>
      </div>

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

      <div className="text-center mt-10">
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 mt-6"
          onClick={() => {
            navigate("/collection");
            moveToTop();
          }}
        >
          View All Collection
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;
