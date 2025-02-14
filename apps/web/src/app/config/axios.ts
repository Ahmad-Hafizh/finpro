import axios from "axios";

export const call = axios.create({
  baseURL: "http://localhost:8090",
});
