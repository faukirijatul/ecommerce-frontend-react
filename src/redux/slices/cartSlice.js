import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "./userSlice";
import { createOrder, verifyPayment } from "./orderSlice";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/cart`,
  withCredentials: true,
});

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  addToCartLoading: false,
  addToCartError: null,
  bulkAddToCartLoading: false,
  bulkAddToCartError: null,
  getCartLoading: false,
  getCartError: null,
  updateCartItemLoading: false,
  updateCartItemError: null,
  removeFromCartLoading: false,
  removeFromCartError: null,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/add", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Add to cart failed"
      );
    }
  }
);

export const bulkAddToCart = createAsyncThunk(
  "cart/bulkAddToCart",
  async (products, { rejectWithValue }) => {
    try {
      const response = await api.post("/bulk-add", { products });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Bulk add to cart failed"
      );
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Get cart failed");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (item, { rejectWithValue }) => {
    try {
      const response = await api.put("/update", item);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Update cart item failed"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/remove/${productId}/${size}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Remove from cart failed"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToLocalCart: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item._id === action.payload.product._id &&
          item.size === action.payload.product.size &&
          item.name === action.payload.product.name
      );
      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateLocalCart: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === productId && item.size === size
      );
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    removeFromLocalCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product._id === productId && item.size === size)
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearLocalCart: (state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.addToCartLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addToCartLoading = false;
        state.items = action.payload.cart.products;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.addToCartLoading = false;
        state.addToCartError = action.payload || "Failed to add to cart";
      })
      .addCase(bulkAddToCart.pending, (state) => {
        state.bulkAddToCartLoading = true;
      })
      .addCase(bulkAddToCart.fulfilled, (state, action) => {
        state.bulkAddToCartLoading = false;
        state.items = action.payload.cart.products || [];
        localStorage.removeItem("cartItems");
      })
      .addCase(bulkAddToCart.rejected, (state, action) => {
        state.bulkAddToCartLoading = false;
        state.bulkAddToCartError = action.payload || "Failed to sync cart";
      })
      .addCase(getCart.pending, (state) => {
        state.getCartLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.getCartLoading = false;
        state.items = action.payload.cart.products || [];
      })
      .addCase(getCart.rejected, (state, action) => {
        state.getCartLoading = false;
        state.getCartError = action.payload || "Failed to get cart";
      })
      .addCase(updateCartItem.pending, (state) => {
        state.updateCartItemLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.updateCartItemLoading = false;
        state.items = action.payload.cart.products || [];
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.updateCartItemLoading = false;
        state.updateCartItemError = action.payload || "Failed to update cart";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.removeFromCartLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.removeFromCartLoading = false;
        state.items = action.payload.cart.products || [];
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.removeFromCartLoading = false;
        state.removeFromCartError = action.payload || "Failed to remove from cart";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const {
  addToLocalCart,
  updateLocalCart,
  removeFromLocalCart,
  clearLocalCart,
} = cartSlice.actions;
export default cartSlice.reducer;
