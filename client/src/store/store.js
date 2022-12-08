import { configureStore } from "@reduxjs/toolkit";
import newItemReducer from "./slices/newItemSlice";
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    newItem: newItemReducer,
    user: userReducer
  },
});
