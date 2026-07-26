import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, saveAuth, removeAuth } from "../../utils/authStorage";
import { loginUser, getUserById } from "./authAPI";

const persistedAuth = getAuth();

const initialState = {
  user: persistedAuth?.user || null,
  token: persistedAuth?.token || null,
  isAuthenticated: !!persistedAuth?.token,
  isLoading: false,
  error: null,
};

/**
 * Async Login
 */
export const login = createAsyncThunk(
  "auth/login",

  async (credentials, thunkAPI) => {
    try {
      // Login and get token
      const data = await loginUser(credentials);

      // Fetch complete user details
      const user = await getUserById(data.id);

      return {
        ...user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Login failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      removeAuth();
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN PENDING

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // LOGIN SUCCESS

      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, ...user } = action.payload;

        state.isLoading = false;
        state.user = user;
        state.token = accessToken;
        state.isAuthenticated = true;
        state.error = null;

        saveAuth({
          user,
          token: accessToken,
        });
      })

      // LOGIN FAILED

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;

        state.user = null;

        state.token = null;

        state.isAuthenticated = false;

        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
