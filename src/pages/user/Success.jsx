import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const orderId = searchParams.get("orderId");
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/order/verify-stripe`,
          { orderId, session_id },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("error");
      }
    };

    if (orderId) {
      verifyPayment();
    } else {
      setStatus("error");
    }
  }, [orderId, session_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Loading State */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-violet-200 rounded-full animate-spin border-t-violet-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-violet-200 rounded-full animate-spin animate-reverse border-t-violet-400"></div>
              </div>
            </div>
            <p className="text-lg font-medium text-gray-600 animate-pulse">
              Verifying your payment...
            </p>
          </div>
        )}

        {/* Success State */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <div className="relative">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-500 animate-check"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="absolute inset-0 animate-pulse-ring w-20 h-20 rounded-full border-4 border-green-300"></div>
            </div>
            <h1 className="text-2xl font-semibold text-green-600">
              Payment Successful!
            </h1>
            <p className="text-gray-600 max-w-md">
              Your order (ID: {orderId}) has been successfully verified. Thank
              you for your purchase!
            </p>
            <Link
              to="/orders"
              className="mt-4 inline-block border border-gray-400 py-2 px-4 hover:bg-gray-100 rounded transition duration-300"
            >
              View Orders
            </Link>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <div className="relative">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-500 animate-xmark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div className="absolute inset-0 animate-pulse-ring w-20 h-20 rounded-full border-4 border-red-300"></div>
            </div>
            <h1 className="text-2xl font-semibold text-red-600">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 max-w-md">
              There was an issue verifying your payment
              {orderId ? ` (Order ID: ${orderId})` : ""}. Please contact support
              if this persists.
            </p>
            <Link
              to="/cart"
              className="mt-4 inline-block border border-gray-400 py-2 px-4 hover:bg-gray-100 rounded transition duration-300"
            >
              Back to Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
