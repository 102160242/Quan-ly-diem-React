import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "score_columns/";

export function deleteColumn(id) {
  return axios.delete(BASE_URL + id);
}