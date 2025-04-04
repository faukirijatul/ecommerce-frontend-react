import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/order`,
  withCredentials: true,
});

const initialState = {
  orders: [],
  userOrders: [],
  order: null,
  createOrderLoading: false,
  getUserOrdersLoading: false,
};

// create order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/cod", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Create order failed"
      );
    }
  }
);

export const createOrderStripe = createAsyncThunk(
  "order/createOrderStripe",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/stripe", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Create order failed"
      );
    }
  }
);

// get user orders
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user-orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Get user orders failed"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.createOrderLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderLoading = false;
        state.orders.push(action.payload.order);
        toast.success("Order placed");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderLoading = false;
        toast.error(action.payload);
      })
      .addCase(createOrderStripe.pending, (state) => {
        state.createOrderLoading = true;
      })
      .addCase(createOrderStripe.fulfilled, (state, action) => {
        state.createOrderLoading = false;
        console.log(action.payload)
        window.location.replace(action.payload.url);
      })
      .addCase(createOrderStripe.rejected, (state, action) => {
        state.createOrderLoading = false;
        toast.error(action.payload);
      })
      .addCase(getUserOrders.pending, (state) => {
        state.getUserOrdersLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.getUserOrdersLoading = false;
          state.userOrders = action.payload.orders;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.getUserOrdersLoading = false;
        toast.error(action.payload);
      });
  },
});

export default orderSlice.reducer;
