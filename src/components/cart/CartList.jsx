import { useSelector } from "react-redux";

import CartItem from "./CartItem";

function CartList() {
  const { items } = useSelector(
    (state) => state.cart,
  );

  return (
    <div className="space-y-5">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}

export default CartList;