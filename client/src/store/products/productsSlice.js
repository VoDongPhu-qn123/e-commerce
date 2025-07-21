import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
const productsSlice = createSlice({
  name: "products",
  initialState: {
    newProducts: null,
    isLoading: false,
  },
  reducers: {}, // Xử lí các action bình thường
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.newProducts = action.payload.productData;
      state.isLoading = false;
    });
    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      state.errMessage = action.payload.message;
      state.isLoading = true;
    });
  }, //Xử lí các async action
});
export default productsSlice;
