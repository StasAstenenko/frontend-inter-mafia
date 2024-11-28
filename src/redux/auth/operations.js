import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const instance = axios.create({
  baseURL: "https://back-inter-mafia.onrender.com/api/",
});
const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const apiRegister = createAsyncThunk(
  "users/register",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("users/register", formData);
      setAuthHeaders(data.token);
      //   console.log("data:", data);
    } catch (error) {
      //   console.error("Error during registration:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
