import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCategories,
  getProducts,
} from "../features/products/productsSlice";

import HeroBanner from "../components/home/HeroBanner";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TrendingProducts from "../components/home/TrendingProducts";
import FlashSale from "../components/home/FlashSale";
import Newsletter from "../components/home/Newsletter";


function Home() {

  const dispatch = useDispatch();

  const {
    isLoading,
    error,
  } = useSelector(
    (state) => state.products
  );


  useEffect(() => {

    dispatch(getCategories());

    dispatch(getProducts());

  }, [dispatch]);


  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-blue-600">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-red-600">
          {error}
        </p>
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