import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "courseclasses/";

export function getMeta() {
  return axios.get(BASE_URL + 'meta');
}
export function getCourseClasses(params = {}) {
  return axios.get(BASE_URL, { params: params });
}
export function deleteCourseClass(id) {
  return axios.delete(BASE_URL + id);
}