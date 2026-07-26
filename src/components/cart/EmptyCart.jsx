import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border py-20 text-center">
      <ShoppingCart
        size={70}
        className="mb-5 text-gray-400"
      />

      <h2 className="text-3xl font-bold">
        Your cart is empty
      </h2>

      <p className="mt-2 text-gray-500">
        Looks like you haven't added any products yet.
      </p>

      <Link
        to="/products"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Browse Products
      </Link>
    </div>
  );
}

export default EmptyCart;