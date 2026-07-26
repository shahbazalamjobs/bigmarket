import { Link } from "react-router-dom";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import Container from "./Container";

function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-50">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/">
              <img
                src="/bigmarket-logo.png"
                alt="BigMarket"
                className="h-16 w-auto"
              />
            </Link>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              Your one-stop destination for quality products, amazing deals, and
              a seamless shopping experience.
            </p>

            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-violet-600" />
                <span>support@bigmarket.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-violet-600" />
                <span>+1 234 567 890</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-violet-600" />
                <span>New York, USA</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold">Shop</h3>

            <ul className="space-y-4">
              <li>
                <Link to="/products" className="flex items-center gap-2 text-gray-600 transition hover:text-violet-600">
                  <ChevronRight size={15} />
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/products" className="flex items-center gap-2 text-gray-600 transition hover:text-violet-600">
                  <ChevronRight size={15} />
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link to="/cart" className="flex items-center gap-2 text-gray-600 transition hover:text-violet-600">
                  <ChevronRight size={15} />
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className="flex items-center gap-2 text-gray-600 transition hover:text-violet-600">
                  <ChevronRight size={15} />
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold">Customer Service</h3>

            <ul className="space-y-4">
              <li>
                <Link to="/profile" className="flex items-center gap-2 text-gray-600 transition hover:text-violet-600">
                  <ChevronRight size={15} />
                  My Account
                </Link>
              </li>

              <li>
                <Link to="/orders" className="flex items-center gap-2 text-gray-600 transition hover:text-violet-600">
                  <ChevronRight size={15} />
                  Order History
                </Link>
              </li>

              <li>
                <a href="#" className="flex items-center gap-2 text-gray-600 transition hover:text-violet-600">
                  <ChevronRight size={15} />
                  Shipping Policy
                </a>
              </li>

              <li>
                <a href="#" className="flex items-center gap-2 text-gray-600 transition hover:text-violet-600">
                  <ChevronRight size={15} />
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold">Follow Us</h3>

            <p className="mb-5 text-sm leading-6 text-gray-600">
              Follow us on social media to stay updated with our latest offers.
            </p>

            <div className="flex gap-3">
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border text-gray-600 transition hover:border-violet-600 hover:bg-violet-600 hover:text-white">
                <FaFacebookF size={18} />
              </a>

              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border text-gray-600 transition hover:border-violet-600 hover:bg-violet-600 hover:text-white">
                <FaInstagram size={18} />
              </a>

              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border text-gray-600 transition hover:border-violet-600 hover:bg-violet-600 hover:text-white">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} BigMarket. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="transition hover:text-violet-600">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-violet-600">
              Terms & Conditions
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;