import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./operations.js";
// import { } from "./operations";

const INITIAL_STATE = {
  DaysNotAsInWeek: false,
  user: {},
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: INITIAL_STATE,
  reducers: {
    setDaysNotAsInWeek(state, action) {
      state.DaysNotAsInWeek = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        // console.log("User info payload:", payload);
        state.user = payload.data;
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { setDaysNotAsInWeek } = settingsSlice.actions;
