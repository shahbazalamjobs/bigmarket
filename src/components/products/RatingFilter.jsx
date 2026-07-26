import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentPage,
  setMinRating,
} from "../../features/products/productsSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function RatingFilter() {
  const dispatch = useDispatch();

  const { minRating } = useSelector((state) => state.products);

  const ratingOptions = {
    0: "All Ratings",
    1: "1★ & Above",
    2: "2★ & Above",
    3: "3★ & Above",
    4: "4★ & Above",
    5: "5★ Only",
  };

  const handleRatingChange = (value) => {
    dispatch(setMinRating(Number(value)));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="rounded-lg border p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Minimum Rating</h2>

      <Select value={String(minRating)} onValueChange={handleRatingChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Rating">
            {ratingOptions[minRating]}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="0">All Ratings</SelectItem>
          <SelectItem value="1">1★ & Above</SelectItem>
          <SelectItem value="2">2★ & Above</SelectItem>
          <SelectItem value="3">3★ & Above</SelectItem>
          <SelectItem value="4">4★ & Above</SelectItem>
          <SelectItem value="5">5★ Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default RatingFilter;
