import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div>
        <AdminNavbar />
        <hr />
        <div className="flex w-full">
          <AdminSidebar />
          <div className="w-full m-2 sm:m-4 md:m-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
