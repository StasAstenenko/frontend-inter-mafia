import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectAuthToken } from "../auth/selectors.js";

export const instance = axios.create({
  baseURL: "https://back-inter-mafia.onrender.com/api/water",
});
const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchWaterData = createAsyncThunk(
  "water/fetchWaterData",
  async ({ type, date }, thunkAPI) => {
    try {
      const token = selectAuthToken(thunkAPI.getState());
      setAuthHeaders(token);
      const endpoint = type === "month" ? "/month" : "/day";
      // console.log(endpoint);
      const response = await instance.get(endpoint, {
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
      const { data } = await instance.delete(`/water/${waterId}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postWaterData = async (entries) => {
  try {
    const response = await instance.post("/", entries);
    return response.data;
  } catch (e) {
    throw new Error(e.response?.status || "Post water error");
  }
};

export const editWaterData = async (entries) => {
  try {
    const response = await instance.patch(`/`, entries);
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
