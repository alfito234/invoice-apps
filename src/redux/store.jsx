import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./invoiceSlice";
import productReducer from "./productSlice";
import revenueReducer from "./revenueSlice";

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    products: productReducer,
    revenue: revenueReducer,
  },
});

export default store;
