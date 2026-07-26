import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import { store } from "./store/store";
import { saveCart } from "./store/cartPersistence";
import { saveWishlist } from "./store/wishlistPersistence";
import { saveOrders } from "./store/ordersPersistence";

import { Toaster } from "./components/ui/sonner";

import router from "./routes/router";

// Cart persistence
let previousCart = store.getState().cart.items;

// Wishlist persistence
let previousWishlist = store.getState().wishlist.items;

let previousOrders = store.getState().orders.orders;

store.subscribe(() => {
  const currentCart = store.getState().cart.items;

  if (currentCart !== previousCart) {
    saveCart(currentCart);

    previousCart = currentCart;
  }

  const currentWishlist = store.getState().wishlist.items;

  if (currentWishlist !== previousWishlist) {
    saveWishlist(currentWishlist);

    previousWishlist = currentWishlist;
  }

  const currentOrders = store.getState().orders.orders;

  if (currentOrders !== previousOrders) {
    saveOrders(currentOrders);

    previousOrders = currentOrders;
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>,
);
