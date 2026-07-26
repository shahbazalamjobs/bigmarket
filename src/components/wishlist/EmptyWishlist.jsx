import { Heart } from "lucide-react";

function EmptyWishlist() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Heart size={60} className="text-gray-400" />

      <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>

      <p className="text-gray-500">Save products you love here</p>
    </div>
  );
}

export default EmptyWishlist;
