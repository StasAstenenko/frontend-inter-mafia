import { createSlice } from "@reduxjs/toolkit";
import {
  apiLogin,
  apiLogout,
  apiRefresh,
  apiRegister,
  getAllUsers,
} from "./operations";

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  accessToken: "",
  isRegisteredSuccess: false,
  isLoggedIn: false,
  // isRefreshing: false,
  error: null,
  isLoading: false,
  count: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiRegister.pending, (state) => {
        // console.log("apiRegister pending...");
        state.error = null;
        state.isRegisteredSuccess = false;
        state.isLoading = true;
        // state.isRefreshing = true;
      })
      .addCase(apiRegister.fulfilled, (state, action) => {
        // console.log("apiRegister fulfilled:", action.payload);
        state.user = action.payload.user;
        state.isRegisteredSuccess = true;
        state.isLoading = false;
        // state.isRefreshing = false;
      })
      .addCase(apiRegister.rejected, (state, action) => {
        // console.error("apiRegister rejected :", action);
        state.error = action.payload;
        state.isRegisteredSuccess = false;
        state.isLoading = false;
        // state.isRefreshing = false;
      })

      .addCase(apiLogin.pending, (state) => {
        state.error = null;
        state.isLoading = true;
        // state.isRefreshing = true;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        // state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.error = action.payload;
        // state.isRefreshing = false;
        state.isLoading = false;
      })

      .addCase(apiLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.count = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(apiRefresh.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(apiRefresh.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
