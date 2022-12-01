import { configureStore } from "@reduxjs/toolkit";
import newItemReducer from "./slices/newItemSlice.js";

export const store = configureStore({
  reducer: {
    newItem: newItemReducer,
  },
});
