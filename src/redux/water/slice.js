import { createSlice } from "@reduxjs/toolkit";
import { fetchDaysDrinking } from "./operations";

const INITIAL_STATE = {
  daysDrinking: [],
  chosenDate: Date.now(),
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  reducers: {
    setChosenDate(state, action) {
      state.chosenDate = action.payload;
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

export const { setChosenDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
