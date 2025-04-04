import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../redux/slices/orderSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { moveToTop } from "../../lib/moveToTop";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUserOrdersLoading, userOrders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const { currency } = useContext(ShopContext);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm");
    } catch (error) {
      console.log(error);
      return dateString;
    }
  };

  return (
    <div className="border-t pt-16 min-h-[60vh]">
      <div className="text-2xl">
        <Title text1="YOUR" text2="ORDERS" />
      </div>

      {getUserOrdersLoading ? (
        <div className="text-center py-10">Loading your orders...</div>
      ) : userOrders && userOrders.length > 0 ? (
        <div className="space-y-8">
          {userOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order header */}
              <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <p className="font-medium">
                    Order #{order._id.substring(order._id.length - 8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on: {formatDate(order.createdAt)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last updated: {formatDate(order.updatedAt)}
                  </p>
                </div>
                <div className="flex flex-col md:items-end">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Shipped"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <p className="text-sm md:text-base">{order.status}</p>
                  </div>
                  <p className="text-sm">
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                    {order.payment ? " (Paid)" : " (Pending)"}
                  </p>
                </div>
              </div>

              {/* Order details */}
              <div className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="flex gap-10">
                    <div>
                      <p className="text-sm font-medium mb-1">Shipping to:</p>
                      <p className="text-sm">{order.deliveryData.fullName}</p>
                      <p className="text-sm">{order.deliveryData.city}</p>
                    </div>

                    <button className="border border-gray-400 p-2 h-fit text-sm rounded hover:bg-gray-50 transition">
                      Track Order
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Order Summary:</p>
                    <p className="text-sm">
                      Subtotal: {currency} {order.amount.toLocaleString("id")}
                    </p>
                    <p className="text-sm">
                      Shipping: {currency}{" "}
                      {order.deliveryFee.toLocaleString("id")}
                    </p>
                    <p className="text-sm font-medium">
                      Total: {currency} {order.totalAmount.toLocaleString("id")}
                    </p>
                  </div>
                </div>

                {/* Products */}
                <div className="border-t pt-4">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="py-4 border-b last:border-b-0 text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                    >
                      <div className="flex items-center gap-6 text-sm flex-1">
                        <img
                          src={item.product.image[0].url}
                          alt={item.product.name}
                          className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded"
                        />
                        <div className="">
                          <p className="font-medium text-base line-clamp-2">
                            {item.product.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                            <p className="text-lg">
                              {currency}{" "}
                              {item.product.price.toLocaleString("id")}
                            </p>
                            <p className="">Quantity: {item.quantity}</p>
                            <p className="">Size: {item.size}</p>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/4 flex justify-end gap-2">
                        <button
                          className="border border-gray-400 p-2 text-sm rounded hover:bg-gray-50 transition"
                          onClick={() => {
                            navigate(`/product/${item.product._id}`);
                            moveToTop();
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p>You don't have any orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
