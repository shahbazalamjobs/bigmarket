import { CheckCircle2, Package, Truck } from "lucide-react";
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
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={56} className="text-green-600" />
        </div>

        <h1 className="mt-6 text-4xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for your purchase. We've received your order and will begin
          processing it shortly.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          Order Details
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-500">Order ID</span>

            <span className="font-semibold">
              #{latestOrder.id}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-500">Order Status</span>

            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
              {latestOrder.status}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-500">Payment Method</span>

            <span className="font-medium capitalize">
              {latestOrder.paymentMethod}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-500">Items</span>

            <span className="font-medium">
              {latestOrder.items.length}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-500">Estimated Delivery</span>

            <div className="flex items-center gap-2">
              <Truck size={18} className="text-violet-600" />

              <span className="font-medium">
                3–5 Business Days
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold">
              Total Paid
            </span>

            <span className="text-3xl font-bold text-violet-600">
              ${latestOrder.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-gray-50 p-6">
        <div className="flex items-start gap-4">
          <Package size={28} className="mt-1 text-violet-600" />

          <div>
            <h3 className="font-semibold">
              What's next?
            </h3>

            <p className="mt-2 text-gray-600">
              We'll send you updates as your order moves through processing,
              shipping, and delivery. You can also track your order anytime
              from the Orders page.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          to="/products"
          className="flex-1 rounded-xl bg-violet-600 py-3 text-center font-medium text-white transition hover:bg-violet-700"
        >
          Continue Shopping
        </Link>

        <Link
          to="/orders"
          className="flex-1 rounded-xl border py-3 text-center font-medium transition hover:bg-gray-50"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;