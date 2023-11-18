import axios from "axios";

export async function uploadFiles(data: FormData) {
  return axios.post("http://localhost:8080/api/v1/oren", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
