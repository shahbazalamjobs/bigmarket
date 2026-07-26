const ORDERS_KEY = "orders";

export const saveOrders = (orders) => {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to save orders", error);
  }
};

export const loadOrders = () => {
  try {
    const orders = localStorage.getItem(ORDERS_KEY);

    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error("Failed to load orders", error);

    return [];
  }
};
