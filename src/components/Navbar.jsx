import React, { useContext, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSearch, showSearch, setShowSearch, cartData } =
    useContext(ShopContext);

  const cartCount = cartData
    ?.map((item) => item.quantity)
    .reduce((acc, curr) => acc + curr, 0);
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/" className="text-2xl">
        Tokobaju
      </Link>

      <ul className="hidden sm:flex gap-5 text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-5">
        <IoSearchOutline
          className="text-2xl cursor-pointer"
          onClick={() => {
            setShowSearch(!showSearch);
            setSearch("");
          }}
        />
        <div className="group relative">
          <FaRegUserCircle className="text-2xl" />
          {/* menu dropdown on hover */}
          <div className="absolute hidden group-hover:block right-0 pt-3">
            <div className="flex flex-col gap-2 w-36 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="py-3 cursor-pointer hover:text-black">Profile</p>
              <p className="py-3 cursor-pointer hover:text-black">Orders</p>
              <p className="py-3 cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <IoCartOutline className="text-2xl" />
          <span className="absolute leading-4 bottom-[-5px] right-[-5px] text-[8px] bg-black text-white text-center aspect-square w-4 rounded-full">
            {cartCount || 0}
          </span>
        </Link>

        <IoIosMenu
          className="text-2xl sm:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      <div
        className={`absolute top-0 left-0 bottom-0 overflow-hidden bg-white transition-all ${
          menuOpen ? "w-full" : "w-0"
        }`}
      >
        {/* close */}
        <div
          className="absolute top-5 left-5 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          <IoMdClose className="text-2xl" />
        </div>

        <div className="flex flex-col gap-10 items-center justify-center h-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-gray-700 underline" : ""
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-gray-700 underline" : ""
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-gray-700 underline" : ""
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-gray-700 underline" : ""
              }`
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
