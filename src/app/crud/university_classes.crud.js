import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "classes/";

export function getClasses() {
  return axios.get(BASE_URL);
}
export function getClass(class_id){
  return axios.get(BASE_URL + class_id);
}
export function deleteClass(id) {
    return axios.delete(BASE_URL + id);
  }