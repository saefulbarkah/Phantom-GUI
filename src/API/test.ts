import API from "./api";

export async function GetConnection() {
  return API.get("/connection/check");
}
