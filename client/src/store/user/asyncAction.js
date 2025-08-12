import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";
export const getCurrentUser = createAsyncThunk(
  // Tên action
  "user/getCurrentUser",

  async (token, { rejectwithValue }) => {
    const response = await apis.apiGetCurrentUser(token);
    if (!response.success) {
      return rejectwithValue(response);
    }
    return response;
  }
);
