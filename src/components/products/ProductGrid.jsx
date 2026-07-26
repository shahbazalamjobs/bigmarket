import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="
      grid
      gap-4
      sm:grid-cols-2
      lg:grid-cols-3
    "
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
