import Axios from "axios";

export const axios = Axios.create({
  baseUrl: "https://back-inter-mafia.onrender.com/",
});

export const requestApi = async () => {
  const { data } = await axios.get("dailyNorm");
};
