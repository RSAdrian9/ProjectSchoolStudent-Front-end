<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../api/api';
import StudentTable from '../components/component-table/StudentTable.vue';
import StudentDetail from '../components/component-detail/StudentDetail.vue';
import type { Student } from '../types/indexType';
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import { deleteStudent } from '../services/StudentService';

const students = ref<Student[]>([]);
const selectedStudent = ref<Student | null>(null);

// Paginación
const currentPage = ref(1);
const lastPage = ref(1);

// Cargar estudiantes con paginación
const fetchStudents = async (page = 1) => {
  try {
    const response = await api.get(`/students?page=${page}`);
    students.value = response.data.data; // Datos de los estudiantes
    currentPage.value = response.data.meta.current_page; // Página actual
    lastPage.value = response.data.meta.last_page; // Última página
  } catch (err) {
    console.error('Error al cargar los estudiantes:', err);
  }
};

// Seleccionar un estudiante
const selectStudent = (student: Student | null) => {
  selectedStudent.value = student;
};

// Crear un nuevo estudiante
const handleCreateStudent = async (newStudent: Partial<Student>) => {
  try {
    await api.post('/students', newStudent);
    fetchStudents(currentPage.value); // Recargar la lista actual
    selectedStudent.value = null; // Limpiar selección después de crear
  } catch (err) {
    console.error('Error al crear estudiante:', err);
  }
};

// Actualizar el estudiante seleccionado
const handleUpdateStudent = async (student: Partial<Student>) => {
  if (!selectedStudent.value) return;
  try {
    const payload = JSON.parse(JSON.stringify(student)); // Solución Proxy
    console.log('🔍 Payload enviado a la API:', payload);

    const response = await api.put(`/students/${selectedStudent.value.id}`, payload);
    console.log('✅ Respuesta de la API (update):', response);

    alert('✅ Estudiante actualizado exitosamente');
    fetchStudents();
    selectedStudent.value = null;
  } catch (error) {
    console.error('❌ Error al actualizar el estudiante:', (error as any).response?.data || error);
    alert('❌ Error al actualizar el estudiante');
  }
};


// Eliminar el estudiante seleccionado
const handleDeleteStudent = async (id: number) => {
  if (!confirm(`¿Seguro que quieres eliminar al estudiante con ID ${id}?`)) return;

  try {
    await deleteStudent(id);
    alert('✅ Estudiante eliminado exitosamente');
    fetchStudents(); // Actualiza la lista
  } catch (error) {
    console.error('❌ Error al eliminar estudiante:', error);
    alert('❌ Error al eliminar el estudiante');
  }
};


// Cambiar de página
const changePage = (page: number) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchStudents(page);
  }
};

onMounted(() => fetchStudents());
</script>

<template>
  <!-- Incluir el Navbar -->
  <Navbar />

  <div class="students-view container mt-4"> <!-- Quitar para que no haya scroll -->
    <!--<h2 class="text-center mb-4">Gestión de Estudiantes</h2>-->

    <div class="content-wrapper">
      <!-- Tabla de estudiantes (izquierda) -->
      <div class="panel table-panel">
        <StudentTable :students="students" :selectedStudent="selectedStudent" @select-student="selectStudent" />

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