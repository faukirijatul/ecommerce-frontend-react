import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ productId, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${productId}`} className="text-gray-700">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm line-clamp-2">{name}</p>
      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
