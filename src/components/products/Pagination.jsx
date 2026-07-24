import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../../features/products/productsSlice";

function Pagination() {
  const dispatch = useDispatch();

  const {
    currentPage,
    totalProducts,
    limit,
    isLoading,
  } = useSelector((state) => state.products);

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    dispatch(getProducts(page));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
            className={`rounded-lg px-4 py-2 transition ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;