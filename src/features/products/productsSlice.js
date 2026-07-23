import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
} from "./productsAPI";

const initialState = {
  products: [],
  categories: [],
  selectedProduct: null,

  isLoading: false,

  error: null,
};

// Fetch all products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const data = await fetchProducts();

      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch products",
      );
    }
  },
);

// Fetch single product
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const data = await fetchProductById(id);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch product",
      );
    }
  },
);

// Fetch categories
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async (_, thunkAPI) => {
    try {
      const data = await fetchCategories();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch categories",
      );
    }
  },
);

// Fetch products by category
export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (category, thunkAPI) => {
    try {
      const data = await fetchProductsByCategory(category);

      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch category products",
      );
    }
  },
);

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // -----------------------------
    // Fetch Products
    // -----------------------------

    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // -----------------------------
    // Fetch Product Details
    // -----------------------------

    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // -----------------------------
    // Fetch Categories
    // -----------------------------

    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // -----------------------------
    // Fetch Products by Category
    // -----------------------------

    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })

      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct, clearError } = productsSlice.actions;

export default productsSlice.reducer;
