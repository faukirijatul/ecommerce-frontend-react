import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/products`,
  withCredentials: true,
});

const initialState = {
  products: [],
  product: null,
  createProductLoading: false,
  createProductError: null,
  getAllProductsLoading: false,
  getAllProductsError: null,
  getProductLoading: false,
  getProductError: null,
  updateProductLoading: false,
  updateProductError: null,
  deleteProductLoading: false,
  deleteProductError: null,
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("subCategory", productData.subCategory);

      formData.append("sizes", JSON.stringify(productData.sizes));

      productData.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await api.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Product creation failed"
      );
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    {
      search = "",
      category = "",
      subCategory = "",
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 40,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/", {
        params: {
          search,
          category,
          subCategory,
          sortBy,
          sortOrder,
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product retrieval failed"
      );
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product retrieval failed"
      );
    }
  }
);

// delete
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product deletion failed"
      );
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.createProductLoading = true;
        state.createProductError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductLoading = false;
        state.createProductError = null;
        state.products.push(action.payload.product);
        toast.success("Product created successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductLoading = false;
        state.createProductError = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllProducts.pending, (state) => {
        state.getAllProductsLoading = true;
        state.getAllProductsError = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.getAllProductsLoading = false;
        state.getAllProductsError = null;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.getAllProductsLoading = false;
        state.getAllProductsError = action.payload;
        toast.error(action.payload);
      })
      .addCase(getProduct.pending, (state) => {
        state.getProductLoading = true;
        state.getProductError = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProductLoading = false;
        state.getProductError = null;
        state.product = action.payload.product;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.getProductLoading = false;
        state.getProductError = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductLoading = true;
        state.deleteProductError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductError = null;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.product._id
        );
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductError = action.payload;
        toast.error(action.payload);
      });
  },
});

export default productSlice.reducer;
