import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "No Items Added",
};

export const newItemSlice = createSlice({
  name: "NewItem",
  initialState,
  reducers: {
    addNewItem: (state) => {
      state.value = "New Item Added";
    },
  },
});

export const { addNewItem } = newItemSlice.actions;
export default newItemSlice.reducer;
