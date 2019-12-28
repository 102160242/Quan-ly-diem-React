import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "courseclasses/";

export function getMeta() {
  return axios.get(BASE_URL + 'meta');
}

export function getCourseClasses(params = {}) {
  return axios.get(BASE_URL, { params: params });
}

export function getCourseClass(courseclass_id) {
  return axios.get(BASE_URL + courseclass_id);
}
export function deleteCourseClass(id) {
  return axios.delete(BASE_URL + id);
}

export function createCourseClass(data){
  console.log(data)
  return axios.post(BASE_URL, data);
}

export function getEditCourseClass(courseclass_id) {
  return axios.get(BASE_URL+ courseclass_id);
}

export function editCourseClass(courseclass_id, data) {
  return axios.patch(BASE_URL+ courseclass_id , data);
}