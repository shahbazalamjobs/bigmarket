import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-16 text-white md:px-12">
      <div className="max-w-2xl space-y-6">

        <h1 className="text-4xl font-bold md:text-6xl">
          Shop Smarter,
          <br />
          Live Better
        </h1>

        <p className="text-lg text-white/90">
          Discover premium products at the best prices.
          Exclusive deals and amazing discounts waiting
          for you.
        </p>

        <Link
          to="/products"
          className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
        >
          Shop Now
        </Link>

      </div>
    </section>
  );
}

export default HeroBanner;