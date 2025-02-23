<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import type { Student, School } from '../types/indexType'; // Importando las interfaces

// Estado reactivo
const students = ref<Student[]>([]); // Tipado de la lista de estudiantes
const newStudent = ref<{ name: string; schoolId: number }>({ name: '', schoolId: 0 });
const error = ref<string>('');
const schools = ref<School[]>([]); // Tipado de la lista de escuelas

// Obtener los estudiantes desde la API
const fetchStudents = async () => {
  try {
    const response = await api.get('/students');
    students.value = response.data; // Suponemos que la API devuelve una lista de estudiantes
  } catch (err) {
    error.value = 'Error al cargar los estudiantes.';
  }
};

// Obtener las escuelas para el formulario
const fetchSchoolsForStudent = async () => {
  try {
    const response = await api.get('/schools');
    schools.value = response.data; // Suponemos que la API devuelve una lista de escuelas
  } catch (err) {
    error.value = 'Error al cargar las escuelas.';
  }
};

// Crear un nuevo estudiante
const createStudent = async () => {
  if (!newStudent.value.name || !newStudent.value.schoolId) return;

  try {
    await api.post('/students', newStudent.value);
    fetchStudents(); // Refrescar la lista de estudiantes
    newStudent.value = { name: '', schoolId: 0 }; // Limpiar el formulario
  } catch (err) {
    error.value = 'Error al crear el estudiante.';
  }
};

// Cargar los estudiantes y las escuelas al montar el componente
onMounted(() => {
  fetchStudents();
  fetchSchoolsForStudent();
});
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">Estudiantes</h2>

    <!-- Mensaje de error -->
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Formulario para crear un nuevo estudiante -->
    <div class="mb-4">
      <div class="mb-3">
        <label for="studentName" class="form-label">Nombre del estudiante</label>
        <input
          v-model="newStudent.name"
          type="text"
          id="studentName"
          class="form-control"
          placeholder="Nombre del estudiante"
        />
      </div>

      <div class="mb-3">
        <label for="schoolSelect" class="form-label">Escuela</label>
        <select
          v-model="newStudent.schoolId"
          id="schoolSelect"
          class="form-select"
        >
          <option value="0" disabled>Selecciona una escuela</option>
          <option v-for="school in schools" :key="school.id" :value="school.id">
            {{ school.name }}
          </option>
        </select>
      </div>

      <button
        @click="createStudent"
        class="btn btn-primary"
      >
        Crear estudiante
      </button>
    </div>

    <!-- Lista de estudiantes -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="student in students" :key="student.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ student.name }}</h5>
            <p class="card-text">Escuela: {{ student.school_id }}</p> <!-- Relación con la escuela -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Puedes añadir aquí más estilos si lo necesitas */
</style>
