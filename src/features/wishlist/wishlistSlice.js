import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  try {
    const wishlist = localStorage.getItem("wishlist");

    return wishlist ? JSON.parse(wishlist) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist(state, action) {
      const product = action.payload;

      const exists = state.items.find((item) => item.id === product.id);

      if (!exists) {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          brand: product.brand,
          stock: product.stock,
        });
      }
    },

    removeFromWishlist(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
