import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getLatest = async () => {
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
        <Title text1="BEST" text2="SELLER" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quae dolores eum quibusdam expedita quia.
        </p>
      </div>

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
    </div>
  );
};

export default BestSeller;
