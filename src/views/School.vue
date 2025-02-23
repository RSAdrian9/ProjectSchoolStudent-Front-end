<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import type { School } from '../types/indexType'; // Importando la interfaz


// Estado reactivo
const schools = ref<School[]>([]); // Tipado de la lista de escuelas
const newSchoolName = ref<string>('');
const error = ref<string>('');

// Obtener las escuelas desde la API
const fetchSchools = async () => {
  try {
    const response = await api.get('/schools');
    schools.value = response.data; // Suponemos que la API devuelve una lista de escuelas
  } catch (err) {
    error.value = 'Error al cargar las escuelas.';
  }
};

// Crear una nueva escuela
const createSchool = async () => {
  if (!newSchoolName.value) return;

  try {
    await api.post('/schools', { name: newSchoolName.value });
    fetchSchools(); // Refrescar la lista de escuelas
    newSchoolName.value = ''; // Limpiar el campo de entrada
  } catch (err) {
    error.value = 'Error al crear la escuela.';
  }
};

// Cargar las escuelas al montar el componente
onMounted(() => {
  fetchSchools();
});
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">Escuelas</h2>

    <!-- Mensaje de error -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Formulario para crear una nueva escuela -->
    <div class="mb-4">
      <div class="input-group">
        <input
          v-model="newSchoolName"
          type="text"
          placeholder="Nombre de la escuela"
          class="form-control"
        />
        <button
          @click="createSchool"
          class="btn btn-primary"
        >
          Crear escuela
        </button>
      </div>
    </div>

    <!-- Lista de escuelas -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="school in schools" :key="school.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ school.name }}</h5>
            <p class="card-text">{{ school.city }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Puedes añadir aquí más estilos si lo necesitas */
</style>
