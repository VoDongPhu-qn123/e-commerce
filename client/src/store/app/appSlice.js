import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    isLoading: false,
  },
  reducers: {}, // Xử lí các action bình thường
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.productCategories;
      state.isLoading = false;
    });
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.errMessage = action.payload.message;
      state.isLoading = true;
    });
  }, //Xử lí các async action
});
export default appSlice;
