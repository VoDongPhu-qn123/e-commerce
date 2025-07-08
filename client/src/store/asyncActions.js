import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";
export const getCategories = createAsyncThunk(
  // Tên action
  "app/getCategories",

  async (_, { rejectwithValue }) => {
    const response = await apis.apiGetCategories();
    if (!response.success) {
      return rejectwithValue(response);
    }
    return response;
  }
);
