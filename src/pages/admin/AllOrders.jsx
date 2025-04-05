import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { getAllOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import { moveToTop } from "../../lib/moveToTop";
import Title from "../../components/Title";
import OrdersSkeleton from "../../components/OrdersSkeleton";

const AllOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getOrdersLoading, orders } = useSelector((state) => state.order);
  const { currency } = useContext(ShopContext);

  // State untuk filter, sort, dan pagination
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const limit = 10;

  const validStatuses = [
    "Unpaid",
    "Placed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  // Ambil parameter dari URL saat pertama kali load
  useEffect(() => {
    const params = {
      page: parseInt(searchParams.get("page")) || 1,
      status: searchParams.get("status") || "",
      paymentMethod: searchParams.get("paymentMethod") || "",
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: searchParams.get("sortOrder") || "desc",
    };
    setPage(params.page);
    setFilterStatus(params.status);
    setFilterPaymentMethod(params.paymentMethod);
    setSortBy(params.sortBy);
    setSortOrder(params.sortOrder);
    fetchOrders(params);
  }, [searchParams]);

  const fetchOrders = (params) => {
    dispatch(
      getAllOrders({
        page: params.page,
        limit,
        status: params.status,
        paymentMethod: params.paymentMethod,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      })
    );
  };

  const handleFilterSort = () => {
    const params = {
      page: 1,
      status: filterStatus,
      paymentMethod: filterPaymentMethod,
      sortBy,
      sortOrder,
    };
    setPage(1);
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = {
      page: newPage,
      status: filterStatus,
      paymentMethod: filterPaymentMethod,
      sortBy,
      sortOrder,
    };
    setPage(newPage);
    setSearchParams(params);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm");
    } catch (error) {
      console.log(error);
      return dateString;
    }
  };

  const totalPages = orders?.pages || 1;

  if (getOrdersLoading) {
    return (
      <div className="border-t pt-16 min-h-[60vh]">
        <div className="text-2xl mb-6">
          <Title text1="ALL" text2="ORDERS" />
        </div>
        <OrdersSkeleton />
      </div>
    );
  }

  return (
    <div className="border-t pt-16 min-h-[60vh]">
      <div className="text-2xl mb-6">
        <Title text1="ALL" text2="ORDERS" />
      </div>

      {/* Filter dan Sort Controls */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All Status</option>
              {validStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method
            </label>
            <select
              value={filterPaymentMethod}
              onChange={(e) => setFilterPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All Methods</option>
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="createdAt">Date Created</option>
              <option value="totalAmount">Total Amount</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sort Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleFilterSort}
          className="mt-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-900 transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Orders List */}
      {orders && orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-sm overflow-hidden"
            >
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
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Shipped"
                          ? "bg-blue-500"
                          : order.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order._id, e.target.value)
                      }
                      className="p-1 border rounded text-sm"
                    >
                      {validStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-sm">
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                    {order.payment ? " (Paid)" : " (Pending)"}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div className="flex gap-10">
                    <div>
                      <p className="text-sm font-medium mb-1">Shipping to:</p>
                      <p className="text-sm">
                        {order.deliveryData.fullName} |{" "}
                        {order.deliveryData.phone}
                      </p>
                      <p className="text-sm">{order.deliveryData.email}</p>
                      <p className="text-sm">
                        {order.deliveryData.street &&
                          order.deliveryData.street + ", "}
                        {order.deliveryData.state}, {order.deliveryData.city}
                        {order.deliveryData.zipCode &&
                          ", " + order.deliveryData.zipCode}
                      </p>
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
                        <div>
                          <p className="font-medium text-base line-clamp-2">
                            {item.product.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                            <p className="text-lg">
                              {currency}{" "}
                              {item.product.price.toLocaleString("id")}
                            </p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Size: {item.size}</p>
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
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            No Orders Found
          </h2>
          <p className="text-gray-500">No orders match your current filters.</p>
        </div>
      )}

      {/* Pagination */}
      {orders && orders.length > 0 && (
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="self-center">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
