import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://back-inter-mafia.onrender.com/api/water";

export const fetchWaterData = createAsyncThunk(
  "water/fetchWaterData",
  async ({ type, date }, thunkAPI) => {
    try {
      const endpoint = type === "month" ? "/month" : "/day";
      // console.log(endpoint);

      const response = await axios.get(endpoint, {
        params: { date },
      });

      // console.dir(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getWaterAmountPerDay = createAsyncThunk(
  "water/waterAmount",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/");
      // console.log(data);
      return data.amount;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteWater = createAsyncThunk(
  "water/apiDeleteWater",
  async (waterId, thunkApi) => {
    try {
      const { data } = await axios.delete(`/water/${waterId}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postWaterData = async (entries) => {
  try {
    const response = await axios.post("/", entries);
    return response.data;
  } catch (e) {
    throw new Error(e.response?.status || "Post water error");
  }
};

export const editWaterData = async (entries) => {
  try {
    const response = await axios.patch(`/`, entries);
    return response.data;
  } catch (e) {
    throw new Error(e.response?.status || "Post water error");
  }
};
