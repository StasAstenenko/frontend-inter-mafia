import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiLogout, apiRegister } from "./operations";

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
      .addCase(apiRegister.pending, (state) => {
        // console.log("apiRegister pending...");
        state.error = null;
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

      .addCase(apiLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(apiLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.error = action.payload;
      });

    // .addCase(apiRefresh.pending, (state) => {
    //   state.error = null;
    //   state.isRefreshing = true;
    // })
    // .addCase(apiRefresh.fulfilled, (state, action) => {
    //   state.isLoggedIn = true;
    //   state.token = action.payload.token;
    //   state.isRefreshing = false;
    // })
    // .addCase(apiRefresh.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.isRefreshing = false;
    //   state.token = null;
    // });
  },
});

export const authReducer = authSlice.reducer;
