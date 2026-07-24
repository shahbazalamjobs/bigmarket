import axiosInstance from "../../api/axios";

/**
 * Fetch all products
 */
export const fetchProducts = async (
  page = 1,
  limit = 12,
) => {
  try {
    const skip = (page - 1) * limit;

    const response = await axiosInstance.get("/products", {
      params: {
        limit,
        skip,
      },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch products",
      }
    );
  }
};

/**
 * Fetch single product by ID
 */
export const fetchProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch product",
      }
    );
  }
};

/**
 * Fetch all categories
 */
export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get(
      "/products/categories"
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch categories",
      }
    );
  }
};

/**
 * Search products
 */
export const searchProducts = async (query) => {
  try {
    const response = await axiosInstance.get(
      `/products/search?q=${query}`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Search failed",
      }
    );
  }
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (
  category
) => {
  try {
    const response = await axiosInstance.get(
      `/products/category/${category}`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch category products",
      }
    );
  }
};