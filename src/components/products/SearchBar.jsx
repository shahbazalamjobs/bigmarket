import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import useDebounce from "../../hooks/useDebounce";

import {
  getProducts,
  searchProducts,
} from "../../features/products/productsSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const firstRender = useRef(true);

  useEffect(() => {
    // Skip first render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const value = debouncedQuery.trim();

    if (value === "") {
      dispatch(getProducts());
    } else {
      dispatch(searchProducts(value));
    }
  }, [debouncedQuery, dispatch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default SearchBar;
