import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDaysDrinking,
  fetchDayDetails,
  getCurrentAmountWater,
} from "./operations";

const today = new Date().toISOString();

const INITIAL_STATE = {
  daysDrinking: [],
  dayDetails: [],
  chosenDate: today.slice(0, 19),
  chosenMonth: today.slice(0, 7),
  currentAmountWater: [],
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
    setChosenDate(state, action) {
      state.chosenDate = action.payload;
      // console.log(action.payload);
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
      })
      .addCase(fetchDayDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDayDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.dayDetails = action.payload;
      })
      .addCase(fetchDayDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentAmountWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentAmountWater.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentAmountWater = payload;
      })
      .addCase(getCurrentAmountWater.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setChosenMonth, setChosenDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
