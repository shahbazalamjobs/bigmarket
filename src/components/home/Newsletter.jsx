import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="rounded-3xl border bg-gray-100 px-6 py-14 shadow-sm">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600">
          <Mail size={26} />
        </div>

        <h2 className="mt-5 text-3xl font-bold">
          Stay Updated
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Subscribe to receive exclusive offers, new arrivals, and product
          updates directly in your inbox.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-xl bg-white border px-5 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />

          <button className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700">
            Subscribe
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export default Newsletter;