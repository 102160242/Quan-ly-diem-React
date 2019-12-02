import axios from "axios";

export const LOGIN_URL = process.env.REACT_APP_API_URL + "auth/login";
export const REGISTER_URL = process.env.REACT_APP_API_URL + "auth/register";
export const REQUEST_PASSWORD_URL = process.env.REACT_APP_API_URL + "auth/forgot-password";

export const ME_URL = process.env.REACT_APP_API_URL + "users/me";

export function login(data) {
  return axios.post(LOGIN_URL, data);
}

export function register(data) {
  return axios.post(REGISTER_URL, data);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}