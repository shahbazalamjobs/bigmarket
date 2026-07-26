import { Minus, Plus, Trash2 } from "lucide-react";

import { useDispatch } from "react-redux";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const discountedPrice =
    item.price - (item.price * item.discountPercentage) / 100;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Product Image */}
        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg border">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <h2 className="text-xl font-semibold">{item.title}</h2>

          <p className="text-sm text-gray-500">{item.brand}</p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-blue-600">
              ${discountedPrice.toFixed(2)}
            </span>

            <span className="text-sm text-gray-400 line-through">
              ${item.price}
            </span>

            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
              {item.discountPercentage}% OFF
            </span>
          </div>

          {/* Stock */}
          <p
            className={`text-sm ${
              item.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.stock > 0 ? `${item.stock} available` : "Out of stock"}
          </p>
        </div>

        {/* Quantity */}
        <div className="flex flex-col items-start gap-3 md:items-center">
          <p className="text-sm font-medium">Quantity</p>

          <div className="flex items-center rounded-lg border">
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              disabled={item.quantity === 1}
              className="p-3 hover:bg-gray-100 disabled:opacity-40"
            >
              <Minus size={18} />
            </button>

            <span className="w-12 text-center font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
              disabled={item.quantity === item.stock}
              className="p-3 hover:bg-gray-100 disabled:opacity-40"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Total + Remove */}
        <div className="flex flex-col justify-between gap-4 text-right">
          <div>
            <p className="text-sm text-gray-500">Total</p>

            <p className="text-2xl font-bold">
              ${(discountedPrice * item.quantity).toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => {
              const confirmDelete = window.confirm(
                "Remove this item from cart?",
              );

              if (confirmDelete) {
                dispatch(removeFromCart(item.id));
              }
            }}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={18} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
