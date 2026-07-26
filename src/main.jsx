import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import { store } from "./store/store";
import { saveCart } from "./store/cartPersistence";
import router from "./routes/router";

// Persist cart only when cart changes
let previousCart = store.getState().cart.items;

store.subscribe(() => {
  const currentCart = store.getState().cart.items;

  if (currentCart !== previousCart) {
    saveCart(currentCart);

    previousCart = currentCart;
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
