import { createSlice } from "@reduxjs/toolkit";
import { currentUser, editUser } from "./operations";
import { getUserInfo } from "./operations.js";

const INITIAL_STATE = {
  user: {
    name: "",
    email: "",
    weight: null,
    activeTime: null,
    gender: "woman",
    dailyNorm: 1500,
    avatarUrl: "",
  },
  error: null,
  accessToken: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(currentUser.pending, (state) => {
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getUserInfo.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        // console.log("User info payload:", payload);
        state.user = payload.data;
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { setDaysNotAsInWeek } = settingsSlice.actions;
