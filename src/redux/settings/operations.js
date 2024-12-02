import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "https://back-inter-mafia.onrender.com/";

export const instance = axios.create({
  baseURL: "https://back-inter-mafia.onrender.com/api/users",
  withCredentials: true,
});

const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const currentUser = createAsyncThunk(
  "users/current",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      setAuthHeaders(state.auth.accessToken);
      const { data } = await instance.get("");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const token = getState().auth.accessToken;

      if (!token) return false;
      return true;
    },
  }
);

export const editUser = createAsyncThunk(
  "users/edit",
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.patch("", formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
