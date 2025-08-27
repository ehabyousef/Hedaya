import axios from "axios";
import { getAuthToken } from "../utils/auth";

// Create axios instance
const apiClient = axios.create({
  baseURL: "https://backend-kappa-beige.vercel.app",
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem("userToken");
      // You can dispatch a logout action here if needed
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
