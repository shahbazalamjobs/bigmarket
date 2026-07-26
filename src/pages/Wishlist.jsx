import { useSelector } from "react-redux";

import WishlistGrid from "../components/wishlist/WishlistGrid";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";

function Wishlist() {
  const { items } = useSelector((state) => state.wishlist);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">My Wishlist </h1>

        <p className="mt-2 text-gray-600">Products you saved for later</p>
      </div>

      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <WishlistGrid products={items} />
      )}
    </div>
  );
}

export default Wishlist;
