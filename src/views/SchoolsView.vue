<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import axios from 'axios';
import SchoolDetail from '../components/component-detail/SchoolDetail.vue';
import SchoolTable from '../components/component-table/SchoolTable.vue';
import type { School } from '../types/indexType';
import Navbar from '../components/Navbar.vue';
import { deleteSchool } from '../services/SchoolService';


const schools = ref<School[]>([]);
const selectedSchool = ref<School | null>(null);

// Paginación
const currentPage = ref(1);
const lastPage = ref(1);

// Cargar institutos con paginación
const fetchSchools = async (page = 1) => {
  try {
    const response = await api.get(`/schools?page=${page}`);
    schools.value = response.data.data; // Datos de los institutos
    currentPage.value = response.data.meta.current_page; // Página actual
    lastPage.value = response.data.meta.last_page; // Última página
  } catch (err) {
    console.error('Error al cargar los institutos:', err);
  }
};

// Seleccionar un instituto
const selectSchool = (school: School | null) => {
  selectedSchool.value = school;
};

// Crear un nuevo instituto
const handleCreateSchool = async (newSchool: Partial<School>) => {
  try {
    await api.post('/schools', newSchool);
    fetchSchools(currentPage.value); // Recargar la lista actual
    selectedSchool.value = null; // Limpiar selección después de crear
  } catch (err) {
    console.error('Error al crear instituto:', err);
  }
};

// Actualizar el intituto seleccionado
const handleUpdateSchool = async (school: Partial<School>) => {
  if (!selectedSchool.value) return;
  try {
    const payload = JSON.parse(JSON.stringify(school)); // Solución Proxy
    console.log('🔍 Payload enviado a la API:', payload);

    const response = await api.put(`/schools/${selectedSchool.value.id}`, payload);
    console.log('✅ Respuesta de la API (update):', response);

    alert('✅ Instituto actualizado exitosamente');
    fetchSchools();
    selectedSchool.value = null;
  } catch (error) {
    console.error('❌ Error al actualizar el instituto:', (error as any).response?.data || error);
    alert('❌ Error al actualizar el instituto');
  }
};


// Eliminar el instituto seleccionado
const handleDeleteSchool = async (id: number) => {
  if (!confirm(`¿Seguro que quieres eliminar al instituto con ID ${id}?`)) return;

  try {
    await deleteSchool(id);
    alert('✅ Instituto eliminado exitosamente');
    fetchSchools(); // Actualiza la lista
  } catch (error) {
    console.error('❌ Error al eliminar instituto:', error);
    alert('❌ Error al eliminar el instituto');
  }
};


// Cambiar de página
const changePage = (page: number) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchSchools(page);
  }
};

onMounted(() => fetchSchools());
</script>

<template>
  <!-- Incluir el Navbar -->
  <Navbar />

  <div class="schools-view container mt-4"> <!-- Quitar para que no haya scroll -->
    <!--<h2 class="text-center mb-4">Gestión de Institutos</h2>-->

    <div class="content-wrapper">
      <!-- Tabla de institutos (izquierda) -->
      <div class="panel table-panel">
        <SchoolTable :schools="schools" :selectedSchool="selectedSchool" @select-school="selectSchool" />

        <!-- Controles de paginación -->
        <div class="pagination-controls">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="btn btn-secondary">
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ lastPage }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage >= lastPage" class="btn btn-secondary">
            Siguiente
          </button>
        </div>
      </div>

      <!-- Detalles + Formulario CRUD (derecha) -->
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
  /* Centrar verticalmente */
  justify-content: center;
  /* Centrar horizontalmente */
  min-height: 100vh;
  /* Ocupa el alto completo de la ventana */
}

.content-wrapper {
  display: flex;
  gap: 2rem;
  /* Espacio entre tabla y detalle */
  max-width: 1200px;
  /* Ancho máximo */
  width: 100%;
}

/* Paneles */
.panel {
  flex: 1;
  min-width: 400px;
  /* Tamaño mínimo */
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
}

/* Asegurar altura fija para el panel de la tabla */
.table-panel {
  min-height: 550px;
  /* Aproximado para 10 registros */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Mantiene el paginador abajo */
}

/* Estilos de paginación */
.pagination-controls {
  display: flex;
  justify-content: space-between;
  /* Espacio entre los botones */
  margin-top: 20px;
}
</style>