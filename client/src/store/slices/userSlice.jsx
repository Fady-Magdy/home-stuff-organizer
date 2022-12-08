import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../api-link";
const initialState = {
  status: "unknown",
  userData: {},
};

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async () => {
    if (localStorage.getItem("hso-userId")) {
      const response = await axios.post(`${Api}/api/get-user-data`, {
        userId: JSON.parse(localStorage.getItem("hso-userId")),
      });
      return response.data;
    } else {
      return "user not found";
    }
  }
);

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      if (payload === "user not found") return;
      state.userData = payload;
      state.status = "success";
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { getUserData } = userSlice.actions;
export default userSlice.reducer;
