import { useDispatch, useSelector } from "react-redux";

import { setSortBy } from "../../features/products/productsSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function SortDropdown() {
  const dispatch = useDispatch();

  const { sortBy } = useSelector((state) => state.products);

  const sortOptions = {
    default: "Default",
    "price-asc": "Price: Low → High",
    "price-desc": "Price: High → Low",
    rating: "Highest Rating",
    discount: "Highest Discount",
  };

  return (
    <Select
      value={sortBy}
      onValueChange={(value) => dispatch(setSortBy(value))}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Sort By">{sortOptions[sortBy]}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="default">Default</SelectItem>

        <SelectItem value="price-asc">Price: Low → High</SelectItem>

        <SelectItem value="price-desc">Price: High → Low</SelectItem>

        <SelectItem value="rating">Highest Rating</SelectItem>

        <SelectItem value="discount">Highest Discount</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SortDropdown;
