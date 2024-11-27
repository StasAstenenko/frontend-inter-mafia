import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "axios";

export const axios = Axios.create({
  baseUrl: "https://back-inter-mafia.onrender.com/water/",
});

export const getDailyNorm = createAsyncThunk(
  "water/getDailyNorm",
  async (_, thunkApi) => {
    try {
      const data = await axios.get("dailyNorm");
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
