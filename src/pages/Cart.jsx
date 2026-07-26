import { useSelector } from "react-redux";

import CartList from "../components/cart/CartList";
import EmptyCart from "../components/cart/EmptyCart";
import CartSummary from "@/components/cart/CartSummary";

function Cart() {
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Shopping Cart</h1>

        <p className="mt-2 text-gray-600">
          {items.length} item
          {items.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-5 lg:col-span-2">
            <CartList />
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
