import axios from "axios";

const imageApiClient = axios.create({
  baseURL: process.env.BASEURL || "http://localhost:3010/",
  withCredentials: true,
});

export default imageApiClient;