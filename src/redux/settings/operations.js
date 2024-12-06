import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectAuthToken } from "../auth/selectors.js";
import { instance, setAuthHeaders } from "../auth/operations.js";

export const editUser = createAsyncThunk(
  "users/edit",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.patch("users/", formData);

      return data.data;
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
      setAuthHeaders(token);
      const { data } = await instance.get("users/");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
