import { useEffect, useState } from "react";

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  if (!product) return null;

  const galleryImages = [
    ...product.images.filter((image) => image !== product.thumbnail),
    product.thumbnail,
  ];

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 md:flex-col">
        {galleryImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              selectedImage === image
                ? "border-blue-600 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src={image}
              alt={`${product.title}-${index + 1}`}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 overflow-hidden rounded-xl border bg-white">
        <img
          src={selectedImage}
          alt={product.title}
          className="h-[500px] w-full object-contain transition-all duration-300"
        />
      </div>
    </div>
  );
}

export default ProductGallery;
