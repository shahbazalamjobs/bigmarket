import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-lg">
      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold">{product.title}</h3>

        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        {/* Push bottom section */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              ${product.price}
            </span>

            <span className="rounded bg-yellow-100 px-2 py-1 text-sm">
              ⭐ {product.rating}
            </span>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="block rounded-md bg-violet-600 py-2 text-center text-white transition hover:bg-violet-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
