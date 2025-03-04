<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import type { School, Student } from '../types/indexType';
import Navbar from '../components/Navbar.vue';
import { showToast } from '../composables/useToast';

const schools = ref<School[]>([]);
const students = ref<Student[]>([]);
const error = ref<string>('');

const fetchData = async () => {
  try {
    // Fetch user, schools, and students
    const [schoolsResponse, studentsResponse, userResponse] = await Promise.all([
      api.get('/schools'),
      api.get('/students'),
      api.get('/user'),
    ]);

    // Assign the data correctly
    schools.value = schoolsResponse.data.data; // Access data within the response
    students.value = studentsResponse.data.data; // If paginated, use .data
    console.log('Schools:', schools.value);
    console.log('Students:', students.value);
  } catch (err) {
    showToast('Error loading data. Check your connection.', 'error');
    //error.value = 'Error loading data. Check your connection.';
    console.error('Error fetching data:', err);
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

      <!-- Show error if exists -->
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="row">
        <!-- List of Schools -->
        <div class="col-md-6">
          <h3>Schools</h3>
          <ul class="list-group">
            <li
              v-for="school in schools"
              :key="school.id"
              class="list-group-item"
            >
              <router-link :to="{ params: { id: school.id } }">
                {{ school.name }} - {{ school.city }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- List of Students -->
        <div class="col-md-6">
          <h3>Students</h3>
          <ul class="list-group">
            <li
              v-for="student in students"
              :key="student.id"
              class="list-group-item"
            >
              <router-link :to="{ params: { id: student.id } }">
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
  /* To prevent default blue color */
  text-decoration: none;
  /* If you don't want underline */
}
</style>
