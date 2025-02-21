import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";
import { getToken } from "@/utils/cookies";

// Timeout settings for requests
const timeoutConfig = {
  timeout: 30000,
  timeoutErrorMessage: "Server taking too long to respond. Try again.",
};

// Function to attach Authorization token
const configFunc = (config) => {
  const AUTH_TOKEN = getToken(); // Fetch token from cookies
  if (AUTH_TOKEN) {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  }
  return config;
};

// Create an Axios instance
const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  ...timeoutConfig,
});

// Request Interceptors
http.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Attach Authorization token dynamically
http.interceptors.request.use(configFunc);

// Response Interceptors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized access - Token may be invalid");
        return;
      }
      // if (error.response.status === 404) {
      //   window.location.href = "/404";
      // }
    }
    return Promise.reject(error);
  }
);

export default http;
