import WishlistItem from "./WishlistItem";

function WishlistGrid({ products }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <WishlistItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default WishlistGrid;
