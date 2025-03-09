import axios from "axios";

export const callAPI = axios.create({
  baseURL: process.env.BE_URL,
});
