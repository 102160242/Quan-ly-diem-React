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
export function getMeta(){
  return axios.get(BASE_URL + "meta");
}

export function createUniversityClass(data){
  console.log(data);
  return axios.post(BASE_URL, data);
}

export function editUniversityClass(id, data){
  return axios.patch(BASE_URL + id, data);
}