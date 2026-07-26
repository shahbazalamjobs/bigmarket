import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartSummary() {
  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce((total, item) => {
    const discount = item.discountPercentage || 0;

    const finalPrice = item.price - (item.price * discount) / 100;

    return total + finalPrice * item.quantity;
  }, 0);

  // Example: 5% tax
  const tax = subtotal * 0.05;

  // Free shipping above $100
  const shipping = subtotal >= 100 ? 0 : 10;

  const total = subtotal + tax + shipping;

  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

      <div className="space-y-4 text-gray-700">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span>Shipping</span>

          <span className="font-medium">
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between">
          <span>Tax (5%)</span>

          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Link
          to="/products"
          className="block rounded-lg border px-6 py-3 text-center font-medium transition hover:bg-gray-100"
        >
          Continue Shopping
        </Link>

        <Link
          to="/checkout"
          className="block rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartSummary;
