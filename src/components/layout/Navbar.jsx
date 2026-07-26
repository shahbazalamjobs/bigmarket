import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ShoppingCart,
  Heart,
  User,
  Package,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { logout } from "../../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [desktopProfileOpen, setDesktopProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const { items } = useSelector((state) => state.cart);

  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/", {
      replace: true,
    });

    setDesktopProfileOpen(false);
    setMobileProfileOpen(false);
    setMobileMenu(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-violet-600"
      : "text-gray-700 transition hover:text-violet-600";

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link to="/">
          <img
            src="/bigmarket-logo.png"
            alt="BigMarket"
            className="h-16 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-gray-100"
          >
            <ShoppingCart size={23} />

            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </Link>

          <Link
            to="/wishlist"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-gray-100"
          >
            <Heart size={23} />

            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="rounded-xl bg-violet-600 px-5 py-2 text-white transition hover:bg-violet-700"
            >
              Login
            </NavLink>
          ) : (
            <Popover
              open={desktopProfileOpen}
              onOpenChange={setDesktopProfileOpen}
            >
              <PopoverTrigger asChild>
                <button className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-gray-100">
                  <img
                    src={user?.image}
                    alt={user?.firstName}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <span className="font-medium">{user?.firstName}</span>
                </button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-56 rounded-xl p-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-gray-100"
                >
                  <User size={17} />
                  Profile
                </button>

                <button
                  onClick={() => navigate("/orders")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-gray-100"
                >
                  <Package size={17} />
                  Orders
                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          {isAuthenticated && (
            <Popover
              open={mobileProfileOpen}
              onOpenChange={setMobileProfileOpen}
            >
              <PopoverTrigger asChild>
                <button>
                  <img
                    src={user?.image}
                    alt={user?.firstName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-52 rounded-xl p-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 hover:bg-gray-100"
                >
                  <User size={16} />
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="border-t px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-5">
            <NavLink
              to="/"
              onClick={() => setMobileMenu(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setMobileMenu(false)}
              className={navLinkClass}
            >
              Products
            </NavLink>

            <Link to="/cart" onClick={() => setMobileMenu(false)}>
              Cart ({totalQuantity})
            </Link>

            <Link to="/wishlist" onClick={() => setMobileMenu(false)}>
              Wishlist ({wishlistCount})
            </Link>

            {!isAuthenticated && (
              <Link to="/login" onClick={() => setMobileMenu(false)}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
