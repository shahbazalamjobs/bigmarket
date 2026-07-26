import Skeleton from "../common/Skeleton";

function ProductCardSkeleton() {
  return (
    <div
      className="
      rounded-xl
      border
      p-4
      space-y-4
    "
    >
      <Skeleton className="h-52 w-full" />

      <Skeleton className="h-5 w-3/4" />

      <Skeleton className="h-4 w-1/2" />

      <Skeleton className="h-6 w-1/3" />

      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default ProductCardSkeleton;
