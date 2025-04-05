import React, { useContext, useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSearch, showSearch, setShowSearch, cartData } = useContext(ShopContext);
  const dispatch = useDispatch();
  const { user, logoutLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const cartCount = cartData
    ?.map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/" className="text-2xl md:text-3xl font-bold">
        Tokobaju
      </Link>

      <ul className="hidden sm:flex gap-6 md:gap-8 text-gray-600">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `relative text-sm md:text-base font-medium hover:text-violet-600 transition duration-300 ${isActive ? 'text-violet-600' : ''}`
          }
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-violet-600 transition-all duration-300 hover:w-full"></span>
        </NavLink>
        <NavLink 
          to="/collection" 
          className={({ isActive }) => 
            `relative text-sm md:text-base font-medium hover:text-violet-600 transition duration-300 ${isActive ? 'text-violet-600' : ''}`
          }
        >
          Collection
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-violet-600 transition-all duration-300 hover:w-full"></span>
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `relative text-sm md:text-base font-medium hover:text-violet-600 transition duration-300 ${isActive ? 'text-violet-600' : ''}`
          }
        >
          About
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-violet-600 transition-all duration-300 hover:w-full"></span>
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `relative text-sm md:text-base font-medium hover:text-violet-600 transition duration-300 ${isActive ? 'text-violet-600' : ''}`
          }
        >
          Contact
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-violet-600 transition-all duration-300 hover:w-full"></span>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 md:gap-6">
        <IoSearchOutline
          className="text-xl md:text-2xl cursor-pointer text-gray-600 hover:text-gray-900 transition duration-300"
          onClick={() => {
            setShowSearch(!showSearch);
            setSearch("");
          }}
        />

        <Link to="/cart" className="relative group">
          <IoCartOutline className="text-xl md:text-2xl text-gray-600 group-hover:text-gray-900 transition duration-300" />
          <span className="absolute leading-4 bottom-[-5px] right-[-5px] text-[8px] bg-gray-800 text-white text-center aspect-square w-4 rounded-full">
            {cartCount || 0}
          </span>
        </Link>

        {!user ? (
          <Link to={`/login?redirect=${pathname}`}>
            <button className="bg-gray-900 text-white px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium hover:bg-gray-800 transition duration-300">
              Login
            </button>
          </Link>
        ) : (
          <div className="group relative cursor-pointer">
            <div className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition duration-300">
              <CiUser className="text-xl md:text-2xl" />
              <span className="hidden sm:block text-sm md:text-base font-medium">
                Hi, {user.name.split(" ")[0]}
              </span>
            </div>
            <div className="absolute hidden group-hover:block right-0 pt-3 z-20">
              <div className="flex flex-col gap-2 w-36 px-5 bg-white shadow-lg text-gray-600 rounded-lg py-3 border border-gray-200">
                <p className="py-1 text-sm hover:text-violet-600 transition duration-300 cursor-pointer" onClick={() => navigate("/profile")}>
                  Profile
                </p>
                {user?.role === "admin" ? (
                  <p className="py-1 text-sm hover:text-violet-600 transition duration-300 cursor-pointer" onClick={() => navigate("/admin/orders")}>
                    Admin Panel
                  </p>
                ) : (
                  <p className="py-1 text-sm hover:text-violet-600 transition duration-300 cursor-pointer" onClick={() => navigate("/orders")}>
                    Orders
                  </p>
                )}
                <p
                  className="py-1 text-sm hover:text-violet-600 transition duration-300 cursor-pointer"
                  onClick={handleLogout}
                >
                  {logoutLoading ? "Loading..." : "Logout"}
                </p>
              </div>
            </div>
          </div>
        )}

        <IoIosMenu
          className="text-xl md:text-2xl sm:hidden cursor-pointer text-gray-600 hover:text-violet-600 transition duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      <div
        className={`absolute top-0 left-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-50 shadow-lg ${
          menuOpen ? "w-full" : "w-0"
        }`}
      >
        <div
          className="absolute top-5 left-5 cursor-pointer text-gray-600 hover:text-violet-600 transition duration-300"
          onClick={() => setMenuOpen(false)}
        >
          <IoMdClose className="text-2xl" />
        </div>

        <div className="flex flex-col gap-8 items-center justify-center h-full text-gray-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-violet-600" : "hover:text-violet-600"} transition duration-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-violet-600" : "hover:text-violet-600"} transition duration-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-violet-600" : "hover:text-violet-600"} transition duration-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? "text-violet-600" : "hover:text-violet-600"} transition duration-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;