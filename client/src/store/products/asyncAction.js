import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getNewProducts = createAsyncThunk(
  // Tên action
  "products/getNewProducts",

  async (_, { rejectwithValue }) => {
    const response = await apis.apiGetProducts({ sort: "-createdAt" });
    if (!response.success) {
      return rejectwithValue(response);
    }
    return response;
  }
);
