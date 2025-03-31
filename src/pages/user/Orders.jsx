import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div className="border-t pt-16 min-h-[60vh]">
      <div className="text-2xl">
        <Title text1="YOUR" text2="ORDERS" />
      </div>

      {/* Order List */}
      <div>
        {products.slice(1, 4).map((product) => (
          <div
            key={product._id}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
          >
            <div className="flex items-center gap-6 text-sm flex-1">
              <img
                src={product.image[0]}
                alt={product.title}
                className="w-16 sm:w-20 object-cover"
              />
              <div className="">
                <p className="font-medium text-base">{product.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency} {product.price.toLocaleString("id")}
                  </p>
                  <p className="">Quantity: {product.quantity || 1}</p>
                  <p className="">Size: {product.size || "2XL"}</p>
                </div>
                <p>
                  Date:{" "}
                  <span className="text-gray-400">
                    {product.date || "2023-01-01"}
                  </span>
                </p>
              </div>
            </div>

            <div className="md:w-1/3 flex justify-end gap-3">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>
              <button className="border border-gray-400 p-1">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
