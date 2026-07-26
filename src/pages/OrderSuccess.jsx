import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderSuccess() {
  const orders = useSelector((state) => state.orders.orders);

  const latestOrder = orders[0];

  if (!latestOrder) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-2xl font-semibold">No order found.</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl border p-10 text-center shadow-sm">
      <CheckCircle2 size={90} className="mx-auto text-green-600" />

      <h1 className="mt-6 text-4xl font-bold">Order Placed Successfully!</h1>

      <p className="mt-3 text-gray-600">Thank you for shopping with us.</p>

      <div className="mt-8 space-y-3 rounded-lg bg-gray-50 p-6 text-left">
        <div className="flex justify-between">
          <span className="font-medium">Order ID</span>

          <span>#{latestOrder.id}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Status</span>

          <span className="text-violet-600">{latestOrder.status}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Payment</span>

          <span className="capitalize">{latestOrder.paymentMethod}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Total</span>

          <span className="font-semibold">${latestOrder.total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Estimated Delivery</span>

          <span>3–5 Business Days</span>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          to="/products"
          className="rounded-lg bg-violet-600 px-6 py-3 text-white transition hover:bg-violet-700"
        >
          Continue Shopping
        </Link>

        <Link
          to="/orders"
          className="rounded-lg border px-6 py-3 transition hover:bg-gray-100"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
