import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";

import {
  clearSelectedProduct,
  getProductById,
} from "../features/products/productsSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import ProductGallery from "../components/product-details/ProductGallery";
import QuantitySelector from "../components/product-details/QuantitySelector";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "sonner";

function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedProduct, isLoading, error } = useSelector(
    (state) => state.products,
  );

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isWishlisted = selectedProduct
    ? wishlistItems.some((item) => item.id === selectedProduct.id)
    : false;

  useEffect(() => {
    dispatch(getProductById(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
    }
  }, [selectedProduct]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: selectedProduct,
        quantity,
      }),
    );

    toast.success("Added to cart");
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!selectedProduct) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Product Image */}
      <ProductGallery product={selectedProduct} />

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold">{selectedProduct.title}</h1>

          <p className="mt-2 text-gray-500">⭐ {selectedProduct.rating}</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600">
            ${selectedProduct.price}
          </h2>

          <p className="text-green-600">
            {selectedProduct.discountPercentage}% OFF
          </p>
        </div>

        <div className="space-y-2 rounded-lg border p-5">
          <p>
            <strong>Brand:</strong> {selectedProduct.brand}
          </p>

          <p>
            <strong>Category:</strong> {selectedProduct.category}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            <span
              className={
                selectedProduct.stock > 0 ? "text-green-600" : "text-red-600"
              }
            >
              {selectedProduct.stock > 0
                ? `${selectedProduct.stock} Available`
                : "Out of Stock"}
            </span>
          </p>

          <p>
            <strong>SKU:</strong> {selectedProduct.sku}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Description</h2>

          <p className="leading-7 text-gray-600">
            {selectedProduct.description}
          </p>
        </div>

        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          stock={selectedProduct.stock}
        />

        <div className="flex items-center gap-4">
          <button
            onClick={handleAddToCart}
            disabled={selectedProduct.stock === 0}
            className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to Cart
          </button>

          <button
            onClick={() => {
              if (isWishlisted) {
                dispatch(removeFromWishlist(selectedProduct.id));

                toast.success("Removed from wishlist");
              } else {
                dispatch(addToWishlist(selectedProduct));

                toast.success("Added to wishlist ❤️");
              }
            }}
            className="flex h-12 w-12 items-center justify-center rounded-lg border transition hover:bg-gray-100"
          >
            <Heart
              size={24}
              className={
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
