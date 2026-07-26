import { Minus, Plus } from "lucide-react";

function QuantitySelector({
  quantity,
  setQuantity,
  stock,
}) {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">
        Quantity
      </h3>

      <div className="flex w-fit items-center overflow-hidden rounded-lg border">
        <button
          onClick={decrease}
          disabled={quantity === 1}
          className="p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Minus size={18} />
        </button>

        <span className="w-14 text-center font-semibold">
          {quantity}
        </span>

        <button
          onClick={increase}
          disabled={quantity === stock}
          className="p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} />
        </button>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {stock} items available
      </p>
    </div>
  );
}

export default QuantitySelector;