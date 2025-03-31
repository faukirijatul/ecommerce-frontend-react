import React from "react";
import { NavLink } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";

const AdminSidebar = () => {
  return (
    <div className="w-[15%] min-h-[calc(100vh-55px)] border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[10%] text-[15px]">
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-all duration-300 ${
              isActive ? "bg-gray-200 text-gray-900" : ""
            }`
          }
        >
          <LiaShippingFastSolid className="text-2xl" />
          <span className="hidden md:block">Orders</span>
        </NavLink>
        <NavLink
          to="/admin/create"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-all duration-300 ${
              isActive ? "bg-gray-200 text-gray-900" : ""
            }`
          }
        >
          <IoAddCircleOutline className="text-2xl" />
          <span className="hidden md:block">Create</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-all duration-300 ${
              isActive ? "bg-gray-200 text-gray-900" : ""
            }`
          }
        >
          <AiOutlineProduct className="text-2xl" />
          <span className="hidden md:block">Products</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
