import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CategoriesSection() {
  const { categories } = useSelector((state) => state.products);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const visibleCategories = isMobile
    ? categories.slice(0, 6)
    : categories.slice(0, 12);

  return (
    <section className="w-full">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-bold sm:text-3xl">Shop By Category</h2>

        <p className="text-sm text-gray-600 sm:text-base">
          Explore products by category
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {visibleCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/products/category/${category.slug}`}
            className="flex min-h-16 items-center justify-center rounded-xl border bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
          >
            <h3 className="text-base font-semibold capitalize sm:text-lg">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
