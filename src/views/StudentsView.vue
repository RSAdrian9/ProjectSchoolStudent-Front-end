<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import StudentTable from '../components/component-table/StudentTable.vue';
import StudentDetail from '../components/component-detail/StudentDetail.vue';
import type { Student } from '../types/indexType';
import Navbar from '../components/Navbar.vue';
import { deleteStudent } from '../services/StudentService';
import { showToast } from '../composables/useToast';

const students = ref<Student[]>([]);
const selectedStudent = ref<Student | null>(null);

// Pagination
const currentPage = ref(1);
const lastPage = ref(1);

// Load students with pagination
const fetchStudents = async (page = 1) => {
  try {
    const response = await api.get(`/students?page=${page}`);
    students.value = response.data.data; // Student data
    currentPage.value = response.data.meta.current_page; // Current page
    lastPage.value = response.data.meta.last_page; // Last page
  } catch (err) {
    console.error('Error loading students:', err);
  }
};

// Select a student
const selectStudent = (student: Student | null) => {
  selectedStudent.value = student;
};

// Create a new student
const handleCreateStudent = async (newStudent: Partial<Student>) => {
  try {
    await api.post('/students', newStudent);
    showToast('Student created successfully', 'success');
    fetchStudents(currentPage.value); // Reload the current list
    selectedStudent.value = null; // Clear selection after creation
  } catch (err) {
    showToast('Error creating student', 'error');
    console.error('Error creating student:', err);
  }
};

// Update the selected student
const handleUpdateStudent = async (student: Partial<Student>) => {
  if (!selectedStudent.value) return;
  try {
    const payload = JSON.parse(JSON.stringify(student)); // Proxy solution
    console.log('🔍 Payload sent to API:', payload);

    const response = await api.put(`/students/${selectedStudent.value.id}`, payload);
    console.log('✅ API response (update):', response);

    showToast('Student updated successfully', 'success');
    fetchStudents();
    selectedStudent.value = null;
  } catch (error) {
    showToast('Error updating student', 'error');
    console.error('❌ Error updating student:', (error as any).response?.data || error);
  }
};

// Delete the selected student
const handleDeleteStudent = async (id: number) => {
  if (!confirm(`Are you sure you want to delete the student with ID ${id}?`)) return;

  try {
    await deleteStudent(id);
    showToast('Student deleted successfully', 'success');
    fetchStudents(); // Update the list
  } catch (error) {
    showToast('Error deleting student', 'error');
    console.error('❌ Error deleting student:', error);
  }
};

// Change page
const changePage = (page: number) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchStudents(page);
  }
};

onMounted(() => fetchStudents());
</script>

<template>
  <!-- Include the Navbar -->
  <Navbar />

  <div class="students-view container mt-4">
    <div class="content-wrapper">
      <!-- Student table (left) -->
      <div class="panel table-panel">
        <StudentTable :students="students" :selectedStudent="selectedStudent" @select-student="selectStudent" />

        <!-- Pagination controls -->
        <div class="pagination-controls">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="btn btn-secondary">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ lastPage }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage >= lastPage" class="btn btn-secondary">
            Next
          </button>
        </div>
      </div>

      <!-- Details + CRUD Form (right) -->
      <div class="panel">
        <StudentDetail
        :student="selectedStudent"
        @create-student="handleCreateStudent"
        @update-student="handleUpdateStudent"
        @delete-student="handleDeleteStudent"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.students-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
}

/* Panels */
.panel {
  flex: 1;
  min-width: 400px;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
}

/* Ensure fixed height for the table panel */
.table-panel {
  min-height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Pagination styles */
.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
