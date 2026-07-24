import { useDispatch, useSelector } from "react-redux";

import {
  setMinPrice,
  setMaxPrice,
} from "../../features/products/productsSlice";

function PriceFilter() {
  const dispatch = useDispatch();

  const { minPrice, maxPrice } = useSelector(
    (state) => state.products
  );

  return (
    <div className="rounded-lg border p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Price Filter
      </h2>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) =>
            dispatch(setMinPrice(e.target.value))
          }
          className="w-full rounded-lg border px-3 py-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) =>
            dispatch(setMaxPrice(e.target.value))
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>
    </div>
  );
}

export default PriceFilter;