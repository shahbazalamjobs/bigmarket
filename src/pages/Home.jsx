import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCategories,
  getAllProducts,
} from "../features/products/productsSlice";
import PageLoader from "../components/common/PageLoader";

import HeroBanner from "../components/home/HeroBanner";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TrendingProducts from "../components/home/TrendingProducts";
import FlashSale from "../components/home/FlashSale";
import Newsletter from "../components/home/Newsletter";

function Home() {
  const dispatch = useDispatch();

  const { allProducts, categories, isLoading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(getAllProducts());
    }

    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, allProducts.length, categories.length]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <HeroBanner />

      <CategoriesSection />

      <FeaturedProducts />

      <TrendingProducts />

      <FlashSale />

      <Newsletter />
    </div>
  );
}

export default Home;
