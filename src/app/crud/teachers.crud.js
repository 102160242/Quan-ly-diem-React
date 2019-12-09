import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "teachers/";

export function getTeachers() {
  return axios.get(BASE_URL);
}
export function deleteTeacher(id) {
    return axios.delete(BASE_URL + id);
}