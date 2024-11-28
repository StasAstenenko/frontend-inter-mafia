import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://back-inter-mafia.onrender.com/";

export const fetchDaysDrinking = createAsyncThunk(
  "water/fetchDaysDrinking",
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(`/month`, {
        params: { date: date.slice(0, 7) },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
