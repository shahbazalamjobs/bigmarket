function Newsletter() {
  return (
    <section className="rounded-xl bg-gray-100 px-6 py-12 text-center">
      <h2 className="text-3xl font-bold">Stay Updated</h2>

      <p className="mt-3 text-gray-600">
        Subscribe to get latest offers and product updates.
      </p>

      <div className="mx-auto mt-6 flex max-w-md gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-lg border px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="rounded-lg bg-violet-600 px-5 py-3 text-white hover:bg-violet-700">
          Subscribe
        </button>
      </div>
    </section>
  );
}

export default Newsletter;
