import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Product Details
      </h1>

      <p className="mt-4 text-lg">
        Product ID: {id}
      </p>
    </div>
  );
}

export default ProductDetails;