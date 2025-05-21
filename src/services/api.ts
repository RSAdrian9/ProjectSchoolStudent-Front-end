import axios from "axios";
import { showToast } from '../composables/useToast'

/**
 * Axios instance configured for API requests.
 * 
 * - Uses base URL from environment variable
 * - Sends credentials (cookies) with requests
 * - Sets default JSON headers
 */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token from local storage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log('Token en solicitud:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor for global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      // Error de red, servidor caído, o sin conexión a internet
      console.error("Network or server error:", error);
      showToast("No se pudo conectar con el servidor. Verifica tu conexión.", "error");
      return Promise.reject(error);
    }

    switch (response.status) {
      case 400:
        console.warn("Solicitud incorrecta:", response.data?.message || response.statusText);
        break;

      case 401:
        console.warn("No autorizado. Token inválido o expirado.");
        // Opcional: limpiar token y redirigir a login
        localStorage.removeItem("token");
        window.location.href = "/login"; // Ajusta la ruta según tu app
        break;

      case 403:
        showToast("No tienes permisos para esta acción.", "error");
        break;

      case 404:
        showToast("El recurso solicitado no fue encontrado.", "error");
        break;

      case 500:
        showToast("Error del servidor. Intenta más tarde.", "error");
        break;

      default:
        console.error("Error desconocido:", response.status, response.data);
        showToast("Ocurrió un error. Inténtalo más tarde.", "error");
        break;
    }

    return Promise.reject(error);
  }
);

export default API;
