import { createSlice } from "@reduxjs/toolkit";
import { apiRegister, getDailyNorm } from "./operations";

const INITIAL_STATE = {
  user: {
    name: "",
    email: "",
    dailyNorm: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiRegister.pending, () => {
        // console.log("apiRegister pending...");
      })
      .addCase(apiRegister.fulfilled, (state, action) => {
        // console.log("apiRegister fulfilled:", action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(apiRegister.rejected, (state, action) => {
        // console.error("apiRegister rejected:", action.payload);
        state.error = action.payload;
      })

      .addCase(getDailyNorm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDailyNorm.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.dailyNorm = payload;
      })
      .addCase(getDailyNorm.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const authReducer = authSlice.reducer;
