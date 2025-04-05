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
  verifyPaymentLoading: false,
  verifyPaymentSuccess: false,
  verifyPaymentError: null,
  getOrdersLoading: false,
  getOrderLoading: false,
  updateOrderLoading: false,
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

export const verifyPayment = createAsyncThunk(
  "order/verifyPayment",
  async ({ orderId, session_id }, { rejectWithValue }) => {
    try {
      const response = await api.post("/verify-stripe", {
        orderId,
        session_id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Verify payment failed"
      );
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Get orders failed"
      );
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Get order failed");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/${orderId}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Update order status failed"
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
        console.log(action.payload);
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
      })
      .addCase(verifyPayment.pending, (state) => {
        state.verifyPaymentLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verifyPaymentLoading = false;
        state.order = action.payload.order;
        state.verifyPaymentSuccess = true;
        toast.success("Payment verified");
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifyPaymentLoading = false;
        state.verifyPaymentError = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllOrders.pending, (state) => {
        state.getOrdersLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.getOrdersLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.getOrdersLoading = false;
        toast.error(action.payload);
      })
      .addCase(getOrderById.pending, (state) => {
        state.getOrderLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.getOrderLoading = false;
        state.order = action.payload.order;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.getOrderLoading = false;
        toast.error(action.payload);
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateOrderLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateOrderLoading = false;
        state.order = action.payload.order;
        // Update orders array if exists
        const index = state.orders.findIndex(
          (o) => o._id === action.payload.order._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }
        // Update userOrders array if exists
        const userIndex = state.userOrders.findIndex(
          (o) => o._id === action.payload.order._id
        );
        if (userIndex !== -1) {
          state.userOrders[userIndex] = action.payload.order;
        }
        toast.success("Order status updated");
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateOrderLoading = false;
        toast.error(action.payload);
      });
  },
});

export default orderSlice.reducer;
