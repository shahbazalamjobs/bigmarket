import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const visibleCategories = isMobile
    ? categories.slice(0, 6)
    : categories.slice(0, 12);

  return (
    <section className="w-full">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">Shop By Category</h2>

          <p className="mt-2 text-gray-500">
            Explore products from your favorite categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/products/category/${category.slug}`}
            className="group flex items-center justify-between rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold capitalize transition-colors group-hover:text-violet-600">
              {category.name}
            </h3>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-violet-600 group-hover:text-white">
              <ArrowRight size={18} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
