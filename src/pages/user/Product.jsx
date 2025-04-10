import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import RelatedProducts from "../../components/RelatedProducts";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/slices/productSlice";
import { addToCart, addToLocalCart } from "../../redux/slices/cartSlice";
import ProductSkeleton from "../../components/ProductSkeleton";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, getProductLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const { currency } = useContext(ShopContext);
  const [image, setImage] = useState("");
  const [size, setSize] = useState({
    size: "",
    quantity: 0,
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProduct(productId)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setImage(result.payload.product.image[0].url);
      }
    });
  }, [productId, dispatch]);

  const handleAddToCart = async () => {
    // Validate size selection
    if (!size.size) {
      toast.error("Please select a size");
      return;
    }

    // Validate quantity
    if (quantity > size.quantity) {
      toast.error("Out of Stock");
      return;
    }

    if (user) {
      const result = await dispatch(
        addToCart({ productId, size: size.size, quantity: Number(quantity) })
      );
      if (addToCart.rejected.match(result)) {
        toast.error(result.payload?.message || "Failed to add to cart");
      } else {
        toast.success("Product added to cart");
      }
    } else {
      dispatch(
        addToLocalCart({
          product: { ...product },
          size: size.size,
          quantity: Number(quantity),
        })
      );
      toast.success("Product added to cart");
    }
  };

  return (
    <div>
      {getProductLoading ? (
        <ProductSkeleton />
      ) : (
        product && (
          <div className="border-t pt-10">
            <div className="flex gap-5 md:gap-12 flex-col sm:flex-row">
              {/* product images */}
              <div className="w-full sm:w-1/2">
                <img
                  src={image}
                  alt="product"
                  className="w-full object-cover border"
                />
                <div className="grid grid-cols-5 gap-1 mt-5 w-full">
                  {product.image.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt="product"
                      className={`object-cover border border-gray-300 cursor-pointer ${
                        img.url === image ? "border-2 border-gray-700" : ""
                      }`}
                      onClick={() => setImage(img.url)}
                    />
                  ))}
                </div>
              </div>

              {/* product details */}
              <div className="w-full sm:w-1/2">
                <h1 className="text-xl font-semibold">{product.name}</h1>
                <p className="text-2xl font-bold mt-2 p-2 py-2 bg-gray-50">
                  {currency} {product.price.toLocaleString("id-ID")}
                </p>
                <div className="flex flex-col gap-2 my-8">
                  <p>Select Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((item) => (
                      <div
                        key={item.size}
                        className="flex flex-col items-center gap-1"
                      >
                        <button
                          className={`border border-gray-700 py-1 px-3 ${
                            item.size === size.size
                              ? "bg-gray-700 text-white"
                              : ""
                          }`}
                          onClick={() => setSize(item)}
                        >
                          {item.size}
                        </button>
                        <p className="text-xs">{item.quantity}pcs</p>
                      </div>
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
                        if (!size.size) {
                          toast.error("Please select a size");
                          return;
                        }
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
                      max={size?.quantity}
                      onChange={(e) => {
                        if (!size.size) {
                          toast.error("Please select a size");
                          return;
                        }
                        if (Number(e.target.value) > size.quantity) {
                          toast.error("Not enough stock");
                        } else {
                          setQuantity(e.target.value);
                        }
                      }}
                    />
                    <button
                      className="border border-gray-700 py-1 px-3 active:bg-gray-200"
                      onClick={() => {
                        if (!size.size) {
                          toast.error("Please select a size");
                          return;
                        }
                        if (quantity < size.quantity) {
                          setQuantity(Number(quantity) + 1);
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* add to cart */}
                <div className="flex gap-3">
                  <button
                    className={`bg-gray-700 active:bg-gray-900 text-white py-2 px-4 ${
                      !size.size || !quantity
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handleAddToCart}
                    disabled={!size.size || !quantity}
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

            {/* related products */}

            <RelatedProducts
              category={product.category}
              subCategory={product.subCategory}
              productId={productId}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Product;
