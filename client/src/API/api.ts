import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:51235/api/game`,
});

export default API;
