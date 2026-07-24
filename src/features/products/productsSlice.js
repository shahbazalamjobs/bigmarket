import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategory,
  searchProducts as searchProductsAPI,
} from "./productsAPI";

const initialState = {
  allProducts: [], // Original products
  products: [], // Products displayed on Products page

  categories: [],
  selectedProduct: null,

  selectedCategory: "all",
  searchQuery: "",
  sortBy: "default",
  minPrice: "",
  maxPrice: "",
  minRating: 0,

  currentPage: 1,
  limit: 12,
  totalProducts: 0,

  isLoading: false,
  isSearching: false,

  error: null,
};

// Fetch all products
export const getProducts = createAsyncThunk(
  "products/getProducts",

  async (page = 1, thunkAPI) => {
    try {
      const limit = thunkAPI.getState().products.limit;

      const data = await fetchProducts(page, limit);

      return {
        products: data.products,
        total: data.total,
        page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch products",
      );
    }
  },
);

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

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, thunkAPI) => {
    try {
      const data = await searchProductsAPI(query);

      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Search failed");
    }
  },
);

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
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

    clearProducts(state) {
      state.products = [];
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
    // Fetch Products
    // -----------------------------

    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.total;
        state.currentPage = action.payload.page;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

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

    // -----------------------------
    // Search Products
    // -----------------------------
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isSearching = false;
        state.products = action.payload;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.isSearching = false;
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
} = productsSlice.actions;

export default productsSlice.reducer;
