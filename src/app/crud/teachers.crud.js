import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "teachers/";

export function getTeachers() {
  return axios.get(BASE_URL);
}

export function getTeacher(teacher_id){
  return axios.get(BASE_URL + teacher_id);
}
export function deleteTeacher(id) {
    return axios.delete(BASE_URL + id);
}

export function getMeta(){
  return axios.get(BASE_URL + "meta");
}

export function editTeacher(id, data)
{
  return axios.patch(BASE_URL + id, data);
}