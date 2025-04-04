import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../../context/ShopContext";
import { FaChevronDown } from "react-icons/fa";
import Title from "../../components/Title";
import ProductItem from "../../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/slices/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { ShopContext } from "../../context/ShopContext";
import ProductItemSkeleton from "../../components/ProductItemSkeleton";

const Collection = () => {
  const dispatch = useDispatch();
  const { products, getAllProductsLoading } = useSelector(
    (state) => state.product
  );
  const { search: contextSearch, setSearch: setContextSearch } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract query parameters or use defaults
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.getAll("category") || [],
    subCategory: searchParams.getAll("subCategory") || [],
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
    page: parseInt(searchParams.get("page") || "1"),
    limit: parseInt(searchParams.get("limit") || "40"),
  });

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    if (searchFromUrl !== filters.search) {
      setFilters((prev) => ({ ...prev, search: searchFromUrl, page: 1 }));
    }
    if (searchFromUrl !== contextSearch) {
      setContextSearch(searchFromUrl);
    }
  }, [
    location.search,
    contextSearch,
    setContextSearch,
    searchParams,
    filters.search,
  ]);

  // Fetch products when filters change
  useEffect(() => {
    dispatch(getAllProducts(filters));
  }, [dispatch, filters]);

  // Update filtered products when products change
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const updateUrlQuery = (newFilters) => {
    const queryParams = new URLSearchParams();

    if (newFilters.search) {
      queryParams.set("search", newFilters.search);
    }
    newFilters.category.forEach((cat) => queryParams.append("category", cat));
    newFilters.subCategory.forEach((subCat) =>
      queryParams.append("subCategory", subCat)
    );
    if (newFilters.sortBy !== "createdAt")
      queryParams.set("sortBy", newFilters.sortBy);
    if (newFilters.sortOrder !== "desc")
      queryParams.set("sortOrder", newFilters.sortOrder);
    if (newFilters.page !== 1) queryParams.set("page", newFilters.page);
    if (newFilters.limit !== 40) queryParams.set("limit", newFilters.limit);

    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const handleCategory = (cat) => {
    const newCategories = filters.category.includes(cat)
      ? filters.category.filter((c) => c !== cat)
      : [...filters.category, cat];

    const newFilters = { ...filters, category: newCategories, page: 1 };
    setFilters(newFilters);
    updateUrlQuery(newFilters);
  };

  const handleSubCategory = (subCat) => {
    const newSubCategories = filters.subCategory.includes(subCat)
      ? filters.subCategory.filter((c) => c !== subCat)
      : [...filters.subCategory, subCat];

    const newFilters = { ...filters, subCategory: newSubCategories, page: 1 };
    setFilters(newFilters);
    updateUrlQuery(newFilters);
  };

  const handleSort = (sortType) => {
    let sortBy = "createdAt";
    let sortOrder = "desc";

    switch (sortType) {
      case "name-asc":
        sortBy = "name";
        sortOrder = "asc";
        break;
      case "name-desc":
        sortBy = "name";
        sortOrder = "desc";
        break;
      case "price-asc":
        sortBy = "price";
        sortOrder = "asc";
        break;
      case "price-desc":
        sortBy = "price";
        sortOrder = "desc";
        break;
      case "sold-asc":
        sortBy = "sold";
        sortOrder = "asc";
        break;
      case "sold-desc":
        sortBy = "sold";
        sortOrder = "desc";
        break;
      case "createdAt-desc":
        sortBy = "createdAt";
        sortOrder = "desc";
        break;
      case "createdAt-asc":
        sortBy = "createdAt";
        sortOrder = "asc";
        break;
    }

    const newFilters = { ...filters, sortBy, sortOrder, page: 1 };
    setFilters(newFilters);
    updateUrlQuery(newFilters);
  };

  // Pagination handler
  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    updateUrlQuery(newFilters);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t min-h-[80vh]">
      {/* Filter Options */}
      <div className="min-w-[200px]">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <span>Filters</span>
          <FaChevronDown
            className={`${
              showFilter ? "rotate-180" : ""
            } text-[0.9rem] transition-all duration-300 ease-in-out inline-block sm:hidden`}
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Men"}
                id="Men"
                checked={filters.category.includes("Men")}
                onChange={() => handleCategory("Men")}
              />
              <label htmlFor="Men" className="cursor-pointer">
                Men
              </label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Women"}
                id="Women"
                checked={filters.category.includes("Women")}
                onChange={() => handleCategory("Women")}
              />
              <label htmlFor="Women" className="cursor-pointer">
                Women
              </label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Kids"}
                id="Kids"
                checked={filters.category.includes("Kids")}
                onChange={() => handleCategory("Kids")}
              />
              <label htmlFor="Kids" className="cursor-pointer">
                Kids
              </label>
            </p>
          </div>
        </div>

        {/* Sub Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Topwear"}
                id="Topwear"
                checked={filters.subCategory.includes("Topwear")}
                onChange={() => handleSubCategory("Topwear")}
              />
              <label htmlFor="Topwear" className="cursor-pointer">
                Topwear
              </label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Bottomwear"}
                id="Bottomwear"
                checked={filters.subCategory.includes("Bottomwear")}
                onChange={() => handleSubCategory("Bottomwear")}
              />
              <label htmlFor="Bottomwear" className="cursor-pointer">
                Bottomwear
              </label>
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Winterwear"}
                id="Winterwear"
                checked={filters.subCategory.includes("Winterwear")}
                onChange={() => handleSubCategory("Winterwear")}
              />
              <label htmlFor="Winterwear" className="cursor-pointer">
                Winterwear
              </label>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Sorter */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="createdAt-desc">Default</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sold-asc">Sold: Low to High</option>
            <option value="sold-desc">Sold: High to Low</option>
            <option value="createdAt-desc">Latest</option>
            <option value="createdAt-asc">Oldest</option>
          </select>
        </div>
        {/* Products */}{" "}
        {getAllProductsLoading ? (
          <ProductItemSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductItem
                key={product._id}
                productId={product._id}
                image={product.image[0]?.url}
                name={product.name}
                price={product.price}
                sold={product.sold}
              />
            ))}
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {/* Previous Page Button */}
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="mx-2 px-4 py-2 border rounded disabled:opacity-50"
          >
            <MdNavigateBefore />
          </button>

          {/* Page Numbers */}
          {[...Array(products.totalPages || 0)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 border rounded ${
                filters.page === index + 1 ? "bg-black text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Page Button */}
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === (products.totalPages || 1)}
            className="mx-2 px-4 py-2 border rounded disabled:opacity-50"
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collection;
