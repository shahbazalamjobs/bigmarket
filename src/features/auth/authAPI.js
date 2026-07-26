import axiosInstance from "../../api/axios";

/**
 * Login user using DummyJSON
 * @param {Object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 */

export const loginUser = async (credentials) => {
  console.log(credentials);
  try {
    const response = await axiosInstance.post("/auth/login", credentials);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Something went wrong",
      }
    );
  }
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);

  return response.data;
};
