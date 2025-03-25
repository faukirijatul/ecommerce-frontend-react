import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = ({ getAmount }) => {
  const { currency, deliveryFee } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>
            {currency} {getAmount().toLocaleString("id") || 0}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Shipping Fee:</p>
          <p>
            {currency} {deliveryFee.toLocaleString("id") || 0}
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <p>Total:</p>
          <p>
            {currency} {((getAmount() || 0) + deliveryFee).toLocaleString("id")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
