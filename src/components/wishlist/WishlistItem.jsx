import { Trash2, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";

import { addToCart } from "../../features/cart/cartSlice";

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
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="space-y-5">
        {/* Product Image */}
        <div className="h-52 overflow-hidden rounded-lg border">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{product.title}</h2>

          <p className="text-gray-500">{product.brand}</p>

          <p className="text-2xl font-bold text-blue-600">${product.price}</p>

          <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
            {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-blue-600
              px-4
              py-3
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <button
            onClick={handleRemove}
            className="
              flex
              items-center
              justify-center
              rounded-lg
              border
              border-red-500
              px-4
              text-red-500
              transition
              hover:bg-red-50
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
