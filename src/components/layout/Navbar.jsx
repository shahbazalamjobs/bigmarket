import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ShoppingCart, Heart, User, LogOut, Menu, X } from "lucide-react";

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
      : "text-gray-700 hover:text-violet-600";

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}

        <Link to="/">
          <img
            src="public\bigmarket-logo.png"
            alt="BigMarket"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <ShoppingCart size={24} />

            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Wishlist */}

          <Link to="/wishlist" className="relative">
            <Heart size={24} />

            {wishlistCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {!isAuthenticated ? (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          ) : (
            <Popover
              open={desktopProfileOpen}
              onOpenChange={setDesktopProfileOpen}
            >
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                  <img
                    src={user?.image}
                    alt={user?.firstName}
                    className="h-9 w-9 rounded-full object-cover"
                  />

                  <span className="font-medium">{user?.firstName}</span>
                </button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-56">
                <button
                  onClick={() => {
                    setDesktopProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  <User size={16} />
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        {/* Mobile Right Side */}

        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Profile */}

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
                    className="h-9 w-9 rounded-full object-cover"
                  />
                </button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-52">
                <button
                  onClick={() => {
                    setMobileProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100"
                >
                  <User size={16} />
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}

          {/* Hamburger */}

          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {mobileMenu && (
        <div className="border-t px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
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
              <NavLink to="/login" onClick={() => setMobileMenu(false)}>
                Login
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
