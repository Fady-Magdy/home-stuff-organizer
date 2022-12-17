import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../../api-link";
const initialState = {
  status: "unknown",
  accountActive: false,
  userData: {
    signedIn: false,
  },
  images: [
    "male1",
    "male2",
    "male3",
    "male4",
    "male5",
    "female1",
    "female2",
    "female3",
    "female4",
    "female5",
  ],
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
      state.accountActive = false;
      state.userData = {};
    },
    activateAccount: (state) => {
      state.accountActive = true;
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

export const { getUserData, logout, activateAccount } = userSlice.actions;
export default userSlice.reducer;
