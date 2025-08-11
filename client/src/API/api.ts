import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/api/game`,
});

export default API;
