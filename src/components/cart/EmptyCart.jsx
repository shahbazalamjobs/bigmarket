import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border bg-white p-8 text-center shadow-sm">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-violet-600">
        <ShoppingCart size={45} />
      </div>

      <h2 className="mt-6 text-3xl font-bold">
        Your cart is empty
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Looks like you haven't added any products yet. Explore our collection
        and find something you love.
      </p>

      <Link
        to="/products"
        className="mt-8 rounded-xl bg-violet-600 px-8 py-3 font-medium text-white transition hover:bg-violet-700"
      >
        Browse Products
      </Link>
    </div>
  );
}

export default EmptyCart;