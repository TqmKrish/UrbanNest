// axiosInstance.ts
import axios from "axios";

// Public URLs that do not require the Authorization header
const publicUrl = ["/auth/login", "/auth/register"];

// Create an Axios instance
const axiosInterceptor = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust this to your API base URL
});

// Add a request interceptor
axiosInterceptor.interceptors.request.use(
  (config) => {
    // Check if the request URL matches any of the public URLs
    const isPublicUrl = publicUrl.some((url) => config.url?.includes(url));

    if (!isPublicUrl) {
      // Add authorization header or other headers here
      const token = JSON.parse(localStorage.getItem("token") ?? ""); // Assuming token is stored in localStorage
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Handle request error
    console.error("Interceptor Error", error);
    return Promise.reject(error);
  }
);

axiosInterceptor.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  (error) => {
    // Check for 401 Unauthorized status
    if (error.response?.status === 401) {
      // Clear token from local storage
      localStorage.clear();

      // Redirect to login page
      window.location.href = "/auth/login"; // Use window.location.href to redirect
    }

    // Handle other errors
    console.error("Interceptor Response Error", error);
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
