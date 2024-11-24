import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: {
    name: "",
    email: "",
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  // extraReducers: {}, // II777: deprecated syntax was breaking the build
});

export const authReducer = authSlice.reducer;
