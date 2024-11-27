import { createSlice } from "@reduxjs/toolkit";
import { apiRegister } from "./operations";

const INITIAL_STATE = {
  user: {
    name: "",
    email: "",
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
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
      });
  },
});

export const authReducer = authSlice.reducer;
