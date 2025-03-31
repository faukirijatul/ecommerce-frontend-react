import React, { useState, useRef } from "react";
import { FaTrash, FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/slices/productSlice";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { createProductLoading } = useSelector((state) => state.product);
  const param = useParams();
  const { productId } = param;

  console.log(productId);

  const [images, setImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
  });

  const fileInputRef = useRef(null);

  // Predefined options
  const CATEGORIES = ["Men", "Women", "Kids"];
  const SUB_CATEGORIES = {
    Men: ["Topwear", "Bottomwear", "Accessories"],
    Women: ["Topwear", "Bottomwear", "Dresses", "Accessories"],
    Kids: ["Topwear", "Bottomwear", "Accessories"],
  };
  const SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  // Handle image upload
  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedImages = [...images, ...newFiles].slice(0, 5);
    setImages(updatedImages);
  };

  // Remove image
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedImage(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const updatedImages = [...images];
    const [removed] = updatedImages.splice(draggedImage, 1);
    updatedImages.splice(targetIndex, 0, removed);
    setImages(updatedImages);
    setDraggedImage(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const existingSizeIndex = prev.sizes.findIndex((s) => s.size === size);

      if (existingSizeIndex !== -1) {
        const updatedSizes = prev.sizes.filter((s) => s.size !== size);
        return { ...prev, sizes: updatedSizes };
      } else {
        const updatedSizes = [...prev.sizes, { size, quantity: 1 }];
        return { ...prev, sizes: updatedSizes };
      }
    });
  };

  const handleQuantityChange = (size, quantity) => {
    setFormData((prev) => {
      const updatedSizes = prev.sizes.map((s) =>
        s.size === size ? { ...s, quantity: parseInt(quantity) || 0 } : s
      );
      return { ...prev, sizes: updatedSizes };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Images:", images);

    const productData = {
      ...formData,
      images,
    };

    // Dispatch action to create product
    dispatch(createProduct(productData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          subCategory: "",
          sizes: [],
        });
        setImages([]);
      }
    });
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-6 text-gray-700">
        <Title text1={productId ? "UPDATE" : "CREATE"} text2={"PRODUCT"} />
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload Section */}
        <div className="border-2 border-dashed border-gray-300 p-4 bg-white">
          <div className="flex space-x-4 flex-wrap">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="w-24 h-24 relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    <FaTrash className="w-2 h-2" />
                  </button>
                </div>
                {/* Drag handle */}
                <div className="text-center text-gray-500 cursor-move flex justify-center items-center">
                  . . .
                </div>
              </div>
            ))}

            {/* Add Image Button */}
            {images.length < 5 && (
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <FaImage className="text-gray-400 text-2xl" />
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2"
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 h-32"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            required
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            disabled={!formData.category}
            required
          >
            <option value="">Select Sub Category</option>
            {formData.category &&
              SUB_CATEGORIES[formData.category].map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
          </select>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">
            Select Sizes and Quantities
          </h3>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <div key={size} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`
                    px-3 py-1 border 
                    ${
                      formData.sizes.some((s) => s.size === size)
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-700 border-gray-300"
                    }
                  `}
                >
                  {size}
                </button>
                {formData.sizes.some((s) => s.size === size) && (
                  <input
                    type="number"
                    placeholder="Qty"
                    value={
                      formData.sizes.find((s) => s.size === size)?.quantity || 0
                    }
                    onChange={(e) => handleQuantityChange(size, e.target.value)}
                    className="mt-1 w-12 border border-gray-300 p-1 text-center no-spinner"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 hover:bg-gray-800 transition-colors"
          disabled={
            createProductLoading ||
            images.length === 0 ||
            !formData.name ||
            !formData.description ||
            !formData.price ||
            !formData.category ||
            !formData.subCategory
          }
        >
          {createProductLoading ? "Creating..." : `${productId ? "Update" : "Create"} Product`}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
