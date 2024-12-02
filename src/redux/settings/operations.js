import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "https://back-inter-mafia.onrender.com/";

export const instance = axios.create({
  baseURL: "https://back-inter-mafia.onrender.com/",
});
