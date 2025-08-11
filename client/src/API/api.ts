import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/game`,
});

export default API;
