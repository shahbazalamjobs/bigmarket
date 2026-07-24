import { useSelector } from "react-redux";

import ProductGrid from "../products/ProductGrid";

function FlashSale() {
  const { allProducts } = useSelector((state) => state.products);

  const saleProducts = [...allProducts]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 6);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">🔥 Flash Sale</h2>

        <p className="text-gray-600">Limited time deals just for you</p>
      </div>

      <ProductGrid products={saleProducts} />
    </section>
  );
}

export default FlashSale;
