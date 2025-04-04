import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/Title";
import { AiOutlineDelete } from "react-icons/ai";
import CartTotal from "../../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, removeFromLocalCart, updateCartItem, updateLocalCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartData, currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const increaseQuantity = async (productId, size, currentQuantity) => {
    if (user) {
      const result = await dispatch(updateCartItem({
        productId,
        size,
        quantity: currentQuantity + 1
      }));
      if (updateCartItem.rejected.match(result)) {
        toast.error(result.payload?.message || "Failed to update quantity");
      }
    } else {
      dispatch(updateLocalCart({ productId, size, quantity: currentQuantity + 1 }));
    }
  };

  const decreaseQuantity = async (productId, size, currentQuantity) => {
    if (currentQuantity > 1) {
      if (user) {
        const result = await dispatch(updateCartItem({
          productId,
          size,
          quantity: currentQuantity - 1
        }));
        if (updateCartItem.rejected.match(result)) {
          toast.error(result.payload?.message || "Failed to update quantity");
        }
      } else {
        dispatch(updateLocalCart({ productId, size, quantity: currentQuantity - 1 }));
      }
    }
  };

  const handleDelete = async (productId, size) => {
    if (user) {
      const result = await dispatch(removeFromCart({ productId, size }));
      if (removeFromCart.rejected.match(result)) {
        toast.error(result.payload?.message || "Failed to remove item");
      } else {
        toast.success("Product removed from cart");
      }
    } else {
      dispatch(removeFromLocalCart({ productId, size }));
      toast.success("Product removed from cart");
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
            key={product.product._id + product.size}
            className="py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <div className="flex items-start gap-6">
              <img
                src={product.product.image[0].url}
                alt={product.product.name}
                className="w-16 sm:w-20 border"
              />
              <div>
                <p
                  className="text-base sm:text-lg font-medium line-clamp-2 leading-6 sm:leading-6"
                  title={product.product.name}
                >
                  {product.product.name}
                </p>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency} {product.product.price.toLocaleString("id-ID")}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {product.size}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-10">
              <div className="flex flex-col gap-1 items-center">
                <div className="flex gap-2">
                  <button
                    className="border border-gray-700 py-1 px-3 active:bg-gray-200"
                    onClick={() => {
                      if (product.quantity > 1) {
                        decreaseQuantity(product.product._id, product.size, product.quantity);
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
                    onClick={() => increaseQuantity(product.product._id, product.size, product.quantity)}
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold">
                  {currency}{" "}
                  {(product.product.price * product.quantity).toLocaleString("id")}
                </p>
              </div>
              <AiOutlineDelete
                className="text-2xl hover:text-red-400 cursor-pointer"
                onClick={() => handleDelete(product.product._id, product.size)}
              />
            </div>
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
