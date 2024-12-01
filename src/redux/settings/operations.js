import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations.js";
// import { selectAuthToken } from "../auth/selectors.js";

// export const getUserInfo = createAsyncThunk(
//   "users/getUserInfo",
//   async (_, thunkApi) => {
//     try {
//       const token = selectAuthToken(thunkApi.getState());
//       console.log(token);
//       // if (!token) {
//       //   throw new Error("No token found");
//       // }
//       const { data } = await instance.get("/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // console.log("Data received from API:", data);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("/users");
      console.log("Data received from API:", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
