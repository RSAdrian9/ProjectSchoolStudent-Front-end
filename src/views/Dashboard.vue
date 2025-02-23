<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import type { School, Student } from '../types/indexType';
import Navbar from '../components/Navbar.vue';

const schools = ref<School[]>([]);
const students = ref<Student[]>([]);
const error = ref<string>('');

// Obtener las escuelas y los estudiantes
const fetchData = async () => {
  try {
    const [schoolsResponse, studentsResponse] = await Promise.all([
      api.get('/schools'),
      api.get('/students')
    ]);

    schools.value = schoolsResponse.data;
    students.value = studentsResponse.data;
  } catch (err) {
    error.value = 'Error al cargar los datos. Verifica tu conexión.';
    console.error('Error al obtener los datos:', err);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <!-- Incluir el Navbar -->
    <Navbar />

    <!-- Contenido principal -->
    <div class="container mt-4">
      <h2 class="mb-4">Dashboard</h2>

      <!-- Mostrar mensaje de error si ocurre -->
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="row">
        <!-- Lista de Escuelas -->
        <div class="col-md-6">
          <h3>Escuelas</h3>
          <ul class="list-group">
            <li v-for="school in schools" :key="school.id" class="list-group-item">
              {{ school.name }} - {{ school.city }}
            </li>
          </ul>
        </div>

        <!-- Lista de Estudiantes -->
        <div class="col-md-6">
          <h3>Estudiantes</h3>
          <ul class="list-group">
            <li v-for="student in students" :key="student.id" class="list-group-item">
              {{ student.name }} - {{ student.email }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
