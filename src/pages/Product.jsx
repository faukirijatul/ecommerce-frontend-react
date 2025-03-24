import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();

  const { products, currency } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setImage(product.image[0]);
      setProduct(product);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    const orderItem = {
      ...product,
      size,
      quantity,
    };

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(orderItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    product && (
      <div className="border-t pt-10">
        <div className="flex gap-5 md:gap-12 flex-col sm:flex-row">
          {/* product images */}
          <div className="w-full sm:w-1/2">
            <img src={image} alt="product" className="w-full object-cover" />
            <div className="grid grid-cols-5 gap-1 mt-5 w-full">
              {product.image.map((img) => (
                <img
                  src={img}
                  alt="product"
                  className={`object-cover border border-gray-300 ${
                    img === image ? "border-2 border-gray-700" : ""
                  }`}
                  onClick={() => setImage(img)}
                />
              ))}
            </div>
          </div>

          {/* product details */}
          <div className="w-full sm:w-1/2">
            <h1 className="text-2xl font-meduim">{product.name}</h1>
            <p className="text-2xl mt-2">
              {currency} {product.price.toLocaleString("id-ID")}
            </p>
            <div className="flex flex-col gap-2 my-8">
              <p>Select Size:</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    className={`border border-gray-700 py-1 px-3 ${
                      item === size ? "bg-gray-700 text-white" : ""
                    }`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* product quantity */}
            <div className="flex flex-col gap-2 my-8">
              <p>Quantity:</p>
              <div className="flex gap-2">
                <button
                  className="border border-gray-700 py-1 px-3 active:bg-gray-200"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(Number(quantity) - 1);
                    }
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="border border-gray-700 py-1 px-1 w-12 text-center outline-none no-spinner"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button
                  className="border border-gray-700 py-1 px-3 active:bg-gray-200"
                  onClick={() => setQuantity(Number(quantity) + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* add to cart */}
            <div className="flex gap-3">
              <button
                className={`bg-gray-700 active:bg-gray-900 text-white py-2 px-4 ${
                  !size || !quantity ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleAddToCart}
                disabled={!size || !quantity}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* product description */}
        <div className="mt-10">
          <h2 className="text-2xl font-medium">Description</h2>
          <p className="mt-3 whitespace-pre-wrap">{product.description}</p>
        </div>
      </div>
    )
  );
};

export default Product;
