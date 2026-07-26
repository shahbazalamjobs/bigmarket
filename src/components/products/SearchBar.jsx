import { useEffect } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hooks/useDebounce";

import {
  setCurrentPage,
  setSearchQuery,
} from "../../features/products/productsSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const { searchQuery } = useSelector((state) => state.products);

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [debouncedSearch, dispatch]);

  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

export default SearchBar;
