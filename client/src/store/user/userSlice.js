import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
//import { persistor } from "../redux";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    accessToken: null,
    isLoading: false,
  },
  reducers: {
    logInSuccess: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.currentUser = null;
      //persistor.purge(); //xóa sạch localStorage redux-persist
    },
  }, // Xử lí các action bình thường
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.userData;
      state.isLoading = false;
    });
    builder.addCase(actions.getCurrentUser.rejected, (state) => {
      state.isLoading = true;
    });
  }, //Xử lí các async action
});
export const { logInSuccess, logOut } = userSlice.actions;
export default userSlice;
