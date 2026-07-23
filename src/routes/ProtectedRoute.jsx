import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation();

  // If user is not logged in, redirect to login
  // and remember the page they were trying to access.
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // User is authenticated, render the protected page.
  return <Outlet />;
}

export default ProtectedRoute;