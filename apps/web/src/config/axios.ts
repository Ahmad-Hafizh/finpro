import axios from "axios";

export const callAPI = axios.create({
  baseURL: "http://localhost:8090",
});
