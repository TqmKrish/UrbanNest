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

export default axiosInterceptor;
