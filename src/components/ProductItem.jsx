import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { moveToTop } from "../lib/moveToTop";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteConfirmation from "./admin/DeleteConfirmation";
import { deleteProduct } from "../redux/slices/productSlice";

const ProductItem = ({ productId, image, name, price, sold }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { deleteProductLoading } = useSelector((state) => state.product);

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
  };
  return (
    <>
      <div
        className="text-gray-700 border bg-white cursor-pointer"
        onClick={() => {
          navigate(`/product/${productId}`);
          moveToTop();
        }}
      >
        <div className="overflow-hidden">
          <img
            src={image}
            alt={name}
            className="hover:scale-110 transition ease-in-out"
          />
        </div>
        <div className="p-2 min-h-[90px] flex flex-col justify-between">
          <p className="line-clamp-2 text-base leading-5 font-medium">{name}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {currency} {price.toLocaleString("id")}
            </p>
            <p className="text-gray-500 text-xs">Sold: {sold}x</p>
          </div>
        </div>
        {user && user.role === "admin" && (
          <div className="flex">
            <div
              className="flex items-center justify-center gap-1 w-full border-t border-r py-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/create/${productId}`);
              }}
            >
              <FaEdit className="text-blue-500" /> Edit
            </div>
            <div
              className="flex items-center justify-center gap-1 w-full border-t py-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
            >
              <FaTrash className="text-red-500" /> Delete
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <DeleteConfirmation
          productId={productId}
          productName={name}
          onConfirm={handleDelete}
          onCancel={() => setModalOpen(false)}
          isLoading={deleteProductLoading}
        />
      )}
    </>
  );
};

export default ProductItem;
