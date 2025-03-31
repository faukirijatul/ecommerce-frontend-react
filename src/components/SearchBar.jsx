import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const {
    showSearch,
    setShowSearch,
    search: contextSearch,
    setSearch: setContextSearch,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Local state for input to allow typing
  const [localSearch, setLocalSearch] = useState(contextSearch || "");

  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    if (searchFromUrl !== contextSearch) {
      setContextSearch(searchFromUrl);
      setLocalSearch(searchFromUrl);
    }
  }, [location.search, contextSearch]);

  const handleSearchChange = (value) => {
    setLocalSearch(value);
  };

  const handleSearch = () => {
    const trimmedSearch = localSearch.trim();
    if (trimmedSearch) {
      // Update context search
      setContextSearch(trimmedSearch);

      // If we're not on the collection page, navigate there
      if (!location.pathname.includes("/collection")) {
        navigate(`/collection?search=${encodeURIComponent(trimmedSearch)}`);
        return;
      }

      // If already on collection page, just update the search params
      const params = new URLSearchParams(location.search);
      params.set("search", trimmedSearch);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  };

  const handleClear = () => {
    setShowSearch(false);
    setLocalSearch("");
    setContextSearch("");

    // Create a new URLSearchParams object
    const params = new URLSearchParams(location.search);
    params.delete("search");
    // If we're on the collection page, update URL
    if (location.pathname.includes("/collection")) {
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  };

  return (
    showSearch && (
      <div className="flex items-center justify-center border-t border-b bg-gray-50 text-center py-3">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none bg-inherit text-sm"
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <IoSearchOutline
            className="text-2xl cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <IoMdClose className="text-2xl cursor-pointer" onClick={handleClear} />
      </div>
    )
  );
};

export default SearchBar;
