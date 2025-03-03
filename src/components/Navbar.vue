<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/api';

const router = useRouter();
const userName = ref<string>();

// Función para obtener el usuario autenticado
const fetchUser = async () => {
  try {
    const { data } = await api.get('/user'); // Obtener el usuario del backend
    userName.value = data.name;
    console.log('Usuario autenticado:', data);
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    alert('Error al cargar el usuario. Redirigiendo al login.');
    router.push('/login');
  }
};

// Cerrar sesión
const handleLogout = async () => {
  try {
    await api.post('/logout');
    console.log('Sesión cerrada'); // Verifica en la consola que la sesión se ha cerrado
    localStorage.removeItem('token');
    console.log('Token eliminado'); // Verifica en la consola que el token se ha eliminado
    router.push('/login'); /* Cambiar el redireccionamiento a la página del home */
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
    alert('Error al cerrar sesión. Intenta de nuevo.');
  }
};

onMounted(() => {
  fetchUser(); // Obtener el usuario al montar el componente
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Título a la izquierda -->
      <a class="navbar-brand" href="/dashboard">Dashboard</a>

      <!-- Botones de navegación -->
      <div class="d-flex align-items-center">
        <router-link to="/students" class="nav-link me-3">Students</router-link>
        <router-link to="/schools" class="nav-link me-3">Schools</router-link>

        <i class="bi bi-person-circle"></i>
        <!-- Dropdown del usuario -->
        <div class="dropdown">
          <button
            class="btn btn-light dropdown-toggle"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <p class="dropdown-item">User: {{ userName }}</p>
              <button class="dropdown-item" @click="handleLogout">Log out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Evitar el scroll cuando se despliega el dropdown */
.dropdown-menu {
  position: absolute !important;
}
</style>
