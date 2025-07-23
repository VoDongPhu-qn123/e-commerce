import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    accessToken: null,
  },
  reducers: {
    logInSuccess: (state, action) => {
      console.log(action);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.currentUser = action.payload.currentUser;
      state.accessToken = action.payload.accessToken;
    },
  }, // Xử lí các action bình thường
  //   extraReducers: (builder) => {
  //     builder.addCase(actions.getNewProducts.pending, (state) => {
  //       state.isLoading = true;
  //     });
  //     builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
  //       state.newProducts = action.payload.productData;
  //       state.isLoading = false;
  //     });
  //     builder.addCase(actions.getNewProducts.rejected, (state, action) => {
  //       state.errMessage = action.payload.message;
  //       state.isLoading = true;
  //     });
  // }, //Xử lí các async action
});
export const { logInSuccess } = userSlice.actions;
export default userSlice;
