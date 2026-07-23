import { useSelector } from "react-redux";

import ProductGrid from "../products/ProductGrid";

function TrendingProducts() {
  const { products } = useSelector(
    (state) => state.products
  );


  const trendingProducts = [...products]
    .sort(
      (a, b) => b.rating - a.rating
    )
    .slice(0, 8);


  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Trending Products
        </h2>

        <p className="text-gray-600">
          Most loved products by customers
        </p>
      </div>


      <ProductGrid
        products={trendingProducts}
      />
    </section>
  );
}

export default TrendingProducts;