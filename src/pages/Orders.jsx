import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";

function Orders() {
  const orders = useSelector((state) => state.orders.orders);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-violet-100 text-violet-700";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[450px] flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold">No Orders Yet</h1>

        <p className="text-gray-500">
          Looks like you haven't placed any orders.
        </p>

        <Link
          to="/products"
          className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">My Orders</h1>

        <p className="mt-2 text-gray-500">
          View and track your recent purchases.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>

                <h2 className="mt-1 text-xl font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </h2>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusStyle(order.status)}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border p-4 transition hover:bg-gray-50"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 font-semibold">{item.title}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <Link
                      to={`/products/${item.id}`}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700"
                    >
                      View Product
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  <p className="text-lg font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-5 border-t pt-5 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  Payment:
                  <span className="ml-2 font-medium capitalize text-black">
                    {order.paymentMethod}
                  </span>
                </p>

                <p>
                  Items:
                  <span className="ml-2 font-medium text-black">
                    {order.items.length}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Order Total</p>

                <p className="text-3xl font-bold text-violet-600">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
