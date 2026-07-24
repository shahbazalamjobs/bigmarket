import { useDispatch, useSelector } from "react-redux";

import { setMinRating } from "../../features/products/productsSlice";

function RatingFilter() {
  const dispatch = useDispatch();

  const { minRating } = useSelector(
    (state) => state.products
  );

  return (
    <div className="rounded-lg border p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Rating
      </h2>

      <select
        value={minRating}
        onChange={(e) =>
          dispatch(setMinRating(Number(e.target.value)))
        }
        className="w-full rounded-lg border px-3 py-2"
      >
        <option value={0}>All Ratings</option>
        <option value={4}>4★ & Above</option>
        <option value={3}>3★ & Above</option>
        <option value={2}>2★ & Above</option>
        <option value={1}>1★ & Above</option>
      </select>
    </div>
  );
}

export default RatingFilter;