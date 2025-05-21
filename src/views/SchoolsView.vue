<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../services/api';
import SchoolDetail from '../components/component-detail/SchoolDetail.vue';
import SchoolTable from '../components/component-table/SchoolTable.vue';
import type { School } from '../types/indexType';
import Navbar from '../components/Navbar.vue';
import { deleteSchool } from '../services/SchoolService';
import { showToast } from '../composables/useToast';

const schools = ref<School[]>([]);
const selectedSchool = ref<School | null>(null);

// Pagination
const currentPage = ref(1);
const lastPage = ref(1);

// Load schools with pagination
const fetchSchools = async (page = 1) => {
  try {
    const response = await api.get(`/schools?page=${page}`);
    schools.value = response.data.data; // School data
    currentPage.value = response.data.meta.current_page; // Current page
    lastPage.value = response.data.meta.last_page; // Last page
  } catch (err) {
    console.error('Error loading schools:', err);
  }
};

// Select a school
const selectSchool = (school: School | null) => {
  selectedSchool.value = school;
};

// Create a new school
const handleCreateSchool = async (newSchool: Partial<School>) => {
  try {
    await api.post('/schools', newSchool);
    showToast('School created successfully', 'success');
    fetchSchools(currentPage.value); // Reload the current list
    selectedSchool.value = null; // Clear selection after creation
  } catch (err) {
    showToast('Error creating school', 'error');
    console.error('Error creating school:', err);
  }
};

// Update the selected school
const handleUpdateSchool = async (school: Partial<School>) => {
  if (!selectedSchool.value) return;
  try {
    const payload = JSON.parse(JSON.stringify(school)); // Proxy solution
    console.log('🔍 Payload sent to API:', payload);

    const response = await api.put(`/schools/${selectedSchool.value.id}`, payload);
    console.log('✅ API response (update):', response);

    showToast('School updated successfully', 'success');
    fetchSchools();
    selectedSchool.value = null;
  } catch (error) {
    showToast('Error updating school', 'error');
    console.error('❌ Error updating school:', (error as any).response?.data || error);
  }
};

// Delete the selected school
const handleDeleteSchool = async (id: number) => {
  if (!confirm(`Are you sure you want to delete the school with ID ${id}?`)) return;

  try {
    await deleteSchool(id);
    showToast('School deleted successfully', 'success');
    fetchSchools(); // Update the list
  } catch (error) {
    showToast('Error deleting school', 'error');
    console.error('❌ Error deleting school:', error);
  }
};

// Change page
const changePage = (page: number) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchSchools(page);
  }
};

onMounted(() => fetchSchools());
</script>

<template>
  <!-- Include Navbar -->
  <Navbar />

  <div class="schools-view container mt-4">
    <div class="content-wrapper">
      <!-- School table (left) -->
      <div class="panel table-panel">
        <SchoolTable :schools="schools" :selectedSchool="selectedSchool" @select-school="selectSchool" />

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
        <SchoolDetail
        :school="selectedSchool"
        @create-school="handleCreateSchool"
        @update-school="handleUpdateSchool"
        @delete-school="handleDeleteSchool"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.schools-view {
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
