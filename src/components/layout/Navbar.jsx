import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Heart } from "lucide-react";

import { logout } from "../../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/", {
      replace: true,
    });
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-blue-600"
      : "text-gray-700 hover:text-blue-600";

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BigMarket
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-gray-100"
          >
            <ShoppingCart size={24} />

            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                {totalQuantity}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="relative flex items-center gap-1">
            <Heart size={24} className="text-gray-700" />

            {wishlistCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white ">
                {wishlistCount}
              </span>
            )}
          </Link>

          {!isAuthenticated ? (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          ) : (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.image}
                    alt={user?.firstName}
                    className="h-8 w-8 rounded-full object-cover"
                  />

                  <span className="font-medium">Profile</span>
                </div>
              </NavLink>

              <button
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
