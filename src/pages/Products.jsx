import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCatalog,
  getCategories,
} from "../features/products/productsSlice";

import SearchBar from "../components/products/SearchBar";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "../components/products/Pagination";
import SortDropdown from "../components/products/SortDropdown";
import PriceFilter from "../components/products/PriceFilter";
import RatingFilter from "../components/products/RatingFilter";

function Products() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.products);

  const { products, sortBy, minPrice, maxPrice, minRating, isLoading, error } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }

    dispatch(fetchCatalog());
  }, [dispatch, categories.length]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Price Filter
    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= Number(minPrice),
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= Number(maxPrice),
      );
    }

    // Rating Filter
    if (minRating > 0) {
      filtered = filtered.filter((product) => product.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;

      case "discount":
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;

      default:
        break;
    }

    return filtered;
  }, [products, sortBy, minPrice, maxPrice, minRating]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">All Products</h1>

          <p className="mt-2 text-gray-600">Browse our collection</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="rounded bg-gray-100 px-4 py-2 text-sm">
            {filteredProducts.length} Products
          </div>

          <SortDropdown />
        </div>
      </div>

      {/* Search */}
      <SearchBar />

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="space-y-6">
          <ProductFilters />

          <PriceFilter />

          <RatingFilter />
        </aside>

        <main className="space-y-8 lg:col-span-3">
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <p className="text-lg text-blue-600">Loading products...</p>
            </div>
          ) : (
            <>
              <ProductGrid products={filteredProducts} />

              <Pagination />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
