import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden rounded-xl bg-cover bg-center px-6 py-16 text-white md:px-12"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/20/43/27/32/360_F_2043273248_EQiUExb0taCsgxmjUbrFR2o9Hlkn5PVK.jpg')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold md:text-6xl">
          Shop Smarter,
          <br />
          Live Better
        </h1>

        <p className="text-lg text-white/90">
          Discover premium products at the best prices. Exclusive deals and
          amazing discounts waiting for you.
        </p>

        <Link
          to="/products"
          className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-violet-600 transition hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;
