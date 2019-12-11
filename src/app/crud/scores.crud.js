import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "scores/";

export function getScores(params = {}) {
    return axios.get(BASE_URL, { params: params });
}
export function updateScore(student_id, score_column_id, score)
{
    return axios.post(BASE_URL, {student_id, score_column_id, score});
}
export function deleteStudent(id) {
    return axios.delete(BASE_URL + id);
}