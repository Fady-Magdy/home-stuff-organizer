import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../api-link";
const initialState = {
  itemsData: {
    name: "Unknown",
    location: "Unknown",
  },
  status: null,
};

export const fetchItemsData = createAsyncThunk(
  "itemsData/fetchItemsData",
  async () => {
    const response = await axios.get(`${Api}/api/items`);
    return response.data;
  }
);

export const newItemSlice = createSlice({
  name: "NewItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItemsData.fulfilled, (state, { payload }) => {
      state.itemsData = payload;
      state.status = "success";
    });
    builder.addCase(fetchItemsData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchItemsData.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { addNewItem } = newItemSlice.actions;
export default newItemSlice.reducer;
