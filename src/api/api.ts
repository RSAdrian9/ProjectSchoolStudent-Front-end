import axios from "axios";

/**
 * Creates an instance of Axios with predefined configuration.
 * 
 * @constant {AxiosInstance} API - The Axios instance used for making API requests.
 * It is configured with the base URL for the API, credentials support, and default headers.
 */
const API = axios.create({
  baseURL: "http://docadrian.duckdns.org/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    /**
     * Retrieves the authentication token from the local storage.
     * 
     * @constant {string | null} token - The token used for authenticating API requests.
     * It is fetched from the local storage using the key "token".
     */
    const token = localStorage.getItem("token");
    console.log('Token en solicitud:', token);  // Verifica el token en la consola
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
