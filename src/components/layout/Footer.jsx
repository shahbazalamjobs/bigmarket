import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import Container from "./Container";

function Footer() {
  return (
    <footer className="mt-10 border-t bg-gray-100 py-10">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/">
              <img
                src="public\bigmarket-logo.png"
                alt="BigMarket"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Your one-stop destination for quality products, amazing deals, and
              a seamless shopping experience.
            </p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Mail size={16} />
                support@bigmarket.com
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                +1 234 567 890
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} />
                New York, USA
              </p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 font-semibold">Shop</h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/products" className="hover:text-violet-600">
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-violet-600">
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-violet-600">
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className="hover:text-violet-600">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 font-semibold">Customer Service</h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/profile" className="hover:text-violet-600">
                  My Account
                </Link>
              </li>

              <li>
                <Link to="/orders" className="hover:text-violet-600">
                  Order History
                </Link>
              </li>

              <li>
                <a href="#" className="hover:text-violet-600">
                  Shipping Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-violet-600">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 font-semibold">Follow Us</h3>

            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-violet-600">
                <FaFacebook size={22} />
              </a>

              <a href="#" className="text-gray-600 hover:text-pink-600">
                <FaInstagram size={22} />
              </a>

              <a href="#" className="text-gray-600 hover:text-violet-400">
                <FaTwitter size={22} />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} BigMarket. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-violet-600">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-violet-600">
              Terms & Conditions
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
