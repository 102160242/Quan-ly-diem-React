import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "users/";

export function getUsers() {
  return axios.get(BASE_URL);
}
export function deleteUser(id) {
    return axios.delete(BASE_URL + id);
  }