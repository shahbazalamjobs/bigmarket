import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";
import ShippingForm from "../components/checkout/ShippingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 0 ? 5 : 0;

  const tax = subtotal * 0.1;

  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (data) => {
    setShippingDetails(data);

    toast.success("Shipping information saved");
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>

        <Link
          to="/products"
          className="
            rounded-lg
            bg-violet-600
            px-6
            py-3
            text-white
            hover:bg-violet-700
          "
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!shippingDetails) {
      toast.error("Please complete the shipping information.");
      return;
    }

    const order = {
      id: Date.now(),
      items,
      shippingDetails,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
      createdAt: new Date().toISOString(),
      status: "Processing",
    };

    dispatch(addOrder(order));

    dispatch(clearCart());

    toast.success("Order placed successfully!");

    navigate("/order-success");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}

        <div className="space-y-5 lg:col-span-2">
          <ShippingForm onSubmit={handleShippingSubmit} />

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <h2 className="text-2xl font-semibold">Order Summary</h2>

          {items.map((item) => (
            <div
              key={item.id}
              className="
                  flex
                  items-center
                  gap-5
                  rounded-lg
                  border
                  p-4
                "
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="
                    h-20
                    w-20
                    rounded-lg
                    object-cover
                  "
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>

                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Price Summary */}

        <div
          className="
            h-fit
            rounded-xl
            border
            p-6
            shadow-sm
          "
        >
          <h2 className="mb-5 text-2xl font-semibold">Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>

              <span>${tax.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!shippingDetails}
            className="mt-6 w-full rounded-lg bg-violet-600 py-3 font-medium text-white transition
            hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 "
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
