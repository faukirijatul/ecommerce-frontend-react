import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { AiOutlineDelete } from "react-icons/ai";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartData, setCartData, currency } = useContext(ShopContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify(cartData));
    }
  }, [cartData]);

  const increaseQuantity = (productId, size) => {
    setCartData((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId, size) => {
    setCartData((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === productId && item.size === size && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDelete = (id, size) => {
    const filtered = cartData.filter(
      (product) => !(product._id === id && product.size === size)
    );
    setCartData(filtered);
    if (localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify(filtered));
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((product) => (
          <div
            key={product._id + product.size}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
          >
            <div className="flex items-start gap-6">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-166 sm:w-20"
              />
              <div>
                <p
                  className="text-xs sm:text-lg font-medium line-clamp-2"
                  title={product.name}
                >
                  {product.name}
                </p>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency} {product.price.toLocaleString("id-ID")}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {product.size}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="flex gap-2">
                <button
                  className="border border-gray-700 py-1 px-3 active:bg-gray-200"
                  onClick={() => {
                    if (product.quantity > 1) {
                      decreaseQuantity(product._id, product.size);
                    }
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="border border-gray-700 py-1 px-1 w-12 text-center outline-none no-spinner"
                  value={product.quantity}
                  readOnly
                />
                <button
                  className="border border-gray-700 py-1 px-3 active:bg-gray-200"
                  onClick={() => increaseQuantity(product._id, product.size)}
                >
                  +
                </button>
              </div>
              <p className="font-semibold">
                {currency}{" "}
                {(product.price * product.quantity).toLocaleString("id")}
              </p>
            </div>
            <AiOutlineDelete
              className="text-2xl hover:text-red-400 cursor-pointer"
              onClick={() => handleDelete(product._id, product.size)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="mt-10 flex justify-end">
            <button
              className={`bg-gray-700 active:bg-gray-900 text-white py-2 px-4`}
              onClick={() => navigate("/place-order")}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
