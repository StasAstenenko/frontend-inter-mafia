import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  reducers: {},
  // extraReducers: {},
});

export const waterReducer = waterSlice.reducer;
