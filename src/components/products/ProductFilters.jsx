import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentPage,
  setSelectedCategory,
} from "../../features/products/productsSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function ProductFilters() {
  const dispatch = useDispatch();

  const { categories, selectedCategory } = useSelector(
    (state) => state.products,
  );

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="rounded-lg border p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Category</h2>

      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            {selectedCategory === "all"
              ? "All Products"
              : categories.find(
                  (category) => category.slug === selectedCategory,
                )?.name}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Products</SelectItem>

          {categories.map((category) => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default ProductFilters;
