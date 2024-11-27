import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  dailyNorma: 1500,
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getDailyNorm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDailyNorm.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dailyNorm = payload;
      })
      .addCase(getDailyNorm.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }),
});

export const waterReducer = waterSlice.reducer;
