<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- Tarjeta de Login -->
        <div class="card shadow-lg rounded-4">
          <div class="card-body p-5">
            <h2 class="text-center mb-4">Iniciar Sesión</h2>

            <!-- Mostrar error si existe -->
            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>

            <!-- Formulario de Login -->
            <form @submit.prevent="handleLogin">
              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" id="email" v-model="email" class="form-control" placeholder="ejemplo@correo.com"
                  required />
              </div>

              <!-- Contraseña -->
              <div class="mb-4">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" v-model="password" class="form-control" placeholder="••••••••"
                  required />
              </div>

              <!-- Botón de Iniciar Sesión -->
              <button type="submit" class="btn btn-primary w-100 mb-3">
                Iniciar Sesión
              </button>

              <!-- Enlace a Registro -->
              <p class="text-center mt-3">
                ¿No tienes una cuenta?
                <router-link to="/register" class="text-decoration-none">
                  Regístrate
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api"; // Importa tu instancia de Axios

// Variables reactivas
const email = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");
const router = useRouter();

// Manejar el login
const handleLogin = async () => {
  error.value = "";
  try {
    // Llama al endpoint de login
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    // Verificar si el token existe antes de guardarlo
    console.log("Token recibido:", response.data.token);

    // Guardar el token en localStorage
    localStorage.setItem("token", response.data.token);

    // Redirigir al home
    router.push("/dashboard");

    // Disparar evento para otros componentes (Navbar, por ejemplo)
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    error.value = "Credenciales incorrectas";
    console.error("Error en el login:", err);
  }
};
</script>

<style scoped>
.card {
  border: none;
}
</style>
