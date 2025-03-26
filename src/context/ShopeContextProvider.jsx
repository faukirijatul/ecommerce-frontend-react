import { useState } from "react";
import { products } from "../assets/products";
import { ShopContext } from "./ShopContext";

export const ShopeContextProvider = ({ children }) => {
  const currency = "Rp.";
  const deliveryFee = 10000;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const getAmount = () => {
    let amount = 0;
    cartData.forEach((product) => {
      let totalPerItem = product.price * product.quantity;
      amount = amount + totalPerItem;
    });
    return amount;
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartData,
    setCartData,
    getAmount
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
