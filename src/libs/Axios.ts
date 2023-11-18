import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
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
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    if (error.request) {
      throw new Error(
        "We are experiencing difficulties with our server. Please try again in a few minutes"
      );
    }
    throw new Error("Error making the request.");
  }
);

// function getToken() {
//   return JSON.parse(sessionStorage.getItem("auth")).token;
// }

export default axiosInstance;
