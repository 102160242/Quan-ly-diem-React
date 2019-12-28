import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL + "data/";

export function exportData(params = {}) {
  return axios.post(BASE_URL + "export", params);
}
export function importData(data) {
    //console.log(data);
    return axios.post(BASE_URL + "import", data,
    {
        headers: {
            "content-type": "multipart/form-data"
        }
    });
}
