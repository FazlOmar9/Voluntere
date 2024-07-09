import axios from 'axios';

const imageApiClient = axios.create({
  baseURL: process.env.BASEURL || 'https://voluntere.dev-fazl.co:3010/uploads',
  withCredentials: true,
});

export default imageApiClient;
