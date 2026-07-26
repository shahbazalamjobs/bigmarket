import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { addOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";

import ShippingForm from "../components/checkout/ShippingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shippingFormRef = useRef(null);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[450px] flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>

        <p className="text-gray-500">
          Looks like you haven't added any products yet.
        </p>

        <Link
          to="/products"
          className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!shippingFormRef.current) return;

    shippingFormRef.current.submit((shippingDetails) => {
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
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Checkout</h1>

        <p className="mt-2 text-gray-500">
          Complete your shipping details and review your order before placing
          it.
        </p>
      </div>

      <ShippingForm ref={shippingFormRef} />

      <PaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold">Order Summary</h2>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-24 w-24 rounded-xl border object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>

              <p className="mt-1 text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>

              <p className="mt-2 text-lg font-bold text-violet-600">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>

              <p className="text-xl font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">Payment Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-violet-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
        >
          Place Order
          <ArrowRight size={20} />
        </button>
      </section>
    </div>
  );
}

export default Checkout;
