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

// export const fetchWaterItems = createAsyncThunk(
//   "water/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/api/water");
//       console.log(response.data);
//       // return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const addWaterItem = createAsyncThunk(
//   "water/addWaterItem",
//   async (body, thunkAPI) => {
//     try {
//       const { data } = await axios.post("/", body);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteWaterItem = createAsyncThunk(
//   "water/deleteWaterItem",
//   async (_id, thunkAPI) => {
//     try {
//       await axios.delete(`/${_id}`);
//       return _id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const editWaterItem = createAsyncThunk(
//   "water/editWaterItem",
//   async (body, thunkAPI) => {
//     try {
//       const { data } = await axios.patch(`/${_id}`, { ...body });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
