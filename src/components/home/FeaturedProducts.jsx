import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductGrid from "../products/ProductGrid";

function FeaturedProducts() {
  const { allProducts } = useSelector((state) => state.products);

  const featuredProducts = allProducts.slice(0, 6);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Featured Products</h2>

        <p className="text-gray-600">Explore our most popular products</p>
      </div>

      <ProductGrid products={featuredProducts} />

      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="inline-block rounded-lg bg-violet-600 px-6 py-3 text-white transition hover:bg-violet-700"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
