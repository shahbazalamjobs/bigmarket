import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProductsByCategory } from "../features/products/productsSlice";

import ProductGrid from "../components/products/ProductGrid";
import PageLoader from "../components/common/PageLoader";

function CategoryProducts() {
  const dispatch = useDispatch();

  const { category } = useParams();

  const { categoryProducts, isLoading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(
      fetchProductsByCategory({
        category,
        page: 1,
        limit: 12,
      }),
    );
  }, [dispatch, category]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold capitalize">{category}</h1>

        <p className="text-gray-600">Explore products from this category</p>
      </div>

      <ProductGrid products={categoryProducts} />
    </div>
  );
}

export default CategoryProducts;
