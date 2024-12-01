import { createSlice } from "@reduxjs/toolkit";
import { fetchWaterData, getWaterAmount } from "./operations";

const today = new Date().toLocaleDateString("en-CA"); // дата локальна, (YYYY-MM-DD)

const INITIAL_STATE = {
  daysDrinking: [], // Дані про дні пиття води за місяць
  dayDetails: [], // Деталі пиття води за конкретний день
  chosenDate: today,
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
          state.daysDrinking = action.payload.data; // Дані за місяць
        } else if (action.meta.arg.type === "day") {
          state.dayDetails = action.payload.data; // Дані за день
        }
        console.log(action.payload.data);
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
