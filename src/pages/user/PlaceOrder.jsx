import React, { useContext, useState } from "react";
import Title from "../../components/Title";
import CartTotal from "../../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, createOrderStripe } from "../../redux/slices/orderSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { createOrderLoading } = useSelector((state) => state.order);
  const { cartData, deliveryFee, getAmount } = useContext(ShopContext);
  const [method, setMethod] = useState("online");
  const [deliveryData, setDeliveryData] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const amount = getAmount() || 0;

  const handleChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
  };

  const data = {
    products: cartData,
    amount,
    deliveryFee,
    totalAmount: amount + deliveryFee,
    deliveryData,
    paymentMethod: method,
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (method === "cod") {
      dispatch(createOrder(data)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/orders");
        }
      });
    } else if (method === "online") {
      dispatch(createOrderStripe(data))
    }
  };

  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATON" />
        </div>

        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={deliveryData.fullName}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={deliveryData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={deliveryData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={handleChange}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={deliveryData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={deliveryData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zip Code"
            name="zipCode"
            value={deliveryData.zipCode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full no-spinner"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={deliveryData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone Number: +62..."
          name="phone"
          value={deliveryData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full no-spinner"
          onChange={handleChange}
          required
        />
      </div>

      {/* Right */}
      <div className="mt-4">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("online")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "online" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-sm text-gray-500 font-medium mx-4">
                Online Payment
              </p>
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-sm text-gray-500 font-medium mx-4">
                Cash on Delivery
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              className={`bg-gray-700 active:bg-gray-900 text-white py-2 px-4`}
              // onClick={() => navigate("/orders")}
              onClick={handlePlaceOrder}
              disabled={createOrderLoading}
            >
              {createOrderLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
