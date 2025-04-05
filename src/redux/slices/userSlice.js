import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/users`,
  withCredentials: true,
});

const initialState = {
  user: null,
  isAuthenticated: true,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  getUserLoading: false,
  getUserError: null,
  logoutLoading: false,
  logoutError: null,
  updateUserLoading: false,
  updateUserError: null,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Register failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Get user failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Logout failed");
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put("/profile", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Update user failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
        state.registerError = null;
        toast.success("User registered successfully");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = null;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        toast.success("Login successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUser.pending, (state) => {
        state.getUserLoading = true;
        state.getUserError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = null;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutError = null;
        state.isAuthenticated = false;
        state.user = null;
        toast.success("User logged out successfully");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
        state.updateUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserError = null;
        state.user = action.payload.user;
        toast.success("Profile updated successfully");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserError = action.payload;
        toast.error(action.payload);
      });
  },
});

export default authSlice.reducer;
