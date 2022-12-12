import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../api-link";
const initialState = {
  status: "unknown",
  userData: {
    signedIn: false,
  },
};

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async () => {
    if (localStorage.getItem("hso-userId")) {
      const response = await axios.post(`${Api}/api/users/get-data`, {
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
  reducers: {
    logout: (state) => {
      state.userData = {};
    },
    login: (state) => {
      state.userData.signedIn = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      if (payload === "user not found") return;
      state.userData = { ...payload, signedIn: true };
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

export const { getUserData, logout, login } = userSlice.actions;
export default userSlice.reducer;
