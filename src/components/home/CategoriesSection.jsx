import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CategoriesSection() {
  const { categories } = useSelector((state) => state.products);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Shop By Category</h2>

        <p className="text-gray-600">Explore products by category</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/products/category/${category.slug}`}
            className="rounded-xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold capitalize">
              {category.name}
            </h3>
          </Link>
        )).slice(0,15)}
      </div>
    </section>
  );
}

export default CategoriesSection;