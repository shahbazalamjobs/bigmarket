import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory as fetchProductsByCategoryAPI,
} from "./productsAPI";

const initialState = {
  // All products fetched once
  allProducts: [],
  categoryProducts: [],
  categories: [],
  selectedProduct: null,

  // Filters
  selectedCategory: "all",
  searchQuery: "",
  sortBy: "default",
  minPrice: "",
  maxPrice: "",
  minRating: 0,

  // Pagination
  currentPage: 1,
  limit: 12,

  isLoading: false,
  error: null,
};

// Fetch all products once
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const data = await fetchProducts(1, 500);

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

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async ({ category, page = 1, limit = 12 }, thunkAPI) => {
    try {
      const data = await fetchProductsByCategoryAPI(category, page, limit);

      return data;
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
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },

    setSortBy(state, action) {
      state.sortBy = action.payload;
    },

    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },

    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },

    setMinRating(state, action) {
      state.minRating = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    clearProducts(state) {
      state.allProducts = [];
    },

    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // -----------------------------
    // Fetch All Products
    // -----------------------------

    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })

      .addCase(getAllProducts.rejected, (state, action) => {
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

    builder

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        state.categoryProducts = action.payload.products;
      })

      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

export const {
  clearProducts,
  clearSelectedProduct,
  clearError,
  setSelectedCategory,
  setSortBy,
  setMinPrice,
  setMaxPrice,
  setMinRating,
  setCurrentPage,
  setSearchQuery,
} = productsSlice.actions;

export default productsSlice.reducer;
