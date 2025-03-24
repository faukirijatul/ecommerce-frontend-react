import { products } from "../assets/products";
import { ShopContext } from "./ShopContext";

export const ShopeContextProvider = ({ children }) => {
  const currency = "Rp.";
  const deliveryFee = 10000;
  const value = {
    products,
    currency,
    deliveryFee,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
