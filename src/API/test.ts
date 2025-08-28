import API from "./api";

export async function CheckConnection() {
  return API.get("/check");
}
