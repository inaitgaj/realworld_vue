import axios from "axios";

export const api = axios.create({
  baseURL: "https://conduit.productionready.io/api"
});

export function setToken(jwt) {
  localStorage.token = jwt;

  api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}
export function getTokenFromStorage() {
  if (localStorage.token) {
    api.defaults.headers.common["Authorization"] = `Token ${
      localStorage.token
    }`;
    return true;
  } else {
    return false;
  }
}

export function clearToken() {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
}
