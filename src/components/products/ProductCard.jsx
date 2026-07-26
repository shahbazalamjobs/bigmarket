import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-medium capitalize text-violet-700">
          {product.category}
        </span>

        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold leading-6 transition-colors group-hover:text-violet-600">
            {product.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-3xl font-bold text-violet-600">
              ${product.price}
            </span>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
              ⭐ {product.rating}
            </span>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="block rounded-xl bg-violet-600 py-3 text-center font-medium text-white transition hover:bg-violet-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
