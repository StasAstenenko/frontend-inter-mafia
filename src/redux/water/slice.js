import { createSlice } from "@reduxjs/toolkit";
import {
  addWaterItem,
  deleteWaterItem,
  editWaterData,
  fetchWaterData,
  fetchWaterItems,
  getWaterPerDay,
  postWaterData,
} from "./operations";

const today = new Date().toLocaleDateString("en-CA"); // дата локальна, (YYYY-MM-DD)

const INITIAL_STATE = {
  items: [],
  daysDrinking: [], // Дані про дні пиття води за місяць
  dayDetails: [], // Деталі пиття води за конкретний день
  chosenDate: today,
  chosenMonth: today.slice(0, 7), // Обраний місяць (YYYY-MM)
  loading: false, // Стан завантаження
  error: null, // Помилки
  itemsPerDay: [],
  waterAmountPerDay: [],
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
        // console.log(action.payload.data);
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        //
        state.daysDrinking = demoSeven; // ДЕМОтиждень)
      })
      .addCase(fetchWaterItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterItems.fulfilled, (state, action) => {
        (state.loading = false), (state.itemsPerDay = action.payload);
      })
      .addCase(fetchWaterItems.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(addWaterItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterAmountPerDay.push(action.payload);
      })
      .addCase(addWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterAmountPerDay = state.waterAmountPerDay.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editWaterData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.waterAmountPerDay.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.waterAmountPerDay[index] = action.payload;
        }
      })
      .addCase(editWaterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWaterPerDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaterPerDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWaterPerDay.fulfilled, (state, action) => {
        state.waterAmountPerDay = action.payload;
      })
      .addCase(postWaterData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postWaterData.fulfilled, (state, action) => {
        state.loading = false;
        state.waterAmountPerDay.push(action.payload);
      });
  },
});

export const { setChosenMonth, setChosenDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;

var demoSeven = [
  {
    _id: "674a21b8544e2b2330219995",
    amount: 1200,
    date: "2024-11-29T19:21:10",
    currentDailyNorm: 1400,
    createdAt: "2024-11-29T20:19:04.035Z",
    updatedAt: "2024-11-29T20:19:04.035Z",
  },
  {
    _id: "674b60a1968bb6340a901be4",
    amount: 50,
    date: "2024-11-30T18:59:21",
    currentDailyNorm: 1500,
    createdAt: "2024-11-30T18:59:45.554Z",
    updatedAt: "2024-11-30T18:59:45.554Z",
  },
  {
    _id: "674b60e2968bb6340a901bec",
    amount: 50,
    date: "2024-12-01T19:00:48",
    currentDailyNorm: 1600,
    createdAt: "2024-11-30T19:00:50.121Z",
    updatedAt: "2024-11-30T19:00:50.121Z",
  },
  {
    _id: "674c46eebea78d5e49a4d9e6",
    amount: 1200,
    date: "2024-12-02T14:45:12",
    currentDailyNorm: 1500,
    createdAt: "2024-12-01T11:22:22.874Z",
    updatedAt: "2024-12-01T11:22:22.874Z",
  },
  {
    _id: "674c4d4373eb70d6eecc779c",
    amount: 50,
    date: "2024-12-03T11:49:13",
    currentDailyNorm: 1000,
    createdAt: "2024-12-01T11:49:23.585Z",
    updatedAt: "2024-12-01T11:49:23.585Z",
  },
  {
    _id: "674c4d4773eb70d6eecc779e",
    amount: 50,
    date: "2024-12-04T11:49:13",
    currentDailyNorm: 1200,
    createdAt: "2024-12-01T11:49:27.593Z",
    updatedAt: "2024-12-01T11:49:27.593Z",
  },
  {
    _id: "674c4d9673eb70d6eecc77a0",
    amount: 50,
    date: "2024-12-05T11:49:13",
    currentDailyNorm: 1500,
    createdAt: "2024-12-01T11:50:46.892Z",
    updatedAt: "2024-12-04T11:50:46.892Z",
  },
  {
    _id: "774c4d9673eb70d6eecc77a0",
    amount: 50,
    date: "2024-12-05T11:49:14",
    currentDailyNorm: 1200,
    createdAt: "2024-12-01T11:50:46.892Z",
    updatedAt: "2024-12-01T11:50:46.892Z",
  },
  {
    _id: "874c4d9673eb70d6eecc77a0",
    amount: 50,
    date: "2024-12-05T11:49:16",
    currentDailyNorm: 1000,
    createdAt: "2024-12-01T11:50:46.892Z",
    updatedAt: "2024-12-01T11:50:46.892Z",
  },
];
