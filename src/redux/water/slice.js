import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  reducers: {},
  // extraReducers: {}, // II777: deprecated syntax was breaking the build
});

export const waterReducer = waterSlice.reducer;
