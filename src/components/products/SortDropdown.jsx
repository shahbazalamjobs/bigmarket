import { useDispatch, useSelector } from "react-redux";

import { setSortBy } from "../../features/products/productsSlice";

function SortDropdown() {
  const dispatch = useDispatch();

  const { sortBy } = useSelector((state) => state.products);

  return (
    <select
      value={sortBy}
      onChange={(e) => dispatch(setSortBy(e.target.value))}
      className="rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="default">Default</option>

      <option value="price-asc">Price: Low → High</option>

      <option value="price-desc">Price: High → Low</option>

      <option value="rating">Highest Rating</option>

      <option value="discount">Highest Discount</option>
    </select>
  );
}

export default SortDropdown;
