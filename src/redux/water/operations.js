import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDailyNorm = createAsyncThunk(
  "water/getDailyNorm",
  async (_, thunkApi) => {
    try {
      const data = await requestDailyNorm();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
