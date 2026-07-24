import axiosInstance from "@/api/axios";

// Fetch products (paginated)
export const fetchProducts = async (page = 1, limit = 12) => {
  const skip = (page - 1) * limit;

  const response = await axiosInstance.get("/products", {
    params: {
      limit,
      skip,
    },
  });

  return response.data;
};

// Fetch single product
export const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
};

// Fetch categories
export const fetchCategories = async () => {
  const response = await axiosInstance.get("/products/categories");

  return response.data;
};

// Search products (paginated)
export const searchProducts = async (
  query,
  page = 1,
  limit = 12,
) => {
  const skip = (page - 1) * limit;

  const response = await axiosInstance.get("/products/search", {
    params: {
      q: query,
      limit,
      skip,
    },
  });

  return response.data;
};

// Products by category (paginated)
export const fetchProductsByCategory = async (
  category,
  page = 1,
  limit = 12,
) => {
  const skip = (page - 1) * limit;

  const response = await axiosInstance.get(
    `/products/category/${category}`,
    {
      params: {
        limit,
        skip,
      },
    },
  );

  return response.data;
};