import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartReducer,
  },
});

export default store;
