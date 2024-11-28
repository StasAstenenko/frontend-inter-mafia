import { createSlice } from "@reduxjs/toolkit";
import { fetchDaysDrinking } from "./operations";

const today = new Date().toISOString();

const INITIAL_STATE = {
  daysDrinking: [],
  chosenDate: today.slice(0, 19),
  chosenMonth: today.slice(0, 7),
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  reducers: {
    setChosenMonth(state, action) {
      state.chosenMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDaysDrinking.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDaysDrinking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.daysDrinking = action.payload;
      })
      .addCase(fetchDaysDrinking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setChosenMonth } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
