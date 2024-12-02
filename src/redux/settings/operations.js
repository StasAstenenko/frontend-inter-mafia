import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectAuthToken } from "../auth/selectors.js";
// import { instance } from "../auth/operations.js";

// export const getUserInfo = createAsyncThunk(
//   "users/getUserInfo",
//   async (_, thunkApi) => {
//     try {
//       const token = selectAuthToken(thunkApi.getState());
//       console.log(token);
//       const { data } = await instance.get("/users");
//       // console.log("Data received from API:", data);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

import axios from "axios";
// import { useSelector } from "react-redux";

export const instance = axios.create({
  baseURL: "https://back-inter-mafia.onrender.com/api/users",
});

const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (_, thunkApi) => {
    try {
      const token = selectAuthToken(thunkApi.getState());
      console.log(token);
      // const token = useSelector(selectAuthToken);
      // console.log(token);
      if (!token) {
        throw new Error("No token found");
      }
      setAuthHeaders(token);
      const { data } = await instance.get("/");

      console.log("Data received from API:", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
