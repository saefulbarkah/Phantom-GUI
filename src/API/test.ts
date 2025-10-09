import API from "./api";

export async function GetConnection() {
  return API.get("/connection/check");
}

export async function UpdateConnection(bool: boolean) {
  return API.post("/connection/send", { connection: bool });
}
