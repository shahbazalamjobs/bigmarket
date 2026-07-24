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

  error: null,
};

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

export const fetchCatalog = createAsyncThunk(
  "products/fetchCatalog",

  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState().products;

      const { currentPage, limit, searchQuery, selectedCategory } = state;

      let data;

      // SEARCH
      if (searchQuery.trim() !== "") {
        data = await searchProductsAPI(searchQuery, currentPage, limit);

        return {
          products: data.products,
          total: data.total,
          page: currentPage,
        };
      }

      // CATEGORY
      if (selectedCategory !== "all") {
        data = await fetchProductsByCategory(
          selectedCategory,
          currentPage,
          limit,
        );

        return {
          products: data.products,
          total: data.total,
          page: currentPage,
        };
      }

      // NORMAL PAGINATION
      data = await fetchProducts(currentPage, limit);

      return {
        products: data.products,
        total: data.total,
        page: currentPage,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch catalog",
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
    // Fetch Catalog
    // -----------------------------

    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.isLoading = false;

        state.products = action.payload.products;

        state.totalProducts = action.payload.total;

        state.currentPage = action.payload.page;
      })

      .addCase(fetchCatalog.rejected, (state, action) => {
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
