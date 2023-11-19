import axios from "axios";

export async function uploadFiles(data: FormData) {
  return axios.post(`${import.meta.env.VITE_HOST_URL}/oren`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
