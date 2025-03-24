import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/collection");
  };
  return (
    showSearch && (
      <div className="flex items-center justify-center border-t border-b bg-gray-50 text-center py-3">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none bg-inherit text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearchOutline
            className="text-2xl cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <IoMdClose
          className="text-2xl cursor-pointer"
          onClick={() => {
            setShowSearch(false);
            setSearch("");
          }}
        />
      </div>
    )
  );
};

export default SearchBar;
