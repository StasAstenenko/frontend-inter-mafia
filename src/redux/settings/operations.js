import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectAuthToken } from "../auth/selectors.js";
import axios from "axios";

// axios.defaults.baseURL = "https://back-inter-mafia.onrender.com/";

export const instance = axios.create({
  baseURL: "https://back-inter-mafia.onrender.com/api/users",
});

const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// export const currentUser = createAsyncThunk(
//   "users/current",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       setAuthHeaders(state.auth.accessToken);
//       const { data } = await instance.get("");
//       //   console.log(data);

//       return data;
//     } catch (error) {
//       //   console.log(error);

//       return rejectWithValue(error.message);
//     }
//   },
//   {
//     condition: (_, { getState }) => {
//       const token = getState().auth.accessToken;

//       if (!token) return false;
//       return true;
//     },
//   }
// );

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

export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (_, thunkApi) => {
    try {
      const token = selectAuthToken(thunkApi.getState());
      // console.log(token);
      // const token = useSelector(selectAuthToken);
      // console.log(token);

      setAuthHeaders(token);
      const { data } = await instance.get("/");
      // console.log("Data received from API:", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
