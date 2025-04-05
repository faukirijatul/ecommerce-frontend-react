import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";
import { CiUser } from "react-icons/ci";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const { user, logoutLoading } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="flex items-center justify-between py-3 px-[4%] font-medium">
      <Link to="/" className="text-2xl">
        Tokobaju
      </Link>

      <div className="group relative cursor-pointer">
        <div className="flex items-center gap-2">
          <CiUser className="text-2xl" />
          <span className="hidden sm:block">Hi, {user?.name.split(" ")[0]}</span>
        </div>
        {/* menu dropdown on hover */}
        <div className="absolute hidden group-hover:block right-0 pt-3">
          <div className="flex flex-col gap-2 w-36 px-5 bg-slate-100 text-gray-500 rounded py-1 border">
            <Link to="/admin/profile" className="py-1 cursor-pointer hover:text-black">Profile</Link>
            <p
              className="py-1 cursor-pointer hover:text-black"
              onClick={handleLogout}
            >
              {logoutLoading ? "Loading..." : "Logout"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
