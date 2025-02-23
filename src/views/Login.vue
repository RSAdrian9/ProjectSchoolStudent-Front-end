<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api"; // Asegúrate de que el servicio Axios esté configurado correctamente

// Variables reactivas
const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

// Manejar el login
const handleLogin = async () => {
  error.value = "";
  try {
    const response = await api.post("/login", { email: email.value, password: password.value });

    // Guardar el token en localStorage
    localStorage.setItem("token", response.data.token);

    // Redirigir al home
    router.push("/home");

    // Disparar evento de almacenamiento para actualizar otros componentes
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    error.value = "Credenciales incorrectas";
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-white">
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-white rounded-2xl shadow-xl">
      <div class="flex flex-row gap-3 pb-4">
        <div>
          <img src="../assets/solicitud.png" alt="Logo" width="50" />
        </div>
        <h1 class="text-3xl font-bold text-gray-700 my-auto">Solicitudes Profesorado FPDual</h1>
      </div>
      <div class="text-sm font-light text-gray-500 pb-8">
        Inicia sesión para gestionar las solicitudes de alumnado.
      </div>

      <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>

      <form @submit.prevent="handleLogin" class="flex flex-col">
        <!-- Email -->
        <div class="pb-2">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-mail">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input v-model="email" type="email" id="email" placeholder="nombre@empresa.com" autocomplete="off"
              class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4" />
          </div>
        </div>

        <!-- Contraseña -->
        <div class="pb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
          <div class="relative text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-square-asterisk">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input v-model="password" type="password" id="password" placeholder="••••••••••"
              autocomplete="new-password"
              class="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring-3 ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4" />
          </div>
        </div>

        <!-- Botón de login -->
        <button type="submit"
          class="w-full text-white bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">
          Iniciar sesión
        </button>

        <!-- Link de volver -->
        <div class="text-sm font-light text-gray-500">
          ¿Desea volver al inicio?
          <router-link to="/" class="font-medium text-indigo-600 hover:underline">Volver</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
