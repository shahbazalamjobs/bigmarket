import { useDispatch, useSelector } from "react-redux";

import {
  getProducts,
  getProductsByCategory,
  setSelectedCategory,
} from "../../features/products/productsSlice";

function ProductFilters() {
  const dispatch = useDispatch();

  const { categories, selectedCategory } = useSelector(
    (state) => state.products,
  );

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));

    if (category === "all") {
      dispatch(getProducts());
      return;
    }

    dispatch(getProductsByCategory(category));
  };

  return (
    <div className="rounded-lg border p-5 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">Categories</h2>

      <div className="space-y-2">
        <button
          onClick={() => handleCategoryClick("all")}
          className={`w-full rounded-lg px-4 py-2 text-left transition ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryClick(category.slug)}
            className={`w-full rounded-lg px-4 py-2 text-left transition ${
              selectedCategory === category.slug
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilters;
