import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../env";
const PORT = 443;
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
    const response = await axios.get(`${Api}:${PORT}/api/items`);
    console.log("Data: ", response.data);
    console.log("PORT: ", PORT);
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
      console.log();
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
