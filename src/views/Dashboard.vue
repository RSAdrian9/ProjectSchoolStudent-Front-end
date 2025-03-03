<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import type { School, Student } from '../types/indexType';
import Navbar from '../components/Navbar.vue';

const schools = ref<School[]>([]);
const students = ref<Student[]>([]);
const error = ref<string>('');

const fetchData = async () => {
  try {
    // Obtener usuario, escuelas y estudiantes
    const [schoolsResponse, studentsResponse, userResponse] = await Promise.all([
      api.get('/schools'),
      api.get('/students'),
      api.get('/user'),
    ]);

    // Asignar los datos correctamente
    schools.value = schoolsResponse.data.data; // Aquí accedemos a data dentro de la respuesta
    students.value = studentsResponse.data.data; // Si está paginado, usa .data
    console.log('Escuelas:', schools.value);
    console.log('Estudiantes:', students.value);
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
    <Navbar />

    <div class="container mt-4">

      <!-- Mostrar error si existe -->
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="row">
        <!-- Lista de Escuelas -->
        <div class="col-md-6">
          <h3>Escuelas</h3>
          <ul class="list-group">
            <li
              v-for="school in schools"
              :key="school.id"
              class="list-group-item"
            >
              <router-link :to="{ name: 'SchoolDetail', params: { id: school.id } }">
                {{ school.name }} - {{ school.city }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Lista de Estudiantes -->
        <div class="col-md-6">
          <h3>Estudiantes</h3>
          <ul class="list-group">
            <li
              v-for="student in students"
              :key="student.id"
              class="list-group-item"
            >
              <router-link :to="{ name: 'StudentDetail', params: { id: student.id } }">
                {{ student.name }} - {{ student.email }}
              </router-link>
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

a {
  color: inherit;
  /* Para que no se pongan azules por defecto */
  text-decoration: none;
  /* Si no quieres subrayado */
}
</style>