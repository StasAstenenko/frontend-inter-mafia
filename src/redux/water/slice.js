import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWaterData } from "./operations";

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

// Асинхронний thunk для отримання даних за місяць
export const fetchDaysDrinking = createAsyncThunk(
  "water/fetchDaysDrinking",
  async (date, thunkAPI) => {
    try {
      const data = await fetchWaterData("month", date);
      return data; // Повертаємо дані з сервера
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Асинхронний thunk для отримання даних за день
export const fetchDayDetails = createAsyncThunk(
  "water/fetchDayDetails",
  async (date, thunkAPI) => {
    try {
      const data = await fetchWaterData("day", date);
      return data; // Повертаємо дані з сервера
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const waterSlice = createSlice({
  name: "water",
  initialState: INITIAL_STATE,
  reducers: {
    setChosenMonth(state, action) {
      state.chosenMonth = action.payload; // Оновлюємо обраний місяць
    },
    setChosenDate(state, action) {
      state.chosenDate = action.payload; // Оновлюємо обрану дату
    },
  },
  extraReducers: (builder) => {
    builder
      // Запит за місяць
      .addCase(fetchDaysDrinking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDaysDrinking.fulfilled, (state, action) => {
        state.loading = false;
        state.daysDrinking = action.payload; // Зберігаємо дані за місяць
      })
      .addCase(fetchDaysDrinking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Зберігаємо помилку
      })

      // Запит за день
      .addCase(fetchDayDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDayDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.dayDetails = action.payload; // Зберігаємо дані за день
      })
      .addCase(fetchDayDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Зберігаємо помилку
      });
  },
});

export const { setChosenMonth, setChosenDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
