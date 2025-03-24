import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaChevronDown } from "react-icons/fa";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("");

  const handleCategory = (e) => {
    const cat = e.target.value;

    if (category.includes(cat)) {
      setCategory(category.filter((c) => c !== cat));
    } else {
      setCategory([...category, cat]);
    }
  };

  const handleSubCategory = (e) => {
    const subCat = e.target.value;

    if (subCategory.includes(subCat)) {
      setSubCategory(subCategory.filter((c) => c !== subCat));
    } else {
      setSubCategory([...subCategory, subCat]);
    }
  };

  const handleSort = (sortType) => {
    if (sortType === "low-high") {
      setFilteredProducts(
        [...filteredProducts].sort((a, b) => a.price - b.price)
      );
    } else if (sortType === "high-low") {
      setFilteredProducts(
        [...filteredProducts].sort((a, b) => b.price - a.price)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (category.length > 0 || subCategory.length > 0) {
      setFilteredProducts(
        products.filter((product) => {
          return (
            (category.includes(product.category) || category.length === 0) &&
            (subCategory.includes(product.subCategory) ||
              subCategory.length === 0)
          );
        })
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, subCategory, products]);

  useEffect(() => {
    handleSort(sortType);
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
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
                onChange={handleCategory}
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
                onChange={handleCategory}
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
                onChange={handleCategory}
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
                onChange={handleSubCategory}
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
                onChange={handleSubCategory}
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
                onChange={handleSubCategory}
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
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort: Relevant</option>
            <option value="low-high">Sort: Low to High</option>
            <option value="high-low">Sort: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              productId={product._id}
              image={product.image[0]}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
