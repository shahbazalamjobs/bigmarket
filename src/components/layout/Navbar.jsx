import { NavLink } from "react-router-dom";
import Container from "./Container";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Cart", path: "/cart" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "Login", path: "/login" },
];

function Navbar() {
  return (
    <header className="border-b bg-white shadow-sm">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            ShopEase
          </NavLink>

          {/* Navigation */}
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
