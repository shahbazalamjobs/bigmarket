import { useSelector } from "react-redux";

import ProductGrid from "../products/ProductGrid";

function FeaturedProducts() {
  const { products } = useSelector((state) => state.products);

  const featuredProducts = products.slice(0, 8);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Featured Products</h2>

        <p className="text-gray-600">Explore our most popular products</p>
      </div>

      <ProductGrid products={featuredProducts} />

      <div className="mt-8 text-center">
        <button className="rounded-lg bg-blue-600 px-6 py-3 cursor-pointer text-white transition hover:bg-blue-700">
          View All Products
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
