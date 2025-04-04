import { useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";
import { useDispatch, useSelector } from "react-redux";
import { bulkAddToCart, getCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

export const ShopeContextProvider = ({ children }) => {
  const currency = "Rp.";
  const deliveryFee = 10000;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { items: cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const syncCartWithServer = async () => {
      if (user) {
        const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (localCart.length > 0) {
          // Transform local cart items to match server expected format
          const productsToSync = localCart.map(item => ({
            productId: item.product._id,
            name: item.product.name,
            size: item.size,
            quantity: item.quantity,
          }));

          try {
            const result = await dispatch(bulkAddToCart(productsToSync));
            if (bulkAddToCart.fulfilled.match(result)) {
              toast.success("Local cart synced with server");
            } else {
              toast.error(result.payload?.message || "Failed to sync cart");
            }
          } catch (error) {
            toast.error(error.response.data.message || "Failed to sync cart");
          }

          dispatch(getCart());
        } else {
          dispatch(getCart());
        }
      }
    };

    syncCartWithServer();
  }, [user, dispatch]);

  const getAmount = () => {
    return cartData.reduce((total, product) => {
      const price = product.product.price;
      return total + price * product.quantity;
    }, 0);
  };

  const value = {
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartData,
    getAmount
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
