import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, editUser } from "./operations.js";

const INITIAL_STATE = {
  user: {
    name: "",
    email: "",
    weight: 0,
    activeTime: 0,
    gender: "woman",
    dailyNorm: 1500,
    avatarUrl: "",
  },
  error: null,

  // додаткові опції
  DaysNotAsInWeek: true,
  SundayFirst: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: INITIAL_STATE,
  reducers: {
    setDaysNotAsInWeek(state, action) {
      state.DaysNotAsInWeek = action.payload;
    },
    setSundayFirst(state, action) {
      state.SundayFirst = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUser.pending, (state) => {
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(editUser.rejected, (state, { payload }) => {
        state.error = payload;
      })

      .addCase(getUserInfo.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.user = payload.data;
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { setDaysNotAsInWeek, setSundayFirst } = settingsSlice.actions;
