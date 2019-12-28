import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "students/";

export function getMeta() {
    return axios.get(BASE_URL + 'meta');
}
export function getStudents(params = {}) {
    return axios.get(BASE_URL, { params: params });
}
export function getStudent(student_id) {
    return axios.get(BASE_URL + student_id);
}
export function deleteStudent(id) {
    return axios.delete(BASE_URL + id);
}