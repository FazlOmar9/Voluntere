import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.BASEURL || "https://voluntere.dev-fazl.co:3010/api",
  withCredentials: true,
});

export default apiClient;