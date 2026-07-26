import Skeleton from "../common/Skeleton";

function ProductDetailsSkeleton() {
  return (
    <div
      className="
      grid
      gap-10
      lg:grid-cols-2
    "
    >
      <Skeleton className="h-[500px] w-full" />

      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />

        <Skeleton className="h-8 w-1/3" />

        <Skeleton className="h-32 w-full" />

        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
