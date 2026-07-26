import { createSlice } from "@reduxjs/toolkit";
import { loadOrders } from "../../store/ordersPersistence";

const initialState = {
  orders: loadOrders(),
};

const ordersSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    addOrder(state, action) {
      state.orders.unshift(action.payload);
    },

    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
