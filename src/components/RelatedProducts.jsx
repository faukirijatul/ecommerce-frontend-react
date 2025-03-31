import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";

const RelatedProducts = ({ category, subCategory, productId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const getRelated = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
        params: {
          category,
          subCategory,
          limit : 11,
        },
      });
      setRelated(response.data.products.filter((p) => p._id !== productId));;
    }

    getRelated();
  }, [category, subCategory, productId]);

  return (
    <div className="my-20">
      <div className="text-center text-xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((product) => (
          <ProductItem
            key={product._id}
            productId={product._id}
            image={product.image[0].url}
            name={product.name}
            price={product.price}
            sold={product.sold}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
