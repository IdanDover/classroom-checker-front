import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.log(error.response);

      throw new Error(error.response.data.description);
    }
    if (error.request) {
      throw new Error("No response was received from the server.");
    }
    throw new Error("Error making the request.");
  }
);

// function getToken() {
//   return JSON.parse(sessionStorage.getItem("auth")).token;
// }

export default axiosInstance;
