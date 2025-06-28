import axios from "axios";

const BASE_URL = "http://stg-service.bddelha.com";


export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
