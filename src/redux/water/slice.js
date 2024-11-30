import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterData, getWaterAmount } from "./operations";

const today = new Date().toISOString();

const INITIAL_STATE = {
  daysDrinking: [], // Дані про дні пиття води за місяць
  dayDetails: [], // Деталі пиття води за конкретний день
  chosenDate: today.slice(0, 10), // Обрана дата (YYYY-MM-DD)
  chosenMonth: today.slice(0, 7), // Обраний місяць (YYYY-MM)
  waterAmount: [], // Кількість води
  loading: false, // Стан завантаження
  error: null, // Помилки
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Розподіл даних за місяцем або днем
        if (action.meta.arg.type === "month") {
          state.daysDrinking = action.payload; // Дані за місяць
        } else if (action.meta.arg.type === "day") {
          state.dayDetails = action.payload; // Дані за день
        }
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWaterAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaterAmount.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.waterAmount = payload;
      })
      .addCase(getWaterAmount.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setChosenMonth, setChosenDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
