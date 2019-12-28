import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "courses/";

export function getMeta() {
  return axios.get(BASE_URL + 'meta');
}
export function getCourses(params = {}) {
  return axios.get(BASE_URL, { params: params });
}

export function getCourse(course_id) {
  return  axios.get(BASE_URL + course_id);
}

export function deleteCourse(id) {
  return axios.delete(BASE_URL + id);
}

export function createCourse(data){
  return axios.post(BASE_URL, data);
}

export function editCourse(id, data){
  return axios.patch(BASE_URL + id, data);
}
