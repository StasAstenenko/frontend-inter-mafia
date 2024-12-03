import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectAuthToken } from "../auth/selectors.js";

// axios.defaults.baseURL = "https://back-inter-mafia.onrender.com/";

export const instance = axios.create({
  baseURL: "https://back-inter-mafia.onrender.com/api/users",
});
const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const editUser = createAsyncThunk(
  "users/edit",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.patch("/", formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (_, thunkApi) => {
    try {
      const token = selectAuthToken(thunkApi.getState());
      // console.log(token);
      setAuthHeaders(token);
      const { data } = await instance.get("/");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
