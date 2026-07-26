import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Orders() {
  const orders = useSelector((state) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">No Orders Found</h1>

        <Link
          to="/products"
          className="rounded-lg bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border p-6 shadow-sm">
            {/* Header */}
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>

                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className="
                  rounded-full
                  bg-violet-100
                  px-4
                  py-1
                  text-sm
                  font-medium
                  text-violet-600
                "
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="mt-6 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-lg
                    bg-gray-50
                    p-4
                  "
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="
                      h-16
                      w-16
                      rounded-lg
                      object-cover
                    "
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:justify-between">
              <p>
                Payment:
                <span className="ml-2 font-medium capitalize">
                  {order.paymentMethod}
                </span>
              </p>

              <p className="text-xl font-bold">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
