import { ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { addToCart } from "../../features/cart/cartSlice";
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";

function WishlistItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    dispatch(
      addToCart({
        product,
        quantity: 1,
      }),
    );

    dispatch(removeFromWishlist(product.id));

    toast.success("Added to cart");
  };

  const handleRemove = () => {
    dispatch(removeFromWishlist(product.id));

    toast.success("Removed from wishlist");
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
          {product.brand}
        </span>

        <h2 className="line-clamp-2 text-lg font-semibold leading-6">
          {product.title}
        </h2>

        <p className="mt-4 text-3xl font-bold text-violet-600">
          ${product.price}
        </p>

        <div className="mt-3">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
          </span>
        </div>

        <div className="mt-auto flex gap-3 pt-6">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <button
            onClick={handleRemove}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
