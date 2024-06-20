import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.BASEURL || "http://localhost:3010/api",
  withCredentials: true,
});

export default apiClient;