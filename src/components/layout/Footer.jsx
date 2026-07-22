import { Link } from "react-router-dom";
import Container from "./Container";

function Footer() {
  return (
    <footer className="mt-10 border-t bg-gray-100 py-8">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          {/* Left */}
          <div>
            <h2 className="text-xl font-bold text-blue-600">ShopEase</h2>

            <p className="mt-2 text-sm text-gray-600">
              Your one-stop destination for online shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2 font-semibold">Quick Links</h3>

            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/products">Products</Link>
              </li>

              <li>
                <Link to="/cart">Cart</Link>
              </li>

              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-2 font-semibold">Follow Us</h3>

            <div className="flex gap-3">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>

        <hr className="my-6" />

        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
