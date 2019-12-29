import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "users/";

export function getUsers() {
  return axios.get(BASE_URL);
}
export function deleteUser(id) {
    return axios.delete(BASE_URL + id);
  }

export function createUser(data){
  //console.log(data)
  return axios.post(BASE_URL +"?XDEBUG_SESSION_START=F56F122D", data, {
    headers: {
      "content-type": "multipart/form-data"
    }
  });
}

export function getUser(user_id) {
  return axios.get(BASE_URL+ user_id);
}

export function editUser(user_id, data) {
  return axios.post(BASE_URL+ user_id, data,{
    headers: {
      "content-type": "multipart/form-data",
    }
  });
}