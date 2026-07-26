import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "../components/common/PageLoader";

// Lazy loaded pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const CategoryProducts = lazy(() => import("../pages/CategoryProducts"));
const Cart = lazy(() => import("../pages/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Login = lazy(() => import("../pages/Login"));
const Profile = lazy(() => import("../pages/Profile"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <MainLayout />
      </Suspense>
    ),

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "products",
        element: <Products />,
      },

      {
        path: "products/:id",
        element: <ProductDetails />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "wishlist",
        element: <Wishlist />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "products/category/:category",
        element: <CategoryProducts />,
      },

      // Protected Routes
      {
        element: <ProtectedRoute />,

        children: [
          {
            path: "profile",
            element: <Profile />,
          },

          {
            path: "orders",
            element: <Orders />,
          },

          {
            path: "checkout",
            element: <Checkout />,
          },

          {
            path: "order-success",
            element: <OrderSuccess />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
