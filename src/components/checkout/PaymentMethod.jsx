import { CreditCard, Smartphone, Truck } from "lucide-react";

const paymentMethods = [
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Truck,
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "upi",
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
  },
];

function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">Payment Method</h2>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition ${
                paymentMethod === method.id
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <Icon size={24} />

              <div>
                <h3 className="font-semibold">{method.title}</h3>

                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentMethod;
