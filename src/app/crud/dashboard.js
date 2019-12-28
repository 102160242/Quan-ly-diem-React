import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "dashboard/";

export function getFailedJobs() {
  return axios.get(BASE_URL + 'failed_jobs');
}
export function getStatistics() {
  return axios.get(BASE_URL + 'statistics');
}

