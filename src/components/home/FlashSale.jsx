import { useSelector } from "react-redux";

import ProductGrid from "../products/ProductGrid";

function FlashSale() {
  const { products } = useSelector(
    (state) => state.products
  );


  const saleProducts = [...products]
    .sort(
      (a, b) =>
        b.discountPercentage -
        a.discountPercentage
    )
    .slice(0, 8);


  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          🔥 Flash Sale
        </h2>

        <p className="text-gray-600">
          Limited time deals just for you
        </p>
      </div>


      <ProductGrid
        products={saleProducts}
      />
    </section>
  );
}

export default FlashSale;