import { createSlice } from "@reduxjs/toolkit";
// import { } from "./operations";

const INITIAL_STATE = {
  DaysNotAsInWeek: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: INITIAL_STATE,
  reducers: {
    setDaysNotAsInWeek(state, action) {
      state.DaysNotAsInWeek = action.payload;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { setDaysNotAsInWeek } = settingsSlice.actions;
